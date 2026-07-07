import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import {
  createTask,
  generateTaskSuggestion,
  fetchHabitPresets,
} from "../../api/api";
import { FaCalendarAlt, FaMagic, FaSpinner, FaPlus } from "react-icons/fa";
import { getHabitIcon } from "../../utils/habitIcons";

const choices = ["High", "Medium", "Low"];
const QUICK_ADD_LIMIT = 8;

const getMinDateTime = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
  return tomorrow.toISOString().slice(0, 16);
};

export default function Main() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generating, setGenerating] = useState(false);
  const [addingHabit, setAddingHabit] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [habitPresets, setHabitPresets] = useState([]);
  const [presetsLoading, setPresetsLoading] = useState(true);

  const [showCustomHabit, setShowCustomHabit] = useState(false);
  const [customHabitName, setCustomHabitName] = useState("");
  const [customHabitTime, setCustomHabitTime] = useState("09:00");

  useEffect(() => {
    const loadPresets = async () => {
      try {
        const data = await fetchHabitPresets();
        setHabitPresets(data);
      } catch (err) {
        console.error("Failed to load habit presets:", err);
      } finally {
        setPresetsLoading(false);
      }
    };
    loadPresets();
  }, []);

  const quickAddPresets = habitPresets.slice(0, QUICK_ADD_LIMIT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await createTask({
        title,
        description,
        priority,
        due_date: dueDate || null,
      });
      setSuccess("Task added successfully!");
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate(getMinDateTime());
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(err.detail || "Failed to add task.");
    }
  };

  const handleGenerateWithAI = async () => {
    if (!title.trim()) {
      setError("Enter a task title first, then generate details with AI.");
      return;
    }
    setError("");
    setGenerating(true);
    try {
      const suggestion = await generateTaskSuggestion(title);
      if (suggestion.description && !description)
        setDescription(suggestion.description);
      if (suggestion.due_date && !dueDate)
        setDueDate(suggestion.due_date.slice(0, 16));
      if (suggestion.priority) setPriority(suggestion.priority);
    } catch (err) {
      setError(err.detail || "AI generation failed. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleAddHabit = async (preset) => {
    setError("");
    setSuccess("");
    setAddingHabit(preset.title);
    try {
      await createTask({
        title: preset.title,
        description: preset.description,
        priority: preset.default_priority || "Medium",
        is_habit: true,
        recurrence: preset.recurrence_type || "daily",
        recurrence_times: preset.suggested_times,
        due_date: null,
      });
      setSuccess(`"${preset.title}" added as a daily habit!`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(err.detail || `Failed to add ${preset.title}.`);
    } finally {
      setAddingHabit(null);
    }
  };

  const handleAddCustomHabit = async (e) => {
    e.preventDefault();
    if (!customHabitName.trim()) return;
    setError("");
    setSuccess("");
    setAddingHabit(customHabitName);
    try {
      await createTask({
        title: customHabitName,
        description: "",
        priority: "Medium",
        is_habit: true,
        recurrence: "daily",
        recurrence_times: [customHabitTime],
        due_date: null,
      });
      setSuccess(`"${customHabitName}" added as a daily habit!`);
      setCustomHabitName("");
      setCustomHabitTime("09:00");
      setShowCustomHabit(false);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(err.detail || "Failed to add habit.");
    } finally {
      setAddingHabit(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm font-semibold text-logo dark:text-white font-poppins">
            Quick add daily habits
          </h2>
          <Link
            to="/home/habits"
            className="text-xs sm:text-sm text-accent hover:underline font-medium whitespace-nowrap"
          >
            View all habits
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {presetsLoading ? (
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <FaSpinner className="animate-spin" size={12} /> Loading habits...
            </p>
          ) : quickAddPresets.length === 0 ? (
            <p className="text-xs text-gray-400">No presets available.</p>
          ) : (
            quickAddPresets.map((preset) => {
              const Icon = getHabitIcon(preset.category);
              const isLoading = addingHabit === preset.title;
              return (
                <button
                  key={preset.id || preset.title}
                  type="button"
                  onClick={() => handleAddHabit(preset)}
                  disabled={isLoading}
                  className="flex items-center gap-2 border border-border rounded-md px-3 py-2 text-xs sm:text-sm text-logo dark:text-white bg-white dark:bg-gray-800 hover:bg-accent/10 dark:hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {isLoading ? (
                    <FaSpinner
                      className="animate-spin text-accent shrink-0"
                      size={14}
                    />
                  ) : (
                    <Icon className="text-accent shrink-0" size={14} />
                  )}
                  <span className="truncate max-w-[120px] sm:max-w-none">
                    {preset.title}
                  </span>
                </button>
              );
            })
          )}

          <button
            type="button"
            onClick={() => setShowCustomHabit((v) => !v)}
            className="flex items-center gap-2 border border-dashed border-accent rounded-md px-3 py-2 text-xs sm:text-sm text-accent bg-transparent hover:bg-accent/10 transition-colors cursor-pointer"
          >
            <FaPlus size={12} className="shrink-0" />
            Custom habit
          </button>
        </div>

        {showCustomHabit && (
          <form
            onSubmit={handleAddCustomHabit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1 border border-border rounded-md p-2 bg-white dark:bg-gray-800"
          >
            <input
              type="text"
              placeholder="Call Mom, Meditate, etc."
              value={customHabitName}
              onChange={(e) => setCustomHabitName(e.target.value)}
              required
              className="flex-1 min-w-0 px-3 py-1.5 text-sm outline-none bg-transparent text-logo dark:text-white placeholder:text-gray-400 border border-border rounded-md focus:ring-1 focus:ring-accent"
            />
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={customHabitTime}
                onChange={(e) => setCustomHabitTime(e.target.value)}
                className="flex-1 sm:flex-none px-3 py-1.5 text-sm outline-none bg-transparent text-logo dark:text-white border border-border rounded-md focus:ring-1 focus:ring-accent [color-scheme:light] dark:[color-scheme:dark]"
              />
              <button
                type="submit"
                disabled={addingHabit === customHabitName}
                className="bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-md text-sm shrink-0 disabled:opacity-60"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGenerateWithAI}
            disabled={generating}
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 rounded-md font-outfit cursor-pointer transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
          >
            {generating ? (
              <>
                <FaSpinner className="animate-spin" size={14} /> Generating...
              </>
            ) : (
              <>
                <FaMagic size={14} /> Generate with AI
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-accent bg-transparent dark:bg-gray-800">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
            required
            className="px-3 sm:px-4 py-3 text-sm font-sans outline-none border-b border-border dark:border-content bg-transparent text-logo dark:text-white placeholder:text-gray-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={2}
            className="px-3 sm:px-4 py-2 text-sm font-sans outline-none resize-none bg-transparent text-logo dark:text-white placeholder:text-gray-400"
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {success && <p className="text-green-500 text-xs">{success}</p>}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-poppins cursor-pointer bg-transparent dark:bg-gray-800 text-logo dark:text-white w-full sm:w-auto"
          >
            {choices.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="relative flex-1 w-full">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <input
              type="datetime-local"
              value={dueDate}
              min={getMinDateTime()}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md pl-9 pr-3 py-2 text-sm font-sans cursor-pointer w-full bg-transparent dark:bg-gray-800 text-logo dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>

          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-md font-outfit cursor-pointer transition-colors shrink-0 w-full sm:w-auto"
          >
            Add task
          </button>
        </div>
      </form>

      <Cards key={refreshKey} />
    </div>
  );
}
