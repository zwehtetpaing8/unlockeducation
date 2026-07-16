const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

for (let i = 2650; i < 2790; i++) {
  if (lines[i]) {
    lines[i] = lines[i].replace(/(?<!\\)\\(?![\\`])/g, '\\\\');
  }
}

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
