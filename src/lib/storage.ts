import {
  Task,
  CalendarEvent,
  Note,
  Goal,
  Habit,
  FocusSession,
} from "@/types";

const STORAGE_KEYS = {
  TASKS: "productivity-brain-tasks",
  EVENTS: "productivity-brain-events",
  NOTES: "productivity-brain-notes",
  GOALS: "productivity-brain-goals",
  HABITS: "productivity-brain-habits",
  FOCUS_SESSIONS: "productivity-brain-focus-sessions",
};

// Generic storage helper
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Tasks
export const getTasks = (): Task[] =>
  getFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);

export const saveTasks = (tasks: Task[]): void =>
  setToStorage(STORAGE_KEYS.TASKS, tasks);

export const addTask = (task: Omit<Task, "id" | "createdAt">): Task => {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  saveTasks([...tasks, newTask]);
  return newTask;
};

export const updateTask = (id: string, updates: Partial<Task>): Task | null => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updatedTask = { ...tasks[index], ...updates };
  tasks[index] = updatedTask;
  saveTasks(tasks);
  return updatedTask;
};

export const deleteTask = (id: string): boolean => {
  const tasks = getTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  saveTasks(filtered);
  return true;
};

// Calendar Events
export const getEvents = (): CalendarEvent[] =>
  getFromStorage<CalendarEvent[]>(STORAGE_KEYS.EVENTS, []);

export const saveEvents = (events: CalendarEvent[]): void =>
  setToStorage(STORAGE_KEYS.EVENTS, events);

export const addEvent = (
  event: Omit<CalendarEvent, "id">
): CalendarEvent => {
  const events = getEvents();
  const newEvent: CalendarEvent = {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  saveEvents([...events, newEvent]);
  return newEvent;
};

export const updateEvent = (
  id: string,
  updates: Partial<CalendarEvent>
): CalendarEvent | null => {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updatedEvent = { ...events[index], ...updates };
  events[index] = updatedEvent;
  saveEvents(events);
  return updatedEvent;
};

export const deleteEvent = (id: string): boolean => {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
};

// Notes
export const getNotes = (): Note[] =>
  getFromStorage<Note[]>(STORAGE_KEYS.NOTES, []);

export const saveNotes = (notes: Note[]): void =>
  setToStorage(STORAGE_KEYS.NOTES, notes);

export const addNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note => {
  const notes = getNotes();
  const now = new Date().toISOString();
  const newNote: Note = {
    ...note,
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };
  saveNotes([...notes, newNote]);
  return newNote;
};

export const updateNote = (id: string, updates: Partial<Note>): Note | null => {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return null;

  const updatedNote = {
    ...notes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  notes[index] = updatedNote;
  saveNotes(notes);
  return updatedNote;
};

export const deleteNote = (id: string): boolean => {
  const notes = getNotes();
  const filtered = notes.filter((n) => n.id !== id);
  if (filtered.length === notes.length) return false;
  saveNotes(filtered);
  return true;
};

// Goals
export const getGoals = (): Goal[] =>
  getFromStorage<Goal[]>(STORAGE_KEYS.GOALS, []);

export const saveGoals = (goals: Goal[]): void =>
  setToStorage(STORAGE_KEYS.GOALS, goals);

export const addGoal = (goal: Omit<Goal, "id">): Goal => {
  const goals = getGoals();
  const newGoal: Goal = {
    ...goal,
    id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  saveGoals([...goals, newGoal]);
  return newGoal;
};

export const updateGoal = (id: string, updates: Partial<Goal>): Goal | null => {
  const goals = getGoals();
  const index = goals.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const updatedGoal = { ...goals[index], ...updates };
  goals[index] = updatedGoal;
  saveGoals(goals);
  return updatedGoal;
};

export const deleteGoal = (id: string): boolean => {
  const goals = getGoals();
  const filtered = goals.filter((g) => g.id !== id);
  if (filtered.length === goals.length) return false;
  saveGoals(filtered);
  return true;
};

// Habits
export const getHabits = (): Habit[] =>
  getFromStorage<Habit[]>(STORAGE_KEYS.HABITS, []);

export const saveHabits = (habits: Habit[]): void =>
  setToStorage(STORAGE_KEYS.HABITS, habits);

export const addHabit = (habit: Omit<Habit, "id" | "completedDates" | "streak" | "bestStreak">): Habit => {
  const habits = getHabits();
  const newHabit: Habit = {
    ...habit,
    id: `habit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    completedDates: [],
    streak: 0,
    bestStreak: 0,
  };
  saveHabits([...habits, newHabit]);
  return newHabit;
};

export const updateHabit = (id: string, updates: Partial<Habit>): Habit | null => {
  const habits = getHabits();
  const index = habits.findIndex((h) => h.id === id);
  if (index === -1) return null;

  const updatedHabit = { ...habits[index], ...updates };
  habits[index] = updatedHabit;
  saveHabits(habits);
  return updatedHabit;
};

export const deleteHabit = (id: string): boolean => {
  const habits = getHabits();
  const filtered = habits.filter((h) => h.id !== id);
  if (filtered.length === habits.length) return false;
  saveHabits(filtered);
  return true;
};

// Focus Sessions
export const getFocusSessions = (): FocusSession[] =>
  getFromStorage<FocusSession[]>(STORAGE_KEYS.FOCUS_SESSIONS, []);

export const saveFocusSessions = (sessions: FocusSession[]): void =>
  setToStorage(STORAGE_KEYS.FOCUS_SESSIONS, sessions);

export const addFocusSession = (session: Omit<FocusSession, "id">): FocusSession => {
  const sessions = getFocusSessions();
  const newSession: FocusSession = {
    ...session,
    id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  saveFocusSessions([...sessions, newSession]);
  return newSession;
};