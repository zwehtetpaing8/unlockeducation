const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  'ka_3 \\\\end{pmatrix}. $$\\n\\n**Example 3**',
  'ka_3 \\\\end{pmatrix}. $$\\n\\n[DIAGRAM:Chap4_Fig9]\\n\\n**Example 3**'
);

content = content.replace(
  'a_3 = b_3. $$\\n\\n### Parallel Vectors',
  'a_3 = b_3. $$\\n\\n[DIAGRAM:Chap4_Fig10]\\n\\n### Parallel Vectors'
);

content = content.replace(
  'a_3 \\\\end{pmatrix}. $$\\n\\n**Example 6**',
  'a_3 \\\\end{pmatrix}. $$\\n\\n[DIAGRAM:Chap4_Fig13]\\n\\n**Example 6**'
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
