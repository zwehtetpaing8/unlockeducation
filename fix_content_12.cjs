const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  '$$ \\\\vec{a} - \\\\vec{b} = \\\\vec{a} + (-\\\\vec{b}). $$\nIf',
  '$$ \\\\vec{a} - \\\\vec{b} = \\\\vec{a} + (-\\\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf'
);

content = content.replace(
  'ka_3 \\\\end{pmatrix}. $$\n**Example 3**',
  'ka_3 \\\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**'
);

content = content.replace(
  'a_2 = b_2, \\\\, a_3 = b_3. $$\n#### Parallel Vectors',
  'a_2 = b_2, \\\\, a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors'
);

content = content.replace(
  'a_3 \\\\end{pmatrix}. $$\n**Example 6**',
  'a_3 \\\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**'
);

content = content.replace(
  'opposite direction to $\\\\vec{a}$.\nIf $\\\\vec{b}$ has the same',
  'opposite direction to $\\\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\\\vec{b}$ has the same'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
