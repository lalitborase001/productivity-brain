"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import * as storage from "@/lib/storage";
import { Task } from "@/types";
import { isToday, isThisWeek, isThisMonth } from "date-fns";

interface TaskStatsProps {
  period?: "today" | "week" | "month" | "all";
}

export default function TaskStats({ period = "all" }: TaskStatsProps) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    todo: 0,
    byPriority: { high: 0, medium: 0, low: 0 },
    completionRate: 0,
    overdue: 0,
  });

  useEffect(() => {
    calculateStats();
    
    const handleStorageChange = () => calculateStats();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [period]);

  const calculateStats = () => {
    let tasks = storage.getTasks();

    // Filter by period
    if (period !== "all") {
      tasks = tasks.filter((task) => {
        const date = new Date(task.createdAt);
        switch (period) {
          case "today":
            return isToday(date);
          case "week":
            return isThisWeek(date);
          case "month":
            return isThisMonth(date);
          default:
            return true;
        }
      });
    }

    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const todo = tasks.filter((t) => t.status === "todo").length;

    const byPriority = {
      high: tasks.filter((t) => t.priority === "high" && t.status !== "done")
        .length,
      medium: tasks.filter((t) => t.priority === "medium" && t.status !== "done")
        .length,
      low: tasks.filter((t) => t.priority === "low" && t.status !== "done")
        .length,
    };

    const overdue = tasks.filter((t) => {
      if (!t.dueDate || t.status === "done") return false;
      return new Date(t.dueDate) < new Date();
    }).length;

    const completionRate = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;

    setStats({
      total: tasks.length,
      completed,
      inProgress,
      todo,
      byPriority,
      completionRate: Math.round(completionRate),
      overdue,
    });
  };

  const getPeriodLabel = () => {
    switch (period) {
      case "today":
        return "Today";
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      default:
        return "All Time";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-1">Task Statistics</h3>
        <p className="text-indigo-100">{getPeriodLabel()}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Total</span>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 text-sm">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.completed}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700 text-sm">In Progress</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.inProgress}</p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-700 text-sm">To Do</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-700">{stats.todo}</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Completion Rate</h4>
            <span className="text-2xl font-bold text-green-600">
              {stats.completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>

        {/* Priority Breakdown */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">
            Active Tasks by Priority
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-700">High Priority</span>
              <span className="text-2xl font-bold text-red-600">
                {stats.byPriority.high}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <span className="font-medium text-amber-700">Medium Priority</span>
              <span className="text-2xl font-bold text-amber-600">
                {stats.byPriority.medium}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-700">Low Priority</span>
              <span className="text-2xl font-bold text-green-600">
                {stats.byPriority.low}
              </span>
            </div>
          </div>
        </div>

        {/* Overdue Alert */}
        {stats.overdue > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">
                  {stats.overdue} Overdue Task{stats.overdue > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-red-600">
                  Tasks past their due date need attention
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}