import { Link, useNavigate } from "react-router-dom";
import User from "../../hooks/useUser";
import { useState } from "react";
import { FaHome, FaTasks, FaSignOutAlt } from "react-icons/fa";

export default function Slide() {
  const user = User();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const leftbars = [
    { title: "Dashboard", path: "/home", icon: <FaHome /> },
    { title: "My Tasks", path: "/home/tasks", icon: <FaTasks /> },
  ];

  const handleLogout = async () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <div className="bg-accent dark:bg-secondary  text-white font-poppins h-full flex flex-col">
      {/* ---------------------Username-------------------------- */}
      <div className="flex items-center gap-3 border-border border-b pb-4">
        {user ? (
          <div className="flex items-center px-4 py-1.5 m-auto mt-3 rounded-full bg-white/15 border border-white/20">
            <span className="text-white text-sm font-medium">
              {user.username}
            </span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full m-auto bg-white/20 animate-pulse" />
        )}
      </div>

      <div className="border border-border dark:border-content w-full"></div>

      {/* ---------------------SideBar Lists-------------------------- */}
      <ul className="flex flex-col gap-1 p-4">
        {leftbars.map((item) => (
          <li key={item.title}>
            <Link
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent-hover/60 transition-colors"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full h-px border border-border dark:border-content"></div>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 px-3 py-2 mx-4 mt-auto mb-4 rounded-md hover:bg-white/10 transition-colors text-left"
      >
        <FaSignOutAlt size={18} />
        <span className="text-red-600 font-semibold text-lg">Log out</span>
      </button>

      {/* Logout confirmation modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-secondary rounded-lg shadow-lg p-6 w-full max-w-xs mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-logo font-semibold text-base text-center mb-2">
              Log out
            </h3>
            <p className="text-content text-center text-sm mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-md border border-border dark:border-content text-content text-sm hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
