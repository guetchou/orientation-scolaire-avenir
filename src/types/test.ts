
export interface TestResult {
  id: string;
  user_id: string;
  test_type: string;
  results: any;
  answers: any[];
  created_at: string;
  progress_score: number;
}

export interface LearningStyleResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  reading: number;
}

export interface EmotionalTestResults {
  selfAwareness: number;
  selfRegulation: number;
  motivation: number;
  empathy: number;
  socialSkills: number;
}
