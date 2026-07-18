const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Example 5
content = content.replace(
  '$ABCD$ is a parallelogram. If $A(-1, 1, 1)$, $B(2, 0, -2)$, and $D(3, 1, 4)$, find the coordinates of $C$.\n\n**Solution**',
  '$ABCD$ is a parallelogram. If $A(-1, 1, 1)$, $B(2, 0, -2)$, and $D(3, 1, 4)$, find the coordinates of $C$.\n\n[DIAGRAM:Chap4_Fig12]\n\n**Solution**'
);

// Unit Vector
content = content.replace(
  '$$ \\hat{\\mathbf{a}} = \\frac{1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}} \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}. $$\n\n**Example 6**',
  '$$ \\hat{\\mathbf{a}} = \\frac{1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}} \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**'
);

// Fig14 after "Since b is parallel to a, b may have the same direction as a or the opposite direction to a."
content = content.replace(
  'Since $\\vec{b}$ is parallel to $\\vec{a}$, $\\vec{b}$ may have the same direction as $\\vec{a}$ or the opposite direction to $\\vec{a}$.\n\nIf $\\vec{b}$ has the same direction as $\\vec{a}$, then',
  'Since $\\vec{b}$ is parallel to $\\vec{a}$, $\\vec{b}$ may have the same direction as $\\vec{a}$ or the opposite direction to $\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\vec{b}$ has the same direction as $\\vec{a}$, then'
);

// Collinear Points
content = content.replace(
  'for some non-zero scalar $k$.\n\n**Example 7**',
  'for some non-zero scalar $k$.\n\n[DIAGRAM:Chap4_Fig15]\n\n**Example 7**'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
