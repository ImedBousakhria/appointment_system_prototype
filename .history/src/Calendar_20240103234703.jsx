import React, { useState, useEffect } from "react";
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
    className="bg-white flex flex-col justify-around px-3 py-2 rounded-md"
  >
    <div className="mb-3 border-b pb-2 flex justify-between items-center px-1">
      <h4 className="">Selected time slot:</h4>
      <div>
        <span
          onClick={onBack}
          className="border p-1.5 cursor-pointer hover:bg-gray-300 mr-2"
        >
          Back
        </span>
        <span
          onClick={() => console.log("Next button clicked")} // Add functionality for Next button
          className="border p-1.5 cursor-pointer hover:bg-gray-300"
        >
          Next
        </span>
      </div>
    </div>
    <FixedSizeList
      height={360}
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

const DateSelection = ({ onSelectDate, onNext }) => (
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
    <div className="mt-3">
      <span
        onClick={() => console.log("Back button clicked")} // Add functionality for Back button
        className="border p-1.5 cursor-pointer hover:bg-gray-300 mr-2"
      >
        Back
      </span>
      <span
        onClick={onNext}
        className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Next
      </span>
    </div>
  </motion.div>
);

export const Calendar = () => {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });

  const [activeTime, setActiveTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false);

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
    // Reset date and active time when going back from time selection
    setDate((prevDate) => ({ ...prevDate, justDate: undefined }));
    setActiveTime(null);
    setShowTimeSelection(false);
  };

  const handleNextButtonClick = () => {
    setShowTimeSelection(true);
  };

  const [allTimes, setAllTimes] = useState([]);

  useEffect(() => {
    // Update allTimes when date.justDate changes
    const morningTimes = getTimes(OPENING_TIME_MORNING, CLOSING_TIME_MORNING);
    const afternoonTimes = getTimes(
      OPENING_TIME_AFTERNOON,
      CLOSING_TIME_AFTERNOON
    );
    setAllTimes([...morningTimes, ...afternoonTimes]);
  }, [date.justDate]);

  return (
    <div className="bg-slate-600 flex w-screen gap-6 justify-center">
      <div className="">
        {!showCalendar && !showTimeSelection && (
          <h2 onClick={() => setShowCalendar(true)}>Select a Date</h2>
        )}

        {showCalendar && !showTimeSelection && (
          <DateSelection
            onSelectDate={handleDateClick}
            onNext={handleNextButtonClick}
          />
        )}
      </div>
      {date.justDate && showTimeSelection && (
        <div className="">
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
