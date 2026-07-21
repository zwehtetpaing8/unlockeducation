const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

text = text.replace(
`find:
$$ \\text{(a)} \\quad \\vec{q} \\cdot \\vec{p} $$
$$ \\text{(b)} \\quad \\vec{q} \\cdot \\vec{r} $$
$$ \\text{(c)} \\quad \\vec{q} \\cdot (\\vec{p} + \\vec{r}) $$
$$ \\text{(d)} \\quad \\hat{\\mathbf{i}} \\cdot \\vec{p} $$
$$ \\text{(e)} \\quad \\vec{q} \\cdot \\hat{\\mathbf{j}} $$
$$ \\text{(f)} \\quad \\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}} $$`,
`find:
(a) $\\vec{q} \\cdot \\vec{p}$ &nbsp;&nbsp;&nbsp; (b) $\\vec{q} \\cdot \\vec{r}$ &nbsp;&nbsp;&nbsp; (c) $\\vec{q} \\cdot (\\vec{p} + \\vec{r})$ &nbsp;&nbsp;&nbsp; (d) $\\hat{\\mathbf{i}} \\cdot \\vec{p}$ &nbsp;&nbsp;&nbsp; (e) $\\vec{q} \\cdot \\hat{\\mathbf{j}}$ &nbsp;&nbsp;&nbsp; (f) $\\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}}$`
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
(a) $\\vec{a} \\cdot \\vec{b}$ &nbsp;&nbsp;&nbsp; (b) $\\vec{b} \\cdot \\vec{a}$ &nbsp;&nbsp;&nbsp; (c) $|\\vec{a}|^2$ &nbsp;&nbsp;&nbsp; (d) $\\vec{a} \\cdot \\vec{a}$ &nbsp;&nbsp;&nbsp; (e) $\\vec{a} \\cdot (\\vec{b} + \\vec{c})$ &nbsp;&nbsp;&nbsp; (f) $\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}$`
);

fs.writeFileSync('src/data/chapter4_content.ts', text);
