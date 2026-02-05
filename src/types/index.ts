export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  tags?: string[];
  estimatedTime?: number; // in minutes
  createdAt: string;
  completedAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: "meeting" | "focus" | "break" | "task";
  color?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color?: "white" | "yellow" | "blue" | "green" | "pink" | "purple";
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress: number; // 0-100
  milestones?: Milestone[];
  status: "active" | "completed" | "paused";
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  streak: number;
  bestStreak: number;
}

export interface FocusSession {
  id: string;
  taskId?: string;
  duration: number; // in minutes
  startTime: string;
  endTime?: string;
  completed: boolean;
}

export interface ProductivityStats {
  tasksCompleted: number;
  focusTime: number; // in minutes
  goalProgress: number; // average %
  currentStreak: number;
  period: "today" | "week" | "month";
}