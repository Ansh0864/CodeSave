import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Eye, 
  Heart, 
  Edit, 
  Trash2, 
  Globe, 
  Lock,
  Code,
  Calendar,
  SortAsc,
  SortDesc,
  Folder,
  AlertCircle 
} from 'lucide-react';
import { formatDateTime, getRelativeTime } from '../utils/date';
import { getLanguageDisplayName } from '../utils/syntax';

const Pastes = ({ darkMode, pastes, handleDelete, toggleFavorite, folders, setFolders }) => { 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all'); 
  const [filterType, setFilterType] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // NEW STATE
  const [pasteToDelete, setPasteToDelete] = useState(null); // NEW STATE

  // Get unique languages from pastes
  const languages = [...new Set(pastes.map(paste => paste.language || 'text'))];
  
  // Helper to find folder name
  const getFolderName = (folderId) => {
    // Ensure folders is an array before searching
    const folder = (folders || []).find(f => f._id === folderId);
    return folder ? folder.name : 'Uncategorized';
  };
  
  // NEW FUNCTION
  const triggerDelete = (paste) => {
    setPasteToDelete(paste);
    setShowDeleteConfirm(true);
  };
  
  // NEW FUNCTION
  const confirmDelete = () => {
    if (pasteToDelete) {
      handleDelete(pasteToDelete._id);
      setShowDeleteConfirm(false);
      setPasteToDelete(null);
    }
  };


  // Filter and sort pastes
  const filteredPastes = pastes
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
      
      // Folder filter
      if (selectedFolder !== 'all') {
        if (selectedFolder === 'uncategorized' && paste.folderId) {
          return false;
        }
        if (selectedFolder !== 'uncategorized' && selectedFolder !== paste.folderId) {
          return false;
        }
      }

      // Type filter
      switch (filterType) {
        case 'favorites':
          return paste.isFavorite;
        case 'public':
          return !paste.isPrivate;
        case 'private':
          return paste.isPrivate;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'updated':
          return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
        default:
          return 0;
      }
    });

  const PasteCard = ({ paste }) => (
    <div
      className={`rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
        darkMode ? "bg-slate-800" : "bg-white"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="flex-1 min-w-0"
            onClick={() => navigate(`/pastes/${paste._id}`)}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`font-semibold text-lg truncate ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {paste.title}
              </h3>
              <div className="flex items-center gap-1">
                {paste.isPrivate ? (
                  <Lock size={14} className="text-amber-500" />
                ) : (
                  <Globe size={14} className="text-green-500" />
                )}
                {paste.isFavorite && (
                  <Heart size={14} className="text-red-500" fill="currentColor" />
                )}
              </div>
            </div>
            
            {paste.description && (
              <p className={`text-sm mb-3 line-clamp-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                {paste.description}
              </p>
            )}
            
            {/* Folder Name Display */}
            <div className={`flex items-center gap-1 text-xs mb-3 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <Folder size={12} className="text-yellow-500" />
              <span className="font-medium">{getFolderName(paste.folderId)}</span>
            </div>
            
            <p className={`text-sm mb-4 line-clamp-3 font-mono ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              {paste.content}
            </p>
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
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(paste._id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                paste.isFavorite
                  ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : darkMode
                    ? "text-gray-400 hover:text-red-400 hover:bg-slate-700"
                    : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
              }`}
            >
              <Heart size={16} fill={paste.isFavorite ? "currentColor" : "none"} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit/${paste._id}`);
              }}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? "text-gray-400 hover:text-blue-400 hover:bg-slate-700"
                  : "text-gray-400 hover:text-blue-500 hover:bg-gray-100"
              }`}
            >
              <Edit size={16} />
            </button>
            
            {/* Delete Button - MODIFIED */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerDelete(paste);
              }}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? "text-gray-400 hover:text-red-400 hover:bg-slate-700"
                  : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PasteListItem = ({ paste }) => (
    <div
      className={`rounded-xl shadow-lg p-4 transition-all duration-200 hover:shadow-xl cursor-pointer ${
        darkMode ? "bg-slate-800" : "bg-white"
      }`}
      onClick={() => navigate(`/pastes/${paste._id}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              {paste.title}
            </h3>
            <div className="flex items-center gap-1">
              {paste.isPrivate ? (
                <Lock size={12} className="text-amber-500" />
              ) : (
                <Globe size={12} className="text-green-500" />
              )}
              {paste.isFavorite && (
                <Heart size={12} className="text-red-500" fill="currentColor" />
              )}
            </div>
          </div>
          
          {paste.description && (
            <p className={`text-sm mb-2 line-clamp-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {paste.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs">
            {/* Folder Name Display */}
            <span className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <Folder size={12} className="text-yellow-500" />
              <span className="font-medium">{getFolderName(paste.folderId)}</span>
            </span>
            
            <span className={`px-2 py-1 rounded-full ${
              darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"
            }`}>
              {getLanguageDisplayName(paste.language)}
            </span>
            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
              {paste.views || 0} views
            </span>
            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
              {getRelativeTime(paste.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(paste._id);
            }}
            className={`p-2 rounded-lg transition-colors ${
              paste.isFavorite
                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                : darkMode
                  ? "text-gray-400 hover:text-red-400 hover:bg-slate-700"
                  : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
            }`}
          >
            <Heart size={16} fill={paste.isFavorite ? "currentColor" : "none"} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${paste._id}`);
            }}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? "text-gray-400 hover:text-blue-400 hover:bg-slate-700"
                : "text-gray-400 hover:text-blue-500 hover:bg-gray-100"
            }`}
          >
            <Edit size={16} />
          </button>
          
          {/* Delete Button - MODIFIED */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDelete(paste);
            }}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? "text-gray-400 hover:text-red-400 hover:bg-slate-700"
                : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
            }`}
          >
            <Trash2 size={16} />
          </button>
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
      {/* Delete Confirmation Modal - NEW */}
      {showDeleteConfirm && pasteToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[900]">
          <div className={`p-8 rounded-2xl shadow-2xl w-full max-w-md border ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={28} className="text-red-500 motion-safe:animate-pulse" />
              <h3 className="text-2xl font-bold text-red-500">Confirm Deletion</h3>
            </div>
            <p className="mb-6">
              You are about to permanently delete the paste: <strong className={darkMode ? "text-white" : "text-gray-900"}>"{pasteToDelete.title}"</strong>. 
              <br/>This action cannot be undone. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  darkMode 
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 rounded-xl font-medium transition-colors bg-red-600 hover:bg-red-700 text-white`}
              >
                Delete Paste
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header (existing) */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold flex items-center gap-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <Code className="text-blue-500" />
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-blue-400 via-purple-400 to-pink-400" 
                    : "from-blue-600 via-purple-600 to-pink-600"
                }`}>
                  My Pastes
                </span>
                <span className={`text-xl font-normal ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  ({filteredPastes.length})
                </span>
              </h1>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Manage and organize all your code snippets and notes
              </p>
            </div>
            
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
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search (existing) */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`} />
                <input
                  type="text"
                  placeholder="Search pastes..."
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
              
              {/* Folder Filter (NEW - FIX APPLIED) */}
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="all">All Folders</option>
                <option value="uncategorized">Uncategorized</option>
                {(folders || []).map(folder => (
                  <option key={folder._id} value={folder._id}>
                    {folder.name}
                  </option>
                ))}
              </select>

              {/* Type filter (existing) */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="all">All Pastes</option>
                <option value="favorites">Favorites</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              {/* Language filter (existing) */}
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

              {/* Sort By (existing) */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="views">Most Viewed</option>
                <option value="updated">Recently Updated</option>
              </select>

              {/* View Mode Toggle (existing) */}
              <div className={`flex rounded-xl border-2 ${
                darkMode ? "border-slate-600" : "border-gray-200"
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-xl transition-colors ${
                    viewMode === 'grid'
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : darkMode
                        ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-xl transition-colors ${
                    viewMode === 'list'
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : darkMode
                        ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results (existing) */}
        {filteredPastes.length === 0 ? (
          <div className={`rounded-2xl shadow-lg p-12 text-center ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <Code size={64} className={`mx-auto mb-4 ${
              darkMode ? "text-gray-600" : "text-gray-400"
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              No pastes found
            </h3>
            <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {pastes.length === 0
                ? "You haven't created any pastes yet. Start by creating your first paste!"
                : "Try adjusting your search terms or filters."
              }
            </p>
            <button
              onClick={() => navigate('/create')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                darkMode 
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Plus size={20} />
              Create Your First Paste
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredPastes.map(paste => 
              viewMode === 'grid' 
                ? <PasteCard key={paste._id} paste={paste} />
                : <PasteListItem key={paste._id} paste={paste} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pastes;