const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
`$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} \\quad \\quad \\overrightarrow{PR} = \\overrightarrow{OR} - \\overrightarrow{OP} $$
$$ = \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} $$
$$ = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$
$$ \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$
$$ = (1)(2) + (4)(5) + (2)(7) $$
$$ = 2 + 20 + 14 $$
$$ = 36. $$
$$ |\\overrightarrow{PQ}| = \\sqrt{1^2 + 4^2 + 2^2} \\quad \\quad |\\overrightarrow{PR}| = \\sqrt{2^2 + 5^2 + 7^2} $$
$$ = \\sqrt{1 + 16 + 4} \\quad \\quad = \\sqrt{4 + 25 + 49} $$
$$ = \\sqrt{21} \\quad \\quad = \\sqrt{78}. $$
$$ \\cos\\theta = \\frac{\\overrightarrow{PQ} \\cdot \\overrightarrow{PR}}{|\\overrightarrow{PQ}||\\overrightarrow{PR}|} = \\frac{36}{\\sqrt{21}\\sqrt{78}}. $$
$$ \\theta = \\cos^{-1}\\left(\\frac{36}{\\sqrt{21}\\sqrt{78}}\\right) \\approx 27.2^\\circ. $$
Therefore,
$$ \\angle QPR \\approx 27.2^\\circ $$`,
`$$ \\begin{aligned}
\\overrightarrow{PQ} &= \\overrightarrow{OQ} - \\overrightarrow{OP} \\\\
&= \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\\\
\\overrightarrow{PR} &= \\overrightarrow{OR} - \\overrightarrow{OP} \\\\
&= \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} \\\\
\\overrightarrow{PQ} \\cdot \\overrightarrow{PR} &= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} \\\\
&= (1)(2) + (4)(5) + (2)(7) = 36 \\\\
|\\overrightarrow{PQ}| &= \\sqrt{1^2 + 4^2 + 2^2} = \\sqrt{21} \\\\
|\\overrightarrow{PR}| &= \\sqrt{2^2 + 5^2 + 7^2} = \\sqrt{78} \\\\
\\cos\\theta &= \\frac{\\overrightarrow{PQ} \\cdot \\overrightarrow{PR}}{|\\overrightarrow{PQ}||\\overrightarrow{PR}|} = \\frac{36}{\\sqrt{21}\\sqrt{78}} \\\\
\\theta &= \\cos^{-1}\\left(\\frac{36}{\\sqrt{21}\\sqrt{78}}\\right) \\approx 27.2^\\circ
\\end{aligned} $$
Therefore,
$$ \\angle QPR \\approx 27.2^\\circ $$`
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log("Fixed example 9");
