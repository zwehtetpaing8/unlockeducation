const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ \\\\overrightarrow{OE} = \\\\frac{1}{2}(\\\\overrightarrow{OB} + \\\\overrightarrow{OC}) $$\n$$ = \\\\frac{1}{2}\\\\left[ \\\\begin{pmatrix} 5 \\\\\\\\ 0 \\\\\\\\ 3 \\\\end{pmatrix} + \\\\begin{pmatrix} 7 \\\\\\\\ 8 \\\\\\\\ -3 \\\\end{pmatrix} \\\\right] = \\\\frac{1}{2}\\\\begin{pmatrix} 12 \\\\\\\\ 8 \\\\\\\\ 0 \\\\end{pmatrix} = \\\\begin{pmatrix} 6 \\\\\\\\ 4 \\\\\\\\ 0 \\\\end{pmatrix}. $$",
"$$ \\\\begin{aligned} \\\\overrightarrow{OE} &= \\\\frac{1}{2}(\\\\overrightarrow{OB} + \\\\overrightarrow{OC}) \\\\\\\\ &= \\\\frac{1}{2}\\\\left[ \\\\begin{pmatrix} 5 \\\\\\\\ 0 \\\\\\\\ 3 \\\\end{pmatrix} + \\\\begin{pmatrix} 7 \\\\\\\\ 8 \\\\\\\\ -3 \\\\end{pmatrix} \\\\right] \\\\\\\\ &= \\\\frac{1}{2}\\\\begin{pmatrix} 12 \\\\\\\\ 8 \\\\\\\\ 0 \\\\end{pmatrix} \\\\\\\\ &= \\\\begin{pmatrix} 6 \\\\\\\\ 4 \\\\\\\\ 0 \\\\end{pmatrix}. \\\\end{aligned} $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
