import React from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'
import CommunityFeed from './components/CommunityFeed'
import AuthPage from './components/AuthPage'
import { Routes, Route } from "react-router-dom";
import JobApplicationForm from './components/JobApplicationForm'

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
              <CommunityFeed />
            </>
          }
        />

        <Route path="/auth" element={
          <>
            <AuthPage />
          </>
        }
        
        />
        
        <Route
          path = "/apply"
          element = {
            <JobApplicationForm />
          }
         />
      </Routes>
    </div>
  )
}

export default App