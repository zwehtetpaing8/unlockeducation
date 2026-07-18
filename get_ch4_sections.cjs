const fs = require('fs');

function parseMarkdownSections(markdown) {
  const lines = markdown.split("\n");
  const sections = [];
  let currentTitle = "Introduction";
  let currentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(###|##)\s+(.+)$/);
    if (match) {
      if (currentLines.join("").trim().length > 0) {
        sections.push({
          title: currentTitle,
          content: currentLines.join("\n").trim(),
        });
        currentLines = [];
      }
      currentTitle = match[2].replace(/\*/g, "").trim();
    } else {
      if (line.trim() === "---" && currentLines.join("").trim().length === 0) {
        continue;
      }
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0 || sections.length === 0) {
    sections.push({
      title: currentTitle,
      content: currentLines.join("\n").trim(),
    });
  }

  return sections;
}

const text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const start = text.indexOf('`');
const end = text.lastIndexOf('`');
const content = text.substring(start + 1, end);
const sections = parseMarkdownSections(content);
console.log(sections.map(s => s.title));
