const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const target1c = `$$ \\vec{q} \\cdot (\\vec{p} + \\vec{r}) = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) $$
$$ = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} $$
$$ = (-1)(1) + (5)(6) = 29. $$`;

const replacement1c = `$$
\\begin{aligned}
\\vec{q} \\cdot (\\vec{p} + \\vec{r}) &= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} \\\\
&= (-1)(1) + (5)(6) = 29.
\\end{aligned}
$$`;

const target2e = `$$ \\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) $$
$$ = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} $$
$$ = -2 + 0 + 6 = 4. $$`;

const replacement2e = `$$
\\begin{aligned}
\\vec{a} \\cdot (\\vec{b} + \\vec{c}) &= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} \\\\
&= -2 + 0 + 6 = 4.
\\end{aligned}
$$`;

const target2f = `$$ \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} = 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) = 2 + (0 - 1 + 3) = 4. $$`;

const replacement2f = `$$
\\begin{aligned}
\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} &= 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= 2 + (0 - 1 + 3) = 4.
\\end{aligned}
$$`;

const target6b = `$$ (\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) = \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} $$
$$ = |\\vec{b}|^2 - |\\vec{a}|^2. $$`;

const replacement6b = `$$
\\begin{aligned}
(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) &= \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} \\\\
&= |\\vec{b}|^2 - |\\vec{a}|^2.
\\end{aligned}
$$`;

content = content.replace(target1c, replacement1c);
content = content.replace(target2e, replacement2e);
content = content.replace(target2f, replacement2f);
content = content.replace(target6b, replacement6b);

fs.writeFileSync('src/data/chapter4_content.ts', content);
