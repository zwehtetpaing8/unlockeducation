const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const index8 = content.indexOf('(-\\vec{b}). $$If');
console.log("Fig8:", index8);
const index10 = content.indexOf('a_3 = b_3. $$#### Parallel Vectors');
console.log("Fig10:", index10);
const index13 = content.indexOf('a_3 \\end{pmatrix}. $$**Example 6**');
console.log("Fig13:", index13);
const index14 = content.indexOf('opposite direction to $\\vec{a}$.If $\\vec{b}$ has the same');
console.log("Fig14:", index14);

content = content.replace('$$If\n', '$$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf\n');
content = content.replace('(-\\vec{b}). $$\nIf', '(-\\vec{b}). $$\n\n[DIAGRAM:Chap4_Fig8]\n\nIf');
content = content.replace('a_3 \\end{pmatrix}. $$**Example 3**', 'a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**');
content = content.replace('a_3 = b_3. $$#### Parallel Vectors', 'a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors');
content = content.replace('a_3 \\end{pmatrix}. $$**Example 6**', 'a_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig13]\n\n**Example 6**');
content = content.replace('opposite direction to $\\vec{a}$.\n\nIf $\\vec{b}$ has the same', 'opposite direction to $\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\vec{b}$ has the same');

// let's just find them by index and see what's wrong with the rest if any
