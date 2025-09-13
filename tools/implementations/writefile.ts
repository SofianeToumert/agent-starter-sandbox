export function writeFile(filename: string, content: string) {
  try {
  const file = Bun.file(filename);
  file.write(content);
  } catch (error) {
      console.error(`Error writing file ${filename}: ${error}`);
      return null;
  }
}