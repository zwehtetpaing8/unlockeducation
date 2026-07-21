const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
`$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) = \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} $$
$$ = |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 $$
$$ = 3^2 - 5(1^2) $$
$$ = 9 - 5 $$
$$ = 4. $$`,
`$$ \\begin{aligned}
(\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) &= \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} \\\\
&= |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 \\\\
&= 3^2 - 5(1^2) \\\\
&= 9 - 5 \\\\
&= 4
\\end{aligned} $$`
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log("Fixed example 10");
