const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
  'or the opposite direction to $\\vec{a}$.\n\nIf $\\vec{b}$ has the same',
  'or the opposite direction to $\\vec{a}$.\n\n[DIAGRAM:Chap4_Fig14]\n\nIf $\\vec{b}$ has the same'
);

// Fig10 was "a_2 = b_2, \\, a_3 = b_3. $$### Parallel Vectors", wait, let's look at Parallel vectors.
const i10 = content.indexOf('a_3 = b_3. $$#### Parallel Vectors');
if (i10 !== -1) {
  content = content.replace('a_3 = b_3. $$#### Parallel Vectors', 'a_3 = b_3. $$\n\n[DIAGRAM:Chap4_Fig10]\n\n#### Parallel Vectors');
}

fs.writeFileSync('src/data/chapter4_content.ts', content);
