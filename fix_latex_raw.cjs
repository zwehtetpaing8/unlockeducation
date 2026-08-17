const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Fix any line ending with ` $` that has a `$$ ` at the start.
  if (line.startsWith('$$ ') && line.endsWith(' $')) {
     line = line.substring(0, line.length - 2) + ' $$';
  }

  // Also catch lines ending in ` $` but without a starting `$$ ` if they are supposed to be block equations
  // e.g., $ \vec{a} = ... $
  if (line.match(/^\$\s/) && line.endsWith(' $')) {
     line = '$' + line.substring(0, line.length - 2) + '$$';
  }

  // Fix specific known broken lines
  if (line === '$$ 2 = 2 \\eq \\frac{4}{3}, $$') {
     line = '$$ 2 = 2 \\neq \\frac{4}{3}, $$'; // if it's \neq
  }
  
  if (line.includes('&= -48 \\neq 0. \\end{aligned} $$eq 0. \\end{aligned} $$')) {
     line = '&= -48 \\neq 0. \\end{aligned} $$';
  }

  // Clean up any other "eq 0. \end{aligned} $$"
  if (line === 'eq 0. \\end{aligned} $$') {
     line = '';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
