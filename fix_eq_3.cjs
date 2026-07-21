const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

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
`find:
$$ \\text{(a)} \\quad \\vec{q} \\cdot \\vec{p} $$
$$ \\text{(b)} \\quad \\vec{q} \\cdot \\vec{r} $$
$$ \\text{(c)} \\quad \\vec{q} \\cdot (\\vec{p} + \\vec{r}) $$
$$ \\text{(d)} \\quad \\hat{\\mathbf{i}} \\cdot \\vec{p} $$
$$ \\text{(e)} \\quad \\vec{q} \\cdot \\hat{\\mathbf{j}} $$
$$ \\text{(f)} \\quad \\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}} $$`,
`find:
(a) $\\vec{q} \\cdot \\vec{p}$
(b) $\\vec{q} \\cdot \\vec{r}$
(c) $\\vec{q} \\cdot (\\vec{p} + \\vec{r})$
(d) $\\hat{\\mathbf{i}} \\cdot \\vec{p}$
(e) $\\vec{q} \\cdot \\hat{\\mathbf{j}}$
(f) $\\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}}$`
);

text = text.replace(
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

fs.writeFileSync('src/data/chapter4_content.ts', text);
