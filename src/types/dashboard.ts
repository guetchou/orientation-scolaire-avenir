
export interface ConseillerStats {
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
  next_appointment: string | null;
}

export interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}
