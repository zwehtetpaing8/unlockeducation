const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Fix 4.2 Angle between Two Vectors
code = code.replace(
`Hence
$$ |\\vec{b} - \\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 $$
$$ = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) $$
$$ = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) $$`,
`Hence
$$
\\begin{aligned}
|\\vec{b} - \\vec{a}|^2 &= (x_2 - x_1)^2 + (y_2 - y_1)^2 \\\\
&= x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) \\\\
&= |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2)
\\end{aligned}
$$`
);

code = code.replace(
`$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} $$
$$ = (3)(5) + (4)(-12) $$
$$ = 15 - 48 $$
$$ = -33. $$`,
`$$
\\begin{aligned}
\\vec{a} \\cdot \\vec{b} &= \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} \\\\
&= (3)(5) + (4)(-12) \\\\
&= 15 - 48 \\\\
&= -33.
\\end{aligned}
$$`
);

code = code.replace(
`$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} \\quad \\quad \\overrightarrow{PR} = \\overrightarrow{OR} - \\overrightarrow{OP} $$
$$ = \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} $$
$$ = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$`,
`$$
\\begin{aligned}
\\overrightarrow{PQ} &= \\overrightarrow{OQ} - \\overrightarrow{OP} & \\overrightarrow{PR} &= \\overrightarrow{OR} - \\overrightarrow{OP} \\\\
&= \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} & &= \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\\\
&= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} & &= \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix}
\\end{aligned}
$$`
);

code = code.replace(
`$$ \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$
$$ = (1)(2) + (4)(5) + (2)(7) $$
$$ = 2 + 20 + 14 $$
$$ = 36. $$`,
`$$
\\begin{aligned}
\\overrightarrow{PQ} \\cdot \\overrightarrow{PR} &= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} \\\\
&= (1)(2) + (4)(5) + (2)(7) \\\\
&= 2 + 20 + 14 \\\\
&= 36.
\\end{aligned}
$$`
);

code = code.replace(
`$$ |\\overrightarrow{PQ}| = \\sqrt{1^2 + 4^2 + 2^2} \\quad \\quad |\\overrightarrow{PR}| = \\sqrt{2^2 + 5^2 + 7^2} $$
$$ = \\sqrt{1 + 16 + 4} \\quad \\quad = \\sqrt{4 + 25 + 49} $$
$$ = \\sqrt{21} \\quad \\quad = \\sqrt{78}. $$`,
`$$
\\begin{aligned}
|\\overrightarrow{PQ}| &= \\sqrt{1^2 + 4^2 + 2^2} & |\\overrightarrow{PR}| &= \\sqrt{2^2 + 5^2 + 7^2} \\\\
&= \\sqrt{1 + 16 + 4} & &= \\sqrt{4 + 25 + 49} \\\\
&= \\sqrt{21} & &= \\sqrt{78}.
\\end{aligned}
$$`
);

code = code.replace(
`$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) = \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} $$
$$ = |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 $$
$$ = 3^2 - 5(1^2) $$
$$ = 9 - 5 $$
$$ = 4. $$`,
`$$
\\begin{aligned}
(\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) &= \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} \\\\
&= |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 \\\\
&= 3^2 - 5(1^2) \\\\
&= 9 - 5 \\\\
&= 4.
\\end{aligned}
$$`
);

code = code.replace(
`$$ \\vec{p} \\cdot \\vec{q} = 0. $$
Thus,
$$ 3(1-t) + t(-3) + (-2)(4) = 0 $$
$$ 3 - 3t - 3t - 8 = 0 $$
$$ -5 - 6t = 0 $$
$$ -6t = 5 $$
$$ t = -\\frac{5}{6}. $$`,
`$$ \\vec{p} \\cdot \\vec{q} = 0. $$
Thus,
$$
\\begin{aligned}
3(1-t) + t(-3) + (-2)(4) &= 0 \\\\
3 - 3t - 3t - 8 &= 0 \\\\
-5 - 6t &= 0 \\\\
-6t &= 5 \\\\
t &= -\\frac{5}{6}.
\\end{aligned}
$$`
);

code = code.replace(
`$$ |\\vec{a}| = \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13. $$
$$ \\cos\\theta = \\frac{-33}{(5)(13)} = -\\frac{33}{65}. $$
$$ \\theta = \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ. $$
$$ 120.5^\\circ $$`,
`$$
\\begin{aligned}
|\\vec{a}| &= \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13. \\\\
\\cos\\theta &= \\frac{-33}{(5)(13)} = -\\frac{33}{65}. \\\\
\\theta &= \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ.
\\end{aligned}
$$`
);

code = code.replace(
`$$ \\cos\\theta = \\frac{\\overrightarrow{PQ} \\cdot \\overrightarrow{PR}}{|\\overrightarrow{PQ}||\\overrightarrow{PR}|} = \\frac{36}{\\sqrt{21}\\sqrt{78}}. $$
$$ \\theta = \\cos^{-1}\\left(\\frac{36}{\\sqrt{21}\\sqrt{78}}\\right) \\approx 27.2^\\circ. $$`,
`$$
\\begin{aligned}
\\cos\\theta &= \\frac{\\overrightarrow{PQ} \\cdot \\overrightarrow{PR}}{|\\overrightarrow{PQ}||\\overrightarrow{PR}|} = \\frac{36}{\\sqrt{21}\\sqrt{78}}. \\\\
\\theta &= \\cos^{-1}\\left(\\frac{36}{\\sqrt{21}\\sqrt{78}}\\right) \\approx 27.2^\\circ.
\\end{aligned}
$$`
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
