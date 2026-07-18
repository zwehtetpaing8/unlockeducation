const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Fig 8
content = content.replace(
  '\\vec{a} + (-\\vec{b}). $$If',
  '\\vec{a} + (-\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf'
);

// Fig 9
content = content.replace(
  'ka_3 \\end{pmatrix}. $$**Example 3**',
  'ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**'
);

// Fig 10
content = content.replace(
  'a_2 = b_2, \\, a_3 = b_3. $$### Parallel Vectors',
  'a_2 = b_2, \\, a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n### Parallel Vectors'
);

// Fig 13
content = content.replace(
  'a_3 \\end{pmatrix}. $$**Example 6**',
  'a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**'
);

// Fig 14
// Wait, I need to see what's after "opposite direction to $\\vec{a}$."
