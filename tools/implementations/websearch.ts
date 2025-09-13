import TurndownService from 'turndown';

export async function webSearchTool(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return `Error: HTTP ${response.status} - ${response.statusText}`;
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('text/html')) {
      const html = await response.text();
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(html);
      return markdown;
    } else if (contentType.includes('application/json')) {
      const json = await response.json();
      return JSON.stringify(json, null, 2);
    } else {
      const text = await response.text();
      return text;
    }
  } catch (error) {
    console.error(`Error fetching URL ${url}: ${error}`);
    return `Error: ${error}`;
  }
}