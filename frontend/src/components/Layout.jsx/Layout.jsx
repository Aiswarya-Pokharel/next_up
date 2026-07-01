import Navbar from "./Navbar";
import Slide from "./Slide";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar — always visible */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — always visible */}
        <div className="w-64 bg-navbar h-full overflow-y-auto shrink-0">
          <Slide />
        </div>

        {/* Page content changes here */}
        <div className="bg-secondary flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
