
import { Database } from '@/integrations/supabase/types';

export type Tables = Database['public']['Tables'];
export type Views = Database['public']['Views'];

export interface ForumDomain extends Tables['forum_domains']['Row'] {
  name: string;
  description?: string;
  icon?: string;
  post_count?: number;
}

export interface Neighborhood extends Tables['neighborhoods']['Row'] {
  id: string;
  name: string;
  city: string;
  type: string;
  description?: string;
  coordinates: number[];
  created_at?: string;
  updated_at?: string;
}

export interface TestResult extends Tables['test_results']['Row'] {
  id: string;
  user_id: string;
  test_type: string;
  results: any;
  answers: any;
  created_at: string;
  progress_score: number;
}

export interface Profile extends Tables['profiles']['Row'] {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  department?: string;
  status?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment extends Tables['appointments']['Row'] {
  id: string;
  conseiller_id: string | null;
  student_id: string | null;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  profiles?: {
    email: string;
  };
}
