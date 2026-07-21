const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"$$ \\\\overrightarrow{PQ} = \\\\overrightarrow{OQ} - \\\\overrightarrow{OP} \\\\quad \\\\quad \\\\overrightarrow{PR} = \\\\overrightarrow{OR} - \\\\overrightarrow{OP} $$\n$$ = \\\\begin{pmatrix} 2 \\\\\\\\ 4 \\\\\\\\ 1 \\\\end{pmatrix} - \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{pmatrix} \\\\quad \\\\quad = \\\\begin{pmatrix} 3 \\\\\\\\ 5 \\\\\\\\ 6 \\\\end{pmatrix} - \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{pmatrix} $$\n$$ = \\\\begin{pmatrix} 1 \\\\\\\\ 4 \\\\\\\\ 2 \\\\end{pmatrix} \\\\quad \\\\quad = \\\\begin{pmatrix} 2 \\\\\\\\ 5 \\\\\\\\ 7 \\\\end{pmatrix} $$",
"$$ \\\\begin{aligned} \\\\overrightarrow{PQ} &= \\\\overrightarrow{OQ} - \\\\overrightarrow{OP} & \\\\overrightarrow{PR} &= \\\\overrightarrow{OR} - \\\\overrightarrow{OP} \\\\\\\\ &= \\\\begin{pmatrix} 2 \\\\\\\\ 4 \\\\\\\\ 1 \\\\end{pmatrix} - \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{pmatrix} & &= \\\\begin{pmatrix} 3 \\\\\\\\ 5 \\\\\\\\ 6 \\\\end{pmatrix} - \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ -1 \\\\end{pmatrix} \\\\\\\\ &= \\\\begin{pmatrix} 1 \\\\\\\\ 4 \\\\\\\\ 2 \\\\end{pmatrix} & &= \\\\begin{pmatrix} 2 \\\\\\\\ 5 \\\\\\\\ 7 \\\\end{pmatrix} \\\\end{aligned} $$"
);

code = code.replace(
"$$ \\\\overrightarrow{PQ} \\\\cdot \\\\overrightarrow{PR} = \\\\begin{pmatrix} 1 \\\\\\\\ 4 \\\\\\\\ 2 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 2 \\\\\\\\ 5 \\\\\\\\ 7 \\\\end{pmatrix} $$\n$$ = (1)(2) + (4)(5) + (2)(7) $$\n$$ = 2 + 20 + 14 $$\n$$ = 36. $$",
"$$ \\\\begin{aligned} \\\\overrightarrow{PQ} \\\\cdot \\\\overrightarrow{PR} &= \\\\begin{pmatrix} 1 \\\\\\\\ 4 \\\\\\\\ 2 \\\\end{pmatrix} \\\\cdot \\\\begin{pmatrix} 2 \\\\\\\\ 5 \\\\\\\\ 7 \\\\end{pmatrix} \\\\\\\\ &= (1)(2) + (4)(5) + (2)(7) \\\\\\\\ &= 2 + 20 + 14 \\\\\\\\ &= 36. \\\\end{aligned} $$"
);

code = code.replace(
"$$ |\\\\overrightarrow{PQ}| = \\\\sqrt{1^2 + 4^2 + 2^2} \\\\quad \\\\quad |\\\\overrightarrow{PR}| = \\\\sqrt{2^2 + 5^2 + 7^2} $$\n$$ = \\\\sqrt{1 + 16 + 4} \\\\quad \\\\quad = \\\\sqrt{4 + 25 + 49} $$\n$$ = \\\\sqrt{21} \\\\quad \\\\quad = \\\\sqrt{78}. $$",
"$$ \\\\begin{aligned} |\\\\overrightarrow{PQ}| &= \\\\sqrt{1^2 + 4^2 + 2^2} & |\\\\overrightarrow{PR}| &= \\\\sqrt{2^2 + 5^2 + 7^2} \\\\\\\\ &= \\\\sqrt{1 + 16 + 4} & &= \\\\sqrt{4 + 25 + 49} \\\\\\\\ &= \\\\sqrt{21} & &= \\\\sqrt{78}. \\\\end{aligned} $$"
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
