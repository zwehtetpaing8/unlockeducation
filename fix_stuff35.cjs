const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ \\\\vec{a} \\\\cdot \\\\vec{b} = \\\\begin{pmatrix} 3 \\\\\\\\ 4 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 5 \\\\\\\\ -12 \\\\end{pmatrix} $$\n$$ = (3)(5) + (4)(-12) $$\n$$ = 15 - 48 $$\n$$ = -33. $$",
"$$ \\\\begin{aligned} \\\\vec{a} \\\\cdot \\\\vec{b} &= \\\\begin{pmatrix} 3 \\\\\\\\ 4 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 5 \\\\\\\\ -12 \\\\end{pmatrix} \\\\\\\\ &= (3)(5) + (4)(-12) \\\\\\\\ &= 15 - 48 \\\\\\\\ &= -33. \\\\end{aligned} $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
