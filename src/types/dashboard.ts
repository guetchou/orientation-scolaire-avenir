
export interface ConseillerStats {
  total_students: number;
  tests_completed: number;
  appointments_scheduled: number;
  average_progress: number;
}

export interface DashboardTabsStats {
  users?: {
    total: number;
    active: number;
    new: number;
    growth: number;
  };
  tests?: {
    total: number;
    completed: number;
    inProgress: number;
    growth: number;
  };
  appointments?: {
    total: number;
    completed: number;
    upcoming: number;
    growth: number;
  };
  revenue?: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  students?: {
    total: number;
    active: number;
    new: number;
    growth: number;
  };
  hours?: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface StudentProgress {
  id: string;
  name: string;
  avatar?: string;
  progress: number;
  lastActive: string;
  testsCompleted: number;
  status: 'active' | 'inactive' | 'onHold';
}

export interface LearningStyleResults {
  visual: number;
  auditory: number;
  kinesthetic: number;
  primary: string;
  secondary: string;
}

export interface EmotionalTestResults {
  selfAwareness: number;
  selfRegulation: number;
  motivation: number;
  empathy: number;
  socialSkills: number;
  overallScore: number;
}
