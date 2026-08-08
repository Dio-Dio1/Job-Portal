import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";

const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobsAndApplicants = async () => {
    try {
      // Fetch jobs posted by current company
      const { data: jobsData, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", user.id)
        .order("posted_at", { ascending: false });

      if (jobsError) throw jobsError;

      if (jobsData) {
        // Fetch application counts for these jobs
        const jobsWithApplicants = await Promise.all(
          jobsData.map(async (job) => {
            const { count, error: countError } = await supabase
              .from("applications")
              .select("*", { count: "exact", head: true })
              .eq("job_id", job.id);

            return {
              ...job,
              applicantCount: count || 0,
            };
          })
        );
        setPostedJobs(jobsWithApplicants);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.user_metadata?.role !== "company") {
      navigate("/");
      return;
    }
    fetchJobsAndApplicants();
  }, [user, navigate]);

  const handleDeleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job posting? All applications for this job will also be deleted.")) {
      return;
    }

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);
      if (error) throw error;
      setPostedJobs((prev) => prev.filter((j) => j.id !== jobId));
      alert("Job deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading company dashboard...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your job openings and review candidates.</p>
          </div>
          <button
            onClick={() => navigate("/company/jobs/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition cursor-pointer"
          >
            Post a New Job
          </button>
        </div>

        {postedJobs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-500 text-lg mb-6">You haven't posted any jobs yet.</p>
            <button
              onClick={() => navigate("/company/jobs/new")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition cursor-pointer"
            >
              Post First Job
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Job Title</th>
                    <th className="px-6 py-4">Category / Type</th>
                    <th className="px-6 py-4">Applicants</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {postedJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{job.title}</div>
                        <div className="text-gray-500 text-xs">{job.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{job.category}</div>
                        <div className="text-gray-500 text-xs">{job.employment_type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => navigate(`/company/jobs/${job.id}/applicants`)}
                          className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 cursor-pointer hover:bg-green-100"
                        >
                          {job.applicantCount} Candidates
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{job.salary}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/company/jobs/${job.id}/applicants`)}
                          className="text-green-600 hover:text-green-800 font-medium cursor-pointer"
                        >
                          Applicants
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => navigate(`/company/jobs/${job.id}/edit`)}
                          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyDashboard;
