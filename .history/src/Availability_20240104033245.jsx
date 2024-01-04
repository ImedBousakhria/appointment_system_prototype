import React, { useState } from "react";
import { getDaysArray } from "./consts/config";
import "./Availability.css"; // Import a CSS file for styling

const Availability = ({ daysArray, onUpdateDaysArray }) => {
  const [editedDaysArray, setEditedDaysArray] = useState([...daysArray]);

  const handleInputChange = (dayIndex, period, field, value) => {
    setEditedDaysArray((prevDaysArray) => {
      const updatedDaysArray = [...prevDaysArray];
      updatedDaysArray[dayIndex][period][field] = value;
      return updatedDaysArray;
    });
  };

  const handleUpdateClick = () => {
    onUpdateDaysArray([...editedDaysArray]);
  };

  return (
    <div className="availability-container">
      <h2>Edit Opening/Closing Times</h2>
      {editedDaysArray.map((day, index) => (
        <div key={index} className="day-container">
          <p>{`Day ${index + 1}: ${day.date.toLocaleDateString()}`}</p>
          <div className="time-input">
            <label>Morning Opening Time:</label>
            <input
              type="number"
              value={day.morning.openingTime}
              onChange={(e) =>
                handleInputChange(
                  index,
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
                  index,
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
                  index,
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
                  index,
                  "afternoon",
                  "closingTime",
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>
        </div>
      ))}
      <button className="update-button" onClick={handleUpdateClick}>
        Update
      </button>
    </div>
  );
};

export default Availability;
