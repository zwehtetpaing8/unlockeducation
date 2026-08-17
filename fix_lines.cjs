const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

lines[854] = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';

lines[1163] = '$$ \\begin{aligned} x &= a_1 + tb_1, \\\\ y &= a_2 + tb_2, \\quad t \\in \\mathbb{R}. \\\\ z &= a_3 + tb_3, \\end{aligned} $$';

lines[1188] = '$$ \\begin{aligned} x &= 1 + 3t, \\\\ y &= 4 + 2t, \\\\ z &= -1 + 5t. \\end{aligned} $$';

lines[1207] = '$$ 2 = 2 \\neq \\frac{4}{3}, $$';

lines[1394] = '$$ \\begin{aligned} \\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) &= \\begin{pmatrix} -1 \\\\ 2 \\\\ -3 \\end{pmatrix} \\cdot \\begin{pmatrix} 6 \\\\ 18 \\\\ 26 \\end{pmatrix} \\\\ &= (-1)(6) + (2)(18) + (-3)(26) \\\\ &= -6 + 36 - 78 \\\\ &= -48 \\neq 0. \\end{aligned} $$';

// Clear out the next line if it is 'eq \vec{a} ... '
if (lines[855] && lines[855].includes('eq \\vec{a}')) lines[855] = '';
if (lines[1208] && lines[1208].includes('eq \\frac{4}{3}')) lines[1208] = '';
if (lines[1395] && lines[1395].includes('eq 0.')) lines[1395] = '';

fs.writeFileSync(file, lines.join('\n'));
