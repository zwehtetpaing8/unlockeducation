const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// 2. Addition of Two Vectors
content = content.replace(
  '\\end{pmatrix}. $$\n\n#### Subtraction of Two Vectors',
  '\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig7]\n\n#### Subtraction of Two Vectors'
);

// 3. Subtraction of Two Vectors
content = content.replace(
  '(-\\vec{b}). $$\nIf',
  '(-\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf'
);

// 4. Scalar Multiplication
content = content.replace(
  'ka_3 \\end{pmatrix}. $$\n\n### Example 3',
  'ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n### Example 3'
);

// 5. Equal Vectors
content = content.replace(
  'a_3 = b_3. $$\n\n#### Parallel Vectors',
  'a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors'
);

// 6. Parallel Vectors
content = content.replace(
  'directions.\n\n### Example 4',
  'directions.\n\n[DIAGRAM:Chap4_Fig11]\n\n### Example 4'
);

// 7. Unit Vector
content = content.replace(
  'a_3 \\end{pmatrix}. $$\n\n**Example 6**',
  'a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**'
);

// 8. Fig 14
content = content.replace(
  'opposite direction to $\\vec{a}$.\n\nIf $\\vec{b}$ has the same',
  'opposite direction to $\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\vec{b}$ has the same'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
