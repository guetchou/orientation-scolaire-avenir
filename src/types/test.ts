
import { Json } from '@/integrations/supabase/types';

export interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  results: Json;
  answers: Json;
  created_at: string;
  progress_score: number;
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

export interface RiasecResults {
  realistic: number;
  investigative: number;
  artistic: number;
  social: number;
  enterprising: number;
  conventional: number;
}
