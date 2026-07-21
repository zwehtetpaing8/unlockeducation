const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"(a)\nGiven\n$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $",
"(a)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $$\n$$"
);

code = code.replace(
"$\\n$ \\\\vec{m} \\\\cdot \\\\vec{n} = -7",
"$$ \\\\vec{m} \\\\cdot \\\\vec{n} = -7"
);

code = code.replace(
"(b)\nGiven\n$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $$",
"(b)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $$"
);

code = code.replace(
"\\\\approx 139.8^\\\\circ. $",
"\\\\approx 139.8^\\\\circ. $$"
);

code = code.replace(
"(a) Given\n$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $",
"(a) Given\n$$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$"
);

code = code.replace(
"(b) Given\n$ \\\\vec{r} = \\\\begin{pmatrix} t \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{s} = \\\\begin{pmatrix} t \\\\\\\\ -4 \\\\end{pmatrix}. $",
"(b) Given\n$$ \\\\vec{r} = \\\\begin{pmatrix} t \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{s} = \\\\begin{pmatrix} t \\\\\\\\ -4 \\\\end{pmatrix}. $$"
);

code = code.replace(
"\\nFor parallel vectors,\\n$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$",
"\nFor parallel vectors,\n$$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$"
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed $ missing");
