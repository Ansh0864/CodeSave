import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ADDED useNavigate
import { 
  Users, 
  Globe, 
  TrendingUp, 
  Star, 
  Eye, 
  Calendar,
  Code,
  Search,
  Filter,
  Heart,
  Share,
  Plus // ADDED Plus icon for CTA
} from 'lucide-react';
import { getRelativeTime } from '../utils/date';
import { getLanguageDisplayName } from '../utils/syntax';

const Community = ({ darkMode, pastes, user }) => {
  const navigate = useNavigate(); // ADDED initialization
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Only show public pastes in community
  const publicPastes = pastes.filter(paste => !paste.isPrivate);
  
  // Get unique languages from public pastes
  const languages = [...new Set(publicPastes.map(paste => paste.language || 'text'))];

  // Filter and sort public pastes
  const filteredPastes = publicPastes
    .filter(paste => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (!paste.title.toLowerCase().includes(searchLower) &&
            !paste.content.toLowerCase().includes(searchLower) &&
            !(paste.description || '').toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Language filter
      if (selectedLanguage !== 'all' && paste.language !== selectedLanguage) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'favorites':
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        default:
          return 0;
      }
    });

  // Community stats
  const stats = {
    totalPastes: publicPastes.length,
    totalViews: 0, // HARDCODED to 0
    topLanguage: languages.length > 0 ? languages.sort((a, b) => {
      const aCount = publicPastes.filter(p => p.language === a).length;
      const bCount = publicPastes.filter(p => p.language === b).length;
      return bCount - aCount;
    })[0] : 'text',
    recentActivity: publicPastes.filter(paste => {
      const now = new Date();
      const created = new Date(paste.createdAt);
      const diffDays = (now - created) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    }).length
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
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

  const PasteCard = ({ paste }) => (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
      darkMode ? "bg-slate-800" : "bg-white"
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg truncate ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              {paste.title}
            </h3>
            
            {paste.description && (
              <p className={`text-sm mb-3 line-clamp-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {paste.description}
              </p>
            )}
            
            <p className={`text-sm mb-4 line-clamp-3 font-mono ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              {paste.content}
            </p>
          </div>
          
          <div className="flex items-center gap-1 ml-4">
            {paste.isFavorite && (
              <Heart size={16} className="text-red-500" fill="currentColor" />
            )}
            <Globe size={16} className="text-green-500" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs">
            <span className={`px-2 py-1 rounded-full ${
              darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"
            }`}>
              <Code size={12} className="inline mr-1" />
              {getLanguageDisplayName(paste.language)}
            </span>
            <span className={`flex items-center gap-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Eye size={12} />
              {paste.views || 0}
            </span>
            <span className={`flex items-center gap-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Calendar size={12} />
              {getRelativeTime(paste.createdAt)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? "text-gray-400 hover:text-blue-400 hover:bg-slate-700"
                  : "text-gray-400 hover:text-blue-500 hover:bg-gray-100"
              }`}
            >
              <Share size={16} />
            </button>
          </div>
        </div>
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold flex items-center gap-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <Users className="text-blue-500" />
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-emerald-400 via-cyan-400 to-blue-400" 
                    : "from-emerald-600 via-cyan-600 to-blue-600"
                }`}>
                  Community
                </span>
              </h1>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Discover and share code snippets with the community
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Public Pastes"
            value={stats.totalPastes}
            subtitle="Shared by community"
            icon={Globe}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            subtitle="Community engagement"
            icon={Eye}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <StatCard
            title="Top Language"
            value={getLanguageDisplayName(stats.topLanguage)}
            subtitle="Most popular"
            icon={Code}
            color="bg-gradient-to-r from-purple-500 to-pink-600"
          />
          <StatCard
            title="This Week"
            value={stats.recentActivity}
            subtitle="New pastes"
            icon={TrendingUp}
            color="bg-gradient-to-r from-orange-500 to-red-600 motion-safe:animate-pulse"
          />
        </div>

        {/* Filters */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`} />
                <input
                  type="text"
                  placeholder="Search community pastes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                    darkMode
                      ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="all">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {getLanguageDisplayName(lang)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="favorites">Most Favorited</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPastes.length === 0 ? (
          <div className={`rounded-2xl shadow-lg p-12 text-center ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <Users size={64} className={`mx-auto mb-4 ${
              darkMode ? "text-gray-600" : "text-gray-400"
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              No community pastes found
            </h3>
            <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {publicPastes.length === 0
                ? "Be the first to share a public paste with the community!"
                : "Try adjusting your search terms or filters."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPastes.map(paste => (
              <PasteCard key={paste._id} paste={paste} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;