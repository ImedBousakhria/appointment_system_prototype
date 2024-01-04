import React, { useState } from "react";
import { getDaysArray } from "./consts/config";
import "./Availability.css"; // Import a CSS file for styling

const Availability = ({ daysArray, onUpdateDaysArray }) => {
  const [startIndex, setStartIndex] = useState(0);
  const daysPerPage = 5; // Adjust the number of days displayed per page
  const endIndex = startIndex + daysPerPage;

  const visibleDays = daysArray.slice(startIndex, endIndex);

  const handleInputChange = (dayIndex, period, field, value) => {
    onUpdateDaysArray((prevDaysArray) => {
      const updatedDaysArray = [...prevDaysArray];
      updatedDaysArray[dayIndex][period][field] = value;
      return updatedDaysArray;
    });
  };

  const handleUpdateClick = () => {
    onUpdateDaysArray([...daysArray]);
  };

  const handleNextClick = () => {
    if (endIndex < daysArray.length) {
      setStartIndex(startIndex + daysPerPage);
    }
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - daysPerPage);
    }
  };

  return (
    <div className="availability-container">
      <h2>Edit Opening/Closing Times</h2>
      {visibleDays.map((day, index) => (
        <div key={index} className="day-container">
          <p>{`Day ${startIndex + index + 1}: ${day.date.toLocaleDateString()}`}</p>
          <div className="time-input">
            <label>Morning Opening Time:</label>
            <input
              type="number"
              value={day.morning.openingTime}
              onChange={(e) =>
                handleInputChange(
                  startIndex + index,
                  "morning",
                  "openingTime",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
          <div className="time-input">
            <label>Morning Closing Time:</label>
            <input
              type="number"
              value={day.morning.closingTime}
              onChange={(e) =>
                handleInputChange(
                  startIndex + index,
                  "morning",
                  "closingTime",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
          <div className="time-input">
            <label>Afternoon Opening Time:</label>
            <input
              type="number"
              value={day.afternoon.openingTime}
              onChange={(e) =>
                handleInputChange(
                  startIndex + index,
                  "afternoon",
                  "openingTime",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
          <div className="time-input">
            <label>Afternoon Closing Time:</label>
            <input
              type="number"
              value={day.afternoon.closingTime}
              onChange={(e) =>
                handleInputChange(
                  startIndex + index,
                  "afternoon",
                  "closingTime",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
        </div>
      ))}
      <div className="navigation-buttons">
        <button onClick={handlePrevClick} disabled={startIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextClick} disabled={endIndex >= daysArray.length}>
          Next
        </button>
      </div>
      <button className="update-button" onClick={handleUpdateClick}>
        Update
      </button>
    </div>
  );
};

export default Availability;
