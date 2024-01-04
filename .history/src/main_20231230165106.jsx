import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Calendar from './Calendar'
import 'react-calendar/dist/Calendar.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
)
