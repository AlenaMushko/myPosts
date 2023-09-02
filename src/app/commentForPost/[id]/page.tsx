'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { ThemeContext } from '@/themes';
import CommentForm from '@/components/CommentForm';
import { useCommentsForPostWithoutPagination, useUser, usePostById } from '@/hooks';
import { MyTypography } from '@/components';

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
            <MyTypography label={'Title'} value={post?.title} />
            <MyTypography label={'Author'} value={post?.author_name} />
            <MyTypography label={'Body'} value={post?.body} />
            <MyTypography label={'Comments'} value={commentCount} />
          </CardContent>
        </Card>
      )}

      <CommentForm user_name={user?.name} post_id={post?.id} refetch={refetch} />
    </>
  );
}

export default CommentForPage;
