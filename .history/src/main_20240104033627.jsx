import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Calendar from './Calendar'
import "./Calendar.css"
import Availability from './Availability'
import { getDaysArray } from './consts/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  const [daysArray, setDaysArray] = useState(getDaysArray());

  const handleUpdateDaysArray = (updatedDaysArray) => {
    // You can perform any necessary validation or processing here
    setDaysArray(updatedDaysArray);
  };
  <React.StrictMode>
    <Calendar />
    <Availability daysArray={getDaysArray()} />
  </React.StrictMode>,
)
