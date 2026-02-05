# Personal Productivity Brain 🧠

An AI-powered productivity application built with [Tambo](https://tambo.co) that uses **Generative UI** to dynamically render the right interface based on your natural language requests.

## 🌟 Features

### Smart Component Rendering
The AI decides which components to show you based on what you ask for:
- **Task Management**: Lists, Kanban boards, statistics
- **Time Management**: Calendar, time blocks, focus timer
- **Note Taking**: Quick notes and organized grids
- **Goal Tracking**: Progress visualization and milestones
- **Habit Building**: Streak tracking and daily checkoffs
- **Analytics**: Productivity reports and charts

### Generative vs Interactable
- **Generative Components**: Rendered once (charts, reports, summaries)
- **Interactable Components**: Persistent and updateable (tasks, notes, calendar)

### Local Tools
The AI can execute browser-side functions to:
- Add, update, and delete tasks
- Schedule calendar events
- Create notes
- Analyze productivity metrics
- Suggest optimal focus times

## 🚀 Getting Started

### Prerequisites
- Node.js 22+ and npm 11+
- A Tambo API key (get one at [tambo.co](https://tambo.co))

### Installation

1. **Clone and Install**
```bash
git clone <your-repo>
cd productivity-brain
npm install
```

2. **Configure Tambo**
```bash
# Option 1: Use Tambo Cloud (easiest)
npx tambo init
# Follow prompts and select "Tambo Cloud"

# Option 2: Self-hosted
npx tambo init
# Select "Self-hosted" and follow Docker setup
```

3. **Set Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Tambo API key
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key_here
```

4. **Run Development Server**
```bash
npm run dev
```

5. **Open Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

### Tambo Architecture

**Components** are registered with descriptions and Zod schemas:
```typescript
{
  name: "TaskList",
  description: "Displays tasks in list format",
  component: TaskList,
  propsSchema: z.object({
    filterStatus: z.enum(["all", "todo", "in-progress", "done"]).optional(),
  }),
}
```

**Tools** are functions the AI can call:
```typescript
{
  name: "add-task",
  description: "Creates a new task",
  tool: (params) => storage.addTask(params),
  toolSchema: z.function().args(...).returns(...),
}
```

The AI reads your message, decides which components and tools to use, and renders the appropriate UI.

## 💡 Example Interactions

Try these prompts:

### Task Management
- "Show me my tasks for today"
- "Add a high priority task to review the quarterly report"
- "Display tasks in a Kanban board"
- "Show me statistics about my tasks this week"

### Time Management
- "Show my calendar for this week"
- "Start a 25-minute focus session for coding"
- "Suggest optimal times for deep work today"
- "Create a time-blocked schedule for tomorrow"

### Notes & Ideas
- "Create a note about feature ideas for the app"
- "Show all my notes tagged with 'project'"

### Goals & Habits
- "Track my progress on active goals"
- "Show my habit tracker"
- "Generate a weekly plan with priorities"

### Analytics
- "Analyze my productivity this week"
- "Show a chart of my focus time for the month"
- "Create a productivity report for today"

## 🏗️ Project Structure

```
productivity-brain/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Main chat interface
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/          # All UI components
│   │   ├── TaskList.tsx
│   │   ├── TaskBoard.tsx
│   │   ├── Calendar.tsx
│   │   ├── FocusTimer.tsx
│   │   └── ... (13 total)
│   ├── lib/
│   │   ├── tambo.ts        # Tambo configuration
│   │   └── storage.ts      # LocalStorage utilities
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Component Library

### Task Components
- `TaskList` - List view with filters
- `TaskBoard` - Kanban board
- `TaskStats` - Analytics dashboard

### Time Components
- `Calendar` - Month/week/day views
- `TimeBlocks` - Hourly schedule
- `FocusTimer` - Pomodoro timer

### Content Components
- `NoteCard` - Individual note
- `NotesGrid` - All notes view
- `GoalTracker` - Goal progress
- `HabitTracker` - Habit streaks

### Analytics Components
- `ProductivityReport` - Comprehensive report
- `ProgressChart` - Data visualization
- `WeeklyPlanner` - AI-generated plan

## 🔧 Customization

### Adding New Components

1. **Create Component** in `src/components/`
```typescript
export default function MyComponent({ prop1, prop2 }: MyProps) {
  return <div>...</div>;
}
```

2. **Register in Tambo** in `src/lib/tambo.ts`
```typescript
{
  name: "MyComponent",
  description: "What it does and when to use it",
  component: MyComponent,
  propsSchema: z.object({
    prop1: z.string(),
    prop2: z.number().optional(),
  }),
}
```

### Adding New Tools

```typescript
{
  name: "my-tool",
  description: "What this tool does",
  tool: (params) => {
    // Your logic here
    return result;
  },
  toolSchema: z.function().args(...).returns(...),
}
```

## 📦 Storage

Data is stored in `localStorage`:
- Tasks: `productivity-brain-tasks`
- Events: `productivity-brain-events`
- Notes: `productivity-brain-notes`
- Goals: `productivity-brain-goals`
- Habits: `productivity-brain-habits`
- Focus Sessions: `productivity-brain-focus-sessions`

To implement backend storage:
1. Replace functions in `src/lib/storage.ts`
2. Use your preferred backend (Supabase, Firebase, etc.)
3. Update tool implementations to use async functions

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Build the production app:
```bash
npm run build
npm run start
```

Deploy the `.next` folder to your platform of choice.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional productivity components
- Backend integration
- Mobile responsiveness
- Accessibility enhancements
- More AI tool integrations

## 📝 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Built with [Tambo](https://tambo.co) - Generative UI SDK
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)

## 📚 Resources

- [Tambo Documentation](https://docs.tambo.co)
- [Tambo GitHub](https://github.com/tambo-ai/tambo)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ❤️ using Generative UI**