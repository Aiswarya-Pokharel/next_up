import { useState } from "react";

const choices = ["High", "Medium", "Low"];

export default function Main() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, priority, due_date: dueDate });
  };

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              name="task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task"
              className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm flex-1 font-sans"
            />

            <select
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-poppins cursor-pointer"
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
              className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-sans cursor-pointer"
            />

            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-md font-outfit cursor-pointer hover:bg-accent-hover transition-colors"
            >
              Add task
            </button>
          </div>

          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={2}
            className="border border-border focus:outline-none focus:ring-1 focus:ring-accent rounded-md px-3 py-2 text-sm font-sans resize-none"
          />
        </form>
      </section>
    </div>
  );
}
