const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
function fixLine(line) {
  // Wait, I see \(\left... and \right\)
  return line
    .replace(/\\\(\\\left/g, '$\\left')
    .replace(/\\\right\\\)/g, '\\right$')
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$');
}
for (let i = 2390; i <= 2500; i++) {
  if (lines[i]) lines[i] = fixLine(lines[i]);
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
