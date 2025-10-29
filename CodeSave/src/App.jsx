import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CreatePaste from './components/CreatePaste';
import EditPaste from './components/EditPaste';
import Pastes from './components/Pastes';
import ViewPaste from './components/ViewPaste';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Analytics from './components/Analytics';
import Community from './components/Community';
import Help from './components/Help';
import ChatbotButton from './components/ChatbotButton'; 
import { loadPastesFromStorage, savePastesToStorage, loadUserPreferences, saveUserPreferences, loadUserFromStorage, saveUserToStorage } from './utils/storage';

// --- Folder and Paste Data Initialization (For initial app load/mock data) ---

const initialFolders = [
  { _id: 'folder-1', name: 'Frontend Projects' },
  { _id: 'folder-2', name: 'Backend Utilities' },
  { _id: 'folder-3', name: 'Database Queries' },
];

const initialPastes = [
  {
    _id: "example1",
    title: "Initial Setup",
    content: "console.log('Hello World!');",
    language: "javascript",
    isPrivate: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    views: 15,
    isFavorite: true,
    tags: ["starter", "config"],
    folderId: "folder-1" 
  },
  {
    _id: "example2",
    title: "My React Component",
    content: "function MyComponent() { return <div>Hello</div>; }",
    language: "react",
    isPrivate: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    views: 5,
    isFavorite: false,
    tags: ["react", "component"],
    folderId: "folder-2" 
  },
  {
    _id: "example3",
    title: "SQL Query",
    content: "SELECT * FROM users WHERE status = 'active';",
    language: "sql",
    isPrivate: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    isFavorite: false,
    tags: ["sql", "database"],
    folderId: "folder-1" 
  },
  {
    _id: "example4",
    title: "Uncategorized Snippet",
    content: "Just a quick note.",
    language: "text",
    isPrivate: false,
    createdAt: new Date(Date.now() - 1200000).toISOString(),
    updatedAt: new Date(Date.now() - 1200000).toISOString(),
    views: 2,
    isFavorite: false,
    tags: [],
    folderId: null 
  },
];

// Helper to load data from storage or use initial data
const loadDataWithFolders = (key, initialData) => {
  const data = JSON.parse(localStorage.getItem(key));
  // Use initialData only if there's no data in storage or the stored array is empty
  return data && data.length > 0 ? data : initialData;
};

