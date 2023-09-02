'use client';
import React, { useContext, useEffect, useState } from 'react';
import CommentForm from '@/components/CommentForm';
import { useRouter } from 'next/navigation';
import { useCommentsForPostWithoutPagination, useUser } from '@/hooks';
import { Button, Card, CardContent, Grid, ListItemText, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePostById } from '@/hooks/usePostById';
import { ThemeContext } from '@/themes';

function CommentForPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const { data: user } = useUser();
  const { data: post } = usePostById(params.id);
  const { data: comments, refetch } = useCommentsForPostWithoutPagination(params.id);
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
    <>
      <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={handleGoHome}>
        Go back
      </Button>

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

      <CommentForm user_name={user?.name} post_id={post?.id} refetch={refetch} />
    </>
  );
}

export default CommentForPage;
