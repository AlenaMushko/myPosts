import { useQuery } from 'react-query';
import supabase from '@/config/superbaseClients';

export const useCommentsById = (postId: string) => {
  return useQuery(['comments', postId], async () => {
    const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);

    if (error) throw error;
    return data;
  });
};
