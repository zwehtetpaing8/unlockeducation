const fs = require('fs');
const lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
for (let i = 2580; i < 2650; i++) {
  lines[i] = lines[i].replace(/\x0C/g, '\\f');
  // lines[i] = lines[i].replace(/(?<!\\)\\(?![\\`])/g, '\\\\');
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
