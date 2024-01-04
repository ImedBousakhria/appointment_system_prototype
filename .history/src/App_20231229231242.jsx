import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { InlineWidget } from "react-calendly";
import ReactCalendar from 'react-calendar';
import "./Calendar.css"

{/* <InlineWidget url="https://calendly.com/bousakhriaimed" /> */}

function App() {
  return (
    <div className=" bg-slate-600">
      Loading ...
      <ReactCalendar minDate={new Date()} className="REACT-CALENDAR" view=""/>

    </div>
  );
}

export default App;
