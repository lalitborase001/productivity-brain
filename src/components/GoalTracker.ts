import { useEffect, useState } from "react";
import * as storage from "@/lib/storage";
import { Goal } from "@/types";
import { Target, CheckCircle2, Clock, Pause } from "lucide-react";

export default function GoalTracker({ filterStatus = "all", showMilestones = true }: {
  filterStatus?: "all" | "active" | "completed" | "paused";
  showMilestones?: boolean;
}) {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    loadGoals();
    const handler = () => loadGoals();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [filterStatus]);

  const loadGoals = () => {
    let filtered = storage.getGoals();
    if (filterStatus !== "all") filtered = filtered.filter(g => g.status === filterStatus);
    setGoals(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "paused": return <Pause className="w-5 h-5 text-amber-600" />;
      default: return <Target className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Goals</h3>
      {goals.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No goals found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(goal.status)}
                  <h4 className="font-semibold text-lg text-gray-800">{goal.title}</h4>
                </div>
                <span className="text-sm text-gray-600">{goal.progress}%</span>
              </div>

              {goal.description && (
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
              )}

              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {showMilestones && goal.milestones && goal.milestones.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600">Milestones:</p>
                  {goal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-2 text-sm">
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={milestone.completed ? "line-through text-gray-400" : "text-gray-700"}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {goal.targetDate && (
                <p className="text-xs text-gray-500 mt-3">
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}