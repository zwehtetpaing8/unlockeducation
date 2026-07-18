const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  /\\end\{pmatrix\}\. \$\r?\n\r?\n\[DIAGRAM:Chap4_Fig7\]/,
  '\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig7]'
);

content = content.replace(
  /\$ \\vec\{a\} - \\vec\{b\} = \\vec\{a\} \+ \(-\\vec\{b\}\)\. \$\r?\n\r?\n\[DIAGRAM:Chap4_Fig8\]/,
  '$$ \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
