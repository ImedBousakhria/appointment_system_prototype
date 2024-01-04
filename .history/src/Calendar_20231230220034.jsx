import React, { useState } from "react";
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

const TimeSelection = ({ allTimes, activeTime, onClick, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300 },
    }}
    className="bg-white flex flex-col justify-around pl-3 py-2 pr-3 rounded-md"
  >
    <div className="mb-3 border-b pb-2 flex justify-between items-center px-1">
      <h4 className="">Selected time slot:</h4>
      <span
        onClick={onBack}
        className="border p-1.5 cursor-pointer hover:bg-gray-300"
      >
        Back
      </span>
    </div>
    <FixedSizeList
      height={350}
      width={200}
      itemSize={50}
      itemCount={allTimes.length}
      itemData={{
        times: allTimes,
        activeTime,
        onClick,
      }}
    >
      {({ index, style }) => (
        <TimeRow
          index={index}
          style={style}
          data={allTimes}
          activeTime={activeTime}
          onClick={onClick}
        />
      )}
    </FixedSizeList>
  </motion.div>
);

const DateSelection = ({ onSelectDate, onSelectTime }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300 },
    }}
    className="bg-white flex flex-col justify-around pl-3 py-2 pr-3 rounded-md"
  >
    <ReactCalendar
      minDate={new Date()}
      className="REACT-CALENDAR"
      view="month"
      onClickDay={onSelectDate}
    />
    <button
      onClick={onSelectTime}
      disabled={!onSelectDate}
      className={`mt-3 w-full bg-blue-500 text-white p-2 rounded-md ${
        !onSelectDate ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Select a Time Slot
    </button>
  </motion.div>
);

export const Calendar = () => {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });

  const [activeTime, setActiveTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

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

  const handleDateClick = (selectedDate) => {
    setDate((prev) => ({ ...prev, justDate: selectedDate }));
    setActiveTime(null); // Reset active time when a new date is selected
  };

  const handleTimeRowClick = (selectedTime) => {
    setActiveTime(selectedTime);
    // Do something with the selected time, e.g., update state
    console.log(activeTime);
  };

  const handleTimeSelectionBackClick = () => {
    // Reset date, active time, and hide the calendar when going back from time selection
    setDate((prevDate) => ({ ...prevDate, justDate: undefined }));
    setActiveTime(null);
    setShowCalendar(false);
  };

  const allTimes = getTimes(OPENING_TIME_MORNING, CLOSING_TIME_MORNING).concat(
    getTimes(OPENING_TIME_AFTERNOON, CLOSING_TIME_AFTERNOON)
  );

  return (
    <div className=" bg-slate-600 flex w-screen gap-6 justify-center">
      <div className="flex-1">
        <h2 onClick={}>Select a Date</h2>

        {showCalendar && (
          <DateSelection
            onSelectDate={handleDateClick}
            onSelectTime={handleTimeSelectionBackClick}
          />
        )}
      </div>
      {date.justDate && (
        <div className="flex-1">
          <TimeSelection
            allTimes={allTimes}
            activeTime={activeTime}
            onClick={handleTimeRowClick}
            onBack={handleTimeSelectionBackClick}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
