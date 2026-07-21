const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
code = code.replace(
"**Solution**\n$$\n\\begin{alignedat}{2}\n\\text{(a)}",
"**Solution**\nGiven\n$$ \\vec{a} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix}. $$\n$$\n\\begin{alignedat}{2}\n\\text{(a)}"
);
fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed question 1");
