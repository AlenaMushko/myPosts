'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/system';
import { Button, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { CommentItem, MyPagination, MyTypography } from '@/components';
import { usePostById} from '@/hooks';
import { ThemeContext } from '@/themes';
import {IComment} from "@/interfaces";
import {useQuery} from "react-query";
import supabase from "@/config/superbaseClients";

function CommentsP({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: post } = usePostById(params.id);

  const {
    data: currentComments,
    isLoading: isCurrentCommentsLoading,
    refetch,
  } = useQuery<IComment[], Error>(
      ['comments', params.id],
      async (): Promise<IComment[]> => {

        const startIndex = (currentPage - 1) * 4;
          const { data, error, count } = await supabase
              .from('comments')
              .select('*', { count: 'exact' })
              .eq('post_id', params.id)
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


  const handleGoHome = () => {
    router.back();
  };

  return (
    <Container>
      <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={handleGoHome}>
        Go back
      </Button>
      {isCurrentCommentsLoading && <LinearProgress color="success" />}
      {post && (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2vh',
            background: theme.palette.info.main,
          }}
        >
          <CardContent>
            <Grid>
              <MyTypography label={'Title'} value={post?.title} />
              <MyTypography label={'Author'} value={post?.author_name} />
              <MyTypography label={'Body'} value={post?.body} />
            </Grid>
          </CardContent>
        </Card>
      )}
      {currentComments?.length !== 0 ? (
        <>
          {currentComments?.map(comment => <CommentItem item={comment} key={comment.id} />)}

          <MyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Typography
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: theme.palette.text.disabled,
          }}
          variant="h5"
        >
          There are no comments for this post yet
        </Typography>
      )}
    </Container>
  );
}

export default CommentsP;
