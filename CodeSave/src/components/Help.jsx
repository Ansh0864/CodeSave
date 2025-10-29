import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Zap, 
  Shield, 
  Code, 
  Users,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Mail,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ADDED useNavigate

const Help = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate(); // ADDED initialization

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const faqData = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      items: [
        {
          question: 'How do I create my first paste?',
          answer: 'Click the "Create New Paste" button from the homepage or navigation. Add your title and content, choose a programming language, and click "Create Paste". You can also set privacy options and expiration dates.'
        },
        {
          question: 'What file formats are supported?',
          answer: 'PasteFlow supports over 20 programming languages and file formats including JavaScript, Python, Java, C++, HTML, CSS, JSON, Markdown, and many more. The system can auto-detect the language based on your content.'
        },
        {
          question: 'How do I navigate the interface?',
          answer: 'Use the main navigation bar to access different sections: Home (dashboard), Create (new paste), Pastes (your collection), Analytics (statistics), Community (public pastes), and Help. The profile dropdown provides access to settings and logout.'
        },
        {
          question: 'Can I import existing code files?',
          answer: 'Currently, you can copy and paste content directly into the editor. We\'re working on file upload functionality for future releases.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Functionality',
      icon: Code,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      items: [
        {
          question: 'How does syntax highlighting work?',
          answer: 'Syntax highlighting is automatically applied based on the selected language. You can manually choose the language from the dropdown menu, or let the system auto-detect it based on your code content.'
        },
        {
          question: 'What are favorites and how do I use them?',
          answer: 'Favorites help you bookmark important pastes for quick access. Click the heart icon on any paste to add it to favorites. Access all your favorited pastes from the main Pastes page using the favorites filter.'
        },
        {
          question: 'How do I organize my pastes?',
          answer: 'Use descriptive titles and descriptions for your pastes. You can filter by language, privacy status, and favorites. The search functionality allows you to find pastes by title, content, or description.'
        },
        {
          question: 'Can I edit my pastes after creating them?',
          answer: 'Yes! Click the "Edit" button on any paste to modify its content, title, description, language, or privacy settings. Changes are saved immediately.'
        },
        {
          question: 'How do I share my pastes?',
          answer: 'Public pastes can be shared via their unique URL. Use the "Share" button to copy the link or use native sharing features on supported devices. Private pastes are only visible to you.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      items: [
        {
          question: 'What\'s the difference between public and private pastes?',
          answer: 'Public pastes are visible to everyone and appear in the community section. Private pastes are only accessible to you when logged into your account. You can toggle this setting when creating or editing a paste.'
        },
        {
          question: 'How secure is my data?',
          answer: 'Your data is stored locally in your browser\'s localStorage. For production use, we recommend regular backups using the export feature in settings. Private pastes are never shared or made public without your explicit consent.'
        },
        {
          question: 'Can I delete my account and data?',
          answer: 'Yes, you can clear all your data using the "Clear All Data" option in Settings. This will permanently delete all your pastes, preferences, and account information. This action cannot be undone.'
        },
        {
          question: 'How do paste expiration dates work?',
          answer: 'You can set pastes to expire after 1 hour, 1 day, 1 week, or 1 month. Expired pastes are automatically hidden from view. Set to "Never" for permanent storage.'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community Features',
      icon: Users,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      items: [
        {
          question: 'How does the community section work?',
          answer: 'The Community section shows all public pastes from all users. You can browse, search, and discover code snippets shared by others. Only public pastes appear in this section.'
        },
        {
          question: 'Can I interact with other users\' pastes?',
          answer: 'You can view and share other users\' public pastes. Features like commenting and following are planned for future releases.'
        },
        {
          question: 'How can I make my pastes more discoverable?',
          answer: 'Use descriptive titles and descriptions, choose the correct programming language, and make your paste public. Well-documented and useful code snippets tend to get more views and engagement.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Book,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      items: [
        {
          question: 'How do I backup my data?',
          answer: 'Go to Settings > Data Management and click "Export Data" to download all your pastes, preferences, and user data as a JSON file. We recommend doing this regularly.'
        },
        {
          question: 'How do I import data from a backup?',
          answer: 'In Settings > Data Management, use the "Import Data" feature to upload a previously exported JSON file. This will restore all your pastes and settings.'
        },
        {
          question: 'What browsers are supported?',
          answer: 'PasteFlow works best on modern browsers including Chrome, Firefox, Safari, and Edge. JavaScript must be enabled for the application to function properly.'
        },
        {
          question: 'Why aren\'t my changes saving?',
          answer: 'Ensure JavaScript is enabled and you have sufficient localStorage space. Try refreshing the page or clearing your browser cache. Contact support if the issue persists.'
        },
        {
          question: 'How do I report a bug or suggest a feature?',
          answer: 'Use the contact options below to report bugs or suggest new features. Please include as much detail as possible, including your browser type and version.'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Create Your First Paste', link: '/create', description: 'Get started by creating your first code snippet', color: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
    { title: 'Explore Community', link: '/community', description: 'Browse public pastes shared by other users', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
    { title: 'View Analytics', link: '/analytics', description: 'See statistics about your paste activity', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { title: 'Manage Profile', link: '/profile', description: 'Manage your personal information and achievements', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' } // UPDATED: Changed from 'Manage Settings'
  ];

  const filteredFAQ = faqData.map(section => ({
    ...section,
    items: section.items.filter(item =>
      searchTerm === '' ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className={`min-h-screen p-6 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    }`}>
      {/* Animated Background Overlay - Only for full-page views without Navbar's shared overlay */}
      {darkMode && (
        <div 
          className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 motion-safe:animate-[blob_7s_infinite] motion-safe:animate-reverse"></div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`rounded-2xl shadow-xl p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="text-center">
            <h1 className={`text-3xl font-bold flex items-center justify-center gap-3 mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              <HelpCircle className="text-blue-500 motion-safe:animate-spin" />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode 
                  ? "from-blue-400 via-purple-400 to-pink-400" 
                  : "from-blue-600 via-purple-600 to-pink-600"
              }`}>
                Help & Support
              </span>
            </h1>
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Find answers to common questions and learn how to make the most of PasteFlow
            </p>
          </div>
        </div>

        {/* Search */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}>
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`} />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all text-lg ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* FAQ Sections */}
            {filteredFAQ.map(section => (
              <div key={section.id} className={`rounded-2xl shadow-lg overflow-hidden ${
                darkMode ? "bg-slate-800" : "bg-white"
              }`}>
                <div
                  className={`p-6 cursor-pointer ${section.color}`}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <section.icon size={24} />
                      <h2 className="text-xl font-bold">{section.title}</h2>
                      <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                        {section.items.length}
                      </span>
                    </div>
                    {expandedSections[section.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </div>
                
                {expandedSections[section.id] && (
                  <div className="p-6 space-y-4">
                    {section.items.map((item, index) => (
                      <div key={index} className={`p-4 rounded-xl ${
                        darkMode ? "bg-slate-700" : "bg-gray-50"
                      }`}>
                        <h3 className={`font-semibold mb-2 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {item.question}
                        </h3>
                        <p className={`leading-relaxed ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {filteredFAQ.length === 0 && searchTerm && (
              <div className={`rounded-2xl shadow-lg p-12 text-center ${
                darkMode ? "bg-slate-800" : "bg-white"
              }`}>
                <Search size={64} className={`mx-auto mb-4 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`} />
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  No results found
                </h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Try different search terms or browse the categories above.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className={`rounded-2xl shadow-lg p-6 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Quick Links
              </h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <button // UPDATED: Changed <a> to <button>
                    key={index}
                    onClick={() => navigate(link.link)} // UPDATED: Added useNavigate handler
                    className={`w-full block p-3 rounded-xl transition-all hover:scale-105 ${link.color} text-white hover:opacity-90 motion-safe:animate-pulse`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">
                          {link.title}
                        </h4>
                        <p className="text-sm opacity-90">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className={`rounded-2xl shadow-lg p-6 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Need More Help?
              </h3>
              <div className="space-y-3">
                <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                }`}>
                  <Mail size={20} />
                  <div className="text-left">
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm opacity-90">Get help via email</p>
                  </div>
                </button>
                
                <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105 ${
                  darkMode 
                    ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                }`}>
                  <MessageCircle size={20} />
                  <div className="text-left">
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm opacity-90">Chat with our team</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className={`rounded-2xl shadow-lg p-6 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                <Zap size={20} className="text-yellow-500" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded-xl ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    💡 Use keyboard shortcut <kbd className="px-2 py-1 bg-gray-200 dark:bg-slate-600 rounded">Ctrl+S</kbd> to quickly save your paste while editing.
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    🔍 Use specific keywords in your paste titles to make them easier to find later.
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  darkMode ? "bg-slate-700" : "bg-gray-50"
                }`}>
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    📊 Check the Analytics page to see which of your pastes are most popular.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;