'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@mui/system';
import {
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  ListItemText,
  Typography,
} from '@mui/material';
import { CommentItem, MyPagination } from '@/components';
import { useCommentsForPost } from '@/hooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ThemeContext } from '@/themes';
import { usePostById } from '@/hooks/usePostById';

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
      setCommentCount(comments.length);
      setTotalPages(Math.ceil(comments.length / 4));
    }
  }, [comments]);
  const { data: post } = usePostById(params.id);

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [comments]);
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
            <ListItemText primary={` Title: ${post?.title}`} />
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  sx={{ display: 'inline', fontWeight: 'bold' }}
                  variant="body2"
                  color="text.primary"
                >
                  Authot:
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: 'inline' }}
                  variant="body2"
                  color="text.primary"
                >
                  {post?.author_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  sx={{ display: 'inline', fontWeight: 'bold' }}
                  variant="body2"
                  color="text.primary"
                >
                  Body:
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: 'inline' }}
                  variant="body2"
                  color="text.primary"
                >
                  {post?.body}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="div"
                  sx={{ display: 'inline', fontWeight: 'bold' }}
                  variant="body2"
                  color="text.primary"
                >
                  Comments:
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: 'inline' }}
                  variant="body2"
                  color="text.primary"
                >
                  {commentCount}
                </Typography>
              </Grid>
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
