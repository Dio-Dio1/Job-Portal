import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";
import jobs from "../data/jobs";

const AppliedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("applications")
          .select("job_id, applied_at")
          .eq("user_id", user.id)
          .order("applied_at", { ascending: false });

        if (error) throw error;

        if (data) {
          // Map database application record to full job data
          const mapped = data.map((app) => {
            const jobDetails = jobs.find((j) => j.id === app.job_id);
            return {
              ...jobDetails,
              appliedAt: new Date(app.applied_at).toLocaleDateString(),
            };
          }).filter(job => job.title); // Filter out any undefined jobs just in case

          setAppliedJobs(mapped);
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading applications...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Applications</h1>

        {appliedJobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500 text-lg mb-4">You haven't applied for any jobs yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                    <img
                      src={job.logo}
                      alt={job.title}
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
                    <p className="text-sm text-green-600 font-medium">{job.company}</p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-400">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>Applied on {job.appliedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                    Applied
                  </span>
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="flex-1 sm:flex-initial text-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppliedJobs;
