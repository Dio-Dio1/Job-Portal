import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker", // Default role
  });

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const errors = [];

    if (!isLogin && !isForgotPassword && !formData.name.trim()) {
      errors.push("Name is required.");
    }

    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!formData.email.includes("@")) {
      errors.push("Please enter a valid email address");
    }

    if (!isForgotPassword) {
      if (!formData.password) {
        errors.push("Password is required");
      } else if (formData.password.length < 6) {
        errors.push("Password must have more than 6 characters");
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validation();

    if (errors.length > 0) {
      errors.forEach((err) => addToast(err, "error"));
      return;
    }

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        if (error) throw error;
        setResetSent(true);
        addToast("Password reset link sent to your email!", "success");
      } else if (isLogin) {
        await login(formData.email, formData.password);
        addToast("Logged in successfully!", "success");
        navigate("/");
      } else {
        const data = await signup(formData.email, formData.password, formData.name, formData.role);
        if (data?.session) {
          addToast("Registration successful! Logged in successfully.", "success");
          navigate("/");
        } else {
          setVerificationRequired(true);
          addToast("Registration successful! Please check your email to verify.", "success");
        }
      }
    } catch (error) {
      addToast(error.message || "An authentication error occurred.", "error");
    }
  };

  const switchMode = (mode) => {
    setIsLogin(mode);
    setIsForgotPassword(false);
    setResetSent(false);
    setVerificationRequired(false);
    setFormData({ name: "", email: "", password: "", role: "seeker" });
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
            <h1 className="text-3xl font-bold text-white">SkillGig</h1>
          </div>

          <h2 className="text-2xl font-bold text-white">
            Find your next opportunity.
          </h2>

          <p className="text-gray-300 mt-3">
            Connect with companies, discover jobs, and grow your career.
          </p>

          <div className="mt-6 space-y-3 text-gray-700">
            <div className="flex items-center gap-3 text-white">
              <span className="bg-white p-2 rounded-lg text-green-600">✓</span>
              Thousands of job opportunities
            </div>
            <div className="flex items-center gap-3 text-white">
              <span className="bg-white p-2 rounded-lg text-green-600">✓</span>
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
                onClick={() => switchMode(true)}
                className={`px-5 py-2 rounded-full cursor-pointer transition-colors ${
                  isLogin && !isForgotPassword ? "bg-green-600 text-white" : "text-gray-600"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => switchMode(false)}
                className={`px-5 py-2 rounded-full cursor-pointer transition-colors ${
                  !isLogin ? "bg-green-600 text-white" : "text-gray-600"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {verificationRequired ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify your email</h2>
              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm leading-relaxed mb-6">
                We've sent a verification link to <strong className="font-semibold">{formData.email}</strong>. Please check your inbox and click the link to activate your account.
              </div>
              <button
                onClick={() => switchMode(true)}
                className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer"
              >
                ← Back to Login
              </button>
            </div>
          ) : isForgotPassword ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">Reset Password</h2>
              <p className="text-center text-gray-500 text-sm mt-2 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {resetSent ? (
                <div className="text-center">
                  <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-sm mb-6">
                    A password reset link has been sent to your email address.
                  </div>
                  <button
                    onClick={() => switchMode(true)}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer"
                  >
                    ← Back to Login
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
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

                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold cursor-pointer"
                    type="submit"
                  >
                    Send Reset Link
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => switchMode(true)}
                      className="text-gray-500 hover:text-gray-700 text-xs font-semibold cursor-pointer"
                    >
                      Cancel and Back to Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>

              <p className="text-center text-gray-500 text-sm mt-2 mb-6">
                {isLogin ? "Login to continue to SkillGig" : "Join SkillGig today"}
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">I want to register as a:</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded-xl py-3 px-4 bg-white outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                      >
                        <option value="seeker">Job Seeker</option>
                        <option value="company">Employer / Company</option>
                      </select>
                    </div>
                  </>
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

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs font-semibold text-green-600 hover:text-green-700 cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold cursor-pointer"
                  type="submit"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}