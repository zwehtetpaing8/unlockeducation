const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Replace ending `. $` or `.$` with `. $$`
  line = line.replace(/\.\s*\$$/, '. $$');
  line = line.replace(/,\s*\$$/, ', $$');
  line = line.replace(/^\s*\$\s*\\begin{aligned}/, '$$$$ \\begin{aligned}'); // no wait

  // Check lines ending with $ but starting with $$
  if ((line.match(/\$\$/g) || []).length === 1 && line.trim().endsWith('$') && !line.trim().endsWith('$$')) {
     line = line.replace(/\$$/, '$$');
  }

  // Fix lines 1395 and 1396
  if (line.includes('&= -48 \\')) {
     line = line.replace(/\\\\$/, '\\\\ \\neq 0. \\end{aligned} $$');
  }
  if (line.trim() === 'eq 0. \\end{aligned} $$') {
     line = '';
  }

  // Fix lines 1438 and 1439
  if (line.includes('2(3) + 4(-3) = -6 \\')) {
     line = line.replace(/\\\\$/, '\\neq 2. $$');
  }
  if (line.trim() === 'eq 2. $$') {
     line = '';
  }

  // Fix line 855
  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\')) {
     line = line.replace(/\\\\$/, '\\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})}. $$');
  }

  // Fix 1208
  if (line.trim() === '$$ 2 = 2 \\') {
     line = '$$ 2 = 2 $$';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
