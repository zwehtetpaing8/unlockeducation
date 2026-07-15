const fs = require('fs');

const chapter5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');
const lines = chapter5.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (line.startsWith('$$')) {
    let mathBlock = line;
    let singleLine = line.endsWith('$$') && line.length > 2;
    let startLine = i;
    if (!singleLine) {
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        mathBlock += '\n' + nextLine;
        if (nextLine.trim().endsWith('$$')) {
          break;
        }
        j++;
      }
      i = j;
    }
    if (i - startLine > 10) {
      console.log(`Long math block from line ${startLine + 1} to ${i + 1} (${i - startLine} lines)`);
    }
  }
}
