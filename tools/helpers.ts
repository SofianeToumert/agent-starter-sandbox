import { readFile } from './implementations/readfile';
import { writeFile } from './implementations/writefile';
import { grepSearch } from './implementations/grep';
import { globTool } from './implementations/glob';
import { lsTool } from './implementations/ls';
import { webSearchTool } from './implementations/websearch';
import { copyTool } from './implementations/copy';

const READ_FILE_REGEX = /<readfile file="([^"]+)"\s*\/>/g;
const WRITE_FILE_REGEX = /<writefile file="([^"]+)"\s+content="([^"]+)"\s*\/>/g;
const GREP_REGEX = /<grep pattern="([^"]+)"(?:\s+file="([^"]+)")?(?:\s+flags="([^"]+)")?\s*\/>/g;
const GLOB_REGEX = /<glob pattern="([^"]+)"(?:\s+path="([^"]+)")?\s*\/>/g;
const LS_REGEX = /<ls(?:\s+path="([^"]+)")?\s*\/>/g;
const WEBSEARCH_REGEX = /<websearch url="([^"]+)"\s*\/>/g;
const CP_REGEX = /<cp source="([^"]+)"(?:\s+destination="([^"]+)")?\s*\/>/g;

export function parseTools(text: string) {
  const tools: any[] = [];

  const readMatches = text.matchAll(READ_FILE_REGEX);
  for (const match of readMatches) {
    tools.push({ name: "readfile", params: { file: match[1] } });
  }

  const writeMatches = text.matchAll(WRITE_FILE_REGEX);
  for (const match of writeMatches) {
    tools.push({
      name: "writefile",
      params: { file: match[1], content: match[2] }
    });
  }

  const grepMatches = text.matchAll(GREP_REGEX);
  for (const match of grepMatches) {
    tools.push({
      name: "grep",
      params: {
        pattern: match[1],
        file: match[2] || undefined,
        flags: match[3] || undefined
      }
    });
  }

  const globMatches = text.matchAll(GLOB_REGEX);
  for (const match of globMatches) {
    tools.push({
      name: "glob",
      params: {
        pattern: match[1],
        path: match[2] || "."
      }
    });
  }

  const lsMatches = text.matchAll(LS_REGEX);
  for (const match of lsMatches) {
    tools.push({
      name: "ls",
      params: {
        path: match[1] || "."
      }
    });
  }

  const websearchMatches = text.matchAll(WEBSEARCH_REGEX);
  for (const match of websearchMatches) {
    tools.push({
      name: "websearch",
      params: {
        url: match[1]
      }
    });
  }

  const cpMatches = text.matchAll(CP_REGEX);
  for (const match of cpMatches) {
    tools.push({
      name: "cp",
      params: {
        source: match[1],
        destination: match[2] || undefined
      }
    });
  }

  return tools;
}

export function executeTool(tool: any) {
  if (tool.name === "readfile") {
    return readFile(tool.params.file);
  }

  if (tool.name === "writefile") {
    return writeFile(tool.params.file, tool.params.content);
  }

  if (tool.name === "grep") {
    return grepSearch(tool.params.pattern, tool.params.file, tool.params.flags);
  }

  if (tool.name === "glob") {
    return globTool(tool.params.pattern, tool.params.path);
  }

  if (tool.name === "ls") {
    return lsTool(tool.params.path);
  }

  if (tool.name === "websearch") {
    return webSearchTool(tool.params.url);
  }

  if (tool.name === "cp") {
    return copyTool(tool.params.source, tool.params.destination);
  }

  return `Unknown tool: ${tool.name}`;
}