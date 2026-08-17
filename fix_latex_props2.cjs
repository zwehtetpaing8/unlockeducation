const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trimEnd();

  if (line.endsWith('. $')) {
     if (line.startsWith('(1)') || line.startsWith('(2)') || line.startsWith('(3)') || line.startsWith('(4)') || line.startsWith('(5)') || line.startsWith('(6)')) {
         line = line.substring(0, line.length - 3) + '. $$';
     }
     if (line.startsWith('(a)') || line.startsWith('(b)') || line.startsWith('(c)') || line.startsWith('(d)') || line.startsWith('(e)')) {
         line = line.substring(0, line.length - 3) + '. $$';
     }
  }

  if (line.endsWith('^\\circ. $')) {
      line = line.substring(0, line.length - 8) + '^\\circ. $$';
  }

  // Boxed
  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$')) {
      line = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';
  }

  if (line === '$$ 2 = 2 \\eq \\frac{4}{3}, $$') {
      line = '$$ 2 = 2 \\neq \\frac{4}{3}, $$';
  }

  if (line.includes('eq 0. \\end{aligned} $$')) line = '';

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
