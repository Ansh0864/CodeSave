import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Upload, 
  Eye, 
  EyeOff, 
  Lock, 
  Globe, 
  Copy,
  X,
  FileCode,
  ArrowLeft,
  AlertCircle,
  Zap
} from 'lucide-react';
import { LANGUAGE_TEMPLATES, SUPPORTED_LANGUAGES } from '../utils/templates';

const EditPaste = ({ darkMode, pastes, updatePaste, userPreferences = {} }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'javascript',
    description: '',
    isPrivate: false,
    expiresAt: '',
    tags: ''
  });
  
  const [originalPaste, setOriginalPaste] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Load paste data on component mount
  useEffect(() => {
    const paste = pastes.find(p => p._id === id);
    if (paste) {
      const tagsString = Array.isArray(paste.tags) ? paste.tags.join(', ') : '';
      setFormData({
        title: paste.title || '',
        content: paste.content || '',
        language: paste.language || 'javascript',
        description: paste.description || '',
        isPrivate: paste.isPrivate || false,
        expiresAt: paste.expiresAt || '',
        tags: tagsString
      });
      setOriginalPaste(paste);
    } else {
      // Paste not found, redirect back
      navigate('/pastes');
    }
  }, [id, pastes, navigate]);

  // Check for changes
  useEffect(() => {
    if (!originalPaste) return;
    
    const originalTags = Array.isArray(originalPaste.tags) ? originalPaste.tags.join(', ') : '';
    const hasContentChanges = (
      formData.title !== (originalPaste.title || '') ||
      formData.content !== (originalPaste.content || '') ||
      formData.language !== (originalPaste.language || 'javascript') ||
      formData.description !== (originalPaste.description || '') ||
      formData.isPrivate !== (originalPaste.isPrivate || false) ||
      formData.expiresAt !== (originalPaste.expiresAt || '') ||
      formData.tags !== originalTags
    );
    
    setHasChanges(hasContentChanges);
  }, [formData, originalPaste]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setFormData(prev => ({
      ...prev,
      language
    }));
  };

  const handleFileUpload = (files) => {
    const fileList = Array.from(files);
    const textFiles = fileList.filter(file => 
      file.type.startsWith('text/') || 
      file.name.match(/\.(js|jsx|ts|tsx|py|java|cpp|c|h|css|html|xml|json|md|txt|sql|php|rb|go|rs|swift|kt|dart|vue|svelte)$/i)
    );

    if (textFiles.length === 0) {
      alert('Please select text files or code files only.');
      return;
    }

    textFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        
        if (textFiles.length === 1) {
          // Single file - replace current content
          setFormData(prev => ({
            ...prev,
            content: content,
            title: prev.title || file.name
          }));
        } else {
          // Multiple files - add to uploaded files list
          setUploadedFiles(prev => [...prev, {
            name: file.name,
            content: content,
            size: file.size
          }]);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const removeUploadedFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const insertTemplate = () => {
    const template = LANGUAGE_TEMPLATES[formData.language] || '';
    setFormData(prev => ({
      ...prev,
      content: template
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please provide both title and content for your paste.');
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedPaste = {
        ...originalPaste,
        title: formData.title.trim(),
        content: formData.content.trim(),
        language: formData.language,
        description: formData.description.trim(),
        isPrivate: formData.isPrivate,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        expiresAt: formData.expiresAt || null,
        updatedAt: new Date().toISOString()
      };

      updatePaste(updatedPaste);
      
      setTimeout(() => {
        navigate(`/pastes/${id}`);
      }, 500);

    } catch (error) {
      console.error('Error updating paste:', error);
      alert('Failed to update paste. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmCancel = confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmCancel) return;
    }
    navigate(`/pastes/${id}`);
  };

  if (!originalPaste) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-slate-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <AlertCircle size={64} className={darkMode ? "text-gray-600" : "text-gray-400"} />
          <h2 className={`text-xl font-semibold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Paste not found
          </h2>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            The paste you're trying to edit doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/pastes')}
            className={`mt-4 px-4 py-2 rounded-lg ${
              darkMode 
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black" 
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            } transition-colors`}
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-md border ${
          darkMode 
            ? "bg-slate-800/80 border-slate-700/50" 
            : "bg-white/80 border-white/50"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ArrowLeft size={20} />
              </button>
              
              <div>
                <h1 className={`text-4xl font-bold flex items-center gap-4 mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <div className={`p-4 rounded-2xl ${
                    darkMode 
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 motion-safe:animate-pulse" 
                      : "bg-gradient-to-br from-blue-500 to-purple-500"
                  } shadow-lg`}>
                    <Save className="w-8 h-8 text-white" />
                  </div>
                  Edit Paste
                  {hasChanges && (
                    <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  )}
                </h1>
                <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Update your code snippet or notes
                </p>
              </div>
            </div>

            {hasChanges && (
              <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
                darkMode 
                  ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30" 
                  : "bg-yellow-100 text-yellow-800 border border-yellow-300"
              }`}>
                Unsaved changes
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* File Upload Area */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-800/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <Upload className={darkMode ? "text-yellow-400" : "text-blue-500"} size={24} />
                  Replace with File
                </h3>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                    isDragOver
                      ? darkMode
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-blue-500 bg-blue-50"
                      : darkMode
                        ? "border-slate-600 hover:border-yellow-400 hover:bg-slate-700/50 motion-safe:animate-[pulse_1.5s_infinite]"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.h,.css,.html,.xml,.json,.md,.sql,.php,.rb,.go,.rs,.swift,.kt,.dart,.vue,.svelte"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                  
                  <Upload size={32} className={`mx-auto mb-4 ${
                    isDragOver 
                      ? darkMode ? "text-yellow-400" : "text-blue-500"
                      : darkMode ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <p className="font-semibold mb-2">
                    {isDragOver ? 'Drop files here' : 'Upload files to replace content'}
                  </p>
                  <p className="text-sm">
                    Drag & drop or click to browse
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Uploaded Files ({uploadedFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? "bg-slate-700/50" : "bg-gray-100"
                        }`}>
                          <div className="flex items-center gap-3">
                            <FileCode className={darkMode ? "text-yellow-400" : "text-blue-500"} size={20} />
                            <div>
                              <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {file.name}
                              </p>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {(file.size / 1024).toFixed(1)}KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeUploadedFile(index)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode 
                                ? "text-red-400 hover:bg-red-900/30" 
                                : "text-red-500 hover:bg-red-50"
                            }`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Paste Content */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-800/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <FileCode className={darkMode ? "text-yellow-400" : "text-blue-500"} size={24} />
                    Paste Content
                  </h3>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={insertTemplate}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                        darkMode 
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black" 
                          : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      }`}
                    >
                      <FileCode size={16} />
                      Template
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                        showPreview
                          ? darkMode
                            ? "bg-slate-600 text-white"
                            : "bg-gray-200 text-gray-900"
                          : darkMode
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showPreview ? 'Edit' : 'Preview'}
                    </button>

                    {formData.content && (
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className={`p-2 rounded-xl transition-all hover:scale-105 ${
                          darkMode 
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title="Copy to clipboard"
                      >
                        <Copy size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {!showPreview ? (
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Paste your code here..."
                    rows={16}
                    className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all font-mono text-sm resize-none ${
                      darkMode
                        ? "bg-slate-900 border-slate-600 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    required
                  />
                ) : (
                  <div className={`p-4 rounded-xl border-2 font-mono text-sm whitespace-pre-wrap min-h-80 ${
                    darkMode
                      ? "bg-slate-900 border-slate-600 text-gray-300"
                      : "bg-gray-50 border-gray-200 text-gray-800"
                  }`}>
                    {formData.content || 'No content to preview...'}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Basic Info */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-800/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter paste title..."
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleLanguageChange}
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your paste..."
                      rows={3}
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all resize-none ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="javascript, tutorial, example"
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-yellow-400 focus:border-yellow-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-800/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Privacy & Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {formData.isPrivate ? (
                        <Lock className="text-amber-500" size={20} />
                      ) : (
                        <Globe className="text-green-500" size={20} />
                      )}
                      <div>
                        <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {formData.isPrivate ? 'Private Paste' : 'Public Paste'}
                        </p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {formData.isPrivate ? 'Only you can view' : 'Anyone can view'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 transition-all ${
                        darkMode 
                          ? "bg-slate-700 peer-checked:bg-yellow-500 peer-focus:ring-yellow-400/25" 
                          : "bg-gray-200 peer-checked:bg-blue-500 peer-focus:ring-blue-300"
                      } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white`}></div>
                    </label>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Expires At (optional)
                    </label>
                    <input
                      type="datetime-local"
                      name="expiresAt"
                      value={formData.expiresAt}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !hasChanges || !formData.title.trim() || !formData.content.trim()}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl ${
                    darkMode 
                      ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-black shadow-yellow-500/25 motion-safe:animate-pulse" 
                      : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-blue-500/25"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Updating Paste...
                    </>
                  ) : (
                    <>
                      <Save size={24} />
                      Update Paste
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                    darkMode 
                      ? "bg-slate-700 hover:bg-slate-600 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  <X size={24} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaste;