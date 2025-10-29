import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Calendar, 
  Code, 
  Activity,
  Users,
  Globe,
  Plus // ADDED Plus icon for CTA
} from 'lucide-react';
import { getLanguageDisplayName } from '../utils/syntax';
import { formatDate } from '../utils/date';
import { useNavigate } from 'react-router-dom'; // ADDED useNavigate

const Analytics = ({ darkMode, pastes }) => {
  const navigate = useNavigate(); // ADDED initialization

  // Calculate analytics data
  const totalPastes = pastes.length;
  const totalViews = 0; // HARDCODED: Total Views set to 0
  const avgViews = 0; // HARDCODED: Average Views set to 0
  const publicPastes = pastes.filter(paste => !paste.isPrivate).length;
  const privatePastes = pastes.filter(paste => paste.isPrivate).length;
  const favoritePastes = pastes.filter(paste => paste.isFavorite).length;

  // Language statistics
  const languageStats = pastes.reduce((acc, paste) => {
    const lang = paste.language || 'text';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const topLanguages = Object.entries(languageStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  // Views over time (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const viewsByDate = last30Days.map(date => {
    const dayPastes = pastes.filter(paste => 
      paste.createdAt && paste.createdAt.startsWith(date)
    );
    const views = dayPastes.reduce((sum, paste) => sum + (paste.views || 0), 0);
    return { date, views, pastes: dayPastes.length };
  });

  // Most viewed pastes
  const topPastes = pastes
    .filter(paste => paste.views && paste.views > 0)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  // Recent activity
  const recentActivity = pastes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend > 0 ? "text-green-500" : trend < 0 ? "text-red-500" : "text-gray-500"
          }`}>
            <TrendingUp size={16} />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div>
        <p className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          {value}
        </p>
        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          {title}
        </p>
        {subtitle && (
          <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold flex items-center gap-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <BarChart3 className="text-blue-500 motion-safe:animate-spin" />
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-blue-400 via-purple-400 to-pink-400" 
                    : "from-blue-600 via-purple-600 to-pink-600"
                }`}>
                  Analytics Dashboard
                </span>
              </h1>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Insights into your paste activity and performance
              </p>
            </div>
            {/* NEW CTA BUTTON */}
            <button
              onClick={() => navigate('/create')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg ${
                darkMode 
                  ? "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-emerald-600/25 motion-safe:animate-pulse" 
                  : "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-emerald-500/25"
              }`}
            >
              <Plus size={20} />
              New Paste
            </button>
            {/* END NEW CTA BUTTON */}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Pastes"
            value={totalPastes}
            subtitle="All time"
            icon={Code}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Total Views"
            value={totalViews.toLocaleString()}
            subtitle="All time"
            icon={Eye}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <StatCard
            title="Average Views"
            value={avgViews}
            subtitle="Per paste"
            icon={TrendingUp}
            color="bg-gradient-to-r from-purple-500 to-pink-600"
          />
          <StatCard
            title="Favorites"
            value={favoritePastes}
            subtitle={`${totalPastes > 0 ? Math.round((favoritePastes / totalPastes) * 100) : 0}% of total`}
            icon={Activity}
            color="bg-gradient-to-r from-red-500 to-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Language Distribution */}
          <div className={`rounded-2xl shadow-xl p-6 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              <Code size={20} />
              Language Distribution
            </h2>
            
            <div className="space-y-4">
              {topLanguages.map(([language, count]) => {
                const percentage = (count / totalPastes) * 100;
                return (
                  <div key={language} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {getLanguageDisplayName(language)}
                      </span>
                      <span className={`font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${
                      darkMode ? "bg-slate-700" : "bg-gray-200"
                    }`}>
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Distribution */}
          <div className={`rounded-2xl shadow-xl p-6 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              <Globe size={20} />
              Privacy Settings
            </h2>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={darkMode ? "#374151" : "#e5e7eb"}
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Public arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${totalPastes > 0 ? (publicPastes / totalPastes) * 251.2 : 0} 251.2`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {totalPastes > 0 ? Math.round((publicPastes / totalPastes) * 100) : 0}%
                      </p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Public
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Public Pastes
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {publicPastes}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Private Pastes
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {privatePastes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Pastes */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <TrendingUp size={20} />
            Top Performing Pastes
          </h2>
          
          {topPastes.length > 0 ? (
            <div className="space-y-3">
              {topPastes.map((paste, index) => (
                <div
                  key={paste._id}
                  className={`p-4 rounded-xl flex items-center justify-between transition-all hover:scale-105 cursor-pointer ${
                    darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      index < 3 
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white motion-safe:animate-bounce"
                        : darkMode
                        ? "bg-slate-600 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {paste.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {getLanguageDisplayName(paste.language)} • {formatDate(paste.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {paste.views} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Eye size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No views yet</p>
              <p className="text-sm">Create more pastes to see performance data</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className={`rounded-2xl shadow-xl p-6 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <Activity size={20} motion-safe:animate-spin />
            Recent Activity
          </h2>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map(paste => (
                <div
                  key={paste._id}
                  className={`p-4 rounded-xl flex items-center justify-between transition-all hover:scale-105 cursor-pointer ${
                    darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div>
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {paste.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {getLanguageDisplayName(paste.language)} • Created {formatDate(paste.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {paste.views || 0} views
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Activity size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No activity yet</p>
              <p className="text-sm">Start creating pastes to see activity here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;