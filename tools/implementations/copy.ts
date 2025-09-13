export async function copyTool(source: string, destination?: string) {
  try {
    const fs = await import('fs/promises');
    const pathModule = await import('path');

    await fs.access(source);
    const sourceStat = await fs.stat(source);

    if (!destination) {
      const parsed = pathModule.parse(source);
      if (sourceStat.isDirectory()) {
        destination = `${source}_copy`;
      } else {
        destination = pathModule.join(parsed.dir, `${parsed.name}_copy${parsed.ext}`);
      }
    }

    if (sourceStat.isFile()) {
      await fs.copyFile(source, destination);
      return `File copied from ${source} to ${destination}`;
    } else if (sourceStat.isDirectory()) {
      await fs.cp(source, destination, { recursive: true });
      return `Directory copied from ${source} to ${destination}`;
    }

    return `Copied ${source} to ${destination}`;
  } catch (error) {
    console.error(`Error copying ${source}: ${error}`);
    return `Error: ${error}`;
  }
}