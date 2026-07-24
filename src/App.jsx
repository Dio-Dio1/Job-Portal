import React from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'
import CommunityFeed from './components/CommunityFeed'

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <Trends />
      <Statistics />
      <CommunityFeed />
    </div>
  )
}

export default App