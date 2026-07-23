import React from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <Trends />
    </div>
  )
}

export default App