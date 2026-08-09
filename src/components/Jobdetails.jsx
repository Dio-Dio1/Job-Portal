import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [applied, setApplied] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (error) throw error;
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err.message);
      } finally {
        setLoadingJob(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  useEffect(() => {
    if (user && id) {
      const checkApplication = async () => {
        const { data, error } = await supabase
          .from("applications")
          .select("id")
          .eq("user_id", user.id)
          .eq("job_id", Number(id))
          .maybeSingle();

        if (data) {
          setApplied(true);
        }
      };
      checkApplication();
    }
  }, [user, id]);

  const handleApply = async () => {
    if (!user) {
      alert("Please login to apply for this job.");
      navigate("/auth");
      return;
    }

    setLoadingApply(true);
    try {
      const { error } = await supabase
        .from("applications")
        .insert([{ 
          user_id: user.id, 
          job_id: job.id, 
          status: "Pending",
          applicant_name: user.user_metadata?.display_name || user.email?.split("@")[0] || "Anonymous",
          applicant_email: user.email
        }]);

      if (error) throw error;
      setApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to submit application.");
    } finally {
      setLoadingApply(false);
    }
  };

  if (loadingJob) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <p className="text-gray-600 text-lg font-semibold">Job not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              {job.logo_url ? (
                <img
                  src={job.logo_url}
                  alt={job.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-green-700">
                  {job.company?.[0]}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-green-600 font-semibold mt-1">
                {job.company}
              </p>
            </div>
          </div>

          {user?.user_metadata?.role === "company" ? (
            <span className="text-gray-500 font-semibold bg-gray-100 px-5 py-3 rounded-xl text-sm">
              Logged in as Employer
            </span>
          ) : (
            <button
              onClick={handleApply}
              disabled={applied || loadingApply}
              className={`px-8 py-3 rounded-xl font-medium transition cursor-pointer ${
                applied
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loadingApply ? "Applying..." : applied ? "Applied" : "Apply Now"}
            </button>
          )}
        </div>

        {/* Job Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold text-gray-900 mt-1">{job.location}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-semibold text-gray-900 mt-1">{job.salary}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
          <p className="text-gray-600 leading-7 mt-3 whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
            <ul className="list-disc list-inside text-gray-600 mt-3 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* About Role */}
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">About This Role</h2>
          <p className="text-gray-600 leading-7 mt-3">
            Join {job.company} and work on exciting projects using modern
            technologies. This role provides opportunities to learn, grow,
            and contribute to impactful solutions.
          </p>
        </div>

        {/* Bottom Button */}
        <div className="mt-10 flex justify-end">
          {user?.user_metadata?.role === "company" ? (
            <span className="text-gray-500 font-semibold bg-gray-100 px-5 py-3 rounded-xl text-sm">
              Logged in as Employer
            </span>
          ) : (
            <button
              onClick={handleApply}
              disabled={applied || loadingApply}
              className={`px-8 py-3 rounded-xl font-medium transition cursor-pointer ${
                applied
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {loadingApply ? "Applying..." : applied ? "Applied" : "Apply for this position"}
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default Jobdetails;