import { useState } from "react";
import { LogOut, User, ChevronDown, Users  } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const handleUserProfileClick = () => {
    toast("🚧 This functionality is in development phase. We'll be back soon!");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-full shadow hover:bg-indigo-50 transition"
      >
        <User size={18} />
        <span className="hidden sm:block font-medium">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-xl border z-50">
          <ul className="text-sm">
            <li
              className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2"
              onClick={handleUserProfileClick}
            >
              <User size={16} /> User Profile
            </li>
            <li>
              <Link
                to="/friends"
                className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 block"
              >
                <Users size={16} /> Friends
              </Link>
            </li>
            <li
              onClick={logout}
              className="px-4 py-3 hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
