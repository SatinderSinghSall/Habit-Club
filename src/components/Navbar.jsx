import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-extrabold text-indigo-600 tracking-tight"
      >
        Habit Club
      </Link>

      <div className="space-x-4 flex items-center">
        {/* Dropdown button for mobile screens */}
        <button
          onClick={toggleDropdown}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dropdown menu for mobile screens */}
        {isDropdownOpen && (
          <div className="absolute top-16 right-6 bg-white shadow-lg rounded-lg w-48 py-3 px-2 space-y-2 lg:hidden">
            <Link
              to="/login"
              className={`block px-4 py-2 text-lg font-medium transition hover:text-indigo-600 ${
                pathname === "/login" ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-all"
            >
              Sign Up
            </Link>
            <a
              href="https://habit-club-admin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-all"
            >
              Admin Login
            </a>
          </div>
        )}

        {/* Regular links for larger screens */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link
            to="/login"
            className={`text-lg font-medium transition hover:text-indigo-600 ${
              pathname === "/login" ? "text-indigo-600" : "text-gray-700"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-indigo-700 transition-all"
          >
            Sign Up
          </Link>
          <a
            href="https://habit-club-admin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-900 transition-all"
          >
            Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
