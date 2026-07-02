import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TaskList() {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const token =
        localStorage.getItem("access") || sessionStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/tasks/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  // Filter tasks based on search — replace `tasks` with your actual task list
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="flex flex-col bg-secondary dark:bg-secondary min-h-full">
      {/* Topbar */}
      <div className="flex justify-between items-center py-3 px-8 bg-secondary dark:bg-gray-800 shadow-md dark:border-gray-700 sticky top-0 z-10 shrink-0">
        {/* Left */}
        <h1 className="font-medium text-xl text-logo dark:text-white font-poppins">
          Task lists
        </h1>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 h-9 w-72 border border-border dark:border-gray-600 rounded-md bg-secondary/40 dark:bg-gray-700 hover:border-gray-400 transition-colors focus-within:ring-1 focus-within:ring-accent focus-within:border-accent">
          <input
            type="text"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm text-logo dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-400"
          />
          <FaSearch className="text-gray-400 dark:text-gray-300 text-sm shrink-0" />
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 p-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-gray-400 text-sm text-center mt-10">Loading...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-10">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-primary/20 dark:bg-gray-800 border border-border rounded-md px-4 py-3 flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-medium text-logo dark:text-white">
                  {task.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{task.description}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  task.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
