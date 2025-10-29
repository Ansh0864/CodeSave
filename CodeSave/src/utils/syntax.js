// Syntax highlighting and language utilities

// Enhanced language mappings with more details
export const LANGUAGE_INFO = {
  javascript: {
    name: 'JavaScript',
    extensions: ['.js', '.mjs', '.cjs'],
    color: '#f7df1e',
    icon: '⚡',
    category: 'Web'
  },
  typescript: {
    name: 'TypeScript',
    extensions: ['.ts', '.tsx'],
    color: '#3178c6',
    icon: '🔷',
    category: 'Web'
  },
  python: {
    name: 'Python',
    extensions: ['.py', '.pyw', '.pyi'],
    color: '#3776ab',
    icon: '🐍',
    category: 'Backend'
  },
  java: {
    name: 'Java',
    extensions: ['.java'],
    color: '#ed8b00',
    icon: '☕',
    category: 'Backend'
  },
  cpp: {
    name: 'C++',
    extensions: ['.cpp', '.cc', '.cxx'],
    color: '#00599c',
    icon: '⚙️',
    category: 'System'
  },
  c: {
    name: 'C',
    extensions: ['.c', '.h'],
    color: '#a8b9cc',
    icon: '🔧',
    category: 'System'
  },
  html: {
    name: 'HTML',
    extensions: ['.html', '.htm'],
    color: '#e34f26',
    icon: '🌐',
    category: 'Web'
  },
  css: {
    name: 'CSS',
    extensions: ['.css'],
    color: '#1572b6',
    icon: '🎨',
    category: 'Web'
  },
  react: {
    name: 'React',
    extensions: ['.jsx', '.tsx'],
    color: '#61dafb',
    icon: '⚛️',
    category: 'Web'
  },
  vue: {
    name: 'Vue.js',
    extensions: ['.vue'],
    color: '#4fc08d',
    icon: '💚',
    category: 'Web'
  },
  php: {
    name: 'PHP',
    extensions: ['.php', '.phtml'],
    color: '#777bb4',
    icon: '🐘',
    category: 'Backend'
  },
  ruby: {
    name: 'Ruby',
    extensions: ['.rb', '.rbw'],
    color: '#cc342d',
    icon: '💎',
    category: 'Backend'
  },
  go: {
    name: 'Go',
    extensions: ['.go'],
    color: '#00add8',
    icon: '🐹',
    category: 'Backend'
  },
  rust: {
    name: 'Rust',
    extensions: ['.rs'],
    color: '#dea584',
    icon: '🦀',
    category: 'System'
  },
  swift: {
    name: 'Swift',
    extensions: ['.swift'],
    color: '#fa7343',
    icon: '🍎',
    category: 'Mobile'
  },
  kotlin: {
    name: 'Kotlin',
    extensions: ['.kt', '.kts'],
    color: '#7f52ff',
    icon: '🤖',
    category: 'Mobile'
  },
  dart: {
    name: 'Dart',
    extensions: ['.dart'],
    color: '#0175c2',
    icon: '🎯',
    category: 'Mobile'
  },
  sql: {
    name: 'SQL',
    extensions: ['.sql'],
    color: '#4479a1',
    icon: '🗄️',
    category: 'Database'
  },
  json: {
    name: 'JSON',
    extensions: ['.json'],
    color: '#292929',
    icon: '📋',
    category: 'Data'
  },
  xml: {
    name: 'XML',
    extensions: ['.xml'],
    color: '#0060ac',
    icon: '📄',
    category: 'Data'
  },
  yaml: {
    name: 'YAML',
    extensions: ['.yml', '.yaml'],
    color: '#cb171e',
    icon: '📝',
    category: 'Config'
  },
  markdown: {
    name: 'Markdown',
    extensions: ['.md', '.markdown'],
    color: '#083fa1',
    icon: '📖',
    category: 'Documentation'
  },
  bash: {
    name: 'Bash',
    extensions: ['.sh', '.bash', '.zsh'],
    color: '#4eaa25',
    icon: '💻',
    category: 'Script'
  },
  text: {
    name: 'Plain Text',
    extensions: ['.txt'],
    color: '#6b7280',
    icon: '📝',
    category: 'Text'
  }
};

// Get language display name
export const getLanguageDisplayName = (languageValue) => {
  const info = LANGUAGE_INFO[languageValue];
  return info ? info.name : 'Unknown';
};

// Get language color
export const getLanguageColor = (languageValue) => {
  const info = LANGUAGE_INFO[languageValue];
  return info ? info.color : '#6b7280';
};

// Get language icon
export const getLanguageIcon = (languageValue) => {
  const info = LANGUAGE_INFO[languageValue];
  return info ? info.icon : '📄';
};

// Get language category
export const getLanguageCategory = (languageValue) => {
  const info = LANGUAGE_INFO[languageValue];
  return info ? info.category : 'Other';
};

// Detect language from file extension
export const detectLanguageFromExtension = (extension) => {
  const normalizedExt = extension.toLowerCase().startsWith('.') ? extension.toLowerCase() : `.${extension.toLowerCase()}`;
  
  for (const [lang, info] of Object.entries(LANGUAGE_INFO)) {
    if (info.extensions.includes(normalizedExt)) {
      return lang;
    }
  }
  
  return 'text';
};

