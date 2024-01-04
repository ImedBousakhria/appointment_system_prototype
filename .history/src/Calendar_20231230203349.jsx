import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { InlineWidget } from "react-calendly";
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

    <div className=" bg-slate-600 w-screen gap-6 justify-center">
          <InlineWidget url="https://calendly.com/bousakhriaimed" />
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
          transition: { type: "spring", stiffness: 300 },
        }}
        className=" bg-white flex flex-col justify-around pl-3 py-2 rounded-md" 
      >
        <FixedSizeList
          height={410} // Adjust the height as needed
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
