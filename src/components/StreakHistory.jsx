import { Flame } from "lucide-react";

const StreakHistory = ({ checkIns = [] }) => {
  if (!checkIns.length) {
    return <p className="text-gray-400 italic">No streaks yet.</p>;
  }

  const dates = checkIns
    .map((d) => new Date(d))
    .sort((a, b) => a - b)
    .map((d) => ({
      formatted: d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        {dates.map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            <div className="bg-indigo-600 text-white p-1.5 rounded-full">
              <Flame size={18} />
            </div>
            <p className="text-sm text-gray-800">{entry.formatted}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakHistory;
