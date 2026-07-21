const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"Given$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $",
"Given\n$$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $$"
);

code = code.replace(
"\\approx 139.8^\\\\circ. $(b)Given$ \\\\vec{m}",
"\\approx 139.8^\\\\circ. $$\n\n(b)\nGiven\n$$ \\\\vec{m}"
);

code = code.replace(
"Given$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $So",
"Given\n$$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $$\nSo"
);

code = code.replace(
"Given$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $For",
"Given\n$$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$\nFor"
);

code = code.replace(
"For parallel vectors,$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$From",
"For parallel vectors,\n$$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$\nFrom"
);

code = code.replace(
"Given$ \\\\vec{r} = \\\\begin{pmatrix} t \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{s} = \\\\begin{pmatrix} t \\\\\\\\ -4 \\\\end{pmatrix}. $For",
"Given\n$$ \\\\vec{r} = \\\\begin{pmatrix} t \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{s} = \\\\begin{pmatrix} t \\\\\\\\ -4 \\\\end{pmatrix}. $$\nFor"
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed $ missing with specific replaces");
