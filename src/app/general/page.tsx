'use client';

import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Grid, LinearProgress } from '@mui/material';

import { IPost } from '@/interfaces';
import supabase from '@/config/superbaseClients';
import { MyPagination, PostItem } from '@/components';
import { useUser } from '@/hooks';
import { useQuery } from 'react-query';

const GeneralP = () => {
  const { data: user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: allPosts,
    isLoading: isPostsLoading,
    refetch,
  } = useQuery<IPost[]>('posts', async () => {
    const startIndex = (currentPage - 1) * 3;
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .range(startIndex, startIndex + 2);
    if (error) throw new Error(error.message);
    if (count) {
      setTotalPages(Math.ceil(count / 3));
    }
    return data;
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <Container>
      {isPostsLoading && <LinearProgress color="success" />}
      {user && (
        <>
          <Grid
            container
            spacing={2}
            sx={{ width: '100%', marginTop: '24px', display: 'flex', alignItems: 'stretch' }}
          >
            {allPosts?.map(post => (
              <Grid item xs={6} key={post.id} sx={{ display: 'flex' }}>
                <PostItem item={post} user={user} />
              </Grid>
            ))}
          </Grid>
          <MyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default GeneralP;
