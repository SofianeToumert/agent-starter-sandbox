# Available Tools

Your AI agent supports the following tools, now organized in a modular structure under `/tools/`:

## Architecture

The tools are organized as follows:
```
tools/
├── index.ts                    # Main exports
├── helpers.ts                  # Parsing and execution logic
└── implementations/
    ├── readfile.ts            # File reading functionality
    ├── writefile.ts           # File writing functionality
    ├── grep.ts                # Text search functionality
    ├── glob.ts                # File pattern matching
    ├── ls.ts                  # Directory listing
    ├── websearch.ts           # Web content fetching
    └── copy.ts                # File/directory copying
```

## File Operations

### readfile
Search for content in files using text patterns.
```xml
<readfile file="path/to/file.txt" />
```

### writefile
Write content to a file.
```xml
<writefile file="path/to/file.txt" content="your content here" />
```

## Search Tools

### grep
Search for patterns in file content using regular expressions.
```xml
<grep pattern="search pattern" file="path/to/file.txt" />
<grep pattern="search pattern" file="path/to/file.txt" flags="i" />
```
- `pattern`: Regular expression pattern to search for
- `file`: File to search in (required)
- `flags`: Optional regex flags (i for case-insensitive, g for global, etc.)

### glob
Find files matching filename patterns.
```xml
<glob pattern="*.js" />
<glob pattern="**/*.ts" path="src/" />
```
- `pattern`: File pattern to match (supports wildcards like *, **, ?)
- `path`: Directory to search in (defaults to current directory)

## File System

### ls
List files and directories.
```xml
<ls />
<ls path="src/" />
```
- `path`: Directory to list (defaults to current directory)

## Web

### websearch
Fetch web content and convert HTML to Markdown.
```xml
<websearch url="https://example.com" />
```
- `url`: URL to fetch content from
- Returns HTML converted to Markdown format, or raw text/JSON for other content types

## File Management

### cp
Copy files or directories.
```xml
<cp source="path/to/source" />
<cp source="path/to/source" destination="path/to/destination" />
```
- `source`: Source file or directory path
- `destination`: Destination path (optional, defaults to `source_copy`)

## Examples

### Search for a function in TypeScript files
```xml
<grep pattern="function\s+\w+" file="src/app.ts" flags="g" />
```

### Find all JavaScript files in src directory
```xml
<glob pattern="*.js" path="src/" />
```

### List current directory contents
```xml
<ls />
```

### Get documentation from a website
```xml
<websearch url="https://docs.example.com/api" />
```