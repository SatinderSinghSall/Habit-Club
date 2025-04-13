import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHabitById,
  deleteHabit,
  updateHabit,
} from "../services/habitService";
import Card from "../components/Card";
import CheckInCalendar from "../components/CheckInCalendar";
import { Pencil, Trash2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import CheckInChart from "../components/CheckInChart";
import StreakHistory from "../components/StreakHistory";
import CompletionPieChart from "../components/CompletionPieChart";
import MilestoneModal from "../components/MilestoneModal";

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [chartRange, setChartRange] = useState("weekly");
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [milestoneHit, setMilestoneHit] = useState(null);

  useEffect(() => {
    if (habit) {
      const today = new Date().toDateString();
      const newlyAchieved = habit.milestones?.find(
        (m) => m.achievedOn && new Date(m.achievedOn).toDateString() === today
      );

      if (newlyAchieved) {
        setMilestoneHit(newlyAchieved);
        setShowMilestoneModal(true);
      }
    }
  }, [habit]);

  const token = localStorage.getItem("token");

  const fetchHabit = async () => {
    try {
      const res = await getHabitById(id, token);
      setHabit(res.data);
      setEditedName(res.data.name);
    } catch (err) {
      toast.error("Failed to fetch habit.");
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      await deleteHabit(id, token);
      toast.success("Habit deleted");
      navigate("/dashboard");
    }
  };

  const handleSave = async () => {
    if (!editedName.trim()) return toast.error("Name cannot be empty.");
    await updateHabit(id, { name: editedName }, token);
    toast.success("Habit updated");
    setEditing(false);
    fetchHabit();
  };

  if (!habit) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 text-sm text-gray-600 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        📊 Analytics
      </h1>
      {/* 🔵 Habit Overview */}
      <Card className="p-6 shadow-md relative">
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-3">
          {editing ? (
            <>
              <button onClick={handleSave}>
                <Save
                  size={20}
                  className="text-green-600 hover:text-green-700"
                />
              </button>
              <button onClick={() => setEditing(false)}>
                <X size={20} className="text-gray-500 hover:text-gray-600" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}>
                <Pencil
                  size={20}
                  className="text-indigo-600 hover:text-indigo-800"
                />
              </button>
              <button onClick={handleDelete}>
                <Trash2 size={20} className="text-red-500 hover:text-red-600" />
              </button>
            </>
          )}
        </div>

        {editing ? (
          <input
            className="text-2xl font-semibold text-indigo-700 outline-none border-b-2 border-indigo-300 bg-transparent"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            {habit.name}
          </h2>
        )}

        <p className="text-gray-700">
          Current Streak: <strong>{habit.streak} 🔥</strong>
        </p>
        <p className="text-gray-600 mt-2">
          Last Check-in:{" "}
          <span className="font-medium">
            {habit.lastCheckIn
              ? new Date(habit.lastCheckIn).toLocaleDateString()
              : "Never"}
          </span>
        </p>
      </Card>
      {/* ✅ Calendar View: */}
      <Card className="p-6 shadow-sm mt-5">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Check-In Calendar:
        </h3>
        <CheckInCalendar checkIns={habit.checkIns || []} />
      </Card>
      {/* ✅ Charts & stats: */}
      <Card className="p-6 shadow-sm mt-5 mb-5">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Your Weekly Progress:
          <div className="flex gap-2 mb-4 mt-2">
            {["weekly", "monthly", "all"].map((range) => (
              <button
                key={range}
                onClick={() => setChartRange(range)}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  chartRange === range
                    ? "bg-indigo-600 text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </h3>
        <CheckInChart checkIns={habit.checkIns || []} range={chartRange} />
      </Card>
      {/* Streak History: */}
      <Card className="p-6 shadow-sm mt-5 mb-5">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Streak History
        </h3>
        <StreakHistory checkIns={habit.checkIns || []} />
      </Card>
      {/* Completion Rate: (Pie Chart) */}
      <Card className="p-6 shadow-sm mt-5 mb-5">
        <h3 className="text-lg font-semibold mb-4 text-indigo-600">
          Completion Rate
        </h3>
        <CompletionPieChart checkIns={habit.checkIns || []} />
      </Card>

      {/* 🎯 Milestones */}
      {habit.milestones && habit.milestones.length > 0 && (
        <Card className="p-6 shadow-sm mt-5 mb-10">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600">
            🎯 Milestones
          </h3>
          <ul className="space-y-2">
            {habit.milestones.map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b pb-2"
              >
                <span>
                  Target:{" "}
                  <strong>
                    {m.target} day{m.target > 1 ? "s" : ""}
                  </strong>
                </span>
                {m.achievedOn ? (
                  <span className="text-green-600 text-sm">
                    Achieved on {new Date(m.achievedOn).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Not yet achieved
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <MilestoneModal
        open={showMilestoneModal}
        onClose={() => setShowMilestoneModal(false)}
        milestone={milestoneHit}
      />
    </div>
  );
};

export default HabitDetails;
