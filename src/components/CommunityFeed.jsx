import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

const CommunityFeed = () => {
  return (
    <div className="hidden lg:block p-20 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl p-10 min-h-[560px] flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight leading-tight text-center text-gray-900">
          Ready to Register your{" "}
          <span className="text-green-700">GiG?</span>
        </h1>

        <p className="text-center text-gray-500 leading-relaxed">
          Login to officially showcase your skills to the world of
          opportunities.
        </p>

        {/* Google */}
        <button className="w-full mt-8 flex items-center justify-center gap-3 py-3 rounded-2xl border border-gray-200 bg-white text-gray-800 text-lg font-medium shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Facebook */}
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-[#1877F2] text-white text-lg font-medium shadow-md hover:bg-[#166FE5] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          <FaFacebookF className="text-lg" />
          Continue with Facebook
        </button>

        {/* Apple */}
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-black text-white text-lg font-medium shadow-md hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          <FaApple className="text-xl" />
          Continue with Apple
        </button>

        <p className="mt-auto text-center text-sm leading-6 text-gray-500">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-green-700 font-medium underline underline-offset-4 hover:text-green-800 transition-colors"
          >
            User Agreement
          </a>{" "}
          and acknowledge that you understand the{" "}
          <a
            href="#"
            className="text-green-700 font-medium underline underline-offset-4 hover:text-green-800 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default CommunityFeed;