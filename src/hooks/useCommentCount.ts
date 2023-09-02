import { useEffect, useState } from 'react';
import { IComment } from '@/interfaces';

export const useCommentCount = (comments?: IComment[]) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [comments]);

  return commentCount;
};
