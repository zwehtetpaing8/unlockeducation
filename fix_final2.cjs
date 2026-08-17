const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\')) {
     line = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';
  }

  if (line.includes('eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$')) {
     line = '';
  }

  // Also 724: $$ \boxed{\vec{a} \times \vec{b} = \begin{pmatrix} y_1 z_2 - z_1 y_2 \\ z_1 x_2 - x_1 z_2 \\ x_1 y_2 - y_1 x_2 \end{pmatrix}. $$
  if (line.includes('\\end{pmatrix}. $$') && line.includes('\\boxed')) {
     line = line.replace('\\end{pmatrix}. $$', '\\end{pmatrix}}. $$');
  }

  // Check the aligned equations
  if (line.startsWith('$ \\begin{aligned} x &= a_1')) {
     line = '$$ \\begin{aligned} x &= a_1 + tb_1, \\\\ y &= a_2 + tb_2, \\quad t \\in \\mathbb{R}. \\\\ z &= a_3 + tb_3, \\end{aligned} $$';
  }
  if (line.startsWith('$ \\begin{aligned} x &= 1 + 3t')) {
     line = '$$ \\begin{aligned} x &= 1 + 3t, \\\\ y &= 4 + 2t, \\\\ z &= -1 + 5t. \\end{aligned} $$';
  }

  // 1208 and 1395
  if (line === '$$ 2 = 2 \\eq \\frac{4}{3}, $$') line = '$$ 2 = 2 \\neq \\frac{4}{3}, $$';
  if (line === 'eq 0. \\end{aligned} $$') line = '';

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
