import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { InlineWidget } from "react-calendly";


function App() {

  return (
    <div className=' bg-slate-600'>
      Hello
      <InlineWidget url="https://calendly.com/your_scheduling_page" />
    </div>
  )
}

export default App
