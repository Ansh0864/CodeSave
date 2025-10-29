import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  Heart, 
  Edit, 
  Trash2, 
  Copy, 
  Download, 
  Share2, 
  Globe, 
  Lock, 
  Calendar,
  Tag,
  User,
  ArrowLeft,
  AlertCircle,
  Code,
  ExternalLink,
  Clock,
  FileText,
  Zap,
  Check,
  Folder 
} from 'lucide-react';
import { formatDateTime, getRelativeTime } from '../utils/date';
import { getLanguageDisplayName, getLanguageColor, getLanguageIcon } from '../utils/syntax';
import { copyToClipboard, downloadFile } from '../utils/helpers';

const ViewPaste = ({ darkMode, pastes, handleDelete, toggleFavorite, folders }) => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // NEW STATE
  
  // Helper to find folder name
  const getFolderName = (folderId) => {
    if (!folderId) return 'Uncategorized';
    const folder = folders.find(f => f._id === folderId);
    return folder ? folder.name : 'Unknown Folder';
  };

  useEffect(() => {
    const foundPaste = pastes.find(p => p._id === id);
    if (foundPaste) {
      setPaste(foundPaste);
      // Increment view count (in a real app, this would be done server-side)
      foundPaste.views = (foundPaste.views || 0) + 1;
    }
    setLoading(false);
  }, [id, pastes]);

  const handleCopy = async () => {
    if (paste?.content) {
      const success = await copyToClipboard(paste.content);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (paste) {
      const extension = getFileExtension(paste.language);
      const filename = `${paste.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${extension}`;
      downloadFile(paste.content, filename, 'text/plain');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.description || 'Check out this code snippet',
          url: url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(url);
      alert('Link copied to clipboard!');
    }
  };

  // MODIFIED FUNCTION
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };
  
  // NEW FUNCTION
  const confirmDelete = () => {
    if (paste) {
      handleDelete(paste._id);
      setShowDeleteConfirm(false);
      navigate('/pastes');
    }
  };

  const getFileExtension = (language) => {
    const extensionMap = {
      javascript: '.js',
      typescript: '.ts',
      python: '.py',
      java: '.java',
      cpp: '.cpp',
      c: '.c',
      html: '.html',
      css: '.css',
      react: '.jsx',
      vue: '.vue',
      php: '.php',
      ruby: '.rb',
      go: '.go',
      rust: '.rs',
      swift: '.swift',
      kotlin: '.kt',
      dart: '.dart',
      sql: '.sql',
      json: '.json',
      xml: '.xml',
      yaml: '.yml',
      markdown: '.md',
      bash: '.sh',
      text: '.txt'
    };
    return extensionMap[language] || '.txt';
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-slate-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Loading paste...</p>
        </div>
      </div>
    );
  }

  if (!paste) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-slate-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <AlertCircle size={64} className={darkMode ? "text-gray-600" : "text-gray-400"} />
          <h2 className={`text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Paste not found
          </h2>
          <p className={`mt-2 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            The paste you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/pastes')}
            className={`mt-6 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
              darkMode 
                ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Back to Pastes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
    }`}>
      {/* Delete Confirmation Modal - NEW */}
      {showDeleteConfirm && (
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
              You are about to permanently delete the paste: <strong className={darkMode ? "text-white" : "text-gray-900"}>"{paste.title}"</strong>. 
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-md border ${
          darkMode 
            ? "bg-slate-800/80 border-slate-700/50" 
            : "bg-white/80 border-white/50"
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6 flex-1">
              <button
                onClick={() => navigate('/pastes')}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="p-4 rounded-2xl shadow-lg"
                    style={{ 
                      backgroundColor: getLanguageColor(paste.language),
                      color: 'white'
                    }}
                  >
                    <span className="text-2xl">{getLanguageIcon(paste.language)}</span>
                  </div>
                  
                  <div>
                    <h1 className={`text-4xl font-bold mb-2`}>
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                        darkMode 
                          ? "from-yellow-400 via-orange-400 to-red-400" 
                          : "from-yellow-600 via-orange-600 to-red-600"
                      }`}>
                        {paste.title}
                      </span>
                      {paste.isFavorite && (
                        <Heart size={28} className="inline-block ml-3 text-red-500 animate-pulse" fill="currentColor" />
                      )}
                    </h1>
                    
                    <div className="flex items-center gap-6 text-sm">
                      {/* Folder Name Display (NEW) */}
                      <div className={`flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <Folder className={darkMode ? "text-yellow-500" : "text-blue-500"} size={16} />
                        <span className="font-medium">
                          {getFolderName(paste.folderId)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {paste.isPrivate ? (
                          <Lock className="text-amber-500" size={16} />
                        ) : (
                          <Globe className="text-green-500" size={16} />
                        )}
                        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                          {paste.isPrivate ? 'Private' : 'Public'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Eye className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                          {paste.views || 0} views
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                          {getRelativeTime(paste.createdAt)}
                        </span>
                      </div>
                      
                      {paste.updatedAt && paste.updatedAt !== paste.createdAt && (
                        <div className="flex items-center gap-2">
                          <Clock className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                            Updated {getRelativeTime(paste.updatedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {paste.description && (
                  <div className={`p-4 rounded-xl mb-4 ${
                    darkMode ? "bg-slate-700/50" : "bg-gray-100"
                  }`}>
                    <div className="flex items-start gap-2">
                      <FileText className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {paste.description}
                      </p>
                    </div>
                  </div>
                )}

                {paste.tags && paste.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className={darkMode ? "text-gray-400" : "text-gray-500"} size={16} />
                    {paste.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode 
                            ? "bg-slate-700 text-gray-300" 
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 ml-4">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                  copySuccess
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : darkMode
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                title="Copy content"
              >
                {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={handleDownload}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Download file"
              >
                <Download size={18} />
              </button>

              <button
                onClick={handleShare}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Share paste"
              >
                <Share2 size={18} />
              </button>

              <button
                onClick={() => toggleFavorite(paste._id)}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  paste.isFavorite
                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : darkMode
                      ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={paste.isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={18} fill={paste.isFavorite ? "currentColor" : "none"} />
              </button>

              <Link
                to={`/edit/${paste._id}`}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Edit paste"
              >
                <Edit size={18} />
              </Link>

              {/* Delete Button - MODIFIED */}
              <button
                onClick={handleDeleteClick}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" 
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
                title="Delete paste"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              {/* Code Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? "border-slate-700 bg-slate-800/90" : "border-gray-200 bg-gray-50/90"
              }`}>
                <div className="flex items-center gap-3">
                  <Code className={darkMode ? "text-yellow-400" : "text-blue-500"} size={20} />
                  <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {getLanguageDisplayName(paste.language)}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getLanguageColor(paste.language) }}
                  >
                    {paste.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {paste.content.split('\n').length} lines • {paste.content.length} characters
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? "hover:bg-slate-700 text-gray-400 hover:text-gray-200" 
                        : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                    }`}
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className={`p-6 ${darkMode ? "bg-slate-900/50" : "bg-gray-50/50"}`}>
                <pre className={`text-sm font-mono whitespace-pre-wrap break-words ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}>
                  <code>{paste.content}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paste Info */}
            <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Paste Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Created
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                    {formatDateTime(paste.createdAt)}
                  </span>
                </div>

                {paste.updatedAt && paste.updatedAt !== paste.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Updated
                    </span>
                    <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                      {formatDateTime(paste.updatedAt)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Views
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                    {paste.views || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Size
                  </span>
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                    {(paste.content.length / 1024).toFixed(2)} KB
                  </span>
                </div>

                {paste.expiresAt && (
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Expires
                    </span>
                    <span className={`text-sm font-medium ${
                      new Date(paste.expiresAt) < new Date() 
                        ? "text-red-500" 
                        : darkMode ? "text-gray-300" : "text-gray-900"
                    }`}>
                      {formatDateTime(paste.expiresAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  to={`/edit/${paste._id}`}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <Edit size={16} />
                  Edit Paste
                </Link>

                <button
                  onClick={handleDownload}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-slate-700 hover:bg-slate-600 text-gray-300" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Download size={16} />
                  Download File
                </button>

                <button
                  onClick={() => window.open(`https://github.com/new/import`, '_blank')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-slate-700 hover:bg-slate-600 text-gray-300" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <ExternalLink size={16} />
                  Open in GitHub
                </button>
              </div>
            </div>

            {/* Related Actions */}
            <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
              darkMode 
                ? "bg-slate-800/80 border-slate-700/50" 
                : "bg-white/80 border-white/50"
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                More Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/create"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-slate-700 hover:bg-slate-600 text-gray-300" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Zap size={16} />
                  Create New Paste
                </Link>

                <Link
                  to="/pastes"
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode 
                      ? "bg-slate-700 hover:bg-slate-600 text-gray-300" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <FileText size={16} />
                  View All Pastes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;