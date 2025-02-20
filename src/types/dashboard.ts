
export interface ConseillerStats {
  conseiller_id: string;
  total_students: number;
  tests_completed: number;
  appointments_scheduled: number;
  average_progress: number;
}

export interface StudentProgress {
  student_id: string;
  student_name: string;
  completed_tests: number;
  last_test_date: string;
  progress_score: number;
  next_appointment?: string;
}

export interface AvailabilitySlot {
  id: string;
  conseiller_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at?: string;
}

export interface LearningStyleResults {
  visual: number;
  auditory: number;
  reading: number;
  kinesthetic: number;
}

export interface EmotionalTestResults {
  selfAwareness: number;
  empathy: number;
  motivation: number;
  socialSkills: number;
  selfRegulation: number;
}
