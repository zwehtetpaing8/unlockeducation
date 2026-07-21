const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
`$$ x - 3 = 3 \\implies x = 6, $$
$$ y - 1 = -1 \\implies y = 0, $$
$$ z - 4 = -3 \\implies z = 1. $$`,
`$$ \\begin{aligned}
x - 3 &= 3 \\implies x = 6, \\\\
y - 1 &= -1 \\implies y = 0, \\\\
z - 4 &= -3 \\implies z = 1.
\\end{aligned} $$`
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log("Fixed example 5");
