const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('\\eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$')) {
      line = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';
  }

  if (line === '$$ 2 = 2 \\eq \\frac{4}{3}, $$') {
      line = '$$ 2 = 2 \\neq \\frac{4}{3}, $$';
  }

  if (line.trim() === 'eq 0. \\end{aligned} $$') line = '';

  if (line.startsWith('$ \\begin{aligned} x &= a_1 + tb_1')) {
      line = '$$' + line.substring(1);
  }

  if (line.startsWith('$ \\begin{aligned} x &= 1 + 3t')) {
      line = '$$' + line.substring(1);
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
