import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CheckInCalendar.css";

const CheckInCalendar = ({ checkIns }) => {
  const dates = checkIns.map((date) => new Date(date).toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === "month" && dates.includes(date.toDateString())) {
      return "bg-indigo-500 text-white rounded-full";
    }
  };

  return (
    <div className="my-6">
      <h3 className="font-semibold text-lg mb-2 text-indigo-700">
        Your Check-in History
      </h3>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CheckInCalendar;
