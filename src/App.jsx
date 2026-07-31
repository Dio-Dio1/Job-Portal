import React from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'
import AuthPage from './components/AuthPage'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    
      <div>
        <Navbar />
    <Routes>
      <Route path="/"
      element={
        <>
          <Landing />
          <Trends />
          <Statistics />
        </>
      }
      />

      <Route path="/auth" element={
        <>
          <AuthPage />
        </>
      }

      />
        
      
    </Routes>
    </div>
  )
}

export default App