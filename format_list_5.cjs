const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('find:')) {
        if (lines[i+1] && lines[i+1].includes('\\text{(a)}') && lines[i+1].includes('\\vec{q}')) {
            lines[i+1] = '(a) $\\vec{q} \\cdot \\vec{p}$ &nbsp;&nbsp;&nbsp; (b) $\\vec{q} \\cdot \\vec{r}$ &nbsp;&nbsp;&nbsp; (c) $\\vec{q} \\cdot (\\vec{p} + \\vec{r})$ &nbsp;&nbsp;&nbsp; (d) $\\hat{\\mathbf{i}} \\cdot \\vec{p}$ &nbsp;&nbsp;&nbsp; (e) $\\vec{q} \\cdot \\hat{\\mathbf{j}}$ &nbsp;&nbsp;&nbsp; (f) $\\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}}$';
            lines.splice(i+2, 5);
        } else if (lines[i+1] && lines[i+1].includes('\\text{(a)}') && lines[i+1].includes('\\vec{a}')) {
            lines[i+1] = '(a) $\\vec{a} \\cdot \\vec{b}$ &nbsp;&nbsp;&nbsp; (b) $\\vec{b} \\cdot \\vec{a}$ &nbsp;&nbsp;&nbsp; (c) $|\\vec{a}|^2$ &nbsp;&nbsp;&nbsp; (d) $\\vec{a} \\cdot \\vec{a}$ &nbsp;&nbsp;&nbsp; (e) $\\vec{a} \\cdot (\\vec{b} + \\vec{c})$ &nbsp;&nbsp;&nbsp; (f) $\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}$';
            lines.splice(i+2, 5);
        }
    }
}

fs.writeFileSync('src/data/chapter4_content.ts', lines.join('\n'));
