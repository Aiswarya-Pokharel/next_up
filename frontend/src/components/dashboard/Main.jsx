// import { useState } from "react";
// import Cards from "./Cards";

// const choices = ["High", "Medium", "Low"];

// export default function Main() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ title, description, priority, due_date: dueDate });
//   };

//   return (
//     <div className="p-6 flex flex-col gap-4">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         {/* Main input box */}
//         <div className="flex flex-col border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-accent bg-white dark:bg-gray-800">
//           <input
//             type="text"
//             name="task"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Add a new task"
//             className="px-4 py-3 text-sm font-sans outline-none border-b border-border bg-transparent text-logo dark:text-white placeholder:text-gray-400"
//           />
//           <textarea
//             name="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Add a description (optional)"
//             rows={2}
//             className="px-4 py-2 text-sm font-sans outline-none resize-none bg-transparent text-logo dark:text-white placeholder:text-gray-400"
//           />
//         </div>

//         {/* Controls row */}
//         <div className="flex items-center gap-2">
//           <select
//             name="priority"
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-poppins cursor-pointer bg-white dark:bg-gray-800 text-logo dark:text-white"
//           >
//             {choices.map((choice) => (
//               <option key={choice} value={choice}>
//                 {choice}
//               </option>
//             ))}
//           </select>

//           <input
//             type="datetime-local"
//             name="due_date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-sans cursor-pointer flex-1 bg-white dark:bg-gray-800 text-logo dark:text-white"
//           />

//           <button
//             type="submit"
//             className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-md font-outfit cursor-pointer transition-colors shrink-0"
//           >
//             Add task
//           </button>
//         </div>
//       </form>

//       {/* Cards */}
//       <Cards />
//     </div>
//   );
// }

import { useState } from "react";
import Cards from "./Cards";

const choices = ["High", "Medium", "Low"];

export default function Main() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token =
      localStorage.getItem("access") || sessionStorage.getItem("access");
    if (!token) {
      setError("You must be logged in to add a task.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          due_date: dueDate || null,
        }),
      });

      if (res.ok) {
        setSuccess("Task added successfully!");
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setDueDate("");
      } else {
        const data = await res.json();
        setError(data?.detail || "Failed to add task.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Main input box */}
        <div className="flex flex-col border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-accent bg-transparent dark:bg-gray-800">
          <input
            type="text"
            name="task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
            required
            className="px-4 py-3 text-sm font-sans outline-none border-b border-border dark:border-content bg-transparent text-logo dark:text-white placeholder:text-gray-400"
          />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={2}
            className="px-4 py-2 text-sm font-sans outline-none resize-none bg-transparent text-logo dark:text-white placeholder:text-gray-400"
          />
        </div>

        {/* Error / success messages */}
        {error && <p className="text-red-500 text-xs">{error}</p>}
        {success && <p className="text-green-500 text-xs">{success}</p>}

        {/* Controls row */}
        <div className="flex items-center gap-2">
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-poppins cursor-pointer bg-transparent dark:bg-gray-800 text-logo dark:text-white"
          >
            {choices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="due_date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-sans cursor-pointer flex-1 bg-transparent dark:bg-gray-800 text-logo dark:text-white"
          />

          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-white px-5 py-2 rounded-md font-outfit cursor-pointer transition-colors shrink-0"
          >
            Add task
          </button>
        </div>
      </form>

      <Cards />
    </div>
  );
}
