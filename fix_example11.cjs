const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const target11 = `$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} $$
$$ = (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) $$
$$ = -20 - 3k. $$`;

const replacement11 = `$$
\\begin{aligned}
\\overrightarrow{AB} \\cdot \\overrightarrow{BC} &= \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} \\\\
&= (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) \\\\
&= -20 - 3k.
\\end{aligned}
$$`;

content = content.replace(target11, replacement11);
fs.writeFileSync('src/data/chapter4_content.ts', content);
