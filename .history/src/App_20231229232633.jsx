import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InlineWidget } from "react-calendly";
import ReactCalendar from "react-calendar";
import "./Calendar.css";

interface DateType

function App() {
  const [date, setDate] = useState({});
  return (
    <div className=" bg-slate-600">
      <ReactCalendar
        minDate={new Date()}
        className="REACT-CALENDAR"
        view="month"
        onClickDay={(date) => setDate(date)}
      />
      {date.justDate ? <div>Placeholder <img src={viteLogo} alt="" /></div> : null}
    </div>
  );
}

export default App;
