import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const errors = [];

    if (!isLogin && !formData.name.trim()) {
      errors.push("Name is required.");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!formData.email.includes("@")) {
      errors.push("Please enter a valid email address");
    }

    if (!formData.password) {
      errors.push("Password is required");
    } else if (formData.password.length < 6) {
      errors.push("Password must have more than 6 characters");
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validation();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const userData = {
      name: isLogin
        ? formData.email.split("@")[0]
        : formData.name,
      email: formData.email,
    };

    login(userData);

    console.log("Form submitted");

    navigate("/");
  };

  const switchMode = (mode) => {
    setIsLogin(mode);
    setFormData({ name: "", email: "", password: "" });
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
                onClick={() => {
                  setIsLogin(true);
                  switchMode(true);
                }}
                className={`px-5 py-2 rounded-full ${
                  isLogin
                    ? "bg-green-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => {
                  setIsLogin(false);
                  switchMode(false);
                }}
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

          <form className="space-y-4" onSubmit={handleSubmit}>

            {!isLogin && (

              <div className="relative">

                <FaUser className="absolute left-4 top-3.5 text-gray-400" />

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

              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />

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

              <FaLock className="absolute left-4 top-3.5 text-gray-400" />

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
              type="submit"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>

          </form>

          {/* Rest of your component stays exactly the same */}

        </div>

      </div>

    </div>
  );
}