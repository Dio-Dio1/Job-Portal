import { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Trends from './components/TrendJobs'
import Statistics from './components/Statistics'
import AuthPage from './components/AuthPage'
import { Routes, Route } from "react-router-dom";
import Jobdetails from './components/Jobdetails'
import AppliedJobs from './components/AppliedJobs'
import CompanyDashboard from './components/CompanyDashboard'
import CreateEditJob from './components/CreateEditJob'
import ManageApplicants from './components/ManageApplicants'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

const App = () => {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50">
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

          <Route path="/auth" element={<AuthPage />} />

          <Route path="/jobs/:id" element={<Jobdetails />} />

          <Route path="/applied" element={<AppliedJobs />} />

          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/company/jobs/new" element={<CreateEditJob />} />
          <Route path="/company/jobs/:id/edit" element={<CreateEditJob />} />
          <Route path="/company/jobs/:jobId/applicants" element={<ManageApplicants />} />
            
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </div>
      <Footer />
    </div>
  )
}

export default App