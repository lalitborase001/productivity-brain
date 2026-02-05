// Seed Data for Personal Productivity Brain
// Run this in the browser console to populate with example data

const seedData = {
  tasks: [
    {
      id: "task-1",
      title: "Review quarterly report",
      description: "Go through Q4 financials and prepare summary",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["work", "urgent"],
      estimatedTime: 60,
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-2",
      title: "Update project documentation",
      description: "Add API endpoints and usage examples",
      status: "in-progress",
      priority: "medium",
      tags: ["documentation", "development"],
      estimatedTime: 90,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-3",
      title: "Team meeting preparation",
      description: "Prepare slides and agenda for weekly sync",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["meetings", "work"],
      estimatedTime: 30,
      createdAt: new Date().toISOString(),
    },
    {
      id: "task-4",
      title: "Code review for PR #234",
      description: "Review authentication changes",
      status: "done",
      priority: "medium",
      tags: ["development", "code-review"],
      estimatedTime: 45,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-5",
      title: "Grocery shopping",
      description: "Buy vegetables, fruits, and pantry items",
      status: "todo",
      priority: "low",
      tags: ["personal", "errands"],
      estimatedTime: 45,
      createdAt: new Date().toISOString(),
    },
  ],

  events: [
    {
      id: "event-1",
      title: "Team Standup",
      description: "Daily sync with development team",
      startTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T09:00:00",
      endTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T09:30:00",
      type: "meeting",
      color: "#3b82f6",
    },
    {
      id: "event-2",
      title: "Deep Work Session",
      description: "Focus on feature development",
      startTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T10:00:00",
      endTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T12:00:00",
      type: "focus",
      color: "#8b5cf6",
    },
    {
      id: "event-3",
      title: "Lunch Break",
      startTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T12:00:00",
      endTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T13:00:00",
      type: "break",
      color: "#10b981",
    },
    {
      id: "event-4",
      title: "Client Call",
      description: "Discuss project requirements",
      startTime: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T14:00:00",
      endTime: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0] + "T15:00:00",
      type: "meeting",
      color: "#3b82f6",
    },
  ],

  notes: [
    {
      id: "note-1",
      title: "Project Ideas",
      content:
        "1. Build a habit tracking app\n2. Create a meal planning system\n3. Develop a reading list manager\n4. Make a personal finance dashboard",
      color: "yellow",
      tags: ["ideas", "projects"],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "note-2",
      title: "Meeting Notes - Q1 Planning",
      content:
        "Key takeaways:\n- Focus on user retention\n- Improve onboarding flow\n- Add social features\n- Launch mobile app beta",
      color: "blue",
      tags: ["meetings", "planning"],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "note-3",
      title: "Book Recommendations",
      content:
        "- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- The Lean Startup by Eric Ries\n- Hooked by Nir Eyal",
      color: "green",
      tags: ["books", "learning"],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],

  goals: [
    {
      id: "goal-1",
      title: "Launch Product V2",
      description: "Complete and ship the next major version",
      targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      progress: 45,
      status: "active",
      milestones: [
        {
          id: "milestone-1",
          title: "Complete feature development",
          completed: true,
          completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "milestone-2",
          title: "Finish testing and QA",
          completed: false,
        },
        {
          id: "milestone-3",
          title: "Deploy to production",
          completed: false,
        },
      ],
    },
    {
      id: "goal-2",
      title: "Learn TypeScript",
      description: "Master TypeScript for better code quality",
      progress: 70,
      status: "active",
      milestones: [
        {
          id: "milestone-4",
          title: "Complete basic tutorials",
          completed: true,
          completedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "milestone-5",
          title: "Build a project with TypeScript",
          completed: true,
          completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "milestone-6",
          title: "Refactor existing projects",
          completed: false,
        },
      ],
    },
    {
      id: "goal-3",
      title: "Improve Fitness",
      description: "Exercise regularly and eat healthier",
      progress: 30,
      status: "active",
    },
  ],

  habits: [
    {
      id: "habit-1",
      name: "Morning Exercise",
      frequency: "daily",
      completedDates: [
        new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ],
      streak: 3,
      bestStreak: 7,
    },
    {
      id: "habit-2",
      name: "Read for 30 minutes",
      frequency: "daily",
      completedDates: [
        new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ],
      streak: 2,
      bestStreak: 5,
    },
    {
      id: "habit-3",
      name: "Journal",
      frequency: "daily",
      completedDates: [
        new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ],
      streak: 1,
      bestStreak: 14,
    },
    {
      id: "habit-4",
      name: "Weekly Planning",
      frequency: "weekly",
      completedDates: [
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ],
      streak: 1,
      bestStreak: 4,
    },
  ],

  focusSessions: [
    {
      id: "session-1",
      duration: 25,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      completed: true,
    },
    {
      id: "session-2",
      taskId: "task-2",
      duration: 50,
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
      completed: true,
    },
  ],
};

// Function to seed data
function seedProductivityBrain() {
  const keys = {
    tasks: "productivity-brain-tasks",
    events: "productivity-brain-events",
    notes: "productivity-brain-notes",
    goals: "productivity-brain-goals",
    habits: "productivity-brain-habits",
    focusSessions: "productivity-brain-focus-sessions",
  };

  Object.entries(keys).forEach(([key, storageKey]) => {
    localStorage.setItem(storageKey, JSON.stringify(seedData[key]));
  });

  console.log("✅ Seed data loaded successfully!");
  console.log("Refresh the page to see your data.");
}

// Instructions
console.log("🌱 Seed Data Ready!");
console.log("Run: seedProductivityBrain()");
console.log("To populate the app with example data.");

// Auto-export for use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { seedData, seedProductivityBrain };
}