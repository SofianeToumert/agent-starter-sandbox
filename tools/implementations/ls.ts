export async function lsTool(path: string = '.') {
  try {
    const fs = await import('fs/promises');
    const pathModule = await import('path');

    const entries = await fs.readdir(path);
    const result: string[] = [];

    for (const entry of entries) {
      const fullPath = pathModule.join(path, entry);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        result.push(`${entry}/`);
      } else {
        result.push(entry);
      }
    }

    return result.join('\n');
  } catch (error) {
    console.error(`Error listing directory ${path}: ${error}`);
    return `Error: ${error}`;
  }
}