import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, subDays, subMonths, eachDayOfInterval } from "date-fns";

const CheckInChart = ({ checkIns = [], range = "weekly" }) => {
  const checkInSet = new Set(
    checkIns.map((date) => format(new Date(date), "yyyy-MM-dd"))
  );

  // Create dynamic range based on selected filter
  const getChartData = () => {
    let startDate;
    let endDate = new Date();

    if (range === "weekly") {
      startDate = subDays(endDate, 6);
    } else if (range === "monthly") {
      startDate = subMonths(endDate, 1);
    } else {
      // All-time: fallback to earliest check-in or 90 days
      const dates = checkIns.map((d) => new Date(d));
      startDate = dates.length
        ? new Date(Math.min(...dates))
        : subDays(endDate, 90);
    }

    const allDates = eachDayOfInterval({ start: startDate, end: endDate });

    return allDates.map((date) => {
      const formatted = format(date, "yyyy-MM-dd");
      return {
        date: format(
          date,
          range === "monthly" || range === "all" ? "dd MMM" : "EEE"
        ), // Mon or 09 Apr
        checkIn: checkInSet.has(formatted) ? 1 : 0,
      };
    });
  };

  const chartData = getChartData();

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval={range === "weekly" ? 0 : undefined} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="checkIn" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CheckInChart;
