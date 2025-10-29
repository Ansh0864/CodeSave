import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, MessageSquare, Send, Zap } from 'lucide-react';

const ChatbotButton = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    // UPDATED: New engaging introductory line
    { id: 1, text: "👋 Welcome to **PasteFlow**! I'm **FlowBot**, your personal coding assistant. I'm here to help you! What's on your mind?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotResponse = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    
    // 1. Greetings & Closing
    if (lowerCaseMsg.match(/^(hi|hello|hey|greetings|what's up|how are you)/)) {
      return "Hello there! Welcome back to PasteFlow. Ready to organize, share, or analyze some code?";
    }
    if (lowerCaseMsg.match(/^(thanks|thank you|bye|goodbye|cya)/)) {
      return "You're welcome! Happy coding. If you need anything else, I'm just a click away! 👋";
    }

    // 2. Programming Language Questions (EXPANDED & IMPROVED)
    if (lowerCaseMsg.includes('javascript') || lowerCaseMsg.includes('js')) {
      return "**JavaScript** is the core language of the web! It enables complex front-end interactivity and is widely used for back-end development (Node.js). PasteFlow uses the 'javascript' setting for clean, concise sharing of your asynchronous logic and DOM manipulation code.";
    }
    if (lowerCaseMsg.includes('python') || lowerCaseMsg.includes('py')) {
      return "**Python** is prized for its readability and versatility, dominating fields like data science, machine learning, and backend APIs. Use the 'python' language mode to share your sophisticated algorithms and clean, indented scripts.";
    }
    if (lowerCaseMsg.includes('java') && !lowerCaseMsg.includes('javascript')) {
      return "**Java** is a powerful, platform-independent language, heavily used for large-scale enterprise systems, Android applications, and financial services. Setting your paste to 'java' ensures accurate highlighting of classes, methods, and complex object-oriented patterns.";
    }
    if (lowerCaseMsg.includes('react') || lowerCaseMsg.includes('jsx')) {
      return "For **React/JSX** code, ensure your paste's language is set to 'javascript' or 'jsx'. This ensures proper highlighting of component structure, hooks, and embedded HTML/XML syntax within your JavaScript logic.";
    }
    if (lowerCaseMsg.includes('typescript') || lowerCaseMsg.includes('ts')) {
      return "**TypeScript** builds upon JavaScript by adding static types, making it ideal for large, maintainable codebases. Select 'typescript' for your pastes to correctly display type annotations, interfaces, and strong typing constructs.";
    }
    if (lowerCaseMsg.includes('c++') || lowerCaseMsg.includes('cpp')) {
        return "**C++** is a high-performance language essential for game engines, operating systems, and resource-constrained embedded systems. Use the 'cpp' setting to clearly share your memory management and object-oriented low-level code.";
    }
    if (lowerCaseMsg.includes('c#') || lowerCaseMsg.includes('c sharp')) {
        return "**C#** is a modern, object-oriented language developed by Microsoft, predominantly used with the .NET framework for Windows applications, cloud services, and Unity game development. Use the 'csharp' setting for your C# pastes.";
    }
    if (lowerCaseMsg.includes('go') || lowerCaseMsg.includes('golang')) {
        return "**Go (Golang)** excels at building fast, scalable network services and APIs due to its built-in concurrency features. Share your optimized, clean Go routines and package structures using the 'go' language setting.";
    }
    if (lowerCaseMsg.includes('rust')) {
        return "**Rust** is focused on performance and safety, guaranteeing memory safety without a garbage collector. Select 'rust' for your pastes to showcase your fearless concurrency and innovative syntax.";
    }
    if (lowerCaseMsg.includes('swift')) {
        return "**Swift** is Apple's primary language for building applications across the entire Apple ecosystem (iOS, macOS, etc.). Use the 'swift' language setting for accurate highlighting of its modern, concise syntax.";
    }
    if (lowerCaseMsg.includes('php')) {
        return "**PHP** is widely used for backend web development and powers major platforms like WordPress. Share your server-side scripting and database interactions efficiently by setting your paste language to 'php'.";
    }
    if (lowerCaseMsg.includes('ruby') || lowerCaseMsg.includes('rails')) {
        return "**Ruby** is a dynamic, interpreted language famous for the Ruby on Rails framework, emphasizing programmer productivity. PasteFlow supports 'ruby' syntax for sharing your elegant and expressive code blocks.";
    }
    if (lowerCaseMsg.includes('html') || lowerCaseMsg.includes('css')) {
        return "For front-end structure and styling, use the 'html' and 'css' settings. This ensures your markup, selectors, and style properties are rendered perfectly for easy review.";
    }
    if (lowerCaseMsg.includes('language') || lowerCaseMsg.includes('syntax')) {
      return "PasteFlow supports over 50 languages! You can set the language when you create or edit a paste to get perfect syntax highlighting.";
    }
    if (lowerCaseMsg.includes('algorithm') || lowerCaseMsg.includes('data structure')) {
        return "Algorithms and data structures are the heart of programming. PasteFlow is a great tool for documenting and sharing your optimized solutions and notes on complexity analysis (like Big O).";
    }
    if (lowerCaseMsg.includes('sql') || lowerCaseMsg.includes('database')) {
        return "Got complex database queries? Use PasteFlow to share and save your 'sql' statements. SQL highlighting makes schema definitions and joins easy to read.";
    }


    // 3. Website/Feature Questions (EXPANDED)
    if (lowerCaseMsg.includes('create') || lowerCaseMsg.includes('new paste')) {
      return "To create a new paste, click the 'Create' button (the one with the plus sign) in the navigation bar. You can even drag and drop files there!";
    }
    if (lowerCaseMsg.includes('dark mode')) {
      return "You can toggle Dark Mode using the sun/moon icon on the top right of the navigation bar, or via the Settings panel.";
    }
    
    // NEW RESPONSE ADDED HERE
    if (lowerCaseMsg.includes('theme') || lowerCaseMsg.includes('color scheme') || lowerCaseMsg.includes('change colors')) {
        return "You can change the overall application's color theme and font settings in the **Settings** panel. Look for the 'Appearance' section for options like Ocean Blue, Forest Green, or Royal Purple.";
    }
    // END NEW RESPONSE
    
    if (lowerCaseMsg.includes('private')) {
      return "Yes, you can make a paste private on the 'Create Paste' page under Privacy & Settings. Only you will be able to view it.";
    }
    if (lowerCaseMsg.includes('analytics') || lowerCaseMsg.includes('views')) {
      return "Check the 'Analytics' page to track your total views, top performing pastes, and language distribution over time.";
    }
    if (lowerCaseMsg.includes('community')) {
      return "The 'Community' page lets you discover public pastes shared by other users. You can sort by popularity and language there!";
    }
    if (lowerCaseMsg.includes('my pastes') || lowerCaseMsg.includes('view all')) {
        return "Your complete list of saved pastes, including favorites and private ones, is located under the **'Pastes'** link in the main navigation.";
    }
    if (lowerCaseMsg.includes('profile')) {
        return "Your profile is where you can update your user information, manage your pastes, and see a summary of your activity. Click the user icon/initials in the top right to access it.";
    }
    if (lowerCaseMsg.includes('search')) {
        return "You can search all your own pastes on the 'Pastes' page, or search the community's public pastes directly from the 'Community' page's search bar.";
    }
    if (lowerCaseMsg.includes('favorite') || lowerCaseMsg.includes('star')) {
        return "To favorite a paste, simply click the heart icon (❤️) when viewing or managing the paste. Favorited items show up under your My Pastes filters.";
    }
    if (lowerCaseMsg.includes('expired') || lowerCaseMsg.includes('lifetime')) {
        return "You can set an expiration date/time when creating a paste. If left blank, the paste will remain saved indefinitely unless you manually delete it.";
    }
    if (lowerCaseMsg.includes('template')) {
        return "When creating a new paste, you can use the **'Insert Template'** button to automatically add boilerplate code for the currently selected language. This speeds up the creation process!";
    }
    if (lowerCaseMsg.includes('edit paste')) {
        return "To edit a paste, navigate to it from your 'Pastes' list and look for the 'Edit' button (usually a pencil icon). Remember, you can only edit pastes you created.";
    }
    if (lowerCaseMsg.includes('upload file') || lowerCaseMsg.includes('drag and drop')) {
        return "Yes! Head over to the **Create Paste** page. You can drag and drop multiple supported code files directly into the upload area. It's super fast!";
    }
    if (lowerCaseMsg.includes('preview')) {
        return "On the Create Paste page, you can toggle the **'Preview'** button to see how your content will look with syntax highlighting before you save it.";
    }
    if (lowerCaseMsg.includes('copy to clipboard')) {
        return "You can instantly copy the entire content of a paste to your clipboard using the **'Copy'** button located above the main text area.";
    }
    if (lowerCaseMsg.includes('tags') || lowerCaseMsg.includes('filter')) {
        return "Tags help you organize your pastes! Enter comma-separated tags on the Create page. You can then use these tags to filter and search your pastes on the 'My Pastes' page.";
    }

    // 4. Default/Fallback
    return "I'm not quite sure how to answer that yet! I can help you with questions about popular languages like **Python** or **Swift**, or PasteFlow features like **Templates** or **Analytics**. Try rephrasing your question!";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (userMessage === '') return;

    const newMessage = { id: Date.now(), text: userMessage, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    const botResponseText = getBotResponse(userMessage);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-[100] transition-all duration-300">
      {/* Chat Window - Increased size to w-96 h-[40rem] */}
      {isOpen && (
        <div className={`w-96 h-[40rem] rounded-2xl shadow-2xl flex flex-col mb-4 transform transition-all duration-300 ${
          darkMode 
            ? "bg-slate-800 border border-slate-700 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 rounded-t-2xl shadow-md ${
            darkMode 
              ? "bg-slate-700 text-white" 
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          }`}>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Bot size={20} />
              PasteFlow AI
            </h3>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              title="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow-md ${
                    msg.sender === 'user'
                      ? "bg-blue-500 text-white rounded-br-none"
                      : darkMode
                        ? "bg-slate-700 text-gray-200 rounded-tl-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-md ${
                        darkMode ? "bg-slate-700 text-gray-200 rounded-tl-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
                    } flex items-center gap-2`}>
                        <Zap size={16} className="text-yellow-400 animate-pulse" />
                        <span>Typing...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className={`p-4 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 p-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                }`}
                disabled={isTyping}
              />
              <button
                type="submit"
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 ${
                  darkMode 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50"
                }`}
                disabled={input.trim() === '' || isTyping}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 motion-safe:animate-bounce ${
          isOpen 
            ? darkMode
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        } text-white`}
        title={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} className="motion-safe:animate-spin-slow" />}
      </button>
    </div>
  );
};

export default ChatbotButton;