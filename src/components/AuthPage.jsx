import { useState } from "react";
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

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
                onClick={() => setIsLogin(true)}
                className={`px-5 py-2 rounded-full ${
                  isLogin
                    ? "bg-green-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>


              <button
                onClick={() => setIsLogin(false)}
                className={`px-5 py-2 rounded-full ${
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




          <form className="space-y-4">


            {!isLogin && (

              <div className="relative">

                <FaUser className="absolute left-4 top-3.5 text-gray-400"/>

                <input
                name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            )}




            <div className="relative">

              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400"/>

              <input
                onChange={handleChange}
                name="email"
                value={formData.email}
                placeholder="Email address"
                type="email"
                className="w-full border rounded-xl py-3 pl-11 outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>




            <div className="relative">

              <FaLock className="absolute left-4 top-3.5 text-gray-400"/>

              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-xl py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-green-500"
              />


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>


            </div>




            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
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
            className="w-full border rounded-xl py-3 flex justify-center items-center gap-2 hover:bg-gray-50"
          >

            <FcGoogle size={22}/>

            Continue with Google

          </button>





          <p className="text-center text-sm text-gray-500 mt-5">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}


            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>

          </p>

        </div>

      </div>

    </div>
    
  );
}