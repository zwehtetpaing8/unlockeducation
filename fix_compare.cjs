const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const target1 = `$$ |\\vec{b} - \\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 $$
$$ = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) $$
$$ = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) $$`;

const replacement1 = `$$
\\begin{aligned}
|\\vec{b} - \\vec{a}|^2 &= (x_2 - x_1)^2 + (y_2 - y_1)^2 \\\\
&= x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) \\\\
&= |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2)
\\end{aligned}
$$`;

content = content.replace(target1, replacement1);
fs.writeFileSync('src/data/chapter4_content.ts', content);
