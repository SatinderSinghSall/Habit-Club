import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-extrabold text-indigo-600 tracking-tight"
      >
        Habit Club
      </Link>

      <div className="space-x-4 flex items-center">
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
      </div>
    </nav>
  );
}

export default Navbar;
