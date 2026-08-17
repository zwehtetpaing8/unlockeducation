const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Remove any triple $$$ or more
  line = line.replace(/\$\$\$+/g, '$$');

  // If a line starts with `$ ` or `$\w`, and ends with `. $` or ` } $`, it's probably block math
  // Let's just fix the known broken formatting where people typed `$ \begin... $` instead of `$$ \begin... $$`
  
  if (line.match(/^\$\s*\\.*\\end{.*?}\.\s*\$$/)) {
     line = '$$' + line.substring(1, line.length - 1) + '$$';
  }
  
  if (line.match(/^\$\s*\\.*\\end{.*?}\s*\$$/)) {
     line = '$$' + line.substring(1, line.length - 1) + '$$';
  }

  // Also lines like: $ \vec{a} = \begin{pmatrix} 3 \\ 1 \\ 1 \end{pmatrix}, \quad \vec{b} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}. $
  if (line.startsWith('$ ') && line.endsWith(' $')) {
     line = '$$' + line.substring(1, line.length - 1) + '$$';
  }

  // Also lines like: $ \begin{pmatrix} x \\ y \\ z \end{pmatrix} = ... . $
  if (line.startsWith('$ \\begin') && line.endsWith('. $')) {
     line = '$$' + line.substring(1, line.length - 2) + '. $$';
  }

  lines[i] = line;
}

fs.writeFileSync(file, lines.join('\n'));
