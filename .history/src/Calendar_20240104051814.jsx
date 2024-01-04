import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactCalendar from "react-calendar";
import { FixedSizeList } from "react-window";
import { add, format } from "date-fns";
import { getDaysArray, INTERVAL } from "./consts/config";
import Availability from "./Availability";

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
      transition: { type: "spring", stiffness: 120 },
    }}
    className="bg-white flex flex-col justify-around px-3 py-2 rounded-md"
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

export const Calendar = () => {
  const [date, setDate] = useState({
    justDate: undefined,
    dateTime: undefined,
  });

  const [activeTime, setActiveTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [daysArray, setDaysArray] = useState(getDaysArray());

  const handleUpdateDaysArray = (updatedDaysArray) => {
    setDaysArray(updatedDaysArray);
  };

  const getTimes = () => {
    if (!date.justDate) return [];
    const { justDate } = date;
    const selectedDay = daysArray.find(
      (day) => day.date.getTime() === justDate.getTime()
    );

    const beginningMorning = add(justDate, {
      hours: selectedDay.morning.openingTime,
    });
    const endMorning = add(justDate, {
      hours: selectedDay.morning.closingTime,
    });
    const beginningAfternoon = add(justDate, {
      hours: selectedDay.afternoon.openingTime,
    });
    const endAfternoon = add(justDate, {
      hours: selectedDay.afternoon.closingTime,
    });
    const interval = INTERVAL;

    const times = [];
    for (
      let i = beginningMorning;
      i <= endMorning;
      i = add(i, { minutes: interval })
    ) {
      times.push(new Date(i));
    }

    for (
      let i = beginningAfternoon;
      i <= endAfternoon;
      i = add(i, { minutes: interval })
    ) {
      times.push(new Date(i));
    }
    return times;
  };

  const handleDateClick = (selectedDate) => {
    setDate((prev) => ({ ...prev, justDate: selectedDate }));
    setActiveTime(null);
  };

  const handleTimeRowClick = (selectedTime) => {
    setActiveTime(selectedTime);
    console.log(activeTime);
  };

  const handleTimeSelectionBackClick = () => {
    setDate((prevDate) => ({ ...prevDate, justDate: undefined }));
    setActiveTime(null);
    setShowTimeSelection(false);
    setShowForm(false)
  };

  const handleNextButtonClick = () => {
    setShowTimeSelection(true);
  };

  const handleCalendarClose = () => {
    setDate((prevDate) => ({ ...prevDate, justDate: undefined }));
    setShowCalendar(false);
    setShowTimeSelection(false); // Close both time selection and form
  };

  const [allTimes, setAllTimes] = useState([]);

  useEffect(() => {
    setAllTimes(getTimes());
  }, [date.justDate, showTimeSelection]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    info: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      info: "",
    });
    setShowForm(false);
  };

  const handleNextButtonTimeClick = () => {
    if (activeTime) {
      setShowForm(true);
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="bg-slate-600 flex w-screen gap-6 justify-center">
        <div className="">
          {!showCalendar && !showTimeSelection && (
            <h2 onClick={() => setShowCalendar(true)}>Select a Date</h2>
          )}

          {showCalendar && !showTimeSelection && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 120 },
              }}
              className="bg-white flex flex-col justify-around pl-3 py-2 pr-3 rounded-md"
            >
              <ReactCalendar
                minDate={new Date()}
                className="REACT-CALENDAR"
                view="month"
                onClickDay={handleDateClick}
              />
              {date.justDate && (
                <motion.button
                  onClick={handleNextButtonClick}
                  className="mt-3 bg-blue-500 text-white p-2 rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 80 },
                  }}
                >
                  Next
                </motion.button>
              )}
              <button
                onClick={handleCalendarClose}
                className="mt-3 bg-red-500 text-white p-2 rounded"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
        {date.justDate && showTimeSelection && (
          <div className="flex items-center">
            <div className=" flex flex-col">
              <TimeSelection
                allTimes={allTimes}
                activeTime={activeTime}
                onClick={handleTimeRowClick}
                onBack={handleTimeSelectionBackClick}
              />
              {activeTime && (
                <motion.button
                  onClick={handleNextButtonTimeClick}
                  className="mt-3 bg-blue-500 text-white p-2 rounded"
                >
                  Next (Show Form)
                </motion.button>
              )}
            </div>
          </div>
        )}
        {showForm && (
          <div className=" bg-white flex flex-col justify-around px-3 py-2 rounded-md">
            <h4 className="text-xl font-bold mb-6">Booking an appointment : {date} {activeTime}</h4>

            <h4 className="mb-3">Enter your information:</h4>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Name"
              className="mb-2"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email"
              className="mb-2"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              placeholder="Phone Number"
              className="mb-2"
            />
            <textarea
              name="info"
              value={formData.info}
              onChange={handleFormChange}
              placeholder="Additional Information"
              rows="3"
              className="mb-3"
            />
            <button
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </div>
        )}
        <div
          className=" bg-blue-600"
          onClick={() => console.log(getDaysArray())}
        >
          Click here to display all days
        </div>
      </div>
      <Availability
        daysArray={daysArray}
        onUpdateDaysArray={handleUpdateDaysArray}
      />
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

/* const DateSelection = ({ onSelectDate, onNext }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120 },
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
      onClick={onNext}
      className="mt-3 bg-blue-500 text-white p-2 rounded"
    >
      Next
    </button>
  </motion.div>
); */
