import React, { useEffect, useState } from 'react';
import { IPost, IUser } from '@/interfaces';
import { Button, Card, CardContent, Grid, ListItemText, Typography } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useRouter } from 'next/navigation';
import { useCommentsForPostWithoutPagination } from '@/hooks';
import { formatDate } from '@/helpers';

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

  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [comments]);
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
        flex: '1 1 auto', // <-- Важливо
        padding: '12px',
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: '2px 0px 26px 0px #056f5d',
        '&:hover': {
          boxShadow: '2px 0px 26px 0px #056f5d',
        },
      }}
    >
      <CardContent>
        <ListItemText primary={` Title: ${title}`} />
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
              {author_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="div"
              sx={{ display: 'inline', fontWeight: 'bold' }}
              variant="body2"
              color="text.primary"
            >
              Creat data:
            </Typography>
            <Typography
              component="div"
              sx={{ display: 'inline' }}
              variant="body2"
              color="text.primary"
            >
              {creatData}
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
              {body}
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
            <Button
              sx={{ marginLeft: '2vw' }}
              variant="contained"
              startIcon={<ReceiptLongIcon />}
              onClick={handleOpenComments}
            >
              Comments
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      {type === 'commentator' && (
        <Button variant="contained" startIcon={<LibraryAddIcon />} onClick={addComment}>
          Add Comment
        </Button>
      )}
    </Card>
  );
};
