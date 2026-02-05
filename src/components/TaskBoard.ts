"use client";

import { useEffect, useState } from "react";
import { Circle, Clock, CheckCircle2, Trash2 } from "lucide-react";
import * as storage from "@/lib/storage";
import { Task } from "@/types";

interface TaskBoardProps {
  filterPriority?: "all" | "low" | "medium" | "high";
}

export default function TaskBoard({ filterPriority = "all" }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
    
    const handleStorageChange = () => loadTasks();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadTasks = () => {
    let filtered = storage.getTasks();
    if (filterPriority !== "all") {
      filtered = filtered.filter((t) => t.priority === filterPriority);
    }
    setTasks(filtered);
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((t) => t.status === status);
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    storage.updateTask(taskId, {
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
        return "border-l-4 border-l-red-500";
      case "medium":
        return "border-l-4 border-l-amber-500";
      case "low":
        return "border-l-4 border-l-green-500";
      default:
        return "border-l-4 border-l-gray-300";
    }
  };

  const columns = [
    {
      status: "todo" as const,
      title: "To Do",
      icon: <Circle className="w-5 h-5" />,
      color: "bg-gray-100",
    },
    {
      status: "in-progress" as const,
      title: "In Progress",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-blue-100",
    },
    {
      status: "done" as const,
      title: "Done",
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">Task Board</h3>
        <p className="text-sm text-gray-600">{tasks.length} total tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          return (
            <div key={column.status} className="flex flex-col">
              <div
                className={`${column.color} rounded-t-lg p-3 flex items-center justify-between`}
              >
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h4 className="font-semibold text-gray-800">
                    {column.title}
                  </h4>
                </div>
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                  {columnTasks.length}
                </span>
              </div>

              <div className="bg-white rounded-b-lg min-h-[300px] p-2 space-y-2">
                {columnTasks.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">No tasks</p>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-sm text-gray-800">
                          {task.title}
                        </h5>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {task.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-1">
                        {column.status !== "todo" && (
                          <button
                            onClick={() => handleStatusChange(task.id, "todo")}
                            className="flex-1 text-xs py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            ← To Do
                          </button>
                        )}
                        {column.status !== "in-progress" && (
                          <button
                            onClick={() =>
                              handleStatusChange(task.id, "in-progress")
                            }
                            className="flex-1 text-xs py-1 px-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                          >
                            In Progress
                          </button>
                        )}
                        {column.status !== "done" && (
                          <button
                            onClick={() => handleStatusChange(task.id, "done")}
                            className="flex-1 text-xs py-1 px-2 bg-green-100 hover:bg-green-200 rounded transition-colors"
                          >
                            Done →
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}