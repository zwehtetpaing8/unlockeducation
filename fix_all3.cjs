const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\. \$/g, '. $$');
content = content.replace(/\\circ\. \$/g, '\\circ. $$');
content = content.replace(/\^\w+ \$/g, '^\\circ. $$'); // Wait, just replace anything that ends with ` $` where it should be ` $$`

// Let's do it line by line:
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.match(/\. \$$/)) {
     line = line.replace(/\. \$$/, '. $$');
  }

  // Same for aligned blocks ending with $
  if (line.match(/^\$\s*\\begin{aligned}/)) {
      line = line.replace(/^\$\s*/, '$$$$ ');
  }

  // Broken boxed equation
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

  // Fix 1208
  if (line.trim() === '$$ 2 = 2 \\') {
     line = '$$ 2 = 2 $$';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
