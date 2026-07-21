const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
"(a)Given$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $$",
"(a)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $$\n$$"
);

code = code.replace(
"(b)Given$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $$",
"(b)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 0 \\\\\\\\ 2 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\\\\\ 2 \\\\end{pmatrix}. $$\n$$"
);

code = code.replace(
"(a) Given$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $For",
"(a) Given\n$$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$\nFor"
);

// Add for 4(b)
code = code.replace(
"(b) For perpendicular vectors,",
"(b) Given\n$$ \\\\vec{r} = \\\\begin{pmatrix} t \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{s} = \\\\begin{pmatrix} t \\\\\\\\ -4 \\\\end{pmatrix}. $$\nFor perpendicular vectors,"
);

// Add for 4(c)
code = code.replace(
"(c) For perpendicular vectors,",
"(c) Given\n$$ \\\\vec{a} = \\\\begin{pmatrix} 0 \\\\\\\\ t+2 \\\\end{pmatrix}, \\\\quad \\\\vec{b} = \\\\begin{pmatrix} 2-3t \\\\\\\\ t \\\\end{pmatrix}. $$\nFor perpendicular vectors,"
);

// And one parallel vector error in 4(a)
code = code.replace(
"For parallel vectors,$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$",
"For parallel vectors,\n$$ \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix} = k\\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$"
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed missing $$");