// --- End of Initialization ---

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Use helper for initial paste loading
  const [pastes, setPastes] = useState(() => loadDataWithFolders('pastes', initialPastes));
  // Initialize and load folders state
  const [folders, setFolders] = useState(() => loadDataWithFolders('folders', initialFolders)); 
  const [userPreferences, setUserPreferences] = useState(() => loadUserPreferences());
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(() => loadUserFromStorage());
  const [navigationHistory, setNavigationHistory] = useState(['/']);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Initialize dark mode from user preferences
  useEffect(() => {
    setDarkMode(userPreferences.darkMode);
  }, [userPreferences.darkMode]);

  // Save pastes and folders to localStorage whenever they change
  useEffect(() => {
    savePastesToStorage(pastes);
    // Custom storage for folders since no dedicated utility was provided for it
    localStorage.setItem('folders', JSON.stringify(folders)); 
  }, [pastes, folders]);

  // Save user preferences whenever they change
  useEffect(() => {
    saveUserPreferences(userPreferences);
  }, [userPreferences]);

  // Save user data whenever it changes
  useEffect(() => {
    if (user) {
      saveUserToStorage(user);
    }
  }, [user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNavigationHistory(['/']);
    setCurrentHistoryIndex(0);
  };

  const handleDelete = (id) => {
    setPastes(pastes.filter(p => p._id !== id));
  };

  const toggleFavorite = (id) => {
    setPastes(pastes.map(p => 
      p._id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleDarkModeChange = (newDarkMode) => {
    setDarkMode(newDarkMode);
    setUserPreferences(prev => ({ ...prev, darkMode: newDarkMode }));
  };

  const updatePaste = (updatedPaste) => {
    setPastes(pastes.map(p => 
      p._id === updatedPaste._id ? updatedPaste : p
    ));
  };

  const updateNavigationHistory = (path) => {
    const newHistory = navigationHistory.slice(0, currentHistoryIndex + 1);
    if (newHistory[newHistory.length - 1] !== path) {
      newHistory.push(path);
      setNavigationHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
    }
  };

  return (
    <HashRouter>
      {/* Animated Background Overlay for "moving objects" effect */}
      <div 
        className={`fixed inset-0 overflow-hidden pointer-events-none transition-all duration-300 ${
          darkMode ? "opacity-30" : "opacity-10"
        }`}
      >
        {/* Animated Object 1: Large purple blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 motion-safe:animate-[blob_7s_infinite]" style={{ animationDelay: '-2s' }}></div>
        {/* Animated Object 2: Medium blue blur */}
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 motion-safe:animate-[blob_7s_infinite]" style={{ animationDelay: '-4s' }}></div>
        {/* Animated Object 3: Small pink blur */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 motion-safe:animate-[blob_7s_infinite]"></div>
      </div>
      
      <div className={`relative z-10 min-h-screen transition-all duration-300 ${
        darkMode 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}>
        {isLoggedIn && (
          <Navbar 
            darkMode={darkMode} 
            setDarkMode={handleDarkModeChange} 
            isLoggedIn={isLoggedIn} 
            handleLogout={handleLogout}
            onSettingsClick={() => setShowSettings(true)}
            user={user}
            navigationHistory={navigationHistory}
            currentHistoryIndex={currentHistoryIndex}
            setCurrentHistoryIndex={setCurrentHistoryIndex}
            onNavigate={updateNavigationHistory}
          />
        )}
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? (
                <HomePage 
                  darkMode={darkMode} 
                  pastes={pastes} 
                  user={user}
                  userPreferences={userPreferences}
                  onNavigate={updateNavigationHistory}
                />
              ) : (
                <LoginPage 
                  darkMode={darkMode} 
                  setIsLoggedIn={setIsLoggedIn} 
                  setUser={setUser} 
                />
              )
            } 
          />
          <Route 
            path="/create" 
            element={
              isLoggedIn ? (
                <CreatePaste 
                  darkMode={darkMode} 
                  pastes={pastes} 
                  setPastes={setPastes}
                  userPreferences={userPreferences}
                  folders={folders} 
                  setFolders={setFolders} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              isLoggedIn ? (
                <EditPaste 
                  darkMode={darkMode} 
                  pastes={pastes} 
                  updatePaste={updatePaste}
                  userPreferences={userPreferences}
                  folders={folders} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/pastes" 
            element={
              isLoggedIn ? (
                <Pastes 
                  darkMode={darkMode} 
                  pastes={pastes} 
                  handleDelete={handleDelete}
                  toggleFavorite={toggleFavorite}
                  folders={folders} 
                  setFolders={setFolders} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/pastes/:id" 
            element={
              isLoggedIn ? (
                <ViewPaste 
                  darkMode={darkMode} 
                  pastes={pastes} 
                  handleDelete={handleDelete}
                  toggleFavorite={toggleFavorite}
                  folders={folders} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isLoggedIn ? (
                <Profile 
                  darkMode={darkMode} 
                  user={user}
                  setUser={setUser}
                  pastes={pastes}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/analytics" 
            element={
              isLoggedIn ? (
                <Analytics 
                  darkMode={darkMode} 
                  pastes={pastes}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/community" 
            element={
              isLoggedIn ? (
                <Community 
                  darkMode={darkMode} 
                  pastes={pastes}
                  user={user}
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/help" 
            element={
              isLoggedIn ? (
                <Help 
                  darkMode={darkMode} 
                />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>

        {isLoggedIn && (
          <>
            <Settings
              darkMode={darkMode}
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
              pastes={pastes}
              setPastes={setPastes}
              folders={folders} 
              setFolders={setFolders} 
            />
            
            {/* ADDED Chatbot Button for all logged-in views */}
            <ChatbotButton darkMode={darkMode} /> 
            {/* END ADDED Chatbot Button */}
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;