const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(
`If $\\vec{b}$ has the same direction as $\\vec{a}$, then $\\hat{\\mathbf{b}} = \\hat{\\mathbf{a}}$. So
$$ \\hat{\\mathbf{b}} = \\frac{\\vec{b}}{|\\vec{b}|} $$
$$ \\vec{b} = |\\vec{b}|\\hat{\\mathbf{b}} = 5\\hat{\\mathbf{a}} = 5\\begin{pmatrix} \\frac{2}{3} \\\\ -\\frac{2}{3} \\\\ \\frac{1}{3} \\end{pmatrix} = \\begin{pmatrix} \\frac{10}{3} \\\\ -\\frac{10}{3} \\\\ \\frac{5}{3} \\end{pmatrix}. $$`,
`If $\\vec{b}$ has the same direction as $\\vec{a}$, then $\\hat{\\mathbf{b}} = \\hat{\\mathbf{a}}$. So $\\hat{\\mathbf{b}} = \\frac{\\vec{b}}{|\\vec{b}|}$ and hence,
$$ \\vec{b} = |\\vec{b}|\\hat{\\mathbf{b}} = 5\\hat{\\mathbf{a}} = 5\\begin{pmatrix} \\frac{2}{3} \\\\ -\\frac{2}{3} \\\\ \\frac{1}{3} \\end{pmatrix} = \\begin{pmatrix} \\frac{10}{3} \\\\ -\\frac{10}{3} \\\\ \\frac{5}{3} \\end{pmatrix}. $$`
);
fs.writeFileSync('src/data/chapter4_content.ts', content);
