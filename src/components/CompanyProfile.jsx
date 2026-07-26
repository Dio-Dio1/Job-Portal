import { useNavigate, useParams } from "react-router-dom";
import { FiMapPin, FiGlobe, FiUsers } from "react-icons/fi";
import { getCompanyById, getJobsByCompanyId } from "../data/mockJobs";

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = getCompanyById(id);
  const openJobs = getJobsByCompanyId(id);

  if (!company) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Company not found</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-green-700 font-semibold hover:underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <img
              src={company.logo}
              alt={company.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
          </div>

          <div className="text-white">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-emerald-100 mt-1">{company.industry}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-emerald-100">
              <span className="flex items-center gap-1.5">
                <FiMapPin />
                {company.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FiUsers />
                {company.size}
              </span>
              <span className="flex items-center gap-1.5">
                <FiGlobe />
                {company.website}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-20 py-10 space-y-6">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{company.about}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Open Positions ({openJobs.length})
          </h2>

          {openJobs.length === 0 ? (
            <p className="text-gray-500">No open positions at the moment.</p>
          ) : (
            <div className="space-y-4">
              {openJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.location} &middot; {job.salary}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition shrink-0"
                  >
                    View Job
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompanyProfile;
