const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

text = text.replace(
`$$ |\\vec{b} - \\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 $$
$$ = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) $$
$$ = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) $$`,
`$$ |\\vec{b} - \\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) $$`
);

text = text.replace(
`$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} $$
$$ = (3)(5) + (4)(-12) $$
$$ = 15 - 48 $$
$$ = -33. $$`,
`$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} = (3)(5) + (4)(-12) = 15 - 48 = -33. $$`
);

text = text.replace(
`$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} \\quad \\quad \\overrightarrow{PR} = \\overrightarrow{OR} - \\overrightarrow{OP} $$
$$ = \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} $$
$$ = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$`,
`$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} = \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} $$
$$ \\overrightarrow{PR} = \\overrightarrow{OR} - \\overrightarrow{OP} = \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$`
);

text = text.replace(
`$$ \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$
$$ = (1)(2) + (4)(5) + (2)(7) $$
$$ = 2 + 20 + 14 $$
$$ = 36. $$`,
`$$ \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} = (1)(2) + (4)(5) + (2)(7) = 2 + 20 + 14 = 36. $$`
);

text = text.replace(
`$$ |\\overrightarrow{PQ}| = \\sqrt{1^2 + 4^2 + 2^2} \\quad \\quad |\\overrightarrow{PR}| = \\sqrt{2^2 + 5^2 + 7^2} $$
$$ = \\sqrt{1 + 16 + 4} \\quad \\quad = \\sqrt{4 + 25 + 49} $$
$$ = \\sqrt{21} \\quad \\quad = \\sqrt{78}. $$`,
`$$ |\\overrightarrow{PQ}| = \\sqrt{1^2 + 4^2 + 2^2} = \\sqrt{1 + 16 + 4} = \\sqrt{21}, \\quad |\\overrightarrow{PR}| = \\sqrt{2^2 + 5^2 + 7^2} = \\sqrt{4 + 25 + 49} = \\sqrt{78}. $$`
);

text = text.replace(
`$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) = \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} $$
$$ = |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 $$
$$ = 3^2 - 5(1^2) $$
$$ = 9 - 5 $$
$$ = 4. $$`,
`$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) = \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} = |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 = 3^2 - 5(1^2) = 9 - 5 = 4. $$`
);

text = text.replace(
`$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
From the first component,
$$ 3 = -2k, \\quad k = -\\frac{3}{2}, $$
so
$$ t = -\\frac{3}{2}. $$`,
`$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
From the first component, $3 = -2k$, so $k = -\\frac{3}{2}$. Thus, $t = -\\frac{3}{2}$.`
);

fs.writeFileSync('src/data/chapter4_content.ts', text);
