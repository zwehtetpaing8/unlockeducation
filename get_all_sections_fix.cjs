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
  if (chapStart === -1) return "NOT FOUND";
  const chapContentStart = chaptersTs.indexOf('content: `', chapStart) + 10;
  if (chapContentStart === 9) return "NOT FOUND";
  const chapContentEnd = chaptersTs.indexOf('`,', chapContentStart);
  return chaptersTs.substring(chapContentStart, chapContentEnd);
}

const titles = [
  'title: "Complex Numbers"',
  'title: "Mathematical Induction"',
  'title: "Analytical Solid Geometry"'
];

titles.forEach(t => {
  console.log(t, parseMarkdownSections(getChapContent(t)).map(s => s.title));
});

const chap4 = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const chap5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

console.log("Chap 4:", parseMarkdownSections(chap4.substring(chap4.indexOf('`') + 1, chap4.lastIndexOf('`'))).map(s => s.title));
console.log("Chap 5:", parseMarkdownSections(chap5.substring(chap5.indexOf('`') + 1, chap5.lastIndexOf('`'))).map(s => s.title));

