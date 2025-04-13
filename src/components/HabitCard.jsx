import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const HabitCard = ({ habit, onCheckIn, refresh }) => {
  const isCheckedInToday =
    new Date(habit.lastCheckIn).toDateString() === new Date().toDateString();

  const handleClick = async (e) => {
    e.stopPropagation(); // Prevent link navigation

    try {
      await onCheckIn(habit._id);
      toast.success("Check-in complete! ✅");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Check-in failed.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex flex-col justify-between h-full hover:scale-[1.01]">
      <Link to={`/habit/${habit._id}`} className="block">
        <div>
          <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
            💡 {habit.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            🔥 Streak: {habit.streak}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Last check-in:{" "}
            {habit.lastCheckIn
              ? new Date(habit.lastCheckIn).toLocaleDateString()
              : "Never"}
          </p>
        </div>
      </Link>

      <button
        onClick={handleClick}
        disabled={isCheckedInToday}
        className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition ${
          isCheckedInToday
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
        }`}
      >
        <CheckCircle size={16} />
        {isCheckedInToday ? "Checked In Today" : "Check In"}
      </button>
    </div>
  );
};

export default HabitCard;
