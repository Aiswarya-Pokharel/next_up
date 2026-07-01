import { FaSearch } from "react-icons/fa";

export default function TaskList() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-secondary">
      {/* Topbar */}
      <div className="flex justify-between items-center py-3 px-8  shadow-md sticky top-0 z-10 shrink-0">
        {/* Left */}
        <h1 className="font-medium text-xl text-gray-800 font-poppins">
          Task lists
        </h1>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 h-9 w-90  border  border-primary rounded-md hover:border-gray-400 transition-colors focus-within:ring-1 focus-within:ring-accent focus-within:border-accent">
          <input
            type="text"
            placeholder="Search tasks…"
            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-gray-500"
          />
          <FaSearch className="text-gray-500 text-sm shrink-0" />
        </div>
      </div>
    </div>
  );
}
