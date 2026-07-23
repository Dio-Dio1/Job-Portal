import React from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <Trends />
      <Statistics />
    </div>
  )
}

export default App