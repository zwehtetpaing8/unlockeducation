const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Normalize line endings
text = text.replace(/\r\n/g, '\n');

text = text.replace(
`$$ 3(1-t) + t(-3) + (-2)(4) = 0 $$
$$ 3 - 3t - 3t - 8 = 0 $$
$$ -5 - 6t = 0 $$
$$ -6t = 5 $$
$$ t = -\\frac{5}{6}. $$`,
`$$ 3(1-t) + t(-3) + (-2)(4) = 0 \\implies 3 - 6t - 8 = 0 \\implies 6t = -5 \\implies t = -\\frac{5}{6}. $$`
);

text = text.replace(
`$$ \\vec{r} \\cdot \\vec{s} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} t \\\\ -4 \\end{pmatrix} = t^2 + (t+2)(-4). $$
So,
$$ t^2 - 4t - 8 = 0. $$
$$ t = 2 \\pm 2\\sqrt{3}. $$`,
`$$ \\vec{r} \\cdot \\vec{s} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} t \\\\ -4 \\end{pmatrix} = t^2 - 4t - 8 = 0 \\implies t = 2 \\pm 2\\sqrt{3}. $$`
);

text = text.replace(
`$$ t(-4) - t(t+2) = 0. $$
So,
$$ -t(t+6) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -6. $$`,
`$$ -4t - t(t+2) = -t(t+6) = 0 \\implies t = 0 \\quad \\text{or} \\quad t = -6. $$`
);

text = text.replace(
`$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix} = 0(2-3t) + (t+2)t. $$
So,
$$ t(t+2) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -2. $$`,
`$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix} = t(t+2) = 0 \\implies t = 0 \\quad \\text{or} \\quad t = -2. $$`
);

text = text.replace(
`$$ 0(t) - (t+2)(2-3t) = 0. $$
So,
$$ (t+2)(2-3t) = 0. $$
$$ t = -2 \\quad \\text{or} \\quad t = \\frac{2}{3}. $$`,
`$$ -(t+2)(2-3t) = 0 \\implies t = -2 \\quad \\text{or} \\quad t = \\frac{2}{3}. $$`
);

text = text.replace(
`$$
\\begin{aligned}
\\overrightarrow{AB} \\cdot \\overrightarrow{BC} &= \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} \\\\
&= (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) \\\\
&= -20 - 3k.
\\end{aligned}
$$`,
`$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} = (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) = -20 - 3k. $$`
);

text = text.replace(
`$$
\\begin{aligned}
\\vec{q} \\cdot (\\vec{p} + \\vec{r}) &= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} \\\\
&= (-1)(1) + (5)(6) = 29.
\\end{aligned}
$$`,
`$$ \\vec{q} \\cdot (\\vec{p} + \\vec{r}) = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} = (-1)(1) + (5)(6) = 29. $$`
);

text = text.replace(
`$$
\\begin{aligned}
\\vec{a} \\cdot (\\vec{b} + \\vec{c}) &= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} \\\\
&= -2 + 0 + 6 = 4.
\\end{aligned}
$$`,
`$$ \\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} = -2 + 0 + 6 = 4. $$`
);

text = text.replace(
`$$
\\begin{aligned}
\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} &= 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= 2 + (0 - 1 + 3) = 4.
\\end{aligned}
$$`,
`$$ \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} = 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) = 2 + (0 - 1 + 3) = 4. $$`
);

text = text.replace(
`$$
\\begin{aligned}
(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) &= \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} \\\\
&= |\\vec{b}|^2 - |\\vec{a}|^2.
\\end{aligned}
$$`,
`$$ (\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) = \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} = |\\vec{b}|^2 - |\\vec{a}|^2. $$`
);


text = text.replace(
`$$
\\begin{aligned}
\\overrightarrow{AB} \\cdot \\overrightarrow{BC} &= \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} \\\\
&= (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) \\\\
&= -20 - 3k.
\\end{aligned}
$$`,
`$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} = (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) = -20 - 3k. $$`
);

text = text.replace(
`So,
$$ -20 - 3k = 0. $$
$$ k = -\\frac{20}{3}. $$`,
`So, $-20 - 3k = 0$, which means $k = -\\frac{20}{3}$.`
);

fs.writeFileSync('src/data/chapter4_content.ts', text);
