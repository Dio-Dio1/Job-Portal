import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";

const AppliedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("applications")
          .select(`
            applied_at,
            status,
            jobs (
              id,
              title,
              company,
              location,
              salary,
              logo_url,
              company_id
            )
          `)
          .eq("user_id", user.id)
          .order("applied_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const mapped = data
            .filter((app) => app.jobs && app.jobs.company_id !== null) // Filter out orphaned and seed applications
            .map((app) => ({
              id: app.jobs.id,
              title: app.jobs.title,
              company: app.jobs.company,
              location: app.jobs.location,
              salary: app.jobs.salary,
              logo_url: app.jobs.logo_url,
              appliedAt: new Date(app.applied_at).toLocaleDateString(),
              status: app.status || "Pending",
            }));

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
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition cursor-pointer"
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
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    {job.logo_url ? (
                      <img
                        src={job.logo_url}
                        alt={job.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-green-700">
                        {job.company?.[0]}
                      </span>
                    )}
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
                  <span
                    className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      job.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : job.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="flex-1 sm:flex-initial text-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
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
