import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  FileText, 
  User, 
  BarChart3, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Menu,
  X,
  Users,
  HelpCircle,
  Code,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Zap,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const Navbar = ({ 
  darkMode, 
  setDarkMode, 
  handleLogout, 
  onSettingsClick, 
  user,
  navigationHistory = ['/'],
  currentHistoryIndex = 0,
  setCurrentHistoryIndex,
  onNavigate 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // NEW STATE

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/create', label: 'Create', icon: Plus },
    { path: '/pastes', label: 'Pastes', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/help', label: 'Help', icon: HelpCircle }
  ];

  // MODIFIED FUNCTION
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsMobileMenuOpen(false);
  };
  
  // NEW FUNCTION
  const confirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleBackward = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      const targetPath = navigationHistory[newIndex];
      setCurrentHistoryIndex(newIndex);
      navigate(targetPath);
    }
  };

  const handleForward = () => {
    if (currentHistoryIndex < navigationHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      const targetPath = navigationHistory[newIndex];
      setCurrentHistoryIndex(newIndex);
      navigate(targetPath);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getBreadcrumb = () => {
    const pathMap = {
      '/': 'Home',
      '/create': 'Create Paste',
      '/pastes': 'My Pastes',
      '/analytics': 'Analytics',
      '/community': 'Community',
      '/help': 'Help Center',
      '/profile': 'Profile',
      '/settings': 'Settings'
    };
    return pathMap[location.pathname] || 'Page';
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[900]">
          <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-sm border ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <LogOut size={24} className="text-red-500" />
              <h3 className="text-xl font-bold">Confirm Logout</h3>
            </div>
            <p className="mb-6">
              Are you sure you want to log out of your PasteFlow session?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  darkMode 
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className={`px-4 py-2 rounded-xl font-medium transition-colors bg-red-600 hover:bg-red-700 text-white`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        darkMode 
          ? "bg-slate-900/95 border-slate-700/50 shadow-xl shadow-slate-900/10" 
          : "bg-white/95 border-gray-200/50 shadow-xl shadow-gray-900/10"
      } border-b backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo ... (rest of the logo code) */}
            <Link to="/" className="flex items-center gap-3 font-bold text-xl group">
              <div className="relative">
                {/* Multi-layered Logo Design */}
                <div className="absolute inset-0 p-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-2 bg-gradient-to-br from-emerald-400 via-cyan-400 to-purple-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500 motion-safe:animate-pulse">
                  <Layers className="w-6 h-6 text-white" />
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
            </Link>
            {/* End Logo */}

            {/* Navigation Controls ... (rest of the nav controls) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={handleBackward}
                disabled={currentHistoryIndex <= 0}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentHistoryIndex <= 0
                    ? darkMode
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-300 cursor-not-allowed"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-800 hover:scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105"
                }`}
                title="Go back"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleForward}
                disabled={currentHistoryIndex >= navigationHistory.length - 1}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentHistoryIndex >= navigationHistory.length - 1
                    ? darkMode
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-300 cursor-not-allowed"
                    : darkMode
                      ? "text-gray-300 hover:text-white hover:bg-slate-800 hover:scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105"
                }`}
                title="Go forward"
              >
                <ChevronRight size={18} />
              </button>
              <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                darkMode ? "bg-slate-800 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
                <Navigation size={12} className="inline mr-1" />
                {getBreadcrumb()}
              </div>
            </div>

            {/* Desktop Navigation ... (rest of the desktop nav) */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => onNavigate?.(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                      isActive(item.path)
                        ? darkMode
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                        : darkMode
                          ? "text-gray-300 hover:text-white hover:bg-slate-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                    {item.path === '/create' && (
                      <Zap size={14} className="text-yellow-400 animate-pulse motion-safe:animate-ping" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side controls ... (rest of the right controls) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-800 text-cyan-400 hover:bg-slate-700 shadow-lg motion-safe:animate-spin"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-lg"
                }`}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Settings */}
              <button
                onClick={onSettingsClick}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-800 text-gray-300 hover:bg-slate-700 shadow-lg" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-lg"
                }`}
                title="Settings"
              >
                <Settings size={18} />
              </button>

              {/* Profile dropdown */}
              <div className="relative group">
                <Link
                  to="/profile"
                  onClick={() => onNavigate?.('/profile')}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive('/profile')
                      ? darkMode
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : darkMode
                        ? "bg-slate-800 text-gray-300 hover:bg-slate-700 shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-lg"
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg motion-safe:animate-bounce">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                </Link>
              </div>

              {/* Logout Button - MODIFIED */}
              <button
                onClick={handleLogoutClick}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? "bg-red-900/30 text-red-400 hover:bg-red-900/50 shadow-lg" 
                    : "bg-red-50 text-red-600 hover:bg-red-100 shadow-lg"
                }`}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                darkMode 
                  ? "bg-slate-800 text-gray-300 hover:bg-slate-700 shadow-lg" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-lg"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${
              darkMode ? "border-slate-700" : "border-gray-200"
            }`}>
              {/* Mobile Navigation Controls ... (rest of the mobile nav controls) */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={handleBackward}
                  disabled={currentHistoryIndex <= 0}
                  className={`p-2 rounded-xl transition-all ${
                    currentHistoryIndex <= 0
                      ? darkMode ? "text-gray-600" : "text-gray-300"
                      : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleForward}
                  disabled={currentHistoryIndex >= navigationHistory.length - 1}
                  className={`p-2 rounded-xl transition-all ${
                    currentHistoryIndex >= navigationHistory.length - 1
                      ? darkMode ? "text-gray-600" : "text-gray-300"
                      : darkMode ? "text-gray-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
                <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  darkMode ? "bg-slate-800 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}>
                  {getBreadcrumb()}
                </div>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate?.(item.path);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive(item.path)
                          ? darkMode
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : darkMode
                            ? "text-gray-300 hover:bg-slate-800"
                            : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                      {item.path === '/create' && (
                        <Zap size={16} className="text-yellow-400 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
                
                <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => {
                      setDarkMode(!darkMode);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      darkMode 
                        ? "text-cyan-400 hover:bg-slate-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  
                  <button
                    onClick={() => {
                      onSettingsClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      darkMode 
                        ? "text-gray-300 hover:bg-slate-800" 
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Settings size={20} />
                    Settings
                  </button>
                  
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate?.('/profile');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive('/profile')
                        ? darkMode
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : darkMode
                          ? "text-gray-300 hover:bg-slate-800"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  
                  {/* Logout Button (Mobile) - MODIFIED */}
                  <button
                    onClick={handleLogoutClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      darkMode 
                        ? "text-red-400 hover:bg-red-900/30" 
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;