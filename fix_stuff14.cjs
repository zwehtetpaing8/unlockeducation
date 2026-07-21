const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Exercise 4.1 Q1
code = code.replace(
"**Solution**\n$$\n\\begin{alignedat}{2}\n\\\\text{(a)}",
"**Solution**\nGiven\n$$ \\\\vec{a} = \\\\begin{pmatrix} 5 \\\\\\\\ -2 \\\\\\\\ -4 \\\\end{pmatrix}, \\\\quad \\\\vec{b} = \\\\begin{pmatrix} 3 \\\\\\\\ -6 \\\\\\\\ 1 \\\\end{pmatrix}, \\\\quad \\\\vec{c} = \\\\begin{pmatrix} 0 \\\\\\\\ 7 \\\\\\\\ -1 \\\\end{pmatrix}. $$\n$$\n\\begin{alignedat}{2}\n\\\\text{(a)}"
);

// Exercise 4.1 Q2
code = code.replace(
"**Solution**\n(a) Since $\\\\vec{c}$ is parallel",
"**Solution**\nGiven\n$$ \\\\vec{a} = \\\\begin{pmatrix} 1 \\\\\\\\ 2 \\\\\\\\ 7 \\\\end{pmatrix}, \\\\quad \\\\vec{b} = \\\\begin{pmatrix} -3 \\\\\\\\ 4 \\\\\\\\ 2 \\\\end{pmatrix}, \\\\quad \\\\vec{c} = \\\\begin{pmatrix} -2 \\\\\\\\ p \\\\\\\\ q \\\\end{pmatrix}. $$\n(a) Since $\\\\vec{c}$ is parallel"
);

// Exercise 4.1 Q3
code = code.replace(
"**Solution**\n(a) Point $E$ is the midpoint",
"**Solution**\nGiven\n$$ \\\\overrightarrow{OA} = \\\\begin{pmatrix} 3 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix}, \\\\quad \\\\overrightarrow{OB} = \\\\begin{pmatrix} 5 \\\\\\\\ 0 \\\\\\\\ 3 \\\\end{pmatrix}, \\\\quad \\\\overrightarrow{OC} = \\\\begin{pmatrix} 7 \\\\\\\\ 8 \\\\\\\\ -3 \\\\end{pmatrix}, \\\\quad \\\\overrightarrow{OD} = \\\\begin{pmatrix} 4 \\\\\\\\ 3 \\\\\\\\ -2 \\\\end{pmatrix}. $$\n(a) Point $E$ is the midpoint"
);

// Exercise 4.1 Q4
code = code.replace(
"**Solution**\nSince $ABCD$ is a parallelogram",
"**Solution**\nGiven\n$$ \\\\overrightarrow{OA} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ 4 \\\\end{pmatrix}, \\\\quad \\\\overrightarrow{OB} = \\\\begin{pmatrix} 5 \\\\\\\\ 1 \\\\\\\\ 2 \\\\end{pmatrix}, \\\\quad \\\\overrightarrow{OC} = \\\\begin{pmatrix} 3 \\\\\\\\ 1 \\\\\\\\ 4 \\\\end{pmatrix}. $$\nSince $ABCD$ is a parallelogram"
);

// Exercise 4.2 Q1
code = code.replace(
"**Solution**\nGiven\n$$ \\\\hat{\\\\mathbf{i}} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\end{pmatrix}, \\\\quad \\\\hat{\\\\mathbf{j}} = \\\\begin{pmatrix} 0 \\\\\\\\ 1 \\\\end{pmatrix}. $$",
"**Solution**\nGiven\n$$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ 2 \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -1 \\\\\\\\ 5 \\\\end{pmatrix}, \\\\quad \\\\vec{r} = \\\\begin{pmatrix} -2 \\\\\\\\ 4 \\\\end{pmatrix}. $$\nAnd\n$$ \\\\hat{\\\\mathbf{i}} = \\\\begin{pmatrix} 1 \\\\\\\\ 0 \\\\end{pmatrix}, \\\\quad \\\\hat{\\\\mathbf{j}} = \\\\begin{pmatrix} 0 \\\\\\\\ 1 \\\\end{pmatrix}. $$"
);

// Exercise 4.2 Q2
code = code.replace(
"**Solution**\n(a)\n$$ \\\\vec{a} \\\\cdot \\\\vec{b} = \\\\begin{pmatrix} 2",
"**Solution**\nGiven\n$$ \\\\vec{a} = \\\\begin{pmatrix} 2 \\\\\\\\ 1 \\\\\\\\ 3 \\\\end{pmatrix}, \\\\quad \\\\vec{b} = \\\\begin{pmatrix} -1 \\\\\\\\ 1 \\\\\\\\ 1 \\\\end{pmatrix}, \\\\quad \\\\vec{c} = \\\\begin{pmatrix} 0 \\\\\\\\ -1 \\\\\\\\ 1 \\\\end{pmatrix}. $$\n(a)\n$$ \\\\vec{a} \\\\cdot \\\\vec{b} = \\\\begin{pmatrix} 2"
);

// Exercise 4.2 Q3
code = code.replace(
"**Solution**\n(a)\n$$ \\\\vec{m} \\\\cdot \\\\vec{n} = -7,",
"**Solution**\n(a)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 2 \\\\\\\\ -1 \\\\\\\\ -1 \\\\end{pmatrix}, \\\\quad \\\\vec{n} = \\\\begin{pmatrix} -1 \\\\\\\\ 3 \\\\\\\\ 2 \\\\end{pmatrix}. $$\n$$ \\\\vec{m} \\\\cdot \\\\vec{n} = -7,"
);
code = code.replace(
"\\approx 139.8^\\\\circ. $$\n\n(b)\n$$ \\\\vec{m} = \\\\begin{pmatrix} 0",
"\\approx 139.8^\\\\circ. $$\n\n(b)\nGiven\n$$ \\\\vec{m} = \\\\begin{pmatrix} 0"
);

// Exercise 4.2 Q4
code = code.replace(
"**Solution**\n(a) For perpendicular vectors,",
"**Solution**\n(a) Given\n$$ \\\\vec{p} = \\\\begin{pmatrix} 3 \\\\\\\\ t \\\\end{pmatrix}, \\\\quad \\\\vec{q} = \\\\begin{pmatrix} -2 \\\\\\\\ 1 \\\\end{pmatrix}. $$\nFor perpendicular vectors,"
);
code = code.replace(
"For parallel vectors,\n$$",
"For parallel vectors,\n$$"
);

// Replace for 4(b) and 4(c) if possible, but 4(b) and 4(c) might not have "Solution" per se, they just have "(b) For perpendicular vectors". Wait, let me check the file for how 4 is structured.

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Added given vectors to solutions");
