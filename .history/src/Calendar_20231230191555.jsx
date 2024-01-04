import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactCalendar from "react-calendar";
import { FixedSizeList } from "react-window";
import { add, format } from "date-fns";
import {
  OPENING_TIME_MORNING,
  CLOSING_TIME_MORNING,
  OPENING_TIME_AFTERNOON,
  CLOSING_TIME_AFTERNOON,
  INTERVAL,
} from "./consts/config";

const TimeRow = ({ index, style, data }) => (
  <div
    style={style}
    className="bg-white py-2 px-3 cursor-pointer font-semibold hover:bg-gray-200"
  >
    {format(data[index], "kk:mm")}
  </div>
);

export const Calendar = () => {
  const [calendarHeight, setCalendarHeight] = useState(300); // Initial height

  const calendarRef = useRef();

 

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
        ref={calendarRef}
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={handleDateClick}
      />
      {date.justDate ? (
        <motion.div
          style={{ height: `${calendarHeight}px` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 300 },
          }}
          className={
            /*" bg-white flex basis-[20%] flex-col justify-around pl-3 rounded-md" */ ""
          }
        >
          <FixedSizeList
            height={calendarHeight} // Adjust the height as needed
            width={200} // Adjust the width as needed
            itemSize={50} // Adjust the item size as needed
            itemCount={allTimes.length}
            itemData={allTimes}
          >
            {TimeRow}
          </FixedSizeList>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Calendar;
