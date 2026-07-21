const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const target = `\\begin{aligned}
\\text{(a)} \\quad 3\\vec{a} &= 3\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\\\\\ -6 \\\\\\\\ -12 \\end{pmatrix}. \\\\\\\\
\\text{(b)} \\quad 4\\vec{b} &= 4\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\\\\\ -24 \\\\\\\\ 4 \\end{pmatrix}. \\\\\\\\
\\text{(c)} \\quad \\vec{a} - \\vec{b} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\\\\\ 4 \\\\\\\\ -5 \\end{pmatrix}. \\\\\\\\
\\text{(d)} \\quad \\vec{b} + \\vec{c} &= \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\\\\\ 1 \\\\\\\\ 0 \\end{pmatrix}. \\\\\\\\
\\text{(e)} \\quad 2\\vec{b} + \\vec{c} &= 2\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\\\\\ -5 \\\\\\\\ 1 \\end{pmatrix}. \\\\\\\\
\\text{(f)} \\quad \\vec{a} - 2\\vec{b} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\\\\\ 10 \\\\\\\\ -6 \\end{pmatrix}. \\\\\\\\
\\text{(g)} \\quad \\vec{a} + \\vec{b} - 2\\vec{c} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\\\\\ -22 \\\\\\\\ -1 \\end{pmatrix}. \\\\\\\\
\\text{(h)} \\quad 3\\vec{a} - \\vec{b} + \\vec{c} &= 3\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\\\\\ 7 \\\\\\\\ -14 \\end{pmatrix}.
\\end{aligned}`;

const replacement = `\\begin{aligned}
\\text{(a)} && 3\\vec{a} &= 3\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\\\\\ -6 \\\\\\\\ -12 \\end{pmatrix}. \\\\\\\\
\\text{(b)} && 4\\vec{b} &= 4\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\\\\\ -24 \\\\\\\\ 4 \\end{pmatrix}. \\\\\\\\
\\text{(c)} && \\vec{a} - \\vec{b} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\\\\\ 4 \\\\\\\\ -5 \\end{pmatrix}. \\\\\\\\
\\text{(d)} && \\vec{b} + \\vec{c} &= \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\\\\\ 1 \\\\\\\\ 0 \\end{pmatrix}. \\\\\\\\
\\text{(e)} && 2\\vec{b} + \\vec{c} &= 2\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\\\\\ -5 \\\\\\\\ 1 \\end{pmatrix}. \\\\\\\\
\\text{(f)} && \\vec{a} - 2\\vec{b} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\\\\\ 10 \\\\\\\\ -6 \\end{pmatrix}. \\\\\\\\
\\text{(g)} && \\vec{a} + \\vec{b} - 2\\vec{c} &= \\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\\\\\ -22 \\\\\\\\ -1 \\end{pmatrix}. \\\\\\\\
\\text{(h)} && 3\\vec{a} - \\vec{b} + \\vec{c} &= 3\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\\\\\ 7 \\\\\\\\ -14 \\end{pmatrix}.
\\end{aligned}`;

if (code.includes(target)) {
  console.log("Target found!");
  code = code.replace(target, replacement);
  fs.writeFileSync('src/data/chapter4_content.ts', code);
  console.log("File updated");
} else {
  console.log("Target not found!");
}
