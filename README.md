# Agent Starter Sandbox

A starter project for building AI agents capable of interacting with the file system and performing various actions through multiple AI providers.

## 🎯 What is an AI Agent?

An AI agent goes beyond a simple chatbot by combining:
- **Understanding**: ability to analyze and comprehend requests
- **Action**: capability to interact with the system (read/write files, execute commands)
- **Tools**: modular functionality for file operations, web searches, and more
- **Multi-provider**: support for OpenAI, Anthropic, and Google AI models

## 🚀 Installation and Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Configure your API key

1. Copy the template file:
```bash
cp .env.template .env
```

2. Edit `.env` with your API key:
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/
- **Google AI**: https://aistudio.google.com/app/apikey

### 3. Start the agent

```bash
bun run index.ts
```

## 📚 Features

The agent can:
- Answer questions and provide assistance
- Read and analyze file contents
- Write and modify files
- Search through files with pattern matching
- List directory contents
- Find files using glob patterns
- Fetch and process web content
- Copy files and directories

## 🛠️ Tool Architecture

The project features a modular tool system:

```
tools/
├── index.ts                    # Main exports
├── helpers.ts                  # Parsing and execution logic
└── implementations/
    ├── readfile.ts            # File reading
    ├── writefile.ts           # File writing
    ├── grep.ts                # Text search
    ├── glob.ts                # File pattern matching
    ├── ls.ts                  # Directory listing
    ├── websearch.ts           # Web content fetching
    └── copy.ts                # File/directory copying
```

## 🔧 Usage Examples

```bash
# Simple question
"What is the capital of France?"

# File reading
"What is in the package.json file?"

# File modification
"Create a new TypeScript file with a basic class structure"

# Search functionality
"Find all JavaScript files in the src directory"

# Web content
"Get the documentation from https://example.com"
```

## 🛡️ Architecture Overview

- `index.ts`: Main entry point and agent loop
- `providers/`: AI provider configurations (OpenAI, Anthropic, Google)
- `tools/`: Modular tool system for various operations
- `utils/`: Utility functions and system prompts
- `.env`: Environment variables and API keys

## 📖 Available Tools

See [TOOLS.md](./TOOLS.md) for detailed documentation of all available tools and their usage.