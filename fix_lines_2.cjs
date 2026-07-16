const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$\\begin{aligned}')) {
    lines[i] = lines[i].replace('$\\begin{aligned}', '$$\\begin{aligned}');
  }
  if (lines[i].includes('\\end{aligned}$')) {
    lines[i] = lines[i].replace('\\end{aligned}$', '\\end{aligned}$$');
  }
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'));
