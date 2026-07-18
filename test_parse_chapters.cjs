const fs = require('fs');

function checkContent(content, id) {
  const lines = content.split('\n');
  const titles = [];
  let currentTitle = 'Introduction';
  let currentLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(###|##)\s+(.+)$/);
    if (match) {
      if (currentLines.join('').trim().length > 0) {
        titles.push(currentTitle);
        currentLines = [];
      }
      currentTitle = match[2].replace(/\*/g, '').trim();
    } else {
      if (line.trim() === '---' && currentLines.join('').trim().length === 0) continue;
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0 || titles.length === 0) {
    titles.push(currentTitle);
  }
  console.log(`Chapter ${id}: ` + titles.join(', '));
}

function processFile(path, id) {
  if (fs.existsSync(path)) {
     const text = fs.readFileSync(path, 'utf8');
     // very hacky extract backtick content
     const start = text.indexOf('`');
     const end = text.lastIndexOf('`');
     if (start !== -1 && end !== -1) {
       checkContent(text.substring(start + 1, end), id);
     }
  }
}

const chaptersTs = fs.readFileSync('src/data/chapters.ts', 'utf8');
const chap1Start = chaptersTs.indexOf('title: "Complex Numbers",');
const chap1ContentStart = chaptersTs.indexOf('content: `', chap1Start) + 10;
const chap1ContentEnd = chaptersTs.indexOf('`,', chap1ContentStart);
checkContent(chaptersTs.substring(chap1ContentStart, chap1ContentEnd), 1);

processFile('src/data/chapter4_content.ts', 4);
processFile('src/data/chapter5_content.ts', 5);

