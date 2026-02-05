import { TrendingUp, Target, Zap, Award } from "lucide-react";

export default function ProductivityReport({ period, insights = [], recommendations = [], metrics }: {
  period: "today" | "week" | "month";
  insights?: string[];
  recommendations?: string[];
  metrics?: { tasksCompleted: number; focusTime: number; goalProgress: number; habitStreak: number };
}) {
  const defaultMetrics = metrics || { tasksCompleted: 0, focusTime: 0, goalProgress: 0, habitStreak: 0 };

  const getPeriodLabel = () => {
    switch (period) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg shadow-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-2">Productivity Report</h2>
      <p className="text-indigo-200 mb-8">{getPeriodLabel()}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <CheckCircle2 className="w-8 h-8 mb-2 text-green-300" />
          <p className="text-sm text-indigo-200">Tasks Done</p>
          <p className="text-3xl font-bold">{defaultMetrics.tasksCompleted}</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <Zap className="w-8 h-8 mb-2 text-yellow-300" />
          <p className="text-sm text-indigo-200">Focus Time</p>
          <p className="text-3xl font-bold">{defaultMetrics.focusTime}m</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <Target className="w-8 h-8 mb-2 text-blue-300" />
          <p className="text-sm text-indigo-200">Goal Progress</p>
          <p className="text-3xl font-bold">{defaultMetrics.goalProgress}%</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
          <Award className="w-8 h-8 mb-2 text-purple-300" />
          <p className="text-sm text-indigo-200">Habit Streak</p>
          <p className="text-3xl font-bold">{defaultMetrics.habitStreak}</p>
        </div>
      </div>

      {insights.length > 0 && (
        <div className="bg-white/10 rounded-lg p-6 mb-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Insights
          </h3>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-indigo-100">
                <span className="text-yellow-300">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
          <h3 className="text-xl font-bold mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-indigo-100">
                <span className="text-green-300">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CheckCircle2({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}