import React, { useState } from 'react';
import { User, Mail, Calendar, Edit2, Save, Camera, Award, MapPin, Globe, FileText, ExternalLink } from 'lucide-react';
import { formatDate, getRelativeTime } from '../utils/date';
import { useNavigate } from 'react-router-dom'; // ADDED useNavigate for recent pastes routing

const Profile = ({ darkMode, user, setUser, pastes }) => {
  // HARDCODED VALUES
  const HARDCODED_NAME = "Ansh Chauhan";
  const HARDCODED_EMAIL = "iamansh8@gmail.com";
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize editData, forcing name and email to hardcoded values
  const [editData, setEditData] = useState({
    ...user,
    name: HARDCODED_NAME,
    email: HARDCODED_EMAIL,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate(); // ADDED initialization

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Only allow changes for non-hardcoded fields
    if (name !== 'name' && name !== 'email') {
      setEditData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Ensures the correct data structure is passed back up,
      // forcing name and email to hardcoded values upon save.
      const updatedUser = {
        ...editData,
        name: HARDCODED_NAME, // HARDCODED
        email: HARDCODED_EMAIL, // HARDCODED
        // Ensure username is not accidentally overwritten if not editable
        username: user.username,
      };
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset editData to the current user data, ensuring hardcoded values are maintained
    setEditData({
      ...user,
      name: HARDCODED_NAME,
      email: HARDCODED_EMAIL,
    });
    setIsEditing(false);
  };

  const stats = {
    totalPastes: pastes.length,
    totalViews: pastes.reduce((sum, paste) => sum + (paste.views || 0), 0),
    favorites: pastes.filter(paste => paste.isFavorite).length,
    publicPastes: pastes.filter(paste => !paste.isPrivate).length
  };

  const achievements = [
    { name: 'First Paste', description: 'Created your first paste', earned: stats.totalPastes > 0 },
    { name: 'Popular Creator', description: 'Received 100+ total views', earned: stats.totalViews >= 100 },
    { name: 'Prolific Writer', description: 'Created 10+ pastes', earned: stats.totalPastes >= 10 },
    { name: 'Community Favorite', description: 'Have 5+ favorited pastes', earned: stats.favorites >= 5 },
    { name: 'Public Sharer', description: 'Made 5+ public pastes', earned: stats.publicPastes >= 5 },
    { name: 'Code Master', description: 'Created 25+ pastes', earned: stats.totalPastes >= 25 }
  ];

  const recentPastes = pastes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className={`min-h-screen p-8 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      {/* Animated Background Overlay */}
      {darkMode && (
        <div 
          className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 z-0"
        >
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 motion-safe:animate-[blob_7s_infinite] motion-safe:animate-delay-4s"></div>
        </div>
      )}
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Profile Header */}
        <div className={`rounded-3xl shadow-xl p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg motion-safe:animate-bounce">
                  {HARDCODED_NAME.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button className={`absolute bottom-0 right-0 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  darkMode 
                    ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                } shadow-lg`}>
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={HARDCODED_NAME} // Hardcoded Value
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        readOnly // Added readOnly to prevent user changes
                        className={`text-3xl font-bold px-3 py-2 rounded-lg border-2 w-full focus:outline-none focus:ring-2 ${
                          darkMode 
                            ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={HARDCODED_EMAIL} // Hardcoded Value
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        readOnly // Added readOnly to prevent user changes
                        className={`px-3 py-2 rounded-lg border-2 w-full focus:outline-none focus:ring-2 ${
                          darkMode 
                            ? "bg-slate-700 border-slate-600 text-gray-300 placeholder-gray-400 focus:ring-blue-500"
                            : "bg-gray-50 border-gray-200 text-gray-600 placeholder-gray-500 focus:ring-blue-500"
                        }`}
                      />
                      <textarea
                        name="bio"
                        value={editData.bio || ''}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className={`px-3 py-2 rounded-lg border-2 w-full focus:outline-none focus:ring-2 resize-none ${
                          darkMode 
                            ? "bg-slate-700 border-slate-600 text-gray-300 placeholder-gray-400 focus:ring-blue-500"
                            : "bg-gray-50 border-gray-200 text-gray-600 placeholder-gray-500 focus:ring-blue-500"
                        }`}
                      />
                      <input
                        type="text"
                        name="location"
                        value={editData.location || ''}
                        onChange={handleInputChange}
                        placeholder="Location"
                        className={`px-3 py-2 rounded-lg border-2 w-full focus:outline-none focus:ring-2 ${
                          darkMode 
                            ? "bg-slate-700 border-slate-600 text-gray-300 placeholder-gray-400 focus:ring-blue-500"
                            : "bg-gray-50 border-gray-200 text-gray-600 placeholder-gray-500 focus:ring-blue-500"
                        }`}
                      />
                      <input
                        type="url"
                        name="website"
                        value={editData.website || ''}
                        onChange={handleInputChange}
                        placeholder="Website URL"
                        className={`px-3 py-2 rounded-lg border-2 w-full focus:outline-none focus:ring-2 ${
                          darkMode 
                            ? "bg-slate-700 border-slate-600 text-gray-300 placeholder-gray-400 focus:ring-blue-500"
                            : "bg-gray-50 border-gray-200 text-gray-600 placeholder-gray-500 focus:ring-blue-500"
                        }`}
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className={`text-3xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {HARDCODED_NAME} {/* Hardcoded Display */}
                      </h1>
                      
                      <h2 className={`text-xl font-medium mb-3 ${ // ADDED username display
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        @{user.username}
                      </h2>
                      
                      <p className={`flex items-center gap-2 mb-3 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                        <Mail size={16} />
                        {HARDCODED_EMAIL} {/* Hardcoded Display */}
                      </p>

                      {user.bio && (
                        <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {user.bio}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm">
                        {user.location && (
                          <span className={`flex items-center gap-1 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            <MapPin size={14} />
                            {user.location}
                          </span>
                        )}
                        
                        {user.website && (
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 hover:underline ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            <Globe size={14} />
                            Website
                            <ExternalLink size={12} />
                          </a>
                        )}
                        
                        <span className={`flex items-center gap-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          <Calendar size={14} />
                          Joined {formatDate(user.joinDate)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50 ${
                          darkMode 
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white motion-safe:animate-pulse"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        }`}
                      >
                        {isSaving ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Save size={16} />
                        )}
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className={`px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                          darkMode 
                            ? "bg-slate-700 hover:bg-slate-600 text-gray-300"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                        darkMode 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      }`}
                    >
                      <Edit2 size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {stats.totalPastes}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Pastes
                  </p>
                </div>
                <div className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {stats.totalViews.toLocaleString()}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Views
                  </p>
                </div>
                <div className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {stats.favorites}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Favorites
                  </p>
                </div>
                <div className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {stats.publicPastes}
                  </p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Public
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className={`rounded-3xl shadow-xl p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <Award size={24} />
            Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl flex items-center gap-4 transition-all hover:scale-105 ${
                  achievement.earned
                    ? darkMode
                      ? "bg-emerald-900/30 border border-emerald-700"
                      : "bg-emerald-50 border border-emerald-200"
                    : darkMode
                    ? "bg-slate-700 opacity-50"
                    : "bg-gray-50 opacity-50"
                }`}
              >
                <div className={`p-3 rounded-full ${
                  achievement.earned
                    ? "bg-emerald-500 text-white motion-safe:animate-bounce"
                    : darkMode
                    ? "bg-slate-600 text-gray-400"
                    : "bg-gray-300 text-gray-500"
                }`}>
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div>
                    <span className="text-emerald-500 text-sm font-medium">
                      ✓ Earned
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-3xl shadow-xl p-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            <FileText size={24} />
            Recent Activity
          </h2>
          
          {recentPastes.length > 0 ? (
            <div className="space-y-4">
              {recentPastes.map(paste => (
                <div
                  key={paste._id}
                  className={`p-4 rounded-xl flex items-center justify-between transition-all hover:scale-105 cursor-pointer ${
                    darkMode ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                >
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {paste.title}
                    </h3>
                    <p className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Created {getRelativeTime(paste.createdAt)}
                    </p>
                  </div>
                  <div className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {paste.views || 0} views
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-8 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No pastes yet</p>
              <p className="text-sm">Create your first paste to see activity here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;