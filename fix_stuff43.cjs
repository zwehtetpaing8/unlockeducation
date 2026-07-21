const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// The file currently has:
// \\begin{aligned}
// \\vec{q} \\cdot (\\vec{p} + \\vec{r}) ... = 29.
// \\\\end{aligned} $

code = code.replace(
"\\begin{aligned}\n\\vec{q} \\cdot (\\vec{p} + \\vec{r}) &= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) \\\\\n&= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} \\\\\n&= (-1)(1) + (5)(6) = 29.\n\\\\end{aligned} $",
"$$ \\\\begin{aligned} \\\\vec{q} \\\\cdot (\\\\vec{p} + \\\\vec{r}) &= \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} 3 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} -2 \\\\\\\\ 4 \\\\end{pmatrix} \\\\right) \\\\\\\\ &= \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 1 \\\\\\\\ 6 \\\\end{pmatrix} \\\\\\\\ &= (-1)(1) + (5)(6) = 29. \\\\end{aligned} $$"
);

code = code.replace(
"\\begin{aligned}\n\\vec{a} \\cdot (\\vec{b} + \\vec{c}) &= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\\n&= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} \\\\\n&= -2 + 0 + 6 = 4.\n\\\\end{aligned}",
"$$ \\\\begin{aligned} \\\\vec{a} \\\\cdot (\\\\vec{b} + \\\\vec{c}) &= \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} -1 \\\\\\\\ 1 \\\\\\\\ 1 \\\\end{pmatrix} + \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) \\\\\\\\ &= \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} -1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix} \\\\\\\\ &= -2 + 0 + 6 = 4. \\\\end{aligned} $$"
);

code = code.replace(
"\\begin{aligned}\n\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} &= 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\\n&= 2 + (0 - 1 + 3) = 4.\n\\\\end{aligned}",
"$$ \\\\begin{aligned} \\\\vec{a} \\\\cdot \\\\vec{b} + \\\\vec{a} \\\\cdot \\\\vec{c} &= 2 + \\\\left( \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) \\\\\\\\ &= 2 + (0 - 1 + 3) = 4. \\\\end{aligned} $$"
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
