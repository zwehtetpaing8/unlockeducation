const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trimEnd();

  // If line ends with " $", make it " $$"
  if (line.endsWith(' $')) {
     line = line.substring(0, line.length - 2) + ' $$';
  }

  // Same for aligned blocks starting with $
  if (line.startsWith('$ \\begin{aligned}')) {
     line = '$$' + line.substring(1);
  }

  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\')) {
      line = '$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$';
  }

  if (line.includes('2(3) + 4(-3) = -6 \\') || line.includes('eq 2. $$') || line.includes('eq 2. $')) {
     if (line.includes('2(3) + 4(-3) = -6 \\')) line = '$$ 2(3) + 4(-3) = -6 \\neq 2. $$';
     else line = '';
  }

  if (line.includes('&= -48 \\') || line.includes('eq 0. \\end{aligned} $$') || line.includes('\\neq 0. \\end{aligned} $') || line.includes('&= -48 \\neq 0. \\end{aligned} $$')) {
     if (line.includes('&= -48 \\')) line = '&= -48 \\neq 0. \\end{aligned} $$';
     else line = '';
  }

  if (line === '$$ 2 = 2 \\') {
     line = '$$ 2 = 2 $$';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
