export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export interface FocusSession {
  id: string;
  taskId: string;
  duration: number; // seconds
  date: string;
}

export interface AnalyticsData {
  totalTasks: number;
  completedTasks: number;
  totalFocusTime: number; // seconds
  averageSessionDuration: number;
  completionRate: number;
}
