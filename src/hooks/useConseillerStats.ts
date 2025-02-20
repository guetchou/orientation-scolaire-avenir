
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ConseillerStats } from '@/types/dashboard';

export const useConseillerStats = (conseillerId: string) => {
  return useQuery({
    queryKey: ['conseillerStats', conseillerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('*')
        .eq('conseiller_id', conseillerId)
        .single();

      if (error) throw error;
      return data as ConseillerStats;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
