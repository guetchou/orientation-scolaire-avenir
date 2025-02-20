
import { Json } from '@/integrations/supabase/types';

export interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  results: Record<string, number>;
  answers: Json;
  created_at: string;
  updated_at: string;
}

export interface EmotionalTestResults {
  empathy: number;
  selfAwareness: number;
}

export interface LearningStyleResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
}
