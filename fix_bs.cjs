const fs = require('fs');

let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

text = text.replace(/\(a\) \$\\vec\{q\} \\cdot \\vec\{p\}\$ &nbsp;&nbsp;&nbsp; \(b\) \$\\vec\{q\} \\cdot \\vec\{r\}\$ &nbsp;&nbsp;&nbsp; \(c\) \$\\vec\{q\} \\cdot \(\\vec\{p\} \+ \\vec\{r\}\)\$ &nbsp;&nbsp;&nbsp; \(d\) \$\\hat\{\\mathbf\{i\}\} \\cdot \\vec\{p\}\$ &nbsp;&nbsp;&nbsp; \(e\) \$\\vec\{q\} \\cdot \\hat\{\\mathbf\{j\}\}\$ &nbsp;&nbsp;&nbsp; \(f\) \$\\hat\{\\mathbf\{i\}\} \\cdot \\hat\{\\mathbf\{i\}\}\$/g,
    "(a) $\\\\vec{q} \\\\cdot \\\\vec{p}$ &nbsp;&nbsp;&nbsp; (b) $\\\\vec{q} \\\\cdot \\\\vec{r}$ &nbsp;&nbsp;&nbsp; (c) $\\\\vec{q} \\\\cdot (\\\\vec{p} + \\\\vec{r})$ &nbsp;&nbsp;&nbsp; (d) $\\\\hat{\\\\mathbf{i}} \\\\cdot \\\\vec{p}$ &nbsp;&nbsp;&nbsp; (e) $\\\\vec{q} \\\\cdot \\\\hat{\\\\mathbf{j}}$ &nbsp;&nbsp;&nbsp; (f) $\\\\hat{\\\\mathbf{i}} \\\\cdot \\\\hat{\\\\mathbf{i}}$");

text = text.replace(/\(a\) \$\\vec\{a\} \\cdot \\vec\{b\}\$ &nbsp;&nbsp;&nbsp; \(b\) \$\\vec\{b\} \\cdot \\vec\{a\}\$ &nbsp;&nbsp;&nbsp; \(c\) \$\|\\vec\{a\}\|\^2\$ &nbsp;&nbsp;&nbsp; \(d\) \$\\vec\{a\} \\cdot \\vec\{a\}\$ &nbsp;&nbsp;&nbsp; \(e\) \$\\vec\{a\} \\cdot \(\\vec\{b\} \+ \\vec\{c\}\)\$ &nbsp;&nbsp;&nbsp; \(f\) \$\\vec\{a\} \\cdot \\vec\{b\} \+ \\vec\{a\} \\cdot \\vec\{c\}\$/g,
    "(a) $\\\\vec{a} \\\\cdot \\\\vec{b}$ &nbsp;&nbsp;&nbsp; (b) $\\\\vec{b} \\\\cdot \\\\vec{a}$ &nbsp;&nbsp;&nbsp; (c) $|\\\\vec{a}|^2$ &nbsp;&nbsp;&nbsp; (d) $\\\\vec{a} \\\\cdot \\\\vec{a}$ &nbsp;&nbsp;&nbsp; (e) $\\\\vec{a} \\\\cdot (\\\\vec{b} + \\\\vec{c})$ &nbsp;&nbsp;&nbsp; (f) $\\\\vec{a} \\\\cdot \\\\vec{b} + \\\\vec{a} \\\\cdot \\\\vec{c}$");

text = text.replace(/\(a\) \$3\\vec\{a\}\$ &nbsp;&nbsp;&nbsp; \(b\) \$4\\vec\{b\}\$ &nbsp;&nbsp;&nbsp; \(c\) \$\\vec\{a\} - \\vec\{b\}\$ &nbsp;&nbsp;&nbsp; \(d\) \$\\vec\{b\} \+ \\vec\{c\}\$ &nbsp;&nbsp;&nbsp; \(e\) \$2\\vec\{b\} \+ \\vec\{c\}\$ &nbsp;&nbsp;&nbsp; \(f\) \$\\vec\{a\} - 2\\vec\{b\}\$ &nbsp;&nbsp;&nbsp; \(g\) \$\\vec\{a\} \+ \\vec\{b\} - 2\\vec\{c\}\$ &nbsp;&nbsp;&nbsp; \(h\) \$3\\vec\{a\} - \\vec\{b\} \+ \\vec\{c\}\$/g,
    "(a) $3\\\\vec{a}$ &nbsp;&nbsp;&nbsp; (b) $4\\\\vec{b}$ &nbsp;&nbsp;&nbsp; (c) $\\\\vec{a} - \\\\vec{b}$ &nbsp;&nbsp;&nbsp; (d) $\\\\vec{b} + \\\\vec{c}$ &nbsp;&nbsp;&nbsp; (e) $2\\\\vec{b} + \\\\vec{c}$ &nbsp;&nbsp;&nbsp; (f) $\\\\vec{a} - 2\\\\vec{b}$ &nbsp;&nbsp;&nbsp; (g) $\\\\vec{a} + \\\\vec{b} - 2\\\\vec{c}$ &nbsp;&nbsp;&nbsp; (h) $3\\\\vec{a} - \\\\vec{b} + \\\\vec{c}$");

fs.writeFileSync('src/data/chapter4_content.ts', text);
