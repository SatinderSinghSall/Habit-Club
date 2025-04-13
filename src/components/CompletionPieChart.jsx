import { PieChart, Pie, Cell, Tooltip } from "recharts";

const CompletionPieChart = ({ checkIns = [] }) => {
  const now = new Date();
  const start = new Date(checkIns[0] || now);
  const daysSinceStart = Math.ceil(
    (now - new Date(start)) / (1000 * 60 * 60 * 24)
  );
  const completed = checkIns.length;
  const missed = Math.max(daysSinceStart - completed, 0);
  const percentage = daysSinceStart
    ? Math.min(Math.round((completed / daysSinceStart) * 100), 100)
    : 0;

  const data = [
    { name: "Completed", value: completed },
    { name: "Missed", value: missed },
  ];

  const COLORS = ["#6366f1", "#e5e7eb"]; // Indigo + Light Gray

  return (
    <div className="relative w-full flex justify-center items-center">
      <PieChart width={250} height={250} className="drop-shadow-sm">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={4}
          stroke="none"
          dataKey="value"
          isAnimationActive={true}
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Center label */}
      <div className="absolute text-center">
        <div className="text-xl font-semibold text-indigo-600">
          {percentage}%
        </div>
        <div className="text-sm text-gray-500">Completed</div>
      </div>
    </div>
  );
};

export default CompletionPieChart;
