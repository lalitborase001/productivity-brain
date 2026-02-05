import { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as storage from "@/lib/storage";
import { TrendingUp } from "lucide-react";

export default function ProgressChart({ type, period = "week", chartType = "line" }: {
  type: "tasks" | "focus" | "goals" | "habits";
  period?: "week" | "month" | "quarter" | "year";
  chartType?: "line" | "bar" | "area";
}) {
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);

  useEffect(() => {
    generateData();
  }, [type, period]);

  const generateData = () => {
    // Simplified data generation
    const dataPoints = period === "week" ? 7 : period === "month" ? 30 : period === "quarter" ? 90 : 365;
    const mockData = Array.from({ length: Math.min(dataPoints, 30) }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
    }));
    setData(mockData);
  };

  const getTitle = () => {
    const titles = {
      tasks: "Tasks Completed",
      focus: "Focus Time (minutes)",
      goals: "Goal Progress (%)",
      habits: "Habit Completion",
    };
    return titles[type];
  };

  const ChartComponent = chartType === "bar" ? BarChart : chartType === "area" ? AreaChart : LineChart;
  const DataComponent = chartType === "bar" ? Bar : chartType === "area" ? Area : Line;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800">{getTitle()}</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <DataComponent type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" />
        </ChartComponent>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Showing {period} data for {getTitle().toLowerCase()}
        </p>
      </div>
    </div>
  );
}