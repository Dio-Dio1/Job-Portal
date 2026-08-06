import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jobs from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase.js";

const Jobdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const job = jobs.find((j) => j.id === Number(id));

  useEffect(() => {
    if (user && job) {
      // Check if already applied
      const checkApplication = async () => {
        const { data, error } = await supabase
          .from("applications")
          .select("id")
          .eq("user_id", user.id)
          .eq("job_id", job.id)
          .maybeSingle();

        if (data) {
          setApplied(true);
        }
      };
      checkApplication();
    }
  }, [user, job]);

  if (!job) return <p className="text-center py-10">Job not found.</p>;

  const handleApply = async () => {
    if (!user) {
      alert("Please login to apply for this job.");
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("applications")
        .insert([{ user_id: user.id, job_id: job.id }]);

      if (error) throw error;
      setApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 lg:px-20 py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
              <img
                src={job.logo}
                alt={job.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
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

          <button
            onClick={handleApply}
            disabled={applied || loading}
            className={`px-8 py-3 rounded-xl font-medium transition ${
              applied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Applying..." : applied ? "Applied" : "Apply Now"}
          </button>
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
          <p className="text-gray-600 leading-7 mt-3">{job.description}</p>
        </div>

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
          <button
            onClick={handleApply}
            disabled={applied || loading}
            className={`px-8 py-3 rounded-xl font-medium transition ${
              applied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {loading ? "Applying..." : applied ? "Applied" : "Apply for this position"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Jobdetails;