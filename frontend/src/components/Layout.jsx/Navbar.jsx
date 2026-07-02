import User from "../../hooks/useUser";
import DarkModeToggle from "../DarkModeToggle";

export default function Navbar() {
  const user = User();
  return (
    <div>
      <nav className="flex justify-between items-center py-2 px-8 bg-navbar dark:bg-gray-900 shadow-md sticky top-0 z-10 shrink-0">
        {/* Logo — always white on navbar */}
        <h2 className="font-logo font-bold text-lg italic text-white cursor-pointer">
          NextUp
        </h2>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {/* Avatar */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
                <div className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm font-medium">
                  {user.username}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
          )}
        </div>
      </nav>
    </div>
  );
}
