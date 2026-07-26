import { FiMail, FiMapPin, FiEdit2, FiGithub, FiLinkedin } from "react-icons/fi";

const skills = ["React", "JavaScript", "Node.js", "Tailwind CSS", "Git", "REST APIs"];
const experience = [
  {
    title: "Frontend Developer Intern",
    company: "TechStart Nepal",
    period: "Jun 2025 – Present",
    description: "Built responsive UI components and integrated REST APIs for a SaaS dashboard.",
  },
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "Jan 2024 – May 2025",
    description: "Delivered landing pages and portfolio sites for small businesses.",
  },
];

const JobSeekerProfile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white text-3xl font-bold shrink-0">
              JS
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Jane Doe
                  </h1>
                  <p className="text-green-600 font-medium mt-1">
                    Frontend Developer
                  </p>
                </div>

                <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <FiEdit2 />
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiMail className="text-green-600" />
                  jane.doe@email.com
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-green-600" />
                  Kathmandu, Nepal
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <FiGithub className="text-gray-600" />
                </button>
                <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                  <FiLinkedin className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Passionate frontend developer with experience building modern web
            applications. Looking for opportunities to grow with innovative teams
            building products that make a difference.
          </p>
        </div>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-green-200 pl-5"
              >
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-green-600 font-medium">
                  {item.company}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.period}</p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
