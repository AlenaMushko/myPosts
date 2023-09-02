import { useQuery } from 'react-query';
import supabase from '@/config/superbaseClients';

const fetchUser = async () => {
  try {
    if (typeof window !== 'undefined') {
      const userId = window.sessionStorage.getItem('userId');
      if (!userId) return null;

      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

      if (error) throw error;
      return data;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const useUser = () => {
  return useQuery('user', fetchUser, {
    enabled: typeof window !== 'undefined' && !!window.sessionStorage.getItem('userId'),
  });
};
