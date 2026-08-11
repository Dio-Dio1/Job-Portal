import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { supabase } from "../supabase.js";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";

const ManageApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // 1. Verify job exists and belongs to the company
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", Number(jobId))
        .eq("company_id", user.id)
        .single();

      if (jobError) throw jobError;
      setJob(jobData);

      // 2. Fetch applicants for this job
      const { data: appsData, error: appsError } = await supabase
        .from("applications")
        .select("*")
        .eq("job_id", Number(jobId))
        .order("applied_at", { ascending: false });

      if (appsError) throw appsError;

      // Note: Because auth.users is a system schema, reading emails directly from auth.users might be restricted depending on Supabase configuration.
      // But we can read metadata if it's stored in public user profiles, OR we can fetch from profiles if they exist.
      // If we don't have profiles table yet (Feature 3), we can fetch the user details using a helper or display applicant UUIDs, 
      // or we can request user email from auth.users. In most Supabase configurations, calling `supabase.auth.admin` or fetching auth table is restricted.
      // Let's do a join or fallback. In a basic setup, the applications user_id UUID itself is available, and we can query the public users table if they have profile fields. 
      // For now, since profiles isn't fully created yet, let's list the applications and fetch details or display candidate IDs, or mock display emails for demo, 
      // but let's query auth.users if metadata is populated, or show the UUID / applicant. Since we'll improve profiles in Feature 3, let's display candidate info.
      // Wait, we can fetch users by ID or display a fallback email. In Supabase, standard client cannot query `auth.users` directly, but we can query `profiles` or display details.
      // Let's make sure it handles status updates gracefully.
      setApplicants(appsData || []);
    } catch (err) {
      addToast(err.message || "Failed to load applicants or unauthorized access.", "error");
      navigate("/company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobId, user, navigate]);

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", appId);

      if (error) throw error;
      setApplicants((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
      );
      addToast(`Application ${newStatus.toLowerCase()} successfully!`, "success");
    } catch (err) {
      addToast(err.message || "Failed to update status.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading applicants...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/company")}
          className="text-gray-500 hover:text-gray-700 font-medium mb-6 flex items-center gap-1 cursor-pointer"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
          <p className="text-sm text-green-600 font-semibold mt-1">{job?.company} • {job?.location}</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Candidates ({applicants.length})</h2>

        {applicants.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
            <p className="text-gray-500">No candidates have applied for this position yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {(app.applicant_name || app.applicant_email || app.user_id).substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {app.applicant_name || `Candidate #${app.user_id.substring(0, 6)}`}
                      </div>
                      {app.applicant_email && (
                        <div className="text-sm text-gray-500">{app.applicant_email}</div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        Applied on: {new Date(app.applied_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>

                    {(!app.status || app.status === "Pending") && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(app.id, "Accepted")}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, "Rejected")}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional seeker metadata fields */}
                {(app.cover_message || app.resume_url || app.github_url || app.linkedin_url) && (
                  <div className="border-t border-gray-100 pt-4 mt-2 space-y-3">
                    {app.cover_message && (
                      <div>
                        <span className="text-xs font-semibold text-gray-500 block mb-1">Cover Message:</span>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl whitespace-pre-wrap">
                          {app.cover_message}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {app.resume_url && (
                        <a
                          href={app.resume_url.startsWith("http") ? app.resume_url : `https://${app.resume_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                        >
                          <FaFileAlt /> Resume
                        </a>
                      )}
                      {app.github_url && (
                        <a
                          href={app.github_url.startsWith("http") ? app.github_url : `https://${app.github_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                        >
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {app.linkedin_url && (
                        <a
                          href={app.linkedin_url.startsWith("http") ? app.linkedin_url : `https://${app.linkedin_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition"
                        >
                          <FaLinkedin /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageApplicants;
