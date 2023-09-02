'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { ThemeContext } from '@/themes';
import CommentForm from '@/components/CommentForm';
import {
  useCommentsById,
  useUser,
  usePostById,
  useCommentCount,
} from '@/hooks';
import { MyTypography } from '@/components';

function CommentForPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const { data: user } = useUser();
  const { data: post } = usePostById(params.id);
  const { data: comments, refetch } = useCommentsById(params.id);
  const commentCount = useCommentCount(comments);

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
