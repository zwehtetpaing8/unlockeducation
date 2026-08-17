const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$')) lines[i] = '';
  if (lines[i].includes('eq \\frac{4}{3}, $$')) lines[i] = '';
  if (lines[i].trim() === '$$ \\begin{alignedat}{2}') lines[i] = '$$ \\begin{aligned}';
  if (lines[i].trim() === '\\end{alignedat} $$') lines[i] = '\\end{aligned} $$';
}

fs.writeFileSync(file, lines.join('\n'));
