const fs = require('fs');
const chapter5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');
const lines = chapter5.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (line.startsWith('$$')) {
    let mathBlock = line;
    let singleLine = line.endsWith('$$') && line.length > 2;
    if (!singleLine) {
      let j = i + 1;
      let closed = false;
      while (j < lines.length) {
        const nextLine = lines[j];
        mathBlock += '\n' + nextLine;
        if (nextLine.trim().endsWith('$$')) {
          closed = true;
          break;
        }
        j++;
      }
      if (!closed) {
        console.log(`Unclosed math block starting at line ${i+1}`);
      }
      i = j;
    }
  }
}
