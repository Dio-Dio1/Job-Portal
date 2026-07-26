import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Trending Jobs", path: "/#trending" },
  { name: "Community", path: "/#community" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
];

const scrollToSection = (hash) => {
  setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNav = (path) => {
    closeMenu();

    if (path.includes("#")) {
      const hash = path.split("#")[1];

      if (location.pathname === "/") {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        scrollToSection(hash);
      }
      return;
    }

    navigate(path);
  };

  return (
    <>
      <nav className="relative z-40 h-20 bg-white text-black flex items-center justify-between px-5 md:px-10 lg:px-16 shadow-sm">
        <div
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold tracking-tight cursor-pointer"
        >
          Skill<span className="text-green-700">Gig:</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8 text-base font-medium">
          <ul className="flex items-center gap-7">
            {navLinks.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNav(item.path)}
                  className="relative transition-colors duration-300 hover:text-green-700 group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-green-700 transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer transition-all duration-300 hover:text-green-700 hover:-translate-y-0.5"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="rounded-full px-6 py-2.5 bg-green-700 text-white shadow-md transition-all duration-300 hover:bg-green-800 hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-2xl text-gray-700 hover:text-green-700 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="text-xl font-bold">
            Skill<span className="text-green-700">Gig</span>
          </span>
          <button
            onClick={closeMenu}
            className="p-2 text-xl text-gray-500 hover:text-green-700 transition-colors"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <ul className="p-5 space-y-1">
          {navLinks.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNav(item.path)}
                className="w-full text-left px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 space-y-3">
          <button
            onClick={() => {
              closeMenu();
              navigate("/auth");
            }}
            className="w-full py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Login
          </button>

          <button
            onClick={() => {
              closeMenu();
              navigate("/auth");
            }}
            className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
