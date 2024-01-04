/* import React, { useState } from "react";
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

export const Calendar = () => {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });

  const [activeTime, setActiveTime] = useState(null);

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
    setActiveTime(null); // Reset active time when a new date is selected
  };

  const handleTimeRowClick = (selectedTime) => {
    setActiveTime(selectedTime);
    // Do something with the selected time, e.g., update state
    console.log(activeTime);
  };

  // Concatenate morningTimes and afternoonTimes into a single array
  const allTimes = [...morningTimes, ...afternoonTimes];
  return (
    <div className=" bg-slate-600 flex w-screen gap-6 justify-center">
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
          className=" bg-white flex flex-col justify-around pl-3 py-2 pr-3 rounded-md"
        >
          <div className="mb-3 border-b pb-2 flex justify-between items-center px-1">
            <h4 className="">Selected time slot:</h4>
            <span
              onClick={() => {
                setActiveTime(null);
                setDate((prevDate) => ({ dateTime: null, justDate: undefined }));
              }} // Clear selected time
              className="border p-1.5 cursor-pointer hover:bg-gray-300"
            >
              X
            </span>
          </div>
          <FixedSizeList
            height={350} // Adjust the height as needed
            width={200} // Adjust the width as needed
            itemSize={50} // Adjust the item size as needed
            itemCount={allTimes.length}
            itemData={{
              times: allTimes,
              activeTime,
              onClick: handleTimeRowClick,
            }}
          >
            {({ index, style }) => (
              <TimeRow
                index={index}
                style={style}
                data={allTimes}
                activeTime={activeTime}
                onClick={handleTimeRowClick}
              />
            )}
          </FixedSizeList>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Calendar;

const TimeRow = ({ index, style, data, activeTime, onClick }) => {
  const isActive = activeTime
    ? activeTime.getTime() === data[index].getTime()
    : false;

  return (
    <div
      style={{ ...style }}
      className={`py-2 px-3 cursor-pointer font-semibold hover:bg-gray-200 rounded-md my-3 ${
        isActive ? " bg-blue-200 hover:bg-blue-200" : ""
      }`}
      onClick={() => onClick(data[index])}
    >
      {format(data[index], "kk:mm")}
    </div>
  );
};
 */