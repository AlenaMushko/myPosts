import { useQuery } from 'react-query';
import supabase from '@/config/superbaseClients';

const fetchPost = async (postId: string) => {
  const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

  if (error) throw error;

  return data;
};

export const usePostById = (postId: string) => {
  return useQuery(['post', postId], () => fetchPost(postId));
};
