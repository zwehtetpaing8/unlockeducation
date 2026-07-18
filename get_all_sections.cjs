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

const chaptersTs = fs.readFileSync('src/data/chapters.ts', 'utf8');

function getChapContent(searchStr) {
  const chapStart = chaptersTs.indexOf(searchStr);
  const chapContentStart = chaptersTs.indexOf('content: `', chapStart) + 10;
  const chapContentEnd = chaptersTs.indexOf('`,', chapContentStart);
  return chaptersTs.substring(chapContentStart, chapContentEnd);
}

console.log("Chap 1:", parseMarkdownSections(getChapContent('title: "Complex Numbers"')).map(s => s.title).filter(t => t.toLowerCase().includes('intro')));
console.log("Chap 2:", parseMarkdownSections(getChapContent('title: "Mathematical Induction"')).map(s => s.title).filter(t => t.toLowerCase().includes('intro')));
console.log("Chap 3:", parseMarkdownSections(getChapContent('title: "Coordinate Geometry"')).map(s => s.title).filter(t => t.toLowerCase().includes('intro')));

const chap4 = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const chap5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

console.log("Chap 4:", parseMarkdownSections(chap4.substring(chap4.indexOf('`') + 1, chap4.lastIndexOf('`'))).map(s => s.title).filter(t => t.toLowerCase().includes('intro')));
console.log("Chap 5:", parseMarkdownSections(chap5.substring(chap5.indexOf('`') + 1, chap5.lastIndexOf('`'))).map(s => s.title).filter(t => t.toLowerCase().includes('intro')));

