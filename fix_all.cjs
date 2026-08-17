const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Fix lines ending with a single $ (possibly with whitespace) to $$
  // Only if they start with $$ somewhere and end with exactly one $.
  // To be safe, any line ending with ". $" or ". $" + space
  line = line.replace(/\.\s*\$\s*$/, '. $$');
  line = line.replace(/,\s*\$\s*$/, ', $$');
  line = line.replace(/\^\w+\s*\$\s*$/, '^\w+ $$');
  
  if (line.match(/\$\$.*\.\s*\$$/)) {
     line = line.replace(/\.\s*\$$/, '. $$');
  }

  // Properties list fixes
  if (line.includes('Commutative property:') && line.endsWith('. $')) line = line.replace('. $', '. $$');
  if (line.includes('Distributive property:') && line.endsWith('. $')) line = line.replace('. $', '. $$');
  if (line.includes('Scalar multiplication:') && line.endsWith('. $')) line = line.replace('. $', '. $$');
  if (line.includes('Multiplication by a negative scalar:') && line.endsWith('. $')) line = line.replace('. $', '. $$');
  if (line.includes('Product of a vector with itself:') && line.endsWith('. $')) line = line.replace('. $', '. $$');
  if (line.includes('Zero vector property:') && line.endsWith('. $')) line = line.replace('. $', '. $$');

  if (line.includes('Perpendicular vectors:') && line.endsWith('^\\circ. $')) line = line.replace('^\\circ. $', '^\\circ. $$');
  if (line.includes('Parallel in the same direction:') && line.endsWith('^\\circ. $')) line = line.replace('^\\circ. $', '^\\circ. $$');
  if (line.includes('Parallel in the opposite direction:') && line.endsWith('^\\circ. $')) line = line.replace('^\\circ. $', '^\\circ. $$');
  
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

  if (line.includes('&= -48 \\') || line.includes('eq 0. \\end{aligned} $$') || line.includes('\\neq 0. \\end{aligned} $')) {
     if (line.includes('&= -48 \\')) line = '&= -48 \\neq 0. \\end{aligned} $$';
     else line = '';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
