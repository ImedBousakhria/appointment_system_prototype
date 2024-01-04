import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InlineWidget } from "react-calendly";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { add } from "date-fns";
function App() {
  const [date, setDate] = useState({ justDate: null, dateTime: null });

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;
    const beginning = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 12 });
    const interval = 30;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };
  const times =getTimes()
  return (
    <div className=" bg-slate-600 flex">
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
      />
      {date.justDate ? (
        <div className=" flex flex-col gap-3">
          {}
        </div>
      ) : null}
    </div>
  );
}

export default App;
