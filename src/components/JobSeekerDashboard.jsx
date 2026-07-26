import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiBookmark, FiClock, FiArrowRight } from "react-icons/fi";

const stats = [
  { label: "Applications Sent", value: "5", icon: FiBriefcase },
  { label: "Saved Jobs", value: "3", icon: FiBookmark },
  { label: "In Review", value: "2", icon: FiClock },
];

const recentApplications = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Butterfly Technologies",
    status: "In Review",
    appliedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Hardware Engineer",
    company: "Bird Labs",
    status: "Submitted",
    appliedAt: "5 days ago",
  },
  {
    id: 3,
    title: "Cement Engineer",
    company: "SolidBuild",
    status: "Interview",
    appliedAt: "1 week ago",
  },
];

const savedJobs = [
  { id: 1, title: "Software Engineer", company: "Butterfly Technologies" },
  { id: 4, title: "Cement Engineer", company: "SolidBuild" },
];

const statusColors = {
  Submitted: "bg-gray-100 text-gray-700",
  "In Review": "bg-yellow-50 text-yellow-700",
  Interview: "bg-green-50 text-green-700",
};

const JobSeekerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Track your applications and saved jobs.
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-white transition"
          >
            View Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {value}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <Icon className="text-green-700 text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Applications
              </h2>
            </div>

            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {app.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {app.company} &middot; {app.appliedAt}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Saved Jobs</h2>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-green-700 font-semibold hover:underline flex items-center gap-1"
              >
                Browse jobs <FiArrowRight />
              </button>
            </div>

            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {job.company}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="text-sm text-green-700 font-semibold hover:underline"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
