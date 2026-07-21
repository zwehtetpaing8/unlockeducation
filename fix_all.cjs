const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const target11 = `$$ \\\\overrightarrow{AB} \\\\cdot \\\\overrightarrow{BC} = \\\\begin{pmatrix} 3 - 2k \\\\\\\\ 2 + k \\\\\\\\ -2 - k \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} -2 \\\\\\\\ -1 \\\\\\\\ 6 \\\\end{pmatrix} $$
$$ = (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) $$
$$ = -20 - 3k. $$`;

const replacement11 = `$$
\\\\begin{aligned}
\\\\overrightarrow{AB} \\\\cdot \\\\overrightarrow{BC} &= \\\\begin{pmatrix} 3 - 2k \\\\\\\\ 2 + k \\\\\\\\ -2 - k \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} -2 \\\\\\\\ -1 \\\\\\\\ 6 \\\\end{pmatrix} \\\\\\\\
&= (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) \\\\\\\\
&= -20 - 3k.
\\\\end{aligned}
$$`;
content = content.replace(target11, replacement11);

const targetEx42_1c = `$$ \\\\vec{q} \\\\cdot (\\\\vec{p} + \\\\vec{r}) = \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} 3 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} -2 \\\\\\\\ 4 \\\\end{pmatrix} \\\\right) $$
$$ = \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 1 \\\\\\\\ 6 \\\\end{pmatrix} $$
$$ = (-1)(1) + (5)(6) = 29. $$`;
const repEx42_1c = `$$
\\\\begin{aligned}
\\\\vec{q} \\\\cdot (\\\\vec{p} + \\\\vec{r}) &= \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} 3 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} -2 \\\\\\\\ 4 \\\\end{pmatrix} \\\\right) \\\\\\\\
&= \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 1 \\\\\\\\ 6 \\\\end{pmatrix} \\\\\\\\
&= (-1)(1) + (5)(6) = 29.
\\\\end{aligned}
$$`;
content = content.replace(targetEx42_1c, repEx42_1c);

const targetEx42_2e = `$$ \\\\vec{a} \\\\cdot (\\\\vec{b} + \\\\vec{c}) = \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} -1 \\\\\\\\ 1 \\\\\\\\ 1 \\\\end{pmatrix} + \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) $$
$$ = \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} -1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix} $$
$$ = -2 + 0 + 6 = 4. $$`;
const repEx42_2e = `$$
\\\\begin{aligned}
\\\\vec{a} \\\\cdot (\\\\vec{b} + \\\\vec{c}) &= \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\left( \\\\begin{pmatrix} -1 \\\\\\\\ 1 \\\\\\\\ 1 \\\\end{pmatrix} + \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) \\\\\\\\
&= \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} -1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix} \\\\\\\\
&= -2 + 0 + 6 = 4.
\\\\end{aligned}
$$`;
content = content.replace(targetEx42_2e, repEx42_2e);

const targetEx42_2f = `$$ \\\\vec{a} \\\\cdot \\\\vec{b} + \\\\vec{a} \\\\cdot \\\\vec{c} = 2 + \\\\left( \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) = 2 + (0 - 1 + 3) = 4. $$`;
const repEx42_2f = `$$
\\\\begin{aligned}
\\\\vec{a} \\\\cdot \\\\vec{b} + \\\\vec{a} \\\\cdot \\\\vec{c} &= 2 + \\\\left( \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix} \\\\right) \\\\\\\\
&= 2 + (0 - 1 + 3) = 4.
\\\\end{aligned}
$$`;
content = content.replace(targetEx42_2f, repEx42_2f);

const targetEx42_6b = `$$ (\\\\vec{a} + \\\\vec{b}) \\\\cdot (\\\\vec{b} - \\\\vec{a}) = \\\\vec{a} \\\\cdot \\\\vec{b} - \\\\vec{a} \\\\cdot \\\\vec{a} + \\\\vec{b} \\\\cdot \\\\vec{b} - \\\\vec{b} \\\\cdot \\\\vec{a} $$
$$ = |\\\\vec{b}|^2 - |\\\\vec{a}|^2. $$`;
const repEx42_6b = `$$
\\\\begin{aligned}
(\\\\vec{a} + \\\\vec{b}) \\\\cdot (\\\\vec{b} - \\\\vec{a}) &= \\\\vec{a} \\\\cdot \\\\vec{b} - \\\\vec{a} \\\\cdot \\\\vec{a} + \\\\vec{b} \\\\cdot \\\\vec{b} - \\\\vec{b} \\\\cdot \\\\vec{a} \\\\\\\\
&= |\\\\vec{b}|^2 - |\\\\vec{a}|^2.
\\\\end{aligned}
$$`;
content = content.replace(targetEx42_6b, repEx42_6b);

const targetEx42_6c = `$$ (\\\\vec{a} + \\\\vec{b}) \\\\cdot (\\\\vec{b} - \\\\vec{a}) = |\\\\vec{b}|^2 - |\\\\vec{a}|^2 = 0. $$`;
const repEx42_6c = `$$ (\\\\vec{a} + \\\\vec{b}) \\\\cdot (\\\\vec{b} - \\\\vec{a}) = |\\\\vec{b}|^2 - |\\\\vec{a}|^2 = 0. $$`; // this one is probably fine on one line.

fs.writeFileSync('src/data/chapter4_content.ts', content);
