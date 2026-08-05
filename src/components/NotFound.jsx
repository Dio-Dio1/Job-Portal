import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 bg-gray-50">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-3xl animate-bounce">
          <FaExclamationTriangle />
        </div>
        
        <div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mt-2">Page Not Found</h2>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <button 
          onClick={() => navigate("/")}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        >
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
