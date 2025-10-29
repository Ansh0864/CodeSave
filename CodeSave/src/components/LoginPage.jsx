import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Layers, Sparkles } from 'lucide-react';

const LoginPage = ({ darkMode, setIsLoggedIn, setUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (newUser) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (isLoginMode) {
      if (!formData.username || !formData.password) {
        setMessage("⚠️ Please enter username and password.");
        return false;
      }
    } else {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage("⚠️ Please fill in all fields.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage("⚠️ Passwords don't match.");
        return false;
      }
      if (formData.password.length < 6) {
        setMessage("⚠️ Password must be at least 6 characters long.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage("⚠️ Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const handleAuth = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const users = getUsers();

      if (isLoginMode) {
        // Sign In
        const existingUser = users.find(
          (u) => u.username === formData.username && u.password === formData.password
        );

        if (existingUser) {
          setMessage("✅ Login successful! Welcome back!");
          setUser({
            name: existingUser.name || existingUser.username,
            email: existingUser.email || 'user@example.com',
            username: existingUser.username,
            joinDate: existingUser.joinDate || new Date().toISOString(),
            bio: existingUser.bio || '',
            location: existingUser.location || '',
            website: existingUser.website || ''
          });
          setTimeout(() => setIsLoggedIn(true), 1500);
        } else {
          setMessage("❌ Invalid username or password.");
        }
      } else {
        // Sign Up
        const userExists = users.find((u) => 
          u.username === formData.username || u.email === formData.email
        );

        if (userExists) {
          setMessage("⚠️ Username or email already exists.");
        } else {
          const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.username,
            joinDate: new Date().toISOString(),
            bio: '',
            location: '',
            website: ''
          };
          saveUser(newUser);
          setMessage("🎉 Account created successfully! You can now sign in.");
          setIsLoginMode(true);
          setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        }
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAuth();
    }
  };

  const resetForm = () => {
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setMessage("");
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center transition-all duration-500 ${
        darkMode ? "bg-slate-900" : ""
      }`}
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg)",
        backgroundBlendMode: darkMode ? "multiply" : "normal",
        backgroundColor: darkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.3)",
      }}
    >
      <div
        className={`p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-opacity-40 w-full max-w-md transition-all duration-500 border ${
          darkMode
            ? "bg-slate-800 text-white border-gray-600"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        <div className="text-center mb-8">
          {/* START: REPLACED LOGO CODE */}
          <div className="inline-flex items-center gap-3 font-bold text-xl group">
            <div className="relative">
              {/* Multi-layered Logo Design */}
              <div className="absolute inset-0 p-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl blur-sm opacity-75 transition-opacity duration-300"></div>
              <div className="relative p-2 bg-gradient-to-br from-emerald-400 via-cyan-400 to-purple-500 rounded-2xl shadow-lg transition-transform duration-500 motion-safe:animate-pulse">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-yellow-400 motion-safe:animate-bounce" />
            </div>
            <span className={`bg-gradient-to-r bg-clip-text text-transparent font-extrabold ${
              darkMode 
                ? "from-emerald-400 via-cyan-400 to-purple-400" 
                : "from-emerald-600 via-blue-600 to-purple-600"
            }`}>
              PasteFlow
            </span>
          </div>
          {/* END: REPLACED LOGO CODE */}
          
          <h2 className="text-3xl font-bold mt-4">
            {isLoginMode ? "Welcome Back" : "Join PasteFlow"}
          </h2>
          <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {isLoginMode
              ? "Sign in to your account"
              : "Create your account and start sharing code"}
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-center mb-6 font-medium transition-all duration-300 ${
              message.includes("✅") || message.includes("🎉")
                ? darkMode
                  ? "bg-green-400 text-slate-900"
                  : "bg-green-600 text-white"
                : darkMode
                ? "bg-red-400 text-slate-900"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`w-full pl-12 pr-5 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                darkMode
                  ? "bg-slate-700 text-white placeholder-gray-400 focus:ring-yellow-400 border border-gray-600"
                  : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 border border-gray-200"
              }`}
            />
          </div>

          {/* Email (Sign Up only) */}
          {!isLoginMode && (
            <div className="relative">
              <Mail
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-12 pr-5 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 text-white placeholder-gray-400 focus:ring-yellow-400 border border-gray-600"
                    : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 border border-gray-200"
                }`}
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <Lock
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`w-full pl-12 pr-12 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                darkMode
                  ? "bg-slate-700 text-white placeholder-gray-400 focus:ring-yellow-400 border border-gray-600"
                  : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 border border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password (Sign Up only) */}
          {!isLoginMode && (
            <div className="relative">
              <Lock
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`w-full pl-12 pr-5 py-4 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 text-white placeholder-gray-400 focus:ring-yellow-400 border border-gray-600"
                    : "bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 border border-gray-200"
                }`}
              />
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleAuth}
          disabled={isLoading}
          className={`w-full mt-8 px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-black"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              {isLoginMode ? "Signing In..." : "Creating Account..."}
            </div>
          ) : isLoginMode ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                resetForm();
              }}
              className={`font-semibold transition-colors ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              {isLoginMode ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;