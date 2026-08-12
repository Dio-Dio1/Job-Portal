import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    ...(user && user.user_metadata?.role === "company"
      ? [{ name: "Employer Dashboard", path: "/company" }]
      : user
      ? [{ name: "Applied Jobs", path: "/applied" }]
      : []),
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path) navigate(path);
  };

  return (
    <>
      <nav className="h-20 bg-white text-black flex items-center justify-between px-5 md:px-10 lg:px-16 shadow-sm sticky top-0 z-50 transition-all duration-300">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold tracking-tight cursor-pointer">
          <h1 onClick={() => navigate("/")}>
            Skill<span className="text-green-700">Gig:</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-base font-medium">
          <ul className="flex items-center gap-7">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  href="#"
                  className="relative transition-colors duration-300 hover:text-green-700 group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="font-semibold text-gray-700">{user?.user_metadata?.display_name || user?.email}</span>
                <button
                  onClick={logout}
                  className="rounded-full px-6 py-2.5 bg-red-600 text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="cursor-pointer transition-all duration-300 hover:text-green-700 hover:-translate-y-0.5"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-full px-6 py-2.5 bg-green-700 text-white shadow-md transition-all duration-300 hover:bg-green-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden text-2xl cursor-pointer text-gray-700 z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6 gap-6">
          <ul className="flex flex-col gap-5 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  href="#"
                  className="block py-2 text-gray-800 hover:text-green-700 transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 pt-6 mt-4 flex flex-col gap-4">
            {user ? (
              <>
                <div className="text-gray-600 mb-2">
                  Logged in as: <span className="font-bold text-gray-900">{user?.user_metadata?.display_name || user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full text-center rounded-xl py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/auth")}
                  className="w-full text-center rounded-xl py-3 border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/auth")}
                  className="w-full text-center rounded-xl py-3 bg-green-700 text-white font-medium hover:bg-green-800 transition"
                >
                  SignUp
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;