// Get all supported languages grouped by category
export const getLanguagesByCategory = () => {
  const categories = {};
  
  Object.entries(LANGUAGE_INFO).forEach(([key, info]) => {
    if (!categories[info.category]) {
      categories[info.category] = [];
    }
    categories[info.category].push({
      value: key,
      label: info.name,
      color: info.color,
      icon: info.icon
    });
  });
  
  // Sort each category
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => a.label.localeCompare(b.label));
  });
  
  return categories;
};

// Basic syntax highlighting for preview (simple regex-based)
export const highlightSyntax = (code, language) => {
  if (!code) return '';
  
  let highlighted = escapeHtml(code);
  
  switch (language) {
    case 'javascript':
    case 'typescript':
      highlighted = highlighted
        .replace(/\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|default|async|await|try|catch|throw|new|this|super)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="literal">$1</span>')
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$1</span>')
        .replace(/("|')([^"']*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
      break;
      
    case 'python':
      highlighted = highlighted
        .replace(/\b(def|class|import|from|as|if|else|elif|for|while|return|try|except|finally|with|lambda|and|or|not|is|in|pass|break|continue|global|nonlocal)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(True|False|None)\b/g, '<span class="literal">$1</span>')
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$1</span>')
        .replace(/("|')([^"']*?)\1/g, '<span class="string">$1$2$1</span>')
        .replace(/#.*$/gm, '<span class="comment">$&</span>');
      break;
      
    case 'html':
      highlighted = highlighted
        .replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span class="tag">$1</span>')
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>');
      break;
      
    case 'css':
      highlighted = highlighted
        .replace(/([a-zA-Z-]+)(?=\s*:)/g, '<span class="property">$1</span>')
        .replace(/(\{|\})/g, '<span class="brace">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
      break;
      
    default:
      // Basic highlighting for other languages
      highlighted = highlighted
        .replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$1</span>')
        .replace(/("|')([^"']*?)\1/g, '<span class="string">$1$2$1</span>');
  }
  
  return highlighted;
};

// Escape HTML for syntax highlighting
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Get file type icon based on extension
export const getFileTypeIcon = (filename) => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const iconMap = {
    // Images
    jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', svg: '🖼️', webp: '🖼️',
    // Documents
    pdf: '📄', doc: '📄', docx: '📄', txt: '📝', rtf: '📄',
    // Spreadsheets
    xls: '📊', xlsx: '📊', csv: '📊',
    // Presentations
    ppt: '📊', pptx: '📊',
    // Archives
    zip: '📦', rar: '📦', tar: '📦', gz: '📦', '7z': '📦',
    // Media
    mp3: '🎵', wav: '🎵', mp4: '🎬', avi: '🎬', mov: '🎬',
    // Code files
    js: '⚡', ts: '🔷', py: '🐍', java: '☕', cpp: '⚙️', c: '🔧',
    html: '🌐', css: '🎨', php: '🐘', rb: '💎', go: '🐹', rs: '🦀',
    swift: '🍎', kt: '🤖', dart: '🎯', sql: '🗄️', json: '📋',
    xml: '📄', yml: '📝', yaml: '📝', md: '📖', sh: '💻'
  };
  
  return iconMap[extension] || '📄';
};

// Code snippet templates for quick insertion
export const CODE_SNIPPETS = {
  javascript: {
    'Function': 'function myFunction() {\n  // Your code here\n}',
    'Arrow Function': 'const myFunction = () => {\n  // Your code here\n};',
    'Class': 'class MyClass {\n  constructor() {\n    // Constructor code\n  }\n\n  method() {\n    // Method code\n  }\n}',
    'Async Function': 'async function myAsyncFunction() {\n  try {\n    const result = await somePromise;\n    return result;\n  } catch (error) {\n    console.error(error);\n  }\n}',
    'Event Listener': 'element.addEventListener("click", (event) => {\n  // Event handler code\n});',
    'For Loop': 'for (let i = 0; i < array.length; i++) {\n  // Loop body\n}',
    'Fetch API': 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));'
  },
  python: {
    'Function': 'def my_function():\n    """Function description"""\n    # Your code here\n    pass',
    'Class': 'class MyClass:\n    def __init__(self):\n        # Constructor code\n        pass\n\n    def method(self):\n        # Method code\n        pass',
    'List Comprehension': '[expression for item in iterable if condition]',
    'Try/Except': 'try:\n    # Your code here\n    pass\nexcept Exception as e:\n    # Error handling\n    print(f"Error: {e}")',
    'Context Manager': 'with open("file.txt", "r") as f:\n    content = f.read()',
    'Decorator': 'def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        # Before function call\n        result = func(*args, **kwargs)\n        # After function call\n        return result\n    return wrapper'
  },
  react: {
    'Functional Component': 'const MyComponent = () => {\n  const [state, setState] = useState(initialValue);\n\n  useEffect(() => {\n    // Effect logic\n  }, [dependencies]);\n\n  return (\n    <div>\n      {/* JSX content */}\n    </div>\n  );\n};',
    'useState Hook': 'const [state, setState] = useState(initialValue);',
    'useEffect Hook': 'useEffect(() => {\n  // Effect logic\n  return () => {\n    // Cleanup\n  };\n}, [dependencies]);',
    'Custom Hook': 'const useCustomHook = () => {\n  const [value, setValue] = useState();\n  \n  // Hook logic\n  \n  return { value, setValue };\n};'
  }
};