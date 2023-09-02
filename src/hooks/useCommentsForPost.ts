import { useQuery } from 'react-query';
import supabase from '@/config/superbaseClients';

// const fetchComments = async (postId: string) => {
//     const { data, error } = await supabase
//         .from('comments')
//         .select('*')
//         .eq('post_id', postId);
//
//     if (error) throw error;
//     return data;
// };

export const useCommentsForPost = (postId: string, currentPage: number) => {
  return useQuery(
    ['comments', postId, currentPage],
    async () => {
      const startIndex = (currentPage - 1) * 4;
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .range(startIndex, startIndex + 3);

      if (error) throw error;
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useCommentsForPostWithoutPagination = (postId: string) => {
  return useQuery(['comments', postId], async () => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);

    if (error) throw error;
    return data;
  });
};
