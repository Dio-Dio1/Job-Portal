import { useNavigate, useParams } from "react-router-dom";
import { FiMapPin, FiClock, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { getJobById } from "../data/mockJobs";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJobById(id);

  if (!job) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-green-700 font-semibold hover:underline"
          >
            Back to jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-500 hover:text-green-700 transition-colors mb-6"
        >
          &larr; Back to jobs
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <img
                src={job.logo}
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              <button
                onClick={() => navigate(`/company/${job.companyId}`)}
                className="text-green-600 font-semibold mt-1 hover:underline"
              >
                {job.company}
              </button>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-green-600" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiDollarSign className="text-green-600" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiBriefcase className="text-green-600" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="text-green-600" />
                  Posted {job.postedAt}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/apply")}
              className="shrink-0 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
            >
              Apply Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-gray-600 text-sm"
                  >
                    <span className="text-green-600 mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-600 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl p-6 text-white">
              <h2 className="text-lg font-bold">Interested?</h2>
              <p className="text-green-100 text-sm mt-2">
                Submit your application and let {job.company} know why you are a
                great fit.
              </p>
              <button
                onClick={() => navigate("/apply")}
                className="mt-4 w-full py-2.5 bg-white text-green-800 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                Apply for this role
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
