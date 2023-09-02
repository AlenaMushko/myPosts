import React from 'react';
import { Card, Typography } from '@mui/material';
import { IComment } from '@/interfaces';
import { formatDate } from '@/helpers';

interface IProps {
  item: IComment;
}

export const CommentItem: React.FC<IProps> = ({ item }) => {
  const { created_at, author_name, body } = item;
  const creatData = formatDate(new Date(created_at));

  return (
    <Card
      sx={{
        marginTop: '3vh',
        padding: '12px',
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: '2px 0px 26px 0px #056f5d',
        '&:hover': {
          boxShadow: '2px 0px 26px 0px #056f5d',
        },
      }}
    >
      <Typography component="div" variant="body2" color="text.primary">
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span style={{ fontFamily: 'Arial, sans-serif' }}>{author_name}</span>
        <br />
      </Typography>
      <Typography component="div" variant="body2" color="text.primary">
        <span style={{ fontWeight: 'bold' }}>Creat data: </span>
        <span style={{ fontFamily: 'Arial, sans-serif' }}>{creatData}</span>
        <br />
      </Typography>
      <Typography component="div" variant="body2" color="text.primary">
        <span style={{ fontWeight: 'bold' }}>Comment: </span>
        <span style={{ fontFamily: 'Arial, sans-serif' }}>{body}</span>
      </Typography>
    </Card>
  );
};
