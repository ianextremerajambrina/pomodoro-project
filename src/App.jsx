import { useState } from 'react'
import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Pomodoro />
    </>
  )
}

export default App
