import { useEffect, useState } from "react";
import * as storage from "@/lib/storage";
import { Habit } from "@/types";
import { Flame, CheckCircle2, Circle } from "lucide-react";
import { format, subDays, isSameDay } from "date-fns";

export default function HabitTracker({ view = "grid", filterFrequency = "all" }: {
  view?: "grid" | "list" | "calendar";
  filterFrequency?: "all" | "daily" | "weekly";
}) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    loadHabits();
    const handler = () => loadHabits();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [filterFrequency]);

  const loadHabits = () => {
    let filtered = storage.getHabits();
    if (filterFrequency !== "all") filtered = filtered.filter(h => h.frequency === filterFrequency);
    setHabits(filtered);
  };

  const toggleHabit = (habitId: string, date: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const completedDates = [...habit.completedDates];
    const index = completedDates.indexOf(date);

    if (index > -1) {
      completedDates.splice(index, 1);
    } else {
      completedDates.push(date);
    }

    // Recalculate streak
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const checkDate = format(subDays(today, i), "yyyy-MM-dd");
      if (completedDates.includes(checkDate)) {
        streak++;
      } else {
        break;
      }
    }

    storage.updateHabit(habitId, {
      completedDates,
      streak,
      bestStreak: Math.max(streak, habit.bestStreak),
    });
    loadHabits();
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i)).reverse();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Habit Tracker</h3>

      {habits.length === 0 ? (
        <div className="text-center py-12">
          <Flame className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600">No habits tracked yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{habit.name}</h4>
                    <p className="text-xs text-gray-600">{habit.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">{habit.streak}</p>
                  <p className="text-xs text-gray-600">day streak</p>
                </div>
              </div>

              <div className="flex gap-2">
                {last7Days.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const isCompleted = habit.completedDates.includes(dateStr);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <button
                      key={dateStr}
                      onClick={() => toggleHabit(habit.id, dateStr)}
                      className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                        isCompleted
                          ? "bg-green-500 border-green-600 text-white"
                          : isToday
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="text-xs font-semibold">{format(day, "EEE")}</p>
                      <p className="text-xs">{format(day, "d")}</p>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-1" />
                      ) : (
                        <Circle className="w-4 h-4 mx-auto mt-1 text-gray-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Best streak: {habit.bestStreak} days
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}