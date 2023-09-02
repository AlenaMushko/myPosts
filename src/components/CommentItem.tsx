import React from 'react';
import { Card, CardContent } from '@mui/material';

import { IComment } from '@/interfaces';
import { formatDate } from '@/helpers';
import { MyTypography } from '@/components/MyTypography';
import ReactStars from 'react-stars';

interface IProps {
  item: IComment;
}

export const CommentItem: React.FC<IProps> = ({ item }) => {
  const { created_at, author_name, body, rating } = item;
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
        <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <MyTypography label={'Author'} value={author_name} />
                <MyTypography label={'Creat data'} value={creatData} />
                <MyTypography label={'Comments'} value={body} />
            </div>
            <div>
                <ReactStars
                    count={5}
                    value={rating}
                    size={18}
                    color2={'#ffd700'}
                />
            </div>
        </CardContent>

    </Card>
  );
};
