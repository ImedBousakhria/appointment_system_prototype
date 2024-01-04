import React, { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InlineWidget } from "react-calendly";
import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { add, format } from "date-fns";
import {
  OPENING_TIME_MORNING,
  CLOSING_TIME_MORNING,
  OPENING_TIME_AFTERNOON,
  CLOSING_TIME_AFTERNOON,
  INTERVAL,
} from "./consts/config";
function App() {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });
  const calendarRef = useRef(null);

  const getTimes = (openingTime, closingTime) => {
    if (!date.justDate) return [];
    const { justDate } = date;
    const beginning = add(justDate, { hours: openingTime });
    const end = add(justDate, { hours: closingTime });
    const interval = INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(new Date(i));
    }

    return times;
  };

  const morningTimes = getTimes(OPENING_TIME_MORNING, CLOSING_TIME_MORNING);
  const afternoonTimes = getTimes(
    OPENING_TIME_AFTERNOON,
    CLOSING_TIME_AFTERNOON
  );

  // Concatenate morningTimes and afternoonTimes into a single array
  const allTimes = [...morningTimes, ...afternoonTimes];

  const handleBlur = () => {
    // Check if a date is selected before updating the state
    if (
      calendarRef.current &&
      calendarRef.current.contains(document.activeElement)
    ) {
      return;
    }

    setDate((prev) => ({ ...prev, justDate: null }));
  };
  
  useEffect(() => {
    // Attach onBlur event listener when the component mounts
    document.addEventListener("click", handleBlur);

    // Detach onBlur event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);
  return (
    <div className=" bg-slate-600 flex gap-6 items-center h-screen justify-center">
      <div ref={calendarRef}>
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
          onChange={(value) => {
            if (Array.isArray(value) && value.length > 0) {
              // If a date is selected, update the state
              setDate((prev) => ({ ...prev, justDate: value[0] }));
            }
          }}
        />
      </div>
      {date.justDate ? (
        <div className=" flex flex-col gap-3">
          {allTimes?.map((time, i) => (
            <div
              key={`time-${i}`}
              className=" bg-white py-2 px-3 cursor-pointer rounded-md font-semibold hover:bg-gray-300"
            >
              {console.log(time)}
              {format(time, "kk:mm")}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
