import React, { useState } from "react";
import { add } from "date-fns";
import { getDaysArray, OPENING_TIME_MORNING, CLOSING_TIME_MORNING, OPENING_TIME_AFTERNOON, CLOSING_TIME_AFTERNOON, INTERVAL } from "./consts/config";

const Availability = ({ daysArray, onUpdateDaysArray }) => {
  const [editedDaysArray, setEditedDaysArray] = useState([...daysArray]);

  const handleInputChange = (dayIndex, period, field, value) => {
    setEditedDaysArray(prevDaysArray => {
      const updatedDaysArray = [...prevDaysArray];
      updatedDaysArray[dayIndex][period][field] = value;
      return updatedDaysArray;
    });
  };

  const handleUpdateClick = () => {
    onUpdateDaysArray([...editedDaysArray]);
  };

  return (
    <div>
      <h2>Edit Opening/Closing Times</h2>
      {editedDaysArray.map((day, index) => (
        <div key={index}>
          <p>{`Day ${index + 1}: ${day.date.toLocaleDateString()}`}</p>
          <div>
            <label>Morning Opening Time:</label>
            <input
              type="number"
              value={day.morning.openingTime}
              onChange={(e) => handleInputChange(index, 'morning', 'openingTime', parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <label>Morning Closing Time:</label>
            <input
              type="number"
              value={day.morning.closingTime}
              onChange={(e) => handleInputChange(index, 'morning', 'closingTime', parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <label>Afternoon Opening Time:</label>
            <input
              type="number"
              value={day.afternoon.openingTime}
              onChange={(e) => handleInputChange(index, 'afternoon', 'openingTime', parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <label>Afternoon Closing Time:</label>
            <input
              type="number"
              value={day.afternoon.closingTime}
              onChange={(e) => handleInputChange(index, 'afternoon', 'closingTime', parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      ))}
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
};

// Example usage in another component
const YourComponent = () => {
  const [daysArray, setDaysArray] = useState(getDaysArray());

  const handleUpdateDaysArray = (updatedDaysArray) => {
    // You can perform any necessary validation or processing here
    setDaysArray(updatedDaysArray);
  };

  return (
    <div>
      {/* Your existing components */}
      {/* ... */}
      {/* DaysArrayEditor component */}
      <DaysArrayEditor daysArray={daysArray} onUpdateDaysArray={handleUpdateDaysArray} />
    </div>
  );
};

export default YourComponent;
