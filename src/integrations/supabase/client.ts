
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Fonction pour vérifier si Supabase est configuré correctement
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseKey);
};
