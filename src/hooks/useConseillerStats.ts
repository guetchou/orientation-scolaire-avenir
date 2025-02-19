
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { handleError } from '@/utils/errorHandler';

interface ConseillerStats {
  total_students: number;
  tests_completed: number;
  appointments_scheduled: number;
  average_progress: number;
}

export const useConseillerStats = (conseillerId: string) => {
  return useQuery({
    queryKey: ['conseillerStats', conseillerId],
    queryFn: async (): Promise<ConseillerStats> => {
      try {
        const { data, error } = await supabase
          .from('dashboard_stats')
          .select('*')
          .eq('conseiller_id', conseillerId)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        throw handleError(error);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};
