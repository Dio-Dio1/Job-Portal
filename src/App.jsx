import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Trends from "./components/TrendJobs";
import Statistics from "./components/Statistics";
import CommunityFeed from "./components/CommunityFeed";
import AuthPage from "./components/AuthPage";
import JobApplicationForm from "./components/JobApplicationForm";
import CreateJobPost from "./components/CreateJobPost";
import JobDetails from "./components/JobDetails";
import JobSeekerProfile from "./components/JobSeekerProfile";
import CompanyProfile from "./components/CompanyProfile";
import JobSeekerDashboard from "./components/JobSeekerDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

const HomePage = () => (
  <>
    <Landing />
    <Trends />
    <Statistics />
    <CommunityFeed />
  </>
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/company/:id" element={<CompanyProfile />} />

          {/* Job Seeker Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["jobseeker"]} />}>
            <Route path="/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/profile" element={<JobSeekerProfile />} />
            <Route path="/apply" element={<JobApplicationForm />} />
          </Route>

          {/* Company/Employer Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["company"]} />}>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/jobposting" element={<CreateJobPost />} />
          </Route>

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};


export default App;
