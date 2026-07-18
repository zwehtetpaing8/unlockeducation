const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.split('ka_3 \\end{pmatrix}. $$**Example 3**').join('ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**');

content = content.split('a_2 = b_2, \\, a_3 = b_3. $$#### Parallel Vectors').join('a_2 = b_2, \\, a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors');

content = content.split('a_3 \\end{pmatrix}. $$**Example 6**').join('a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**');

content = content.split('opposite direction to $\\vec{a}$.\n\nIf $\\vec{b}$ has the same').join('opposite direction to $\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\vec{b}$ has the same');

// let's try with \\\\ for split just in case
content = content.split('ka_3 \\\\end{pmatrix}. $$**Example 3**').join('ka_3 \\\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**');
content = content.split('a_2 = b_2, \\\\, a_3 = b_3. $$#### Parallel Vectors').join('a_2 = b_2, \\\\, a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors');
content = content.split('a_3 \\\\end{pmatrix}. $$**Example 6**').join('a_3 \\\\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**');
content = content.split('opposite direction to $\\\\vec{a}$.\n\nIf $\\\\vec{b}$ has the same').join('opposite direction to $\\\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\\\vec{b}$ has the same');

fs.writeFileSync('src/data/chapter4_content.ts', content);
