import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InlineWidget } from "react-calendly";
import ReactCalendar from 'react-calendar';
import "./Calendar.css"

{/* <InlineWidget url="https://calendly.com/bousakhriaimed" /> */}


function App() {
  const [date, setDate] = useState(null)
  return (
    <div className=" bg-slate-600">
      <ReactCalendar minDate={new Date()} className="REACT-CALENDAR" view="month" onClickDay={(date) => console.log(date)}/>
      {
        date.justDate ? <div>Placeholder</div> : null
      }

    </div>
  );
}

export default App;
