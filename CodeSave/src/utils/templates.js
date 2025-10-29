// Language templates and boilerplate code
export const LANGUAGE_TEMPLATES = {
  javascript: `// JavaScript Template
console.log('Hello, World!');

// Variables and Functions
const greeting = 'Welcome to JavaScript!';

function greetUser(name) {
  return \`Hello, \${name}!\`;
}

// Example usage
const userName = 'Developer';
console.log(greetUser(userName));

// Modern JavaScript features
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log('Doubled numbers:', doubled);`,

  typescript: `// TypeScript Template
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(\`User \${user.name} added successfully!\`);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}

// Example usage
const userManager = new UserManager();
const newUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  isActive: true,
};
userManager.addUser(newUser);

const activeUsers = userManager.getActiveUsers();
console.log('Active users:', activeUsers);`,
  
  python: `#!/usr/bin/env python3
# Python Template

# A simple program to demonstrate variables, functions, and control flow.

# --- Variables ---
message = "Hello, World!"
version = 3.9
is_active = True

# --- Functions ---
def greet_user(name):
    """A function to greet a user by name."""
    return f"Hello, {name}!"

# --- Main Logic ---
if __name__ == "__main__":
    print(message)
    
    user_name = "Alice"
    greeting = greet_user(user_name)
    print(greeting)
    
    # Conditional example
    if is_active:
        print("The program is active.")
    else:
        print("The program is inactive.")
        
    # Loop example
    for i in range(3):
        print(f"Loop iteration: {i + 1}")`,
        
  java: `// Java Template
// A simple program demonstrating a class, a main method, and a function.

public class Main {

    // Main method - the entry point of the program
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Call a function
        String user = "Java User";
        String greeting = greetUser(user);
        System.out.println(greeting);
    }
    
    // A simple function to return a greeting string
    public static String greetUser(String name) {
        return "Hello, " + name + "!";
    }
    
}`,

  cpp: `// C++ Template
// A simple C++ program demonstrating input/output and a function.
#include <iostream>
#include <string>

// Function declaration
std::string greetUser(const std::string& name);

// Main function
int main() {
    std::cout << "Hello, World!" << std::endl;
    
    std::string userName = "C++ User";
    std::cout << greetUser(userName) << std::endl;
    
    return 0;
}`,

  c: `// C Template
// A simple C program demonstrating input/output and a function.
#include <stdio.h>
#include <string.h>

// Function declaration
void greetUser(char name[]);

// Main function
int main() {
    printf("Hello, World!\\n");
    
    char userName[] = "C User";
    greetUser(userName);
    
    return 0;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* CSS styles can go here */
        body {
            font-family: sans-serif;
            line-height: 1.6;
        }
    </style>
</head>
<body>

    <h1>Hello, World!</h1>

    <p>This is a basic HTML template.</p>

    </body>
</html>`,

  css: `/* CSS Template */
/* A basic stylesheet to get you started. */

/* Universal box-sizing for easier layout */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  font-family: Arial, sans-serif;
}

h1 {
  color: #007bff;
  text-align: center;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`,

  react: `// React Functional Component Template
import React, { useState, useEffect } from 'react';

const MyComponent = ({ propName }) => {
  // State hook
  const [count, setCount] = useState(0);

  // Effect hook
  useEffect(() => {
    // This runs after every render
    console.log('Component rendered or propName changed');

    // Cleanup function
    return () => {
      console.log('Component unmounted or effect reran');
    };
  }, [propName]); // Dependency array

  return (
    <div>
      <h1>Hello, {propName}!</h1>
      <p>You have clicked the button {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default MyComponent;`,

  vue: `<template>
  <div class="vue-template">
    <h1>{{ message }}</h1>
    <button @click="incrementCount">
      Click me ({{ count }} times)
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, Vue!',
      count: 0
    };
  },
  methods: {
    incrementCount() {
      this.count++;
    }
  }
};
</script>

<style scoped>
.vue-template {
  text-align: center;
  font-family: sans-serif;
}
</style>`,

  php: `<?php
// PHP Template
// A simple PHP script to demonstrate a variable and output.

$greeting = "Hello, World!";

echo "<h1>" . $greeting . "</h1>";

// A simple function
function addNumbers($num1, $num2) {
  return $num1 + $num2;
}

$sum = addNumbers(5, 10);
echo "<p>The sum of 5 and 10 is: " . $sum . "</p>";
?>`,

  ruby: `#!/usr/bin/env ruby
# Ruby Template
# A simple script demonstrating a function and variable.

def greet(name)
  "Hello, #{name}!"
end

puts "Hello, World!"

user_name = "Ruby User"
puts greet(user_name)`,
  
  go: `// Go Template
// A simple Go program.
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")

    // Define a variable
    message := "Welcome to Go!"
    fmt.Println(message)

    // Call a function
    greet("Go User")
}

func greet(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}`,

  rust: `// Rust Template
// A simple Rust program.
fn main() {
    println!("Hello, World!");
    
    // A mutable variable
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The new value of x is: {}", x);
}

// A simple function
fn greet(name: &str) {
    println!("Hello, {}!", name);
}`,

  swift: `// Swift Template
// A simple Swift program.
import Foundation

print("Hello, World!")

// A simple function
func greet(name: String) {
    print("Hello, \(name)!")
}

let name = "Swift User"
greet(name: name)`,

  kotlin: `// Kotlin Template
// A simple Kotlin program.
fun main() {
    println("Hello, World!")

    // A simple function
    fun greet(name: String) {
        println("Hello, \$name!")
    }

    val name = "Kotlin User"
    greet(name)
}`,
  
  dart: `// Dart Template
// A simple Dart program.
void main() {
  print('Hello, World!');

  // A simple function
  String greet(String name) {
    return 'Hello, \$name!';
  }

  var name = 'Dart User';
  print(greet(name));
}`,

  sql: `/* SQL Template */
-- A basic SQL template for a table.

-- Create a new table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into the table
INSERT INTO users (username, email) VALUES
('john_doe', 'john.doe@example.com'),
('jane_smith', 'jane.smith@example.com');

-- Select all data from the table
SELECT * FROM users;`,
  
  json: `// JSON Template
// A basic JSON object.
{
  "name": "Example Project",
  "version": "1.0.0",
  "description": "A sample JSON file.",
  "author": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "keywords": [
    "example",
    "json",
    "data"
  ],
  "dependencies": {
    "library_a": "1.2.3",
    "library_b": "4.5.6"
  }
}`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book category="fiction">
        <title lang="en">The Lord of the Rings</title>
        <author>J.R.R. Tolkien</author>
        <year>1954</year>
        <price>22.99</price>
    </book>
    <book category="non-fiction">
        <title lang="en">Sapiens: A Brief History of Humankind</title>
        <author>Yuval Noah Harari</author>
        <year>2011</year>
        <price>18.50</price>
    </book>
</bookstore>`,

  yaml: `---
# YAML Template
# A basic YAML configuration file.

version: "3.8"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    restart: always
  
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db-data:/var/lib/postgresql/data
    
volumes:
  db-data:
`,

  markdown: `# Markdown Template

# Main Heading
This is a paragraph with **bold** and *italic* text.

## Sub-heading
Here is a list of items:
* Item 1
* Item 2
* Item 3

### Another Sub-heading
* This is a code block:

    \`\`\`javascript
    console.log("Hello, World!");
    \`\`\`

Here is a link to [Google](https://www.google.com).`,

  bash: {
    'Template': `#!/bin/bash
# Bash/Shell Template

# A simple script to demonstrate command-line parsing
# and basic operations.

# --- Variables ---
BACKUP_DIR="/var/backups"
LOG_FILE="/var/log/backup.log"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="backup_$DATE.tar.gz"

# --- Functions ---
log() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") [INFO] $1" | tee -a "$LOG_FILE"
}

warn() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") [WARN] $1" | tee -a "$LOG_FILE" >&2
}

error() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") [ERROR] $1" | tee -a "$LOG_FILE" >&2
}

usage() {
    echo "Usage: $0 [command]"
    echo "Commands:"
    echo "  backup    Create a new backup"
    echo "  cleanup   Remove old backups (older than 7 days)"
    echo "  status    Show backup directory status"
    echo "  help      Show this help message"
}

# --- Main Logic ---
main() {
    COMMAND=$1
    shift
    
    case $COMMAND in
        backup)
            log "Starting backup..."
            mkdir -p "$BACKUP_DIR"
            tar -czf "$ARCHIVE_NAME" "$@"
            mv "$ARCHIVE_NAME" "$BACKUP_DIR/"
            log "Backup created: $BACKUP_DIR/$ARCHIVE_NAME"
            ;;
        cleanup)
            log "Starting cleanup..."
            find "$BACKUP_DIR" -type f -name "*.tar.gz" -mtime +7 -delete -print
            log "Clean-up complete."
            ;;
        status)
            log "Showing backup status for '$BACKUP_DIR'..."
            if [[ -d "$BACKUP_DIR" ]]; then
                ls -lh "$BACKUP_DIR"
            else
                warn "Backup directory does not exist yet."
            fi
            ;;
        help)
            usage
            ;;
        *)
            error "Unknown command: $COMMAND"
            usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"`,
  },
};

export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'react', label: 'React JSX' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'php', label: 'PHP' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'bash', label: 'Bash/Shell' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'dart', label: 'Dart' },
  { value: 'scala', label: 'Scala' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'shell', label: 'Shell' },
  { value: 'yaml', label: 'YAML' },
];

export const findTemplate = (language) => {
  const normalizedLang = language.toLowerCase();
  
  if (CODE_SNIPPETS[normalizedLang]) {
    return CODE_SNIPPETS[normalizedLang];
  }
  
  // Check for simple snippets
  if (LANGUAGE_TEMPLATES[normalizedLang]) {
    return {
      'Template': LANGUAGE_TEMPLATES[normalizedLang]
    };
  }
  
  return null;
};