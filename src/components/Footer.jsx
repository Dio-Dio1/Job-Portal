import { useNavigate } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Home", path: "/" },
    { label: "Trending Jobs", path: "/#trending" },
    { label: "Community", path: "/#community" },
  ],
  Account: [
    { label: "Login", path: "/auth" },
    { label: "My Dashboard", path: "/dashboard" },
    { label: "My Profile", path: "/profile" },
  ],
  Employers: [
    { label: "Employer Dashboard", path: "/employer/dashboard" },
    { label: "Post a Job", path: "/jobposting" },
  ],
};

const Footer = () => {
  const navigate = useNavigate();

  const handleLink = (path) => {
    if (path.includes("#")) {
      navigate("/");
      return;
    }
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Skill<span className="text-green-500">Gig</span>
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              One platform. Endless opportunities. Connect with companies hiring
              across Nepal.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {section}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLink(link.path)}
                      className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SkillGig. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-green-400 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-green-400 transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
