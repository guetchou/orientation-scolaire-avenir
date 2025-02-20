
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ForumDomain } from '@/types/supabase';

export const useForumData = () => {
  const fetchDomains = async (): Promise<ForumDomain[]> => {
    const { data, error } = await supabase
      .from('forum_domains')
      .select('*');

    if (error) throw error;
    return data;
  };

  return useQuery({
    queryKey: ['forumDomains'],
    queryFn: fetchDomains,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
