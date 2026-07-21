const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
text = text.replace(/\r\n/g, '\n');

text = text.replace(
/Find the following vectors\.\n\*\*\(a\)\*\* \$3\\vec\{a\}\$\n\*\*\(b\)\*\* \$4\\vec\{b\}\$\n\*\*\(c\)\*\* \$\\vec\{a\} - \\vec\{b\}\$\n\*\*\(d\)\*\* \$\\vec\{b\} \+ \\vec\{c\}\$\n\*\*\(e\)\*\* \$2\\vec\{b\} \+ \\vec\{c\}\$\n\*\*\(f\)\*\* \$\\vec\{a\} - 2\\vec\{b\}\$\n\*\*\(g\)\*\* \$\\vec\{a\} \+ \\vec\{b\} - 2\\vec\{c\}\$\n\*\*\(h\)\*\* \$3\\vec\{a\} - \\vec\{b\} \+ \\vec\{c\}\$/,
`Find the following vectors:
(a) $3\\vec{a}$ &nbsp;&nbsp;&nbsp; (b) $4\\vec{b}$ &nbsp;&nbsp;&nbsp; (c) $\\vec{a} - \\vec{b}$ &nbsp;&nbsp;&nbsp; (d) $\\vec{b} + \\vec{c}$ &nbsp;&nbsp;&nbsp; (e) $2\\vec{b} + \\vec{c}$ &nbsp;&nbsp;&nbsp; (f) $\\vec{a} - 2\\vec{b}$ &nbsp;&nbsp;&nbsp; (g) $\\vec{a} + \\vec{b} - 2\\vec{c}$ &nbsp;&nbsp;&nbsp; (h) $3\\vec{a} - \\vec{b} + \\vec{c}$`
);

fs.writeFileSync('src/data/chapter4_content.ts', text);
