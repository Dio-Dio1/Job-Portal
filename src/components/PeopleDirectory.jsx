import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import { FaUser, FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaGlobe, FaChevronRight } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

const PeopleDirectory = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch candidates (applications)
        const { data: appsData, error: appsError } = await supabase
          .from("applications")
          .select("*")
          .order("applied_at", { ascending: false });

        if (appsError) throw appsError;

        // Group by user_id to get unique candidates (keep latest application)
        const uniqueCandidates = [];
        const seenCandidateIds = new Set();
        (appsData || []).forEach((app) => {
          if (!seenCandidateIds.has(app.user_id)) {
            seenCandidateIds.add(app.user_id);
            uniqueCandidates.push(app);
          }
        });
        setCandidates(uniqueCandidates);

        // Fetch companies (jobs)
        const { data: jobsData, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (jobsError) throw jobsError;

        // Group by company_id to get unique companies (keep latest job posting)
        const uniqueCompanies = [];
        const seenCompanyIds = new Set();
        (jobsData || []).forEach((job) => {
          if (job.company_id && !seenCompanyIds.has(job.company_id)) {
            seenCompanyIds.add(job.company_id);
            uniqueCompanies.push(job);
          }
        });
        setCompanies(uniqueCompanies);
      } catch (err) {
        addToast(err.message || "Failed to load directory data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitials = (name) => {
    return (name || "U").split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            SkillGig <span className="text-green-700">Directory</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover and connect with top talent and leading companies in the community.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-250 flex shadow-sm">
            <button
              onClick={() => setActiveTab("candidates")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition cursor-pointer text-sm ${
                activeTab === "candidates"
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaUser /> Candidates
            </button>
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition cursor-pointer text-sm ${
                activeTab === "companies"
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <FaBriefcase /> Companies
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div>
            {activeTab === "candidates" ? (
              candidates.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
                  <FaUser className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">No candidates in the directory yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      onClick={() => navigate(`/profiles/seeker/${candidate.user_id}`)}
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-xl font-bold text-green-700 shadow-sm shrink-0">
                          {getInitials(candidate.applicant_name)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition">
                            {candidate.applicant_name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                            <FaEnvelope className="text-gray-400" /> {candidate.applicant_email}
                          </p>
                          <span className="inline-block bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-lg font-semibold mt-2.5">
                            Candidate
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-green-700 transition self-center">
                        <FaChevronRight size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              companies.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
                  <FaBriefcase className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">No companies in the directory yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => navigate(`/profiles/company/${company.company_id}`)}
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl font-bold text-purple-700 shadow-sm shrink-0 overflow-hidden">
                          {company.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={company.company}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            getInitials(company.company)
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition">
                            {company.company}
                          </h3>
                          {company.location && (
                            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                              <FaMapMarkerAlt className="text-gray-400" /> {company.location}
                            </p>
                          )}
                          <span className="inline-block bg-purple-50 text-purple-700 text-xs px-2.5 py-1 rounded-lg font-semibold mt-2.5">
                            Employer
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-purple-700 transition self-center">
                        <FaChevronRight size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PeopleDirectory;
