const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
`$$ t^2 - 4t - 8 = 0. $$
$$ t = 2 \\pm 2\\sqrt{3}. $$`,
`$$
\\begin{aligned}
t^2 - 4t - 8 &= 0 \\\\
t &= 2 \\pm 2\\sqrt{3}.
\\end{aligned}
$$`
);

code = code.replace(
`$$ -t(t+6) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -6. $$`,
`$$
\\begin{aligned}
-t(t+6) &= 0 \\\\
t &= 0 \\quad \\text{or} \\quad t = -6.
\\end{aligned}
$$`
);

code = code.replace(
`$$ t(t+2) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -2. $$`,
`$$
\\begin{aligned}
t(t+2) &= 0 \\\\
t &= 0 \\quad \\text{or} \\quad t = -2.
\\end{aligned}
$$`
);

code = code.replace(
`$$ (t+2)(2-3t) = 0. $$
$$ t = -2 \\quad \\text{or} \\quad t = \\frac{2}{3}. $$`,
`$$
\\begin{aligned}
(t+2)(2-3t) &= 0 \\\\
t &= -2 \\quad \\text{or} \\quad t = \\frac{2}{3}.
\\end{aligned}
$$`
);

code = code.replace(
`find:
$$ \\text{(a)} \\quad \\vec{a} \\cdot \\vec{b} $$
$$ \\text{(b)} \\quad \\vec{b} \\cdot \\vec{a} $$
$$ \\text{(c)} \\quad |\\vec{a}|^2 $$
$$ \\text{(d)} \\quad \\vec{a} \\cdot \\vec{a} $$
$$ \\text{(e)} \\quad \\vec{a} \\cdot (\\vec{b} + \\vec{c}) $$
$$ \\text{(f)} \\quad \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} $$`,
`find:
(a) $\\vec{a} \\cdot \\vec{b}$
(b) $\\vec{b} \\cdot \\vec{a}$
(c) $|\\vec{a}|^2$
(d) $\\vec{a} \\cdot \\vec{a}$
(e) $\\vec{a} \\cdot (\\vec{b} + \\vec{c})$
(f) $\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}$`
);

// fix 4.1 as well
code = code.replace(
`Find the following vectors.
**(a)** $3\\vec{a}$
**(b)** $4\\vec{b}$
**(c)** $\\vec{a} - \\vec{b}$
**(d)** $\\vec{b} + \\vec{c}$
**(e)** $2\\vec{b} + \\vec{c}$
**(f)** $\\vec{a} - 2\\vec{b}$
**(g)** $\\vec{a} + \\vec{b} - 2\\vec{c}$
**(h)** $3\\vec{a} - \\vec{b} + \\vec{c}$`,
`Find the following vectors:
(a) $3\\vec{a}$
(b) $4\\vec{b}$
(c) $\\vec{a} - \\vec{b}$
(d) $\\vec{b} + \\vec{c}$
(e) $2\\vec{b} + \\vec{c}$
(f) $\\vec{a} - 2\\vec{b}$
(g) $\\vec{a} + \\vec{b} - 2\\vec{c}$
(h) $3\\vec{a} - \\vec{b} + \\vec{c}$`
);

