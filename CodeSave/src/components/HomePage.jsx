import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Eye, 
  Heart, 
  TrendingUp, 
  Calendar,
  Code,
  Clock,
  Star,
  Zap,
  Users,
  Globe,
  BarChart3,
  HelpCircle,
  User,
  ArrowRight,
  Sparkles,
  Activity,
  BookOpen
} from 'lucide-react';
import { getRelativeTime } from '../utils/date';
import { getLanguageDisplayName } from '../utils/syntax';

const HomePage = ({ darkMode, pastes, user, onNavigate }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.(path);
  };

  // Calculate stats
  const totalPastes = pastes.length;
  const totalViews = 0; // HARDCODED: Total Views set to 0
  const favoritePastes = pastes.filter(paste => paste.isFavorite).length;
  const publicPastes = pastes.filter(paste => !paste.isPrivate).length;
  
  // Recent pastes (last 5)
  const recentPastes = pastes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Popular pastes (most viewed)
  const popularPastes = pastes
    .filter(paste => paste.views > 0)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  // Quick action buttons for navigation
  const quickActions = [
    {
      title: "Create Paste",
      description: "Start coding instantly",
      icon: Plus,
      path: "/create",
      color: "from-emerald-500 to-teal-500",
      hoverColor: "from-emerald-600 to-teal-600"
    },
    {
      title: "My Pastes",
      description: "View all your code snippets",
      icon: FileText,
      path: "/pastes",
      color: "from-blue-500 to-indigo-500",
      hoverColor: "from-blue-600 to-indigo-600"
    },
    {
      title: "Analytics",
      description: "Track your coding activity",
      icon: BarChart3,
      path: "/analytics",
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600"
    },
    {
      title: "Community",
      description: "Connect with other developers",
      icon: Users,
      path: "/community",
      color: "from-orange-500 to-red-500",
      hoverColor: "from-orange-600 to-red-600"
    },
    {
      title: "Profile",
      description: "Manage your account",
      icon: User,
      path: "/profile",
      color: "from-cyan-500 to-blue-500",
      hoverColor: "from-cyan-600 to-blue-600"
    },
    {
      title: "Help Center",
      description: "Get support and tutorials",
      icon: HelpCircle,
      path: "/help",
      color: "from-yellow-500 to-orange-500",
      hoverColor: "from-yellow-600 to-orange-600"
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, description, trend }) => (
    <div className={`group relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 transform ${
      darkMode 
        ? "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50" 
        : "bg-white/80 backdrop-blur-sm border border-white/50"
    }`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
            <Icon size={24} className="text-white" />
          </div>
          {trend && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              trend > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-1`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {title}
          </p>
        </div>
        {description && (
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, path, color, hoverColor }) => (
    <button
      onClick={() => handleNavigation(path)}
      className={`group relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 transform text-left w-full ${
        darkMode 
          ? "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50" 
          : "bg-white/80 backdrop-blur-sm border border-white/50"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-all duration-500 motion-safe:animate-pulse`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverColor} opacity-0 group-hover:opacity-90 transition-all duration-500`} />
      <div className="relative z-10 group-hover:text-white transition-colors duration-500">
        <div className="flex items-center justify-between mb-3">
          <Icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
          <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
    </button>
  );

  const PasteCard = ({ paste, showViews = false }) => (
    <div
      onClick={() => handleNavigation(`/pastes/${paste._id}`)}
      className={`group p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        darkMode 
          ? "bg-slate-700/80 hover:bg-slate-600/80 backdrop-blur-sm border border-slate-600/50" 
          : "bg-white/80 hover:bg-gray-50/80 backdrop-blur-sm border border-white/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className={`font-semibold truncate flex-1 group-hover:text-blue-500 transition-colors ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          {paste.title}
        </h4>
        {paste.isFavorite && (
          <Heart size={16} className="text-red-500 ml-2 animate-pulse" fill="currentColor" />
        )}
      </div>
      
      <p className={`text-sm mb-4 line-clamp-2 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        {paste.content}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full font-medium ${
            darkMode ? "bg-slate-600 text-gray-300" : "bg-gray-200 text-gray-700"
          }`}>
            {getLanguageDisplayName(paste.language)}
          </span>
          {showViews && (
            <span className={`flex items-center gap-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Eye size={12} />
              {paste.views || 0}
            </span>
          )}
        </div>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-medium`}>
          {getRelativeTime(paste.createdAt)}
        </span>
      </div>
    </div>
  );

  return (
    <div 
      className={`min-h-screen ${
        darkMode 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-4 px-8 py-4 rounded-3xl mb-8 shadow-2xl backdrop-blur-md border ${
            darkMode 
              ? "bg-slate-800/80 border-slate-700/50" 
              : "bg-white/80 border-white/50"
          }`}>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg motion-safe:animate-bounce">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <h1 className={`text-2xl font-bold mb-1`}>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-cyan-400 via-blue-400 to-purple-400" 
                    : "from-cyan-600 via-blue-600 to-purple-600"
                }`}>
                  Welcome back, {user?.name || 'User'}! 
                </span>
                <Sparkles className="inline-block ml-2 text-yellow-500 motion-safe:animate-bounce" size={20} />
              </h1>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Ready to create something amazing today?
              </p>
            </div>
          </div>

          {/* Main CTA Button - Vibrant/Colorful Button */}
          <button
            onClick={() => handleNavigation('/create')}
            className={`group inline-flex items-center gap-4 px-10 py-5 rounded-3xl font-bold text-xl transition-all duration-500 transform hover:scale-105 shadow-2xl ${
              darkMode 
                ? "bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-emerald-600/25 motion-safe:animate-pulse" 
                : "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-emerald-500/25"
            }`}
          >
            <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            Create New Paste
            <Zap size={24} className="group-hover:scale-125 transition-transform duration-300" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Pastes"
            value={totalPastes}
            icon={FileText}
            color="from-blue-500 to-blue-600"
            description="All your created snippets"
            trend={5}
          />
          <StatCard
            title="Total Views"
            value={totalViews}
            icon={Eye}
            color="from-green-500 to-emerald-600"
            description="Across all your pastes"
            trend={12}
          />
          <StatCard
            title="Favorites"
            value={favoritePastes}
            icon={Heart}
            color="from-red-500 to-pink-600"
            description="Your starred pastes"
            trend={3}
          />
          <StatCard
            title="Public Pastes"
            value={publicPastes}
            icon={Globe}
            color="from-purple-500 to-indigo-600"
            description="Visible to everyone"
            trend={8}
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Pastes */}
          <div className="lg:col-span-2">
            <div className={`rounded-3xl shadow-2xl p-8 backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-2xl font-bold flex items-center gap-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <Clock size={24} className="text-blue-500" />
                  Recent Pastes
                </h2>
                <button
                  onClick={() => handleNavigation('/pastes')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  }`}
                >
                  View All
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentPastes.length > 0 ? (
                  recentPastes.map(paste => (
                    <PasteCard key={paste._id} paste={paste} />
                  ))
                ) : (
                  <div className={`text-center py-12 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <BookOpen size={64} className="mx-auto mb-6 opacity-50 motion-safe:animate-pulse" />
                    <p className="text-xl font-medium mb-3">No pastes yet</p>
                    <p className="text-sm mb-6">Create your first paste to get started!</p>
                    <button
                      onClick={() => handleNavigation('/create')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-transform"
                    >
                      Create First Paste
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Pastes */}
            {popularPastes.length > 0 && (
              <div className={`rounded-3xl shadow-2xl p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-800/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold flex items-center gap-2 mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <TrendingUp size={20} className="text-green-500" />
                  Popular Pastes
                </h3>
                <div className="space-y-4">
                  {popularPastes.map(paste => (
                    <PasteCard key={paste._id} paste={paste} showViews />
                  ))}
                </div>
              </div>
            )}

            {/* Activity Feed */}
            <div className={`rounded-3xl shadow-2xl p-6 backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              <h3 className={`text-xl font-bold flex items-center gap-2 mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <Activity size={20} className="text-orange-500 motion-safe:animate-spin" />
                Activity Feed
              </h3>
              <div className="space-y-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? "bg-slate-700/50" : "bg-gray-100/50"
                }`}>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    🎉 Welcome to PasteFlow! Start by creating your first paste.
                  </p>
                </div>
                {recentPastes.slice(0, 3).map(paste => (
                  <div key={paste._id} className={`p-3 rounded-xl ${
                    darkMode ? "bg-slate-700/50" : "bg-gray-100/50"
                  }`}>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      📝 Created "{paste.title}" {getRelativeTime(paste.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;