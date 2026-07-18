const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  /Each of these vectors has magnitude \$1\.\n\n\[DIAGRAM:Chap4_Fig4\]\n\n---/g,
  "Each of these vectors has magnitude $1.\n\n[DIAGRAM:Chap4_Fig3]\n\n---"
);

content = content.replace(
  /The numbers in the column vector are called the components of the vector\.\n\nA vector whose initial point is at the origin is called a position vector\./g,
  "The numbers in the column vector are called the components of the vector.\n\n[DIAGRAM:Chap4_Fig4]\n\n---\n\nA vector whose initial point is at the origin is called a position vector."
);

content = content.replace(
  /is the position vector of the point \$P\$\.\n\nIf \$A\(x_1, y_1, z_1\)\$ and/g,
  "is the position vector of the point $P$.\n\n[DIAGRAM:Chap4_Fig5]\n\n---\n\nIf $A(x_1, y_1, z_1)$ and"
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
