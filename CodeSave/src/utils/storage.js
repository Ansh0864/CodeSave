// Default user data
const defaultUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: '',
  avatar: null,
  joinDate: new Date().toISOString(),
  bio: '',
  location: '',
  website: ''
};

// Default preferences
const defaultPreferences = {
  darkMode: false,
  fontSize: 'medium',
  theme: 'default',
  autoSave: true,
  notifications: true,
  publicProfile: true
};

// Load pastes from localStorage
export const loadPastesFromStorage = () => {
  try {
    const pastes = localStorage.getItem('pastes');
    return pastes ? JSON.parse(pastes) : [];
  } catch (error) {
    console.error('Error loading pastes:', error);
    return [];
  }
};

// Save pastes to localStorage
export const savePastesToStorage = (pastes) => {
  try {
    localStorage.setItem('pastes', JSON.stringify(pastes));
  } catch (error) {
    console.error('Error saving pastes:', error);
  }
};

// Load user preferences from localStorage
export const loadUserPreferences = () => {
  try {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? { ...defaultPreferences, ...JSON.parse(preferences) } : defaultPreferences;
  } catch (error) {
    console.error('Error loading user preferences:', error);
    return defaultPreferences;
  }
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

// Load user data from localStorage
export const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('userData');
    return user ? { ...defaultUser, ...JSON.parse(user) } : defaultUser;
  } catch (error) {
    console.error('Error loading user data:', error);
    return defaultUser;
  }
};

// Save user data to localStorage
export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem('userData', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Export/Import functionality
export const exportData = () => {
  const data = {
    pastes: loadPastesFromStorage(),
    preferences: loadUserPreferences(),
    user: loadUserFromStorage(),
    timestamp: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `paste-app-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.pastes) savePastesToStorage(data.pastes);
    if (data.preferences) saveUserPreferences(data.preferences);
    if (data.user) saveUserToStorage(data.user);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};