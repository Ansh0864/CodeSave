import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Upload, 
  FileText, 
  Code, 
  Eye, 
  EyeOff, 
  Lock, 
  Globe, 
  Copy,
  X,
  FileCode,
  Zap,
  Folder, 
  FolderPlus 
} from 'lucide-react';
import { generateId } from '../utils/helpers';
import { LANGUAGE_TEMPLATES, SUPPORTED_LANGUAGES } from '../utils/templates';

const CreatePaste = ({ darkMode, pastes, setPastes, userPreferences = {}, folders, setFolders }) => { 
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    language: 'javascript',
    description: '',
    isPrivate: false,
    expiresAt: '',
    tags: '',
    folderId: '' 
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFolderName, setNewFolderName] = useState(''); 

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
      language,
      // Auto-fill with template if content is empty
      content: prev.content === '' ? (LANGUAGE_TEMPLATES[language] || '') : prev.content
    }));
  };
  
  // Function to create a new folder
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        _id: generateId(), 
        name: newFolderName.trim()
      };
      setFolders(prev => [...prev, newFolder]);
      setFormData(prev => ({ ...prev, folderId: newFolder._id }));
      setNewFolderName('');
    }
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
        const extension = file.name.split('.').pop().toLowerCase();
        const detectedLanguage = detectLanguageFromExtension(extension);
        
        if (textFiles.length === 1) {
          // Single file - replace current content
          setFormData(prev => ({
            ...prev,
            title: prev.title || file.name,
            content: content,
            language: detectedLanguage || prev.language
          }));
        } else {
          // Multiple files - create separate entries
          setUploadedFiles(prev => [...prev, {
            name: file.name,
            content: content,
            language: detectedLanguage || 'text',
            size: file.size
          }]);
        }
      };
      reader.readAsText(file);
    });
  };

  const detectLanguageFromExtension = (extension) => {
    const extensionMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'h': 'c',
      'css': 'css',
      'html': 'html',
      'xml': 'xml',
      'json': 'json',
      'md': 'markdown',
      'sql': 'sql',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'swift': 'swift',
      'kt': 'kotlin',
      'dart': 'dart',
      'vue': 'vue',
      'svelte': 'svelte'
    };
    return extensionMap[extension];
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

  const createPasteFromFile = (file) => {
    const newPaste = {
      _id: generateId(),
      title: file.name,
      content: file.content,
      language: file.language,
      description: `Uploaded file: ${file.name}`,
      isPrivate: formData.isPrivate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      isFavorite: false,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      expiresAt: formData.expiresAt || null,
      folderId: formData.folderId || null 
    };

    setPastes(prev => [newPaste, ...prev]);
    return newPaste._id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please provide both title and content for your paste.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create main paste
      const newPaste = {
        _id: generateId(),
        title: formData.title.trim(),
        content: formData.content.trim(),
        language: formData.language,
        description: formData.description.trim(),
        isPrivate: formData.isPrivate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        isFavorite: false,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        expiresAt: formData.expiresAt || null,
        folderId: formData.folderId || null 
      };

      setPastes(prev => [newPaste, ...prev]);

      // Create pastes for uploaded files
      const uploadedPasteIds = uploadedFiles.map(file => createPasteFromFile(file));

      // Navigate to the main paste or show success message
      setTimeout(() => {
        navigate(`/pastes/${newPaste._id}`);
      }, 500);

    } catch (error) {
      console.error('Error creating paste:', error);
      alert('Failed to create paste. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className={`min-h-screen p-6 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950" 
        : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-md border ${
          darkMode 
            ? "bg-slate-900/80 border-slate-700/50" 
            : "bg-white/80 border-white/50"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-4xl font-bold flex items-center gap-4 mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <div className={`p-4 rounded-2xl ${
                  darkMode 
                    ? "bg-gradient-to-br from-teal-500 to-cyan-500 motion-safe:animate-pulse" 
                    : "bg-gradient-to-br from-blue-500 to-purple-500"
                } shadow-lg`}>
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode 
                    ? "from-teal-400 via-cyan-400 to-blue-400" 
                    : "from-teal-600 via-cyan-600 to-blue-600"
                }`}>
                  Create New Paste
                </span>
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              </h1>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Share your code, notes, or upload files instantly
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* File Upload Area */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-900/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <Upload className={darkMode ? "text-teal-400" : "text-blue-500"} size={24} /> 
                  Upload Files
                </h3>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragOver
                      ? darkMode
                        ? "border-cyan-400 bg-cyan-400/10" 
                        : "border-blue-500 bg-blue-50"
                      : darkMode
                        ? "border-slate-600 hover:border-cyan-400 hover:bg-slate-700/50 motion-safe:animate-[pulse_1.5s_infinite]" 
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
                  
                  <div className={`mb-4 ${
                    isDragOver 
                      ? darkMode ? "text-cyan-400" : "text-blue-500" 
                      : darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <Upload size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">
                      {isDragOver ? 'Drop files here' : 'Drag & drop files or click to browse'}
                    </p>
                    <p className="text-sm">
                      Supports: .js, .py, .java, .cpp, .html, .css, .md, .txt and more
                    </p>
                  </div>
                </div>

                {/* Uploaded Files */}
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
                            <FileCode className={darkMode ? "text-teal-400" : "text-blue-500"} size={20} /> 
                            <div>
                              <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {file.name}
                              </p>
                              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {file.language} • {(file.size / 1024).toFixed(1)}KB
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
                  ? "bg-slate-900/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold flex items-center gap-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    <Code className={darkMode ? "text-teal-400" : "text-blue-500"} size={24} /> 
                    Paste Content
                  </h3>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={insertTemplate}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                        darkMode 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" 
                          : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      }`}
                    >
                      <FileText size={16} />
                      Insert Template
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                        showPreview
                          ? darkMode
                            ? "bg-slate-700 text-cyan-400" 
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
                            ? "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-cyan-400" 
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
                    placeholder="Paste your code here or upload a file..."
                    rows={16}
                    className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all font-mono text-sm resize-none ${
                      darkMode
                        ? "bg-slate-900 border-slate-700 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    required
                  />
                ) : (
                  <div className={`p-4 rounded-xl border-2 font-mono text-sm whitespace-pre-wrap min-h-80 ${
                    darkMode
                      ? "bg-slate-900 border-slate-700 text-gray-300" 
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
                  ? "bg-slate-900/80 border-slate-700/50" 
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
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400" 
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
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-teal-400 focus:border-teal-400" 
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
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400" 
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
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400" 
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Folder Selection (NEW SECTION) */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-900/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <Folder className={darkMode ? "text-teal-400" : "text-blue-500"} size={20} />
                  Folder
                </h3>
                
                <div className="space-y-4">
                  {/* Existing Folder Select (FIX APPLIED) */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Select Existing Folder
                    </label>
                    <select
                      name="folderId"
                      value={formData.folderId}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-teal-400 focus:border-teal-400" 
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    >
                      <option value="">(No Folder)</option>
                      {(folders || []).map(folder => (
                        <option key={folder._id} value={folder._id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Create New Folder */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Or Create New Folder
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="New folder name..."
                        className={`flex-1 p-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all ${
                          darkMode
                            ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-teal-400 focus:border-teal-400" 
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleCreateFolder}
                        disabled={!newFolderName.trim()}
                        className={`p-3 rounded-xl transition-all hover:scale-105 disabled:opacity-50 ${
                          darkMode 
                            ? "bg-purple-500 hover:bg-purple-600 text-white" 
                            : "bg-purple-500 hover:bg-purple-600 text-white"
                        }`}
                        title="Create folder"
                      >
                        <FolderPlus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className={`rounded-2xl shadow-lg p-6 backdrop-blur-md border ${
                darkMode 
                  ? "bg-slate-900/80 border-slate-700/50" 
                  : "bg-white/80 border-white/50"
              }`}>
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Privacy & Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {formData.isPrivate ? (
                        <Lock className="text-pink-500" size={20} /> 
                      ) : (
                        <Globe className="text-teal-500" size={20} /> 
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
                          ? "bg-slate-700 peer-checked:bg-purple-500 peer-focus:ring-purple-400/25" 
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
                          ? "bg-slate-700 border-slate-600 text-white focus:ring-teal-400 focus:border-teal-400" 
                          : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl ${
                  darkMode 
                    ? "bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white shadow-teal-500/25 motion-safe:animate-pulse" 
                    : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-blue-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Creating Paste...
                  </>
                ) : (
                  <>
                    <Plus size={24} />
                    Create Paste
                    {uploadedFiles.length > 0 && (
                      <span className="text-sm">
                        (+{uploadedFiles.length} files)
                      </span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePaste;