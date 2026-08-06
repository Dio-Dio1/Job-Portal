import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import trendingJobs from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";

const Trends = ({ title, location }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchApplications = async () => {
        const { data, error } = await supabase
          .from("applications")
          .select("job_id")
          .eq("user_id", user.id);

        if (data) {
          setAppliedJobIds(new Set(data.map((app) => app.job_id)));
        }
      };
      fetchApplications();
    } else {
      setAppliedJobIds(new Set());
    }
  }, [user]);

  const handleApply = async (jobId) => {
    if (!user) {
      alert("Please login to apply for this job.");
      navigate("/auth");
      return;
    }

    setApplyingId(jobId);
    try {
      const { error } = await supabase
        .from("applications")
        .insert([{ user_id: user.id, job_id: jobId }]);

      if (error) throw error;
      setAppliedJobIds((prev) => {
        const updated = new Set(prev);
        updated.add(jobId);
        return updated;
      });
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to submit application.");
    } finally {
      setApplyingId(null);
    }
  };

  const filteredJobs = trendingJobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(title.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
    return titleMatch && locationMatch;
  });

  return (
    <section className="px-6 lg:px-20 py-16 bg-gray-50">
      <div className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Trending Jobs Right Now
        </h1>
        <p className="mt-3 text-base lg:text-lg text-gray-500 max-w-2xl">
          Discover the latest opportunities from companies hiring this week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.has(job.id);
          return (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                      <img
                        src={job.logo}
                        alt={job.title}
                        className="w-11 h-11 rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    NEW
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-gray-600 leading-6 text-sm">
                  {job.description}
                </p>
              </div>

              <div>
                {/* Job Info */}
                <div className="flex justify-between border-t border-gray-200 mt-5 pt-3 text-sm text-gray-500">
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={isApplied || applyingId === job.id}
                    className={`flex-1 py-2.5 rounded-xl font-medium transition ${
                      isApplied
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {applyingId === job.id ? "Applying..." : isApplied ? "Applied" : "Apply"}
                  </button>

                  <button
                    className="px-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trends;