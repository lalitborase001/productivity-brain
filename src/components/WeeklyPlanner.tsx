import { Calendar, CheckCircle2 } from "lucide-react";
import { format, startOfWeek, addDays } from "date-fns";

export default function WeeklyPlanner({ weekStartDate, priorities = [], scheduledTasks = [] }: {
  weekStartDate?: string;
  priorities?: string[];
  scheduledTasks?: Array<{ day: string; taskId: string; taskTitle: string; timeSlot: string }>;
}) {
  const startDate = weekStartDate ? new Date(weekStartDate) : startOfWeek(new Date());
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-8 h-8 text-indigo-600" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Weekly Planner</h3>
          <p className="text-sm text-gray-600">
            {format(startDate, "MMM d")} - {format(days[6], "MMM d, yyyy")}
          </p>
        </div>
      </div>

      {priorities.length > 0 && (
        <div className="mb-6 p-4 bg-white rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">This Week's Priorities</h4>
          <ul className="space-y-1">
            {priorities.map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((day) => {
          const dayStr = format(day, "yyyy-MM-dd");
          const dayTasks = scheduledTasks.filter(t => t.day === dayStr);

          return (
            <div key={dayStr} className="bg-white rounded-lg p-3">
              <div className="text-center mb-2">
                <p className="text-xs text-gray-600">{format(day, "EEE")}</p>
                <p className="text-lg font-bold text-gray-800">{format(day, "d")}</p>
              </div>
              <div className="space-y-1">
                {dayTasks.map((task, i) => (
                  <div key={i} className="text-xs p-2 bg-indigo-100 rounded">
                    <p className="font-semibold text-indigo-800">{task.timeSlot}</p>
                    <p className="text-indigo-600">{task.taskTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}