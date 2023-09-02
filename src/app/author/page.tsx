'use client';

import { useUser } from '@/hooks';
import { Container } from '@mui/system';
import { Grid, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { IPost } from '@/interfaces';
import supabase from '@/config/superbaseClients';
import { MyPagination, PostItem, PostForm } from '@/components';

const AuthorP = () => {
  const { data: user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: currentPosts,
    isLoading: isPostsLoading,
    refetch,
  } = useQuery<IPost[], Error>(
    ['posts', user?.id],
    async (): Promise<IPost[]> => {
      if (!user || !user.id) {
        return [];
      }
      const startIndex = (currentPage - 1) * 4;
      const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('author_id', user?.id)
        .range(startIndex, startIndex + 3);

      if (count) {
        setTotalPages(Math.ceil(count / 4));
      }
      if (error) {
        throw new Error(error.message);
      }
      return data ?? [];
    },
    {
      onError: (error: Error) => {
        throw new Error(error.message);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <Container>
      {isPostsLoading && <LinearProgress color="success" />}

      {user && (
        <>
          <PostForm userId={user.id} refetch={refetch} />
          <Grid
            container
            spacing={2}
            sx={{ width: '100%', marginTop: '24px', display: 'flex', alignItems: 'stretch' }}
          >
            {currentPosts?.map(post => (
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

export default AuthorP;
