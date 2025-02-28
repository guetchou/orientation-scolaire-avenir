
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
