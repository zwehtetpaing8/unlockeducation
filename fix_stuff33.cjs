const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ \\\\overrightarrow{OD} = \\\\overrightarrow{OC} - \\\\overrightarrow{OB} + \\\\overrightarrow{OA} $$\n$$ = \\\\begin{pmatrix} 3 \\\\\\\\ 1 \\\\\\\\ 4 \\\\end{pmatrix} - \\\\begin{pmatrix} 5 \\\\\\\\ 1 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ 4 \\\\end{pmatrix} = \\\\begin{pmatrix} -2 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ 4 \\\\end{pmatrix} = \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 6 \\\\end{pmatrix}. $$",
"$$ \\\\begin{aligned} \\\\overrightarrow{OD} &= \\\\overrightarrow{OC} - \\\\overrightarrow{OB} + \\\\overrightarrow{OA} \\\\\\\\ &= \\\\begin{pmatrix} 3 \\\\\\\\ 1 \\\\\\\\ 4 \\\\end{pmatrix} - \\\\begin{pmatrix} 5 \\\\\\\\ 1 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ 4 \\\\end{pmatrix} \\\\\\\\ &= \\\\begin{pmatrix} -2 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix} + \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ 4 \\\\end{pmatrix} \\\\\\\\ &= \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 6 \\\\end{pmatrix}. \\\\end{aligned} $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
