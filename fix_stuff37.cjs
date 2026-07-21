const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ (\\\\vec{a} - \\\\vec{b}) \\\\cdot (\\\\vec{a} + 5\\\\vec{b}) = \\\\vec{a} \\\\cdot \\\\vec{a} + 5\\\\vec{a} \\\\cdot \\\\vec{b} - \\\\vec{b} \\\\cdot \\\\vec{a} - 5\\\\vec{b} \\\\cdot \\\\vec{b} $$\n$$ = |\\\\vec{a}|^2 + 5(0) - 0 - 5|\\\\vec{b}|^2 $$\n$$ = 3^2 - 5(1^2) $$\n$$ = 9 - 5 $$\n$$ = 4. $$",
"$$ \\\\begin{aligned} (\\\\vec{a} - \\\\vec{b}) \\\\cdot (\\\\vec{a} + 5\\\\vec{b}) &= \\\\vec{a} \\\\cdot \\\\vec{a} + 5\\\\vec{a} \\\\cdot \\\\vec{b} - \\\\vec{b} \\\\cdot \\\\vec{a} - 5\\\\vec{b} \\\\cdot \\\\vec{b} \\\\\\\\ &= |\\\\vec{a}|^2 + 5(0) - 0 - 5|\\\\vec{b}|^2 \\\\\\\\ &= 3^2 - 5(1^2) \\\\\\\\ &= 9 - 5 \\\\\\\\ &= 4. \\\\end{aligned} $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
