import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaSignOutAlt } from "react-icons/fa";

export default function Slide() {
  // const { logout } = useAuth();
  const navigate = useNavigate();

  const leftbars = [
    { title: "Home", path: "/home", icon: <FaHome /> },
    { title: "Task List", path: "/tasks", icon: <FaTasks /> },
  ];

  const handleLogout = async () => {
    // await logout();
    navigate("/login");
  };

  return (
    <div className="bg-accent text-white font-poppins h-full flex flex-col">
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

      <div className="w-full h-px bg-border"></div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 mx-4 mt-auto mb-4 rounded-md hover:bg-white/10 transition-colors text-left"
      >
        <FaSignOutAlt size={18} />
        <span className="text-red-600 font-semibold text-lg">Log out</span>
      </button>
    </div>
  );
}
