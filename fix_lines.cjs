const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
const lines = content.split('\n');

if (lines[111].includes('$\\begin{aligned}')) {
  lines[111] = lines[111].replace('$\\begin{aligned}', '$$\\begin{aligned}');
}
if (lines[115].includes('\\end{aligned}$')) {
  lines[115] = lines[115].replace('\\end{aligned}$', '\\end{aligned}$$');
}

if (lines[209].includes('$\\begin{aligned}')) {
  lines[209] = lines[209].replace('$\\begin{aligned}', '$$\\begin{aligned}');
}
if (lines[214].includes('\\end{aligned}$')) {
  lines[214] = lines[214].replace('\\end{aligned}$', '\\end{aligned}$$');
}

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'));
