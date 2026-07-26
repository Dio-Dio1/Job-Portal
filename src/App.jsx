import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Trends from "./components/TrendJobs";
import Statistics from "./components/Statistics";
import CommunityFeed from "./components/CommunityFeed";
import AuthPage from "./components/AuthPage";
import JobApplicationForm from "./components/JobApplicationForm";
import NotFound from "./components/NotFound";
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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/apply" element={<JobApplicationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
