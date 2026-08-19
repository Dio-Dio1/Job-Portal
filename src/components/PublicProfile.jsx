import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import { 
  FaUser, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaFileAlt,
  FaChevronRight,
  FaArrowLeft
} from "react-icons/fa";
import { useToast } from "../context/ToastContext";

const PublicProfile = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [seekerData, setSeekerData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);

  const isCompany = type === "company";

  const parseProfileData = (coverMessage) => {
    if (!coverMessage) return { title: "", bio: "", skills: "", actualCover: "" };
    const match = coverMessage.match(/__PROFILE_DATA__:(.*?)__END_PROFILE_DATA__/s);
    if (match) {
      try {
        const data = JSON.parse(match[1]);
        const actualCover = coverMessage.replace(/__PROFILE_DATA__:.*?__END_PROFILE_DATA__\s*/s, "");
        return {
          title: data.title || "Candidate",
          bio: data.bio || "",
          skills: data.skills || "",
          actualCover
        };
      } catch (e) {
        // Fallback
      }
    }
    return { title: "Candidate", bio: "", skills: "", actualCover: coverMessage };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (isCompany) {
          // Fetch company details by querying jobs table for jobs posted by this company
          const { data, error } = await supabase
            .from("jobs")
            .select("*")
            .eq("company_id", id)
            .order("created_at", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            setCompanyData(data[0]); // get company info from the latest job posting
            setCompanyJobs(data);
          } else {
            addToast("No company record found.", "warning");
          }
        } else {
          // Fetch seeker details by querying applications table
          const { data, error } = await supabase
            .from("applications")
            .select("*")
            .eq("user_id", id)
            .order("applied_at", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            // Find latest application with profile metadata or just the latest one
            const latestApp = data[0];
            const parsed = parseProfileData(latestApp.cover_message);
            setSeekerData({
              name: latestApp.applicant_name,
              email: latestApp.applicant_email,
              github: latestApp.github_url,
              linkedin: latestApp.linkedin_url,
              resume: latestApp.resume_url,
              title: parsed.title,
              bio: parsed.bio,
              skills: parsed.skills,
            });
          } else {
            addToast("This candidate hasn't applied to any jobs yet, so no public profile is available.", "warning");
          }
        }
      } catch (err) {
        addToast(err.message || "Failed to load public profile details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, isCompany]);

  const getInitials = (name) => {
    return (name || "U").split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Seeker Public View
  if (!isCompany) {
    if (!seekerData) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-gray-600 text-lg font-semibold">No profile available for this candidate.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium transition cursor-pointer"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      );
    }

    return (
      <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 font-medium mb-6 flex items-center gap-1.5 cursor-pointer"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-700"></div>
            
            <div className="px-6 pb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
                <div className="w-32 h-32 rounded-2xl bg-green-100 border-4 border-white flex items-center justify-center text-4xl font-bold text-green-700 shadow-md shrink-0">
                  {getInitials(seekerData.name)}
                </div>
                <div className="text-center sm:text-left mt-2">
                  <h1 className="text-2xl font-bold text-gray-900">{seekerData.name}</h1>
                  <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                    <FaEnvelope className="text-gray-400" /> {seekerData.email}
                  </p>
                  <span className="inline-block mt-3 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Job Seeker
                  </span>
                </div>
              </div>

              <hr className="border-gray-150 my-6" />

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Professional Title</h3>
                  <p className="text-gray-900 font-medium mt-1 text-lg">
                    {seekerData.title || "Job Seeker"}
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bio</h3>
                  <p className="text-gray-700 mt-1 whitespace-pre-line leading-relaxed">
                    {seekerData.bio || "No bio summary provided."}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {seekerData.skills ? (
                      seekerData.skills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No skills listed.</p>
                    )}
                  </div>
                </div>

                {/* Portfolio and Social Links */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Links & Attachments</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {seekerData.resume ? (
                      <a
                        href={seekerData.resume.startsWith("http") ? seekerData.resume : `https://${seekerData.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 text-blue-700 font-semibold px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 transition"
                      >
                        <FaFileAlt /> Resume Link
                      </a>
                    ) : (
                      <div className="text-center text-gray-400 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm italic">
                        No Resume
                      </div>
                    )}

                    {seekerData.github ? (
                      <a
                        href={seekerData.github.startsWith("http") ? seekerData.github : `https://${seekerData.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 text-gray-800 font-semibold px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-150 transition"
                      >
                        <FaGithub /> GitHub
                      </a>
                    ) : (
                      <div className="text-center text-gray-400 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm italic">
                        No GitHub
                      </div>
                    )}

                    {seekerData.linkedin ? (
                      <a
                        href={seekerData.linkedin.startsWith("http") ? seekerData.linkedin : `https://${seekerData.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 text-sky-700 font-semibold px-4 py-3 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-100 transition"
                      >
                        <FaLinkedin /> LinkedIn
                      </a>
                    ) : (
                      <div className="text-center text-gray-400 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm italic">
                        No LinkedIn
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Company Public View
  if (!companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-gray-600 text-lg font-semibold">No profile available for this company.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium transition cursor-pointer"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 font-medium mb-6 flex items-center gap-1.5 cursor-pointer"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-700 to-indigo-800"></div>
          
          <div className="px-6 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
              <div className="w-32 h-32 rounded-2xl bg-purple-50 border-4 border-white flex items-center justify-center text-4xl font-bold text-purple-700 shadow-md shrink-0 overflow-hidden">
                {companyData.logo_url ? (
                  <img
                    src={companyData.logo_url}
                    alt={companyData.company}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  getInitials(companyData.company)
                )}
              </div>
              <div className="text-center sm:text-left mt-2">
                <h1 className="text-2xl font-bold text-gray-900">{companyData.company}</h1>
                {companyData.location && (
                  <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                    <FaMapMarkerAlt className="text-gray-400" /> {companyData.location}
                  </p>
                )}
                <span className="inline-block mt-3 bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Employer
                </span>
              </div>
            </div>

            <hr className="border-gray-150 my-6" />

            {/* Links and Jobs */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About the Company</h3>
                <p className="text-gray-700 mt-1.5 whitespace-pre-line leading-relaxed">
                  {companyData.description || "Leading industry employer."}
                </p>
              </div>

              {companyData.logo_url && (
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={companyData.logo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    <FaGlobe /> Website / Link
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Jobs Directory */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Openings ({companyJobs.length})</h2>
        <div className="space-y-4">
          {companyJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="bg-white border border-gray-250 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 flex justify-between items-center cursor-pointer group"
            >
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-750 transition">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.employment_type} • {job.location || "Remote"}</p>
              </div>
              <div className="text-gray-400 group-hover:text-purple-700 transition">
                <FaChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicProfile;
