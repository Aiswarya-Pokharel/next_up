import { useState, useEffect } from "react";
import { fetchHabitCalendar } from "../../api/api"; // add this API function

export default function HabitCalendar({ taskId, days = 30 }) {
  const [completedDates, setCompletedDates] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHabitCalendar(taskId, days);
        setCompletedDates(new Set(data.completed_dates));
      } catch (err) {
        console.error("Failed to load habit calendar:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [taskId, days]);

  if (loading) {
    return <p className="text-xs text-gray-400">Loading calendar...</p>;
  }

  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    cells.push({ date: iso, done: completedDates.has(iso) });
  }

  return (
    <div className="flex flex-wrap gap-1">
      {cells.map((cell) => (
        <div
          key={cell.date}
          title={cell.date}
          className={`w-3.5 h-3.5 rounded-sm ${
            cell.done ? "bg-accent" : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}