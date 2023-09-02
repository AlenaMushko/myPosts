import React from 'react';
import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useRouter } from 'next/navigation';

import { IPost, IUser } from '@/interfaces';
import { useCommentCount, useCommentsForPostWithoutPagination } from '@/hooks';
import { formatDate } from '@/helpers';
import { MyTypography } from '@/components/MyTypography';

interface IProps {
  item: IPost;
  user: IUser;
}

export const PostItem: React.FC<IProps> = ({ item, user }) => {
  const { title, body, author_name, id, created_at } = item;
  const { type } = user;
  const router = useRouter();

  const { data: comments } = useCommentsForPostWithoutPagination(id?.toString() || '');
  const creatData = formatDate(new Date(created_at));

  const commentCount = useCommentCount(comments);

  const addComment = () => {
    router.push(`/commentForPost/${id}`);
  };

  const handleOpenComments = () => {
    router.push(`/comments/${id}`);
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        padding: '12px',
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: '2px 0px 26px 0px #056f5d',
        '&:hover': {
          boxShadow: '2px 0px 26px 0px #056f5d',
        },
      }}
    >
      <CardContent>
        <Grid>
          <MyTypography label={'Title'} value={title} />
          <MyTypography label={'Author'} value={author_name} />
          <MyTypography label={'Creat data'} value={creatData} />
          <MyTypography label={'Body'} value={body} />
          <MyTypography label={'Comments'} value={commentCount} />
        </Grid>
      </CardContent>

      <Box sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <Button
          sx={{
            '& .MuiButton-startIcon': {
              display: { xs: 'none', sm: 'inline' },
            },
          }}
          variant="contained"
          startIcon={<ReceiptLongIcon />}
          onClick={handleOpenComments}
        >
          All comments
        </Button>
        {type === 'commentator' && (
          <Button
            sx={{
              '& .MuiButton-startIcon': {
                display: { xs: 'none', sm: 'inline' },
              },
            }}
            variant="contained"
            startIcon={<LibraryAddIcon />}
            onClick={addComment}
          >
            Add Comment
          </Button>
        )}
      </Box>
    </Card>
  );
};
