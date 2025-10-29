# 💻 PasteFlow

**PasteFlow** is a modern, full-featured web application designed for developers to effortlessly store, organize, share, and analyze their code snippets, notes, and technical pastes. Built with React and utilizing powerful filtering and analytics tools, PasteFlow is your personal library for managing code knowledge.

## ✨ Features

PasteFlow comes packed with functionality to enhance your coding and sharing workflow:

* **Instant Paste Creation:** Quickly create new pastes with support for over 20 programming languages.
* **Multi-Language Support:** Comprehensive syntax highlighting for languages including JavaScript, Python, Java, C++, HTML, CSS, Go, Rust, Swift, and more.
* **File Upload & Drag-and-Drop:** Easily upload files (e.g., `.js`, `.py`, `.md`) via drag-and-drop to automatically populate content and detect language.
* **Organization:** Group your pastes into **Folders** and utilize **Tags** for easy searching and management.
* **Privacy Control:** Set pastes as **Public** (to share with the community) or **Private** (visible only to you).
* **Community Discovery:** Browse the `/community` section to discover and engage with public pastes shared by other users.
* **Analytics Dashboard:** Track your performance with insights on total pastes, total views, language distribution, and privacy statistics on the dedicated `/analytics` page.
* **Customization:** Full Dark Mode support, configurable editor settings (line numbers, word wrap, tab size), and data management (Export/Import) available in the **Settings** panel.
* **FlowBot AI Assistant:** An integrated chatbot (`components/ChatbotButton.jsx`) provides instant help on PasteFlow features and popular programming languages.
* **Seamless Navigation:** Use the in-app history navigation (back/forward buttons) for smooth browsing between pages.
* **Data Persistence:** User data, pastes, and preferences are saved locally using `localStorage`.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js
* **Routing:** React Router DOM (v6+) with `HashRouter`
* **State Management:** React Hooks (`useState`, `useEffect`) 
* **Styling:** Tailwind CSS (utility-first approach)
* **Icons:** Lucide React
* **Module System:** Modern JavaScript/JSX

## 🚀 Getting Started

To get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your system.

* Node.js (LTS version recommended)
* npm (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPO_URL]
    cd PasteFlow
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the application in development mode:**

    ```bash
    npm run dev
    # or yarn dev
    ```

    

## 📂 Project Structure

The codebase is organized into logical folders for maintainability: