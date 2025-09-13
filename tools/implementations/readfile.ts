export function readFile(filename: string) {
  try {
    const file = Bun.file(filename);
    return file.text();
  } catch (error) {
    console.error(`Error reading file ${filename}: ${error}`);
    return null;
  }
}