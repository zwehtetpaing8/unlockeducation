const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

const helpers = `
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface InnerHeader {
  level: number;
  text: string;
  id: string;
}

function extractInnerHeaders(content: string): InnerHeader[] {
  const lines = content.split('\\n');
  const headers: InnerHeader[] = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\\s+(.+)$/);
    if (match) {
      headers.push({
        level: match[1].length,
        text: match[2].replace(/\\*/g, '').trim(),
        id: slugify(match[2].trim())
      });
    }
  }
  return headers;
}
`;

content = content.replace('function parseMarkdownSections', helpers + '\nfunction parseMarkdownSections');

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
