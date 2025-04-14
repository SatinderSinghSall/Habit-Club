import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHabits, addHabit, checkInHabit } from "../services/habitService";
import HabitCard from "../components/HabitCard";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const res = await getHabits(token);
      setHabits(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load habits.");
      toast.error("Unable to load habits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!habitName) {
      toast.error("Please enter a habit name.");
      return;
    }

    setAdding(true); // start loading

    try {
      await addHabit(habitName, token);
      setHabitName("");
      toast.success("Habit added!");
      fetchHabits();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add habit.");
    } finally {
      setAdding(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-indigo-50 to-white p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-500 text-sm">
              Today is{" "}
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <UserMenu />
        </div>

        {/* Form */}
        <form
          onSubmit={handleAddHabit}
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shadow-sm bg-white rounded-2xl px-4 py-3 border"
        >
          <input
            type="text"
            placeholder="Enter a new habit..."
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="flex-1 outline-none bg-transparent text-lg text-gray-700"
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {adding ? (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <>
                <Plus size={18} />
                Add
              </>
            )}
          </button>
        </form>

        {/* 🆕 Error Message */}
        {error && (
          <div className="text-red-500 mt-4 text-sm font-medium">{error}</div>
        )}
      </div>

      {/* Habits List */}
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="text-center text-indigo-500 mt-10 font-medium text-lg">
            Loading your habits...
          </div>
        ) : habits.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No habits yet. Let’s start building!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onCheckIn={(id) => checkInHabit(id, token)}
                refresh={fetchHabits}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
