import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onSwitchToSignup }) => {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await login(form);
    if (result.success) {
      setForm({ username: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
        {/* Logo/Avatar */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center shadow-lg mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl text-white">📝</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-800 mb-1 sm:mb-2 tracking-tight text-center">Sign In</h1>
          <p className="text-gray-500 text-xs sm:text-sm text-center px-2">Welcome back to your notes!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-5">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-user text-sm"></i>
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 bg-white/60 focus:bg-white/90 shadow-sm text-sm ${
                  errors.username
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                } outline-none focus:ring-2 focus:ring-blue-100`}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-lock text-sm"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-9 pr-4 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 bg-white/60 focus:bg-white/90 shadow-sm text-sm ${
                  errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-400"
                } outline-none focus:ring-2 focus:ring-blue-100`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg text-sm mt-4 sm:mt-6"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-600 text-xs sm:text-sm">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200 underline underline-offset-2"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 