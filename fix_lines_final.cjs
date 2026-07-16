const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim().endsWith('$') && !lines[i].trim().endsWith('$$') && lines[i].startsWith('$$')) {
    lines[i] = lines[i] + '$'; // add one more dollar to make it $$
  }
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'));
