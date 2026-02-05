"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock, AlertCircle, Trash2, Edit } from "lucide-react";
import * as storage from "@/lib/storage";
import { Task } from "@/types";

interface TaskListProps {
  filterStatus?: "all" | "todo" | "in-progress" | "done";
  filterPriority?: "all" | "low" | "medium" | "high";
  sortBy?: "dueDate" | "priority" | "createdAt";
}

export default function TaskList({
  filterStatus = "all",
  filterPriority = "all",
  sortBy = "createdAt",
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
    
    // Listen for storage changes
    const handleStorageChange = () => loadTasks();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadTasks = () => {
    let filtered = storage.getTasks();

    // Apply filters
    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }
    if (filterPriority !== "all") {
      filtered = filtered.filter((t) => t.priority === filterPriority);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "createdAt":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    setTasks(filtered);
  };

  const handleToggleStatus = (task: Task) => {
    const newStatus =
      task.status === "done"
        ? "todo"
        : task.status === "todo"
        ? "in-progress"
        : "done";
    storage.updateTask(task.id, {
      status: newStatus,
      completedAt: newStatus === "done" ? new Date().toISOString() : undefined,
    });
    loadTasks();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      storage.deleteTask(id);
      loadTasks();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-2">
          <AlertCircle className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-gray-600">No tasks found</p>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your filters or create a new task
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Task List</h3>
        <p className="text-sm text-gray-600">{tasks.length} tasks</p>
      </div>

      <div className="divide-y">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => handleToggleStatus(task)}
                className="mt-1 hover:scale-110 transition-transform"
              >
                {getStatusIcon(task.status)}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4
                    className={`font-medium ${
                      task.status === "done"
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  {task.dueDate && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}

                  {task.estimatedTime && (
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                      ~{task.estimatedTime}m
                    </span>
                  )}

                  {task.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}