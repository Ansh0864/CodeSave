import React, { useState } from 'react';
import { 
  X, 
  Moon, 
  Sun, 
  Download, 
  Upload, 
  Trash2, 
  Save,
  Settings as SettingsIcon,
  Bell,
  Globe,
  Eye,
  Type,
  Palette,
  Check,
  AlertCircle,
  BarChart // This is the icon you imported
} from 'lucide-react';
import { exportData, importData } from '../utils/storage';

const Settings = ({ 
  darkMode, 
  isOpen, 
  onClose, 
  userPreferences, 
  setUserPreferences,
  pastes,
  setPastes 
}) => {
  const [importFile, setImportFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  if (!isOpen) return null;

  const handlePreferenceChange = (key, value) => {
    setUserPreferences(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // The preferences are already saved via useEffect in App.tsx
      // This is just for user feedback
      setSaveMessage('Settings saved successfully!');
      setHasUnsavedChanges(false);
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch (error) {
      setSaveMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    exportData();
  };

  const handleImport = async () => {
    if (!importFile) return;
    
    setIsImporting(true);
    try {
      const text = await importFile.text();
      const success = importData(text);
      
      if (success) {
        // Reload the page to apply imported data
        window.location.reload();
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    } catch (error) {
      alert('Error importing file: ' + error.message);
    } finally {
      setIsImporting(false);
      setImportFile(null);
    }
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      if (confirm('This will delete all your pastes, preferences, and user data. Are you absolutely sure?')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const SettingSection = ({ title, icon: Icon, children }) => (
    <div className={`mb-8 rounded-3xl shadow-lg border transition-all duration-300 ${
      darkMode 
        ? "bg-slate-800/80 backdrop-blur-sm border-slate-700/50" 
        : "bg-white/80 backdrop-blur-sm border-white/50"
    }`}>
      <div className={`p-6 border-b ${
        darkMode ? "border-slate-700/50" : "border-gray-200/50"
      }`}>
        <h3 className={`text-xl font-bold flex items-center gap-3 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          <Icon size={24} className="text-blue-500" />
          {title}
        </h3>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );

  const SettingItem = ({ label, description, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex-1">
        <p className={`font-semibold text-base ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
          {label}
        </p>
        {description && (
          <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        checked 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : darkMode 
            ? 'bg-slate-600' 
            : 'bg-gray-300'
      }`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
        checked ? 'transform translate-x-6' : 'transform translate-x-0'
      }`} />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border transition-all duration-300 ${
        darkMode 
          ? "bg-slate-900/95 backdrop-blur-md border-slate-700/50" 
          : "bg-white/95 backdrop-blur-md border-white/50"
      }`}>
        {/* Header */}
        <div className={`p-8 border-b ${
          darkMode ? "border-slate-700/50" : "border-gray-200/50"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl motion-safe:animate-bounce">
                <SettingsIcon className="text-white" size={28} />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Settings
                </h2>
                <p className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Customize your PasteFlow experience
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
                darkMode 
                  ? "text-gray-400 hover:text-white hover:bg-slate-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Save Message */}
          {saveMessage && (
            <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
              saveMessage.includes('successfully') 
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {saveMessage.includes('successfully') ? (
                <Check size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              {saveMessage}
            </div>
          )}

          {/* Appearance */}
          <SettingSection title="Appearance" icon={Palette}>
            <SettingItem
              label="Dark Mode"
              description="Switch between light and dark themes for better visibility"
            >
              <Toggle
                checked={userPreferences.darkMode}
                onChange={(value) => handlePreferenceChange('darkMode', value)}
              />
            </SettingItem>

            <SettingItem
              label="Font Size"
              description="Adjust the editor font size for comfortable coding"
            >
              <select
                value={userPreferences.fontSize || 'medium'}
                onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all min-w-32 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="small">Small (12px)</option>
                <option value="medium">Medium (14px)</option>
                <option value="large">Large (16px)</option>
                <option value="xl">Extra Large (18px)</option>
              </select>
            </SettingItem>

            <SettingItem
              label="Color Theme"
              description="Choose your preferred color scheme for the interface"
            >
              <select
                value={userPreferences.theme || 'default'}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all min-w-32 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="default">Default</option>
                <option value="blue">Ocean Blue</option>
                <option value="green">Forest Green</option>
                <option value="purple">Royal Purple</option>
                <option value="orange">Sunset Orange</option>
              </select>
            </SettingItem>
          </SettingSection>

          {/* Editor */}
          <SettingSection title="Editor" icon={Type}>
            <SettingItem
              label="Auto Save"
              description="Automatically save changes as you type (recommended)"
            >
              <Toggle
                checked={userPreferences.autoSave !== false}
                onChange={(value) => handlePreferenceChange('autoSave', value)}
              />
            </SettingItem>

            <SettingItem
              label="Line Numbers"
              description="Show line numbers in the code editor for easier navigation"
            >
              <Toggle
                checked={userPreferences.showLineNumbers !== false}
                onChange={(value) => handlePreferenceChange('showLineNumbers', value)}
              />
            </SettingItem>

            <SettingItem
              label="Word Wrap"
              description="Wrap long lines in the editor instead of horizontal scrolling"
            >
              <Toggle
                checked={userPreferences.wordWrap !== false}
                onChange={(value) => handlePreferenceChange('wordWrap', value)}
              />
            </SettingItem>

            <SettingItem
              label="Tab Size"
              description="Set the number of spaces for tab indentation"
            >
              <select
                value={userPreferences.tabSize || '2'}
                onChange={(e) => handlePreferenceChange('tabSize', e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all min-w-32 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="8">8 spaces</option>
              </select>
            </SettingItem>
          </SettingSection>

          {/* Privacy */}
          <SettingSection title="Privacy" icon={Eye}>
            <SettingItem
              label="Public Profile"
              description="Make your profile visible to other users in the community"
            >
              <Toggle
                checked={userPreferences.publicProfile !== false}
                onChange={(value) => handlePreferenceChange('publicProfile', value)}
              />
            </SettingItem>

            <SettingItem
              label="Default Privacy"
              description="Default privacy setting for new pastes you create"
            >
              <select
                value={userPreferences.defaultPrivacy || 'public'}
                onChange={(e) => handlePreferenceChange('defaultPrivacy', e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all min-w-32 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              >
                <option value="public">Public (visible to everyone)</option>
                <option value="private">Private (only visible to you)</option>
              </select>
            </SettingItem>

            <SettingItem
              label="Analytics Tracking"
              description="Allow anonymous usage analytics to help improve the platform"
            >
              <Toggle
                checked={userPreferences.analytics !== false}
                onChange={(value) => handlePreferenceChange('analytics', value)}
              />
            </SettingItem>
          </SettingSection>

          {/* Notifications */}
          <SettingSection title="Notifications" icon={Bell}>
            <SettingItem
              label="Desktop Notifications"
              description="Receive browser notifications for important updates"
            >
              <Toggle
                checked={userPreferences.notifications !== false}
                onChange={(value) => handlePreferenceChange('notifications', value)}
              />
            </SettingItem>

            <SettingItem
              label="Email Notifications"
              description="Receive email updates about your account and pastes"
            >
              <Toggle
                checked={userPreferences.emailNotifications || false}
                onChange={(value) => handlePreferenceChange('emailNotifications', value)}
              />
            </SettingItem>

            <SettingItem
              label="Sound Effects"
              description="Play sound effects for actions like saving and notifications"
            >
              <Toggle
                checked={userPreferences.soundEffects || false}
                onChange={(value) => handlePreferenceChange('soundEffects', value)}
              />
            </SettingItem>
          </SettingSection>

          {/* Data Management */}
          <SettingSection title="Data Management" icon={Globe}>
            <SettingItem
              label="Export Data"
              description="Download all your data as a JSON file for backup or migration"
            >
              <button
                onClick={handleExport}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg ${
                  darkMode 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}
              >
                <Download size={18} />
                Export All Data
              </button>
            </SettingItem>

            <SettingItem
              label="Import Data"
              description="Import data from a previously exported JSON file"
            >
              <div className="flex gap-3 flex-wrap">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setImportFile(e.target.files[0])}
                  className="hidden"
                  id="import-file"
                />
                <label
                  htmlFor="import-file"
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold cursor-pointer transition-all hover:scale-105 shadow-lg ${
                    darkMode 
                      ? "bg-slate-600 hover:bg-slate-500 text-gray-300"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  <Upload size={18} />
                  Choose File
                </label>
                {importFile && (
                  <button
                    onClick={handleImport}
                    disabled={isImporting}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                      darkMode 
                        ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                        : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                    }`}
                  >
                    {isImporting ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    {isImporting ? 'Importing...' : 'Import Data'}
                  </button>
                )}
              </div>
              {importFile && (
                <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Selected: {importFile.name}
                </p>
              )}
            </SettingItem>

            <SettingItem
              label="Clear All Data"
              description="⚠️ Permanently delete all your data (cannot be undone)"
            >
              <button
                onClick={handleClearAllData}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg ${
                  darkMode 
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <Trash2 size={18} />
                Clear All Data
              </button>
            </SettingItem>
          </SettingSection>

          {/* Statistics */}
          <SettingSection title="Statistics" icon={BarChart}> {/* Changed from BarChart3 to BarChart */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                darkMode 
                  ? "bg-slate-700/50 border border-slate-600/50" 
                  : "bg-white border border-gray-200"
              }`}>
                <p className={`text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                  {pastes.length}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total Pastes
                </p>
              </div>
              <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                darkMode 
                  ? "bg-slate-700/50 border border-slate-600/50" 
                  : "bg-white border border-gray-200"
              }`}>
                <p className={`text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                  {pastes.reduce((sum, paste) => sum + (paste.views || 0), 0)}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Total Views
                </p>
              </div>
              <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                darkMode 
                  ? "bg-slate-700/50 border border-slate-600/50" 
                  : "bg-white border border-gray-200"
              }`}>
                <p className={`text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent`}>
                  {pastes.filter(paste => paste.isFavorite).length}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Favorites
                </p>
              </div>
              <div className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                darkMode 
                  ? "bg-slate-700/50 border border-slate-600/50" 
                  : "bg-white border border-gray-200"
              }`}>
                <p className={`text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent`}>
                  {pastes.filter(paste => !paste.isPrivate).length}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Public Pastes
                </p>
              </div>
            </div>
          </SettingSection>
        </div>

        {/* Footer */}
        <div className={`p-8 border-t ${
          darkMode ? "border-slate-700/50" : "border-gray-200/50"
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
              {hasUnsavedChanges && (
                <div className={`flex items-center gap-2 text-sm ${
                  darkMode ? "text-yellow-400" : "text-yellow-600"
                }`}>
                  <AlertCircle size={16} />
                  Unsaved changes
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300 border border-slate-600"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                  darkMode 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white motion-safe:animate-pulse"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;