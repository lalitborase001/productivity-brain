import { TamboComponent, TamboTool } from "@tambo-ai/react";
import { z } from "zod";
import * as storage from "./storage";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

// Import components (we'll create these next)
import TaskList from "@/components/TaskList";
import TaskBoard from "@/components/TaskBoard";
import TaskStats from "@/components/TaskStats";
import Calendar from "@/components/Calendar";
import TimeBlocks from "@/components/TimeBlocks";
import FocusTimer from "@/components/FocusTimer";
import NoteCard from "@/components/NoteCard";
import NotesGrid from "@/components/NotesGrid";
import GoalTracker from "@/components/GoalTracker";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import ProgressChart from "@/components/ProgressChart";
import ProductivityReport from "@/components/ProductivityReport";
import HabitTracker from "@/components/HabitTracker";

// Define Tambo Components
export const components: TamboComponent[] = [
  {
    name: "TaskList",
    description:
      "Displays a list of tasks with options to filter by status, priority, or tags. Use this for viewing and managing tasks in a list format.",
    component: TaskList,
    propsSchema: z.object({
      filterStatus: z
        .enum(["all", "todo", "in-progress", "done"])
        .optional()
        .describe("Filter tasks by status"),
      filterPriority: z
        .enum(["all", "low", "medium", "high"])
        .optional()
        .describe("Filter tasks by priority"),
      sortBy: z
        .enum(["dueDate", "priority", "createdAt"])
        .optional()
        .describe("Sort tasks by field"),
    }),
  },
  {
    name: "TaskBoard",
    description:
      "Displays tasks in a Kanban board format with columns for todo, in-progress, and done. Use this for a visual workflow view.",
    component: TaskBoard,
    propsSchema: z.object({
      filterPriority: z
        .enum(["all", "low", "medium", "high"])
        .optional()
        .describe("Filter tasks by priority"),
    }),
  },
  {
    name: "TaskStats",
    description:
      "Shows statistics about tasks including completion rate, tasks by priority, and upcoming deadlines. Use for task analytics.",
    component: TaskStats,
    propsSchema: z.object({
      period: z
        .enum(["today", "week", "month", "all"])
        .optional()
        .describe("Time period for statistics"),
    }),
  },
  {
    name: "Calendar",
    description:
      "Displays a calendar view with events and scheduled tasks. Use for viewing and managing time-based commitments.",
    component: Calendar,
    propsSchema: z.object({
      view: z
        .enum(["day", "week", "month"])
        .optional()
        .describe("Calendar view mode"),
      date: z.string().optional().describe("Date to focus on (ISO format)"),
    }),
  },
  {
    name: "TimeBlocks",
    description:
      "Shows a time-blocking interface for planning daily schedule. Use for detailed daily time management.",
    component: TimeBlocks,
    propsSchema: z.object({
      date: z.string().optional().describe("Date to display (ISO format)"),
      suggestedBlocks: z
        .array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
            title: z.string(),
            type: z.enum(["focus", "meeting", "break", "task"]),
          })
        )
        .optional()
        .describe("AI-suggested time blocks for the day"),
    }),
  },
  {
    name: "FocusTimer",
    description:
      "Pomodoro-style focus timer for deep work sessions. Use when user wants to start a focused work session.",
    component: FocusTimer,
    propsSchema: z.object({
      duration: z
        .number()
        .optional()
        .describe("Focus session duration in minutes (default 25)"),
      taskId: z.string().optional().describe("Associated task ID"),
      taskTitle: z.string().optional().describe("Associated task title"),
    }),
  },
  {
    name: "NoteCard",
    description:
      "A single note card for quick capture and viewing. Use for displaying individual notes.",
    component: NoteCard,
    propsSchema: z.object({
      title: z.string().describe("Note title"),
      content: z.string().describe("Note content"),
      color: z
        .enum(["white", "yellow", "blue", "green", "pink", "purple"])
        .optional()
        .describe("Note color"),
      tags: z.array(z.string()).optional().describe("Note tags"),
    }),
  },
  {
    name: "NotesGrid",
    description:
      "Grid view of multiple notes. Use for browsing and managing all notes.",
    component: NotesGrid,
    propsSchema: z.object({
      filterTag: z.string().optional().describe("Filter notes by tag"),
      sortBy: z
        .enum(["createdAt", "updatedAt", "title"])
        .optional()
        .describe("Sort notes by field"),
    }),
  },
  {
    name: "GoalTracker",
    description:
      "Displays goals with progress bars and milestones. Use for goal management and tracking.",
    component: GoalTracker,
    propsSchema: z.object({
      filterStatus: z
        .enum(["all", "active", "completed", "paused"])
        .optional()
        .describe("Filter goals by status"),
      showMilestones: z
        .boolean()
        .optional()
        .describe("Whether to show milestone details"),
    }),
  },
  {
    name: "WeeklyPlanner",
    description:
      "AI-generated weekly plan with prioritized tasks and time allocation suggestions. Use for weekly planning.",
    component: WeeklyPlanner,
    propsSchema: z.object({
      weekStartDate: z
        .string()
        .optional()
        .describe("Start date of the week (ISO format)"),
      priorities: z
        .array(z.string())
        .optional()
        .describe("Priority areas for the week"),
      scheduledTasks: z
        .array(
          z.object({
            day: z.string(),
            taskId: z.string(),
            taskTitle: z.string(),
            timeSlot: z.string(),
          })
        )
        .optional()
        .describe("AI-suggested task scheduling"),
    }),
  },
  {
    name: "ProgressChart",
    description:
      "Visual charts showing productivity trends and progress over time. Use for visualizing productivity data.",
    component: ProgressChart,
    propsSchema: z.object({
      type: z
        .enum(["tasks", "focus", "goals", "habits"])
        .describe("Type of progress to visualize"),
      period: z
        .enum(["week", "month", "quarter", "year"])
        .optional()
        .describe("Time period for the chart"),
      chartType: z
        .enum(["line", "bar", "area"])
        .optional()
        .describe("Chart visualization type"),
    }),
  },
  {
    name: "ProductivityReport",
    description:
      "Comprehensive productivity report with insights and recommendations. Use for detailed productivity analysis.",
    component: ProductivityReport,
    propsSchema: z.object({
      period: z
        .enum(["today", "week", "month"])
        .describe("Time period for the report"),
      insights: z
        .array(z.string())
        .optional()
        .describe("AI-generated insights"),
      recommendations: z
        .array(z.string())
        .optional()
        .describe("AI-generated recommendations"),
      metrics: z
        .object({
          tasksCompleted: z.number(),
          focusTime: z.number(),
          goalProgress: z.number(),
          habitStreak: z.number(),
        })
        .optional()
        .describe("Productivity metrics"),
    }),
  },
  {
    name: "HabitTracker",
    description:
      "Track and visualize daily/weekly habits with streak information. Use for habit tracking and building.",
    component: HabitTracker,
    propsSchema: z.object({
      view: z
        .enum(["grid", "list", "calendar"])
        .optional()
        .describe("Display mode for habits"),
      filterFrequency: z
        .enum(["all", "daily", "weekly"])
        .optional()
        .describe("Filter habits by frequency"),
    }),
  },
];

// Define Tambo Tools
export const tools: TamboTool[] = [
  {
    name: "get-tasks",
    description:
      "Retrieves all tasks from storage. Use this to get the current task list for analysis or display.",
    tool: () => {
      return storage.getTasks();
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            status: z.enum(["todo", "in-progress", "done"]),
            priority: z.enum(["low", "medium", "high"]),
            dueDate: z.string().optional(),
            tags: z.array(z.string()).optional(),
            estimatedTime: z.number().optional(),
            createdAt: z.string(),
            completedAt: z.string().optional(),
          })
        )
      ),
  },
  {
    name: "add-task",
    description:
      "Creates a new task with the provided details. Use this when the user wants to create or add a task.",
    tool: (params: {
      title: string;
      description?: string;
      priority?: "low" | "medium" | "high";
      dueDate?: string;
      tags?: string[];
      estimatedTime?: number;
    }) => {
      return storage.addTask({
        title: params.title,
        description: params.description,
        status: "todo",
        priority: params.priority || "medium",
        dueDate: params.dueDate,
        tags: params.tags,
        estimatedTime: params.estimatedTime,
      });
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          priority: z.enum(["low", "medium", "high"]).optional(),
          dueDate: z.string().optional(),
          tags: z.array(z.string()).optional(),
          estimatedTime: z.number().optional(),
        })
      )
      .returns(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string().optional(),
          status: z.enum(["todo", "in-progress", "done"]),
          priority: z.enum(["low", "medium", "high"]),
          dueDate: z.string().optional(),
          tags: z.array(z.string()).optional(),
          estimatedTime: z.number().optional(),
          createdAt: z.string(),
          completedAt: z.string().optional(),
        })
      ),
  },
  {
    name: "update-task",
    description:
      "Updates an existing task with new information. Use this to modify task details, status, or priority.",
    tool: (params: { id: string; updates: Record<string, unknown> }) => {
      return storage.updateTask(params.id, params.updates);
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          id: z.string(),
          updates: z.record(z.unknown()),
        })
      )
      .returns(
        z
          .object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            status: z.enum(["todo", "in-progress", "done"]),
            priority: z.enum(["low", "medium", "high"]),
            dueDate: z.string().optional(),
            tags: z.array(z.string()).optional(),
            estimatedTime: z.number().optional(),
            createdAt: z.string(),
            completedAt: z.string().optional(),
          })
          .nullable()
      ),
  },
  {
    name: "delete-task",
    description: "Deletes a task by ID. Use this when the user wants to remove a task.",
    tool: (params: { id: string }) => {
      return storage.deleteTask(params.id);
    },
    toolSchema: z
      .function()
      .args(z.object({ id: z.string() }))
      .returns(z.boolean()),
  },
  {
    name: "get-calendar-events",
    description:
      "Retrieves all calendar events. Use this to get scheduled events for display or analysis.",
    tool: () => {
      return storage.getEvents();
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            startTime: z.string(),
            endTime: z.string(),
            type: z.enum(["meeting", "focus", "break", "task"]),
            color: z.string().optional(),
          })
        )
      ),
  },
  {
    name: "add-calendar-event",
    description:
      "Creates a new calendar event. Use this when the user wants to schedule something.",
    tool: (params: {
      title: string;
      description?: string;
      startTime: string;
      endTime: string;
      type?: "meeting" | "focus" | "break" | "task";
      color?: string;
    }) => {
      return storage.addEvent({
        title: params.title,
        description: params.description,
        startTime: params.startTime,
        endTime: params.endTime,
        type: params.type || "meeting",
        color: params.color,
      });
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          startTime: z.string(),
          endTime: z.string(),
          type: z.enum(["meeting", "focus", "break", "task"]).optional(),
          color: z.string().optional(),
        })
      )
      .returns(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string().optional(),
          startTime: z.string(),
          endTime: z.string(),
          type: z.enum(["meeting", "focus", "break", "task"]),
          color: z.string().optional(),
        })
      ),
  },
  {
    name: "get-notes",
    description: "Retrieves all notes. Use this to get notes for display or search.",
    tool: () => {
      return storage.getNotes();
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            content: z.string(),
            color: z
              .enum(["white", "yellow", "blue", "green", "pink", "purple"])
              .optional(),
            tags: z.array(z.string()).optional(),
            createdAt: z.string(),
            updatedAt: z.string(),
          })
        )
      ),
  },
  {
    name: "add-note",
    description: "Creates a new note. Use this when the user wants to capture information.",
    tool: (params: {
      title: string;
      content: string;
      color?: "white" | "yellow" | "blue" | "green" | "pink" | "purple";
      tags?: string[];
    }) => {
      return storage.addNote(params);
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          title: z.string(),
          content: z.string(),
          color: z
            .enum(["white", "yellow", "blue", "green", "pink", "purple"])
            .optional(),
          tags: z.array(z.string()).optional(),
        })
      )
      .returns(
        z.object({
          id: z.string(),
          title: z.string(),
          content: z.string(),
          color: z
            .enum(["white", "yellow", "blue", "green", "pink", "purple"])
            .optional(),
          tags: z.array(z.string()).optional(),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
      ),
  },
  {
    name: "get-goals",
    description: "Retrieves all goals. Use this to get goals for display or progress tracking.",
    tool: () => {
      return storage.getGoals();
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            targetDate: z.string().optional(),
            progress: z.number(),
            milestones: z
              .array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  completed: z.boolean(),
                  completedAt: z.string().optional(),
                })
              )
              .optional(),
            status: z.enum(["active", "completed", "paused"]),
          })
        )
      ),
  },
  {
    name: "get-habits",
    description: "Retrieves all habits. Use this to get habit tracking data.",
    tool: () => {
      return storage.getHabits();
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            frequency: z.enum(["daily", "weekly"]),
            completedDates: z.array(z.string()),
            streak: z.number(),
            bestStreak: z.number(),
          })
        )
      ),
  },
  {
    name: "analyze-productivity",
    description:
      "Analyzes productivity data and returns statistics. Use this to generate insights about user's productivity.",
    tool: (params: { period: "today" | "week" | "month" }) => {
      const tasks = storage.getTasks();
      const focusSessions = storage.getFocusSessions();
      const goals = storage.getGoals();
      const habits = storage.getHabits();

      const now = new Date();
      let startDate: Date;

      switch (params.period) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = startOfWeek(now);
          break;
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
      }

      const endDate = new Date();

      const completedTasks = tasks.filter((task) => {
        if (task.status !== "done" || !task.completedAt) return false;
        const completedDate = new Date(task.completedAt);
        return isWithinInterval(completedDate, { start: startDate, end: endDate });
      });

      const completedSessions = focusSessions.filter((session) => {
        if (!session.completed) return false;
        const sessionDate = new Date(session.startTime);
        return isWithinInterval(sessionDate, { start: startDate, end: endDate });
      });

      const totalFocusTime = completedSessions.reduce(
        (sum, session) => sum + session.duration,
        0
      );

      const activeGoals = goals.filter((g) => g.status === "active");
      const avgGoalProgress =
        activeGoals.length > 0
          ? activeGoals.reduce((sum, g) => sum + g.progress, 0) / activeGoals.length
          : 0;

      const maxStreak = Math.max(...habits.map((h) => h.streak), 0);

      return {
        tasksCompleted: completedTasks.length,
        focusTime: totalFocusTime,
        goalProgress: Math.round(avgGoalProgress),
        currentStreak: maxStreak,
        period: params.period,
      };
    },
    toolSchema: z
      .function()
      .args(
        z.object({
          period: z.enum(["today", "week", "month"]),
        })
      )
      .returns(
        z.object({
          tasksCompleted: z.number(),
          focusTime: z.number(),
          goalProgress: z.number(),
          currentStreak: z.number(),
          period: z.enum(["today", "week", "month"]),
        })
      ),
  },
  {
    name: "suggest-focus-time",
    description:
      "Suggests optimal focus time slots based on schedule and tasks. Use this to help plan productive work time.",
    tool: () => {
      const events = storage.getEvents();
      const tasks = storage.getTasks();

      // Get today's schedule
      const today = format(new Date(), "yyyy-MM-dd");
      const todayEvents = events.filter((e) => e.startTime.startsWith(today));

      // Find gaps in schedule (simplified logic)
      const suggestions = [
        {
          startTime: "09:00",
          endTime: "11:00",
          reason: "Morning peak focus time",
          availableTasks: tasks
            .filter((t) => t.status === "todo" && t.priority === "high")
            .slice(0, 3),
        },
        {
          startTime: "14:00",
          endTime: "16:00",
          reason: "Afternoon deep work session",
          availableTasks: tasks
            .filter((t) => t.status === "todo" && t.estimatedTime)
            .slice(0, 2),
        },
      ];

      return suggestions;
    },
    toolSchema: z
      .function()
      .args(z.object({}))
      .returns(
        z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
            reason: z.string(),
            availableTasks: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                priority: z.enum(["low", "medium", "high"]),
                estimatedTime: z.number().optional(),
              })
            ),
          })
        )
      ),
  },
];

// Additional Context Helper
export const contextHelpers = {
  currentTasks: () => {
    const tasks = storage.getTasks();
    const pendingTasks = tasks.filter((t) => t.status !== "done");
    return {
      key: "currentTasks",
      value: `${pendingTasks.length} pending tasks, ${
        tasks.filter((t) => t.status === "done").length
      } completed`,
    };
  },
  todaysSchedule: () => {
    const events = storage.getEvents();
    const today = format(new Date(), "yyyy-MM-dd");
    const todayEvents = events.filter((e) => e.startTime.startsWith(today));
    return {
      key: "todaysSchedule",
      value: `${todayEvents.length} events scheduled for today`,
    };
  },
  activeGoals: () => {
    const goals = storage.getGoals();
    const active = goals.filter((g) => g.status === "active");
    return {
      key: "activeGoals",
      value: `${active.length} active goals`,
    };
  },
};