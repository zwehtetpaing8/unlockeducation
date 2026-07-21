const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Replace the bad one with proper escaping
code = code.replace(
"$$ \\vec{a} = \\begin{pmatrix} 5 \\ -2 \\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\ -6 \\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\ 7 \\ -1 \\end{pmatrix}. $$",
"$$ \\\\vec{a} = \\\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\\\end{pmatrix}, \\\\quad \\\\vec{b} = \\\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\\\end{pmatrix}, \\\\quad \\\\vec{c} = \\\\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\\\end{pmatrix}. $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
