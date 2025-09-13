import { glob as globSearch } from 'glob';

export async function globTool(pattern: string, path: string = '.') {
  try {
    const matches = await globSearch(pattern, { cwd: path });
    return matches.length > 0 ? matches.join('\n') : 'No files found matching pattern';
  } catch (error) {
    console.error(`Error in glob search: ${error}`);
    return `Error: ${error}`;
  }
}