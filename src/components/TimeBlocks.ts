"use client";

// TimeBlocks Component
import { useState, useEffect } from "react";
import * as storage from "@/lib/storage";
import { format } from "date-fns";

interface TimeBlocksProps {
  date?: string;
  suggestedBlocks?: Array<{
    startTime: string;
    endTime: string;
    title: string;
    type: "focus" | "meeting" | "break" | "task";
  }>;
}

export function TimeBlocks({ date, suggestedBlocks = [] }: TimeBlocksProps) {
  const targetDate = date || format(new Date(), "yyyy-MM-dd");
  const [events, setEvents] = useState(storage.getEvents());

  useEffect(() => {
    const handleStorage = () => setEvents(storage.getEvents());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const todayEvents = events.filter((e) =>
    e.startTime.startsWith(targetDate)
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventColor = (type: string) => {
    const colors = {
      meeting: "bg-blue-500",
      focus: "bg-purple-500",
      break: "bg-green-500",
      task: "bg-amber-500",
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Time Blocks - {targetDate}</h3>

      <div className="space-y-1">
        {hours.map((hour) => {
          const hourStr = hour.toString().padStart(2, "0");
          const blockEvents = todayEvents.filter((e) => {
            const eventHour = new Date(e.startTime).getHours();
            return eventHour === hour;
          });

          return (
            <div key={hour} className="flex gap-2 items-center">
              <div className="w-16 text-sm text-gray-600">{hourStr}:00</div>
              <div className="flex-1 h-12 border rounded relative">
                {blockEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`absolute inset-y-1 left-1 right-1 rounded p-1 text-white text-xs ${getEventColor(
                      event.type
                    )}`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {suggestedBlocks.length > 0 && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-semibold mb-2">AI Suggestions</h4>
          {suggestedBlocks.map((block, i) => (
            <div key={i} className="text-sm text-gray-700">
              {block.startTime} - {block.endTime}: {block.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeBlocks;