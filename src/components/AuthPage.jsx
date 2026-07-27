import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBriefcase,
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("jobseeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Simulate login / signup using context
    login(email, role, name || (role === "jobseeker" ? "Jane Doe" : "Tech Corp"));
    
    // Redirect based on selected role
    if (role === "jobseeker") {
      navigate("/dashboard");
    } else {
      navigate("/employer/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] flex items-center justify-center p-5">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* BRAND SIDE */}

        <div className="bg-green-700 p-8 flex flex-col justify-center">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-green-600 text-white p-3 rounded-xl">
              <FaBriefcase size={25} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              SkillGig
            </h1>

          </div>


          <h2 className="text-2xl font-bold text-white">
            Find your next opportunity.
          </h2>

          <p className="text-gray-300 mt-3">
            Connect with companies, discover jobs,
            and grow your career.
          </p>


          <div className="mt-6 space-y-3 text-gray-700">

            <div className="flex items-center gap-3 text-white">
              <span className="bg-white p-2 rounded-lg text-green-600">
                ✓
              </span>
              Thousands of job opportunities
            </div>


            <div className="flex items-center gap-3 text-white">
              <span className="bg-white p-2 rounded-lg text-green-600">
                ✓
              </span>
              Connect with companies
            </div>

          </div>

        </div>


        {/* FORM SIDE */}

        <div className="p-8">


          <div className="flex justify-center mb-6">

            <div className="bg-gray-100 rounded-full p-1">

              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`px-5 py-2 rounded-full cursor-pointer ${
                  isLogin
                    ? "bg-green-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>


              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`px-5 py-2 rounded-full cursor-pointer ${
                  !isLogin
                    ? "bg-green-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Sign Up
              </button>

            </div>

          </div>


          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>


          <p className="text-center text-gray-500 text-sm mt-2 mb-6">
            {isLogin
              ? "Login to continue to SkillGig"
              : "Join SkillGig today"}
          </p>



          <form onSubmit={handleSubmit} className="space-y-4">


            {!isLogin && (

              <div className="relative">

                <FaUser className="absolute left-4 top-3.5 text-gray-400"/>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

              </div>

            )}



            <div className="relative">

              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400"/>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

            </div>




            <div className="relative">

              <FaLock className="absolute left-4 top-3.5 text-gray-400"/>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full border rounded-xl py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-green-500"
                required
              />


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>


            </div>



            <div>

              <p className="font-medium text-gray-700 mb-2">
                {isLogin ? "Login as" : "Join as"}
              </p>


              <div className="grid grid-cols-2 gap-3">


                <button
                  type="button"
                  onClick={() => setRole("jobseeker")}
                  className={`border rounded-xl p-3 cursor-pointer transition ${
                    role === "jobseeker"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >

                  <FaUser className="mx-auto text-green-600"/>

                  <p className="text-sm font-semibold mt-2">
                    Job Seeker
                  </p>

                </button>



                <button
                  type="button"
                  onClick={() => setRole("company")}
                  className={`border rounded-xl p-3 cursor-pointer transition ${
                    role === "company"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >

                  <FaBuilding className="mx-auto text-green-600"/>

                  <p className="text-sm font-semibold mt-2">
                    Company
                  </p>

                </button>


              </div>

            </div>



            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold cursor-pointer transition">
              {isLogin ? "Login" : "Create Account"}
            </button>


          </form>




          <div className="flex items-center gap-3 my-5">

            <div className="h-px bg-gray-200 flex-1"/>

            <span className="text-gray-400 text-sm">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1"/>

          </div>




          <button
            type="button"
            onClick={() => {
              login("google-user@example.com", role, "Google User");
              navigate(role === "jobseeker" ? "/dashboard" : "/employer/dashboard");
            }}
            className="w-full border border-gray-200 rounded-xl py-3 flex justify-center items-center gap-2 hover:bg-gray-50 cursor-pointer transition"
          >

            <FcGoogle size={22}/>

            Continue with Google

          </button>



          <p className="text-center text-sm text-gray-500 mt-5">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}


            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 font-semibold cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>

          </p>


        </div>

      </div>

    </div>
  );
}
