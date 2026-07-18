const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// 1. Negative Vector
content = content.replace(
  'has the same magnitude as $\\vec{a}$ but the opposite direction.\nIf\n',
  'has the same magnitude as $\\vec{a}$ but the opposite direction.\n\n[DIAGRAM:Chap4_Fig6]\n\nIf\n'
);

// 2. Addition of Two Vectors
content = content.replace(
  'then\n$$ \\vec{a} + \\vec{b} = \\begin{pmatrix} a_1 + b_1 \\\\ a_2 + b_2 \\\\ a_3 + b_3 \\end{pmatrix}. $$\n\n#### Subtraction of Two Vectors',
  'then\n$$ \\vec{a} + \\vec{b} = \\begin{pmatrix} a_1 + b_1 \\\\ a_2 + b_2 \\\\ a_3 + b_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig7]\n\n#### Subtraction of Two Vectors'
);

// 3. Subtraction of Two Vectors
content = content.replace(
  '$$ \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b}). $$\nIf',
  '$$ \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf'
);

// 4. Scalar Multiplication of a Vector
content = content.replace(
  'then\n$$ k\\vec{a} = \\begin{pmatrix} ka_1 \\\\ ka_2 \\\\ ka_3 \\end{pmatrix}. $$\n\n### Example 3',
  'then\n$$ k\\vec{a} = \\begin{pmatrix} ka_1 \\\\ ka_2 \\\\ ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n### Example 3'
);

// 5. Equal Vectors
content = content.replace(
  'then\n$$ \\vec{a} = \\vec{b} \\iff a_1 = b_1, a_2 = b_2, a_3 = b_3. $$\n\n#### Parallel Vectors',
  'then\n$$ \\vec{a} = \\vec{b} \\iff a_1 = b_1, a_2 = b_2, a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors'
);

// 6. Parallel Vectors
content = content.replace(
  'for some non-zero scalar $k$.\n\nIf $k > 0$, the vectors have the same direction. If $k < 0$, the vectors have opposite directions.\n\n### Example 4',
  'for some non-zero scalar $k$.\n\nIf $k > 0$, the vectors have the same direction. If $k < 0$, the vectors have opposite directions.\n\n[DIAGRAM:Chap4_Fig11]\n\n### Example 4'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
