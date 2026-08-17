const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.match(/^\(\d\).*?\.\s*\$$/)) {
    line = line.replace(/\.\s*\$$/, '. $$');
  }
  
  if (line.match(/^\(\d\).*?\^\\circ\.\s*\$$/)) {
    line = line.replace(/\^\\circ\.\s*\$$/, '^\\circ. $$');
  }

  if (line.match(/^\([a-z]\).*?\.\s*\$$/)) {
    line = line.replace(/\.\s*\$$/, '. $$');
  }

  if (line.match(/^\$\s*\\begin{aligned} x &=/)) {
    line = '$' + line;
  }
  
  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$')) {
     line = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';
  }

  if (line === '$$ 2 = 2 \\eq \\frac{4}{3}, $$') {
     line = '$$ 2 = 2 \\neq \\frac{4}{3}, $$';
  }

  if (line.includes('&= -48 \\neq 0. \\end{aligned} $$eq 0. \\end{aligned} $$')) {
     line = '$$ \\begin{aligned} \\overrightarrow{AB} \\cdot (\\overrightarrow{AC} \\times \\overrightarrow{AD}) &= \\begin{pmatrix} -1 \\\\ 2 \\\\ -3 \\end{pmatrix} \\cdot \\begin{pmatrix} 6 \\\\ 18 \\\\ 26 \\end{pmatrix} \\\\ &= (-1)(6) + (2)(18) + (-3)(26) \\\\ &= -6 + 36 - 78 \\\\ &= -48 \\neq 0. \\end{aligned} $$';
  }
  if (line.trim() === 'eq 0. \\end{aligned} $$') line = '';
  if (line.trim() === '&= -48 \\neq 0. \\end{aligned} $$') line = ''; // it got split weirdly earlier

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
