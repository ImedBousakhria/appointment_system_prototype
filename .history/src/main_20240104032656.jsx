import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Calendar from './Calendar'
import "./Calendar.css"
import Availability from './Availability'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Availability daysArray={} />
  </React.StrictMode>,
)
