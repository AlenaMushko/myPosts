import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

import { IComment } from '@/interfaces';
import { formatDate } from '@/helpers';
import { MyTypography } from '@/components/MyTypography';

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
      <CardContent>
        <Grid container spacing={1}>
          <MyTypography label={'Author'} value={author_name} />
          <MyTypography label={'Creat data'} value={creatData} />
          <MyTypography label={'Comments'} value={body} />
        </Grid>
      </CardContent>
    </Card>
  );
};