code = code.replace(
`**Solution**
$$ \\text{(a)} \\quad 3\\vec{a} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix}. $$
$$ \\text{(b)} \\quad 4\\vec{b} = 4\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ -24 \\\\ 4 \\end{pmatrix}. $$
$$ \\text{(c)} \\quad \\vec{a} - \\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -5 \\end{pmatrix}. $$
$$ \\text{(d)} \\quad \\vec{b} + \\vec{c} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 0 \\end{pmatrix}. $$
$$ \\text{(e)} \\quad 2\\vec{b} + \\vec{c} = 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -12 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -5 \\\\ 1 \\end{pmatrix}. $$
$$ \\text{(f)} \\quad \\vec{a} - 2\\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 6 \\\\ -12 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 10 \\\\ -6 \\end{pmatrix}. $$
$$ \\text{(g)} \\quad \\vec{a} + \\vec{b} - 2\\vec{c} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -8 \\\\ -3 \\end{pmatrix} - \\begin{pmatrix} 0 \\\\ 14 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -22 \\\\ -1 \\end{pmatrix}. $$
$$ \\text{(h)} \\quad 3\\vec{a} - \\vec{b} + \\vec{c} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 0 \\\\ -13 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 7 \\\\ -14 \\end{pmatrix}. $$`,
`**Solution**
(a) $$ 3\\vec{a} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix}. $$
(b) $$ 4\\vec{b} = 4\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ -24 \\\\ 4 \\end{pmatrix}. $$
(c) $$ \\vec{a} - \\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -5 \\end{pmatrix}. $$
(d) $$ \\vec{b} + \\vec{c} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 0 \\end{pmatrix}. $$
(e) $$ 2\\vec{b} + \\vec{c} = 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -12 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -5 \\\\ 1 \\end{pmatrix}. $$
(f) $$ \\vec{a} - 2\\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 6 \\\\ -12 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 10 \\\\ -6 \\end{pmatrix}. $$
(g) $$ \\vec{a} + \\vec{b} - 2\\vec{c} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -8 \\\\ -3 \\end{pmatrix} - \\begin{pmatrix} 0 \\\\ 14 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -22 \\\\ -1 \\end{pmatrix}. $$
(h) $$ 3\\vec{a} - \\vec{b} + \\vec{c} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 0 \\\\ -13 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 7 \\\\ -14 \\end{pmatrix}. $$`
);

code = code.replace(
`**3. Question**
Find the angle between $\\vec{m}$ and $\\vec{n}$ if:
(a) $\\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}$ and $\\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}$.
(b) $\\vec{m} = 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}$ and $\\vec{n} = \\hat{\\mathbf{i}} + 2\\hat{\\mathbf{k}}$.

**Solution**
(a)
$$ \\vec{m} \\cdot \\vec{n} = -7, \\quad |\\vec{m}| = \\sqrt{6}, \\quad |\\vec{n}| = \\sqrt{14}. $$
Thus,
$$ \\cos\\theta = \\frac{-7}{\\sqrt{6}\\sqrt{14}}, \\quad \\theta = \\cos^{-1}\\left(\\frac{-7}{\\sqrt{6}\\sqrt{14}}\\right) \\approx 139.8^\\circ. $$

(b)
$$ \\vec{m} = \\begin{pmatrix} 0 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}. $$
So,
$$ \\vec{m} \\cdot \\vec{n} = -2, \\quad |\\vec{m}| = |\\vec{n}| = \\sqrt{5}. $$
Thus,
$$ \\cos\\theta = -\\frac{2}{5}, \\quad \\theta = \\cos^{-1}\\left(-\\frac{2}{5}\\right) \\approx 113.6^\\circ. $$`,
`**3. Question**
Find the angle between $\\vec{m}$ and $\\vec{n}$ if:
(a) $\\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}$ and $\\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}$.
(b) $\\vec{m} = 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}$ and $\\vec{n} = \\hat{\\mathbf{i}} + 2\\hat{\\mathbf{k}}$.

**Solution**
(a)
$$
\\begin{aligned}
\\vec{m} \\cdot \\vec{n} &= -7, \\quad |\\vec{m}| = \\sqrt{6}, \\quad |\\vec{n}| = \\sqrt{14}. \\\\
\\cos\\theta &= \\frac{-7}{\\sqrt{6}\\sqrt{14}}, \\quad \\theta = \\cos^{-1}\\left(\\frac{-7}{\\sqrt{6}\\sqrt{14}}\\right) \\approx 139.8^\\circ.
\\end{aligned}
$$

(b)
$$
\\begin{aligned}
\\vec{m} &= \\begin{pmatrix} 0 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}. \\\\
\\vec{m} \\cdot \\vec{n} &= -2, \\quad |\\vec{m}| = |\\vec{n}| = \\sqrt{5}. \\\\
\\cos\\theta &= -\\frac{2}{5}, \\quad \\theta = \\cos^{-1}\\left(-\\frac{2}{5}\\right) \\approx 113.6^\\circ.
\\end{aligned}
$$`
);

code = code.replace(
`Thus,
$$
\\begin{aligned}
3(1-t) + t(-3) + (-2)(4) &= 0 \\\\
3 - 3t - 3t - 8 &= 0 \\\\
-5 - 6t &= 0 \\\\
-6t &= 5 \\\\
t &= -\\frac{5}{6}.
\\end{aligned}
$$`,
`Thus,
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

fs.writeFileSync('src/data/chapter4_content.ts', code);
