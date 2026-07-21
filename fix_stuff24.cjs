const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
let parts = code.split("**Solution**\nGiven\n$$ \\vec{a} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix}. $$");
console.log(parts.length);
code = parts.join("**Solution**");
fs.writeFileSync('src/data/chapter4_content.ts', code);
