import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import {
  OPENING_TIME_MORNING,
  CLOSING_TIME_MORNING,
  OPENING_TIME_AFTERNOON,
  CLOSING_TIME_AFTERNOON,
  INTERVAL,
} from "./consts/config";

export const Calendar = () => {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });

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
  const handleDateClick = (selectedDate) => {
    setDate((prev) => ({ ...prev, justDate: selectedDate }));
  };

  // Concatenate morningTimes and afternoonTimes into a single array
  const allTimes = [...morningTimes, ...afternoonTimes];
  return (
    <div className=" bg-slate-600 flex gap-6 justify-center">
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={handleDateClick}
      />
      {date.justDate ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 500 },
          }}
          className=" overflow-y-visible bg-white flex basis-[20%] flex-col justify-around pl-3 rounded-md "
        >
          {allTimes?.map((time, i) => (
            <div
              key={`time-${i}`}
              className="bg-white py-2 px-3 cursor-pointer font-semibold hover:bg-gray-200 "
            >
              {format(time, "kk:mm")}
            </div>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
};

export default Calendar;
