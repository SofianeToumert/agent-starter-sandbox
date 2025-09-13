export async function grepSearch(pattern: string, filename?: string, flags?: string) {
  try {
    const regexFlags = flags || '';
    const regex = new RegExp(pattern, regexFlags);

    if (filename) {
      const file = Bun.file(filename);
      const content = await file.text();
      const lines = content.split('\n');
      const matches: string[] = [];

      lines.forEach((line, index) => {
        if (regex.test(line)) {
          matches.push(`${index + 1}: ${line}`);
        }
      });

      return matches.length > 0 ? matches.join('\n') : 'No matches found';
    } else {
      return 'Error: file parameter is required for grep';
    }
  } catch (error) {
    console.error(`Error in grep search: ${error}`);
    return `Error: ${error}`;
  }
}