import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaBriefcase } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand/About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white p-2.5 rounded-lg">
                <FaBriefcase size={20} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Skill<span className="text-green-500">Gig</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mt-2">
              The leading job portal in Nepal, helping professionals connect with high-growth companies. Explore endless opportunities and grow your career.
            </p>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">For Candidates</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/" className="hover:text-green-500 transition">Browse Jobs</a></li>
              <li><a href="/applied" className="hover:text-green-500 transition">Applied Jobs</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5">Keep in Touch</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get the latest jobs and career updates sent to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex rounded-xl overflow-hidden bg-gray-800 p-1 border border-gray-700">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent px-3 py-2 text-sm text-white outline-none flex-1"
              />
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SkillGig. All rights reserved. Made for job seekers in Nepal.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, url: "#" },
              { icon: <FaTwitter />, url: "#" },
              { icon: <FaLinkedinIn />, url: "#" },
              { icon: <FaGithub />, url: "#" },
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
