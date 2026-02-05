"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import * as storage from "@/lib/storage";

interface FocusTimerProps {
  duration?: number;
  taskId?: string;
  taskTitle?: string;
}

export default function FocusTimer({
  duration = 25,
  taskId,
  taskTitle,
}: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<string | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);

    // Save focus session
    if (startTimeRef.current) {
      storage.addFocusSession({
        taskId,
        duration,
        startTime: startTimeRef.current,
        endTime: new Date().toISOString(),
        completed: true,
      });
    }

    // Play completion sound (if browser allows)
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUgwKT6Xh8bllHAU2jdXzzn0vBSF1xe/glEYLEmCx6OyrWBUIQ53e8sFuIwUuhM/z1YU2Bhxqvu7mnFINDlOo5O+zYBoGPJPY88p3LAUme8rx3I4+CRZiturqpVQMCk6j4PG8aB8GM4nU8tGAMQYfcsLu45ZPDAxPouPwuWYdBTaN1vPPgDAFIXPD7+OWTgwMUKPj8LlnHQU2jNXzz38wBSJzw+/jlU4LDFGi4/C5aB0FNo3V88+AMAUhc8Pv45VPDQ1SpOTwtmgcBjiP1fLPfzAFInPD7eSVTQwNUaPk77ZnHAY4j9Xyz4AwBSF0w+3klEwMDlKk5O+2ZxwGOI/V8s+AMAUhc8Tt5JRMCw5TpOTvt2YcBjiP1vLOgDAFIXLE7eSUTAsOU6Xk77dmHAU5j9byz38wBSF0xO7klEwLDlOl5O+3ZhwFOI/W8s5/MAUgdMTu5JRMCw5TpeTvt2YbBTiP1vLOfzAFIHTE7uSUTAsOUqXj77dmHAU4j9byzn8wBSB0xO7klEsLDlKl4++3ZRwFOI/W8s5/MAUgdMPu5JRMCw5SpeP"
      );
      audio.play();
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  };

  const handleStart = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = new Date().toISOString();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setIsCompleted(false);
    startTimeRef.current = null;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Focus Timer</h3>
        {taskTitle && (
          <p className="text-sm text-gray-600">Working on: {taskTitle}</p>
        )}
      </div>

      {/* Circular Progress */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke={isCompleted ? "#10b981" : "#8b5cf6"}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${
              2 * Math.PI * 120 * (1 - progress / 100)
            }`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isCompleted ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-800">Complete!</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 font-mono">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {isRunning ? "Focus Mode Active" : "Ready to Focus"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isCompleted && (
          <>
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            )}
          </>
        )}

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-white rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          💡 Tip: Stay focused for {duration} minutes. Take a short break after!
        </p>
      </div>
    </div>
  );
}