"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import * as storage from "@/lib/storage";
import { CalendarEvent } from "@/types";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";

interface CalendarProps {
  view?: "day" | "week" | "month";
  date?: string;
}

export default function Calendar({ view = "month", date }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(
    date ? new Date(date) : new Date()
  );

  useEffect(() => {
    loadEvents();
    
    const handleStorageChange = () => loadEvents();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadEvents = () => {
    setEvents(storage.getEvents());
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startTime), day)
    );
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500";
      case "focus":
        return "bg-purple-500";
      case "break":
        return "bg-green-500";
      case "task":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={today}
              className="px-4 py-2 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded" />
            <span>Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded" />
            <span>Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-400 rounded" />
            <span>Tasks</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border rounded-lg ${
                  isCurrentMonth ? "bg-white" : "bg-gray-50"
                } ${isToday ? "ring-2 ring-indigo-500" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday
                      ? "bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
                      : isCurrentMonth
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {format(day, "d")}
                </div>

                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate text-white ${getEventColor(
                        event.type
                      )}`}
                      title={event.title}
                    >
                      {format(new Date(event.startTime), "HH:mm")} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}