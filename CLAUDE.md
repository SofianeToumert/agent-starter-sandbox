# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI agent starter project that supports multiple AI providers (OpenAI, Anthropic, Google) and includes a modular tool system for file operations, web searches, and more. It's built with TypeScript and Bun.

## Commands

### Installation and Setup
```bash
bun install                    # Install dependencies
cp .env.template .env         # Set up environment file
# Edit .env with your API keys before running
```

### Running the Agent
```bash
bun run index.ts             # Start the interactive agent
```

### Development
```bash
bun run index.ts             # Run with TypeScript (no build step needed)
```

## Architecture

### Core Components
- **`index.ts`**: Main entry point with agent interaction loop and provider selection
- **`providers/`**: AI provider implementations (OpenAI, Anthropic, Google)
  - Each provider exports a `prompt{Provider}` function
- **`tools/`**: Modular tool system with XML-based invocation
  - `helpers.ts`: Tool parsing and execution logic
  - `implementations/`: Individual tool implementations
- **`utils/system-prompt.ts`**: System messages and conversation state

Tools are invoked via XML tags in agent responses and results are fed back into the conversation.

### Provider Architecture
Each provider in `providers/` follows the same interface:
- Takes a prompt string
- Returns a Promise<string> with the AI response
- Uses AI SDK (@ai-sdk) for consistent model interaction

## Configuration

### Environment Variables
Required in `.env`:
- `OPENAI_API_KEY`: For OpenAI provider
- `ANTHROPIC_API_KEY`: For Anthropic provider
- `GOOGLE_GENERATIVE_AI_API_KEY`: For Google provider

### Dependencies
- Uses Bun as runtime and package manager
- AI SDK (@ai-sdk) for provider abstraction
- Additional tools: glob, turndown for web content processing

## Key Patterns

- **Conversation State**: Maintained in `utils/system-prompt.ts` messages array
- **Tool Execution**: Tools are parsed from XML in responses and executed sequentially
- **Provider Selection**: Interactive CLI prompts user to choose AI provider at startup
- **Modular Tools**: Each tool is a separate implementation with consistent interface