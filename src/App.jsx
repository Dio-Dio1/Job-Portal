import {useState} from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'
import AuthPage from './components/AuthPage'
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  return (
    
      <div>
        <Navbar />
    <Routes>
      <Route path="/"
      element={
        <>
          <Landing title={title} location={location} setTitle={setTitle} setLocation={setLocation}/>
          <Trends title={title} location={location}/>
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