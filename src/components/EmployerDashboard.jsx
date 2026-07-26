import { useNavigate } from "react-router-dom";
import { FiPlus, FiUsers, FiEye, FiEdit2 } from "react-icons/fi";

const stats = [
  { label: "Active Jobs", value: "4", icon: FiEye },
  { label: "Total Applicants", value: "28", icon: FiUsers },
  { label: "New This Week", value: "6", icon: FiPlus },
];

const postedJobs = [
  {
    id: 1,
    title: "Software Engineer",
    applicants: 12,
    status: "Active",
    postedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Product Designer",
    applicants: 8,
    status: "Active",
    postedAt: "1 week ago",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    applicants: 5,
    status: "Closed",
    postedAt: "2 weeks ago",
  },
  {
    id: 4,
    title: "Marketing Intern",
    applicants: 3,
    status: "Active",
    postedAt: "3 days ago",
  },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employer Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your job posts and review applicants.
            </p>
          </div>

          <button
            onClick={() => navigate("/jobposting")}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
          >
            <FiPlus />
            Post a Job
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

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Your Job Posts</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">Job Title</th>
                  <th className="px-6 py-3 font-medium">Applicants</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Posted</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {postedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {job.applicants}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          job.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{job.postedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                          <FiUsers className="text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                          <FiEdit2 className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployerDashboard;
