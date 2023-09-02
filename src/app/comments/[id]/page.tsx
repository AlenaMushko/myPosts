'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/system';
import { Button, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { CommentItem, MyPagination, MyTypography } from '@/components';
import { useCommentCount, useCommentsForPost, usePostById } from '@/hooks';
import { ThemeContext } from '@/themes';

function CommentsP({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    refetch,
  } = useCommentsForPost(params.id, currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    if (comments) {
      setTotalPages(Math.ceil(comments.length / 4));
    }
  }, [comments]);
  const { data: post } = usePostById(params.id);

  const commentCount = useCommentCount(comments);
  const handleGoHome = () => {
    router.back();
  };

  return (
    <Container>
      <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={handleGoHome}>
        Go back
      </Button>
      {isCommentsLoading && <LinearProgress color="success" />}
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
              <MyTypography label={'Comments'} value={commentCount} />
            </Grid>
          </CardContent>
        </Card>
      )}
      {comments?.length !== 0 ? (
        <>
          {comments?.map(comment => <CommentItem item={comment} key={comment.id} />)}

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
