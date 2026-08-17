const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // 1. Fix lines ending with ` $$` that should be ` $` (because they are inline)
  // E.g., `The position vector of $E$ is $\overrightarrow{OE} = \begin{pmatrix} 6 \\ 4 \\ 0 \end{pmatrix}. $$`
  // An inline equation starts with a single `$` and should end with a single `$`.
  // If the line has an odd number of `$` (meaning 3, 5, etc.), then it's unbalanced.
  // Actually, let's just count `$` in the line.
  
  if (line.includes('The position vector of $E$ is $\\overrightarrow{OE} = \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix}. $$')) {
     line = line.replace('. $$', '. $');
  }
  if (line.includes('The position vector of $D$ is $\\overrightarrow{OD} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$')) {
     line = line.replace('. $$', '. $');
  }
  if (line.includes('(c) $|\\vec{a}|^w+ $$')) {
     line = line.replace('+ $$', '+ $');
  }

  // 2. Fix the lines that start with `(b) $$` and end with `. $`
  if (line.match(/^\([a-z0-9]+\)\s*\$\$/) && line.endsWith('. $')) {
     line = line.substring(0, line.length - 1) + '$$';
  }

  // Properties list fixes
  if (line.match(/^\([0-9]+\).*?\$\$.*\.\s*\$/)) {
     line = line.substring(0, line.length - 1) + '$$';
  }

  if (line.match(/^\([0-9]+\).*?\$\$.*\^\\circ\.\s*\$/)) {
     line = line.substring(0, line.length - 1) + '$$';
  }

  // Restore the boxed equation
  if (line.includes('\\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\eq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$$$ \\begin{aligned}\\end{aligned} $$')) {
     // Wait, this was totally broken.
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
