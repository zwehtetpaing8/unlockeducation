const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replaceAll("Given\n$ \\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}. $", "Given\n$$ \\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}. $$\n");

code = code.replaceAll("Given\n$ \\vec{m} = \\begin{pmatrix} 0 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}. $", "Given\n$$ \\vec{m} = \\begin{pmatrix} 0 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}. $$\n");

code = code.replaceAll("Given\n$ \\vec{p} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $", "Given\n$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$\n");

code = code.replaceAll("Given\n$ \\vec{r} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix}, \\quad \\vec{s} = \\begin{pmatrix} t \\\\ -4 \\end{pmatrix}. $", "Given\n$$ \\vec{r} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix}, \\quad \\vec{s} = \\begin{pmatrix} t \\\\ -4 \\end{pmatrix}. $$\n");

code = code.replaceAll("For parallel vectors,\n$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$", "For parallel vectors,\n$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$");

code = code.replace("\\approx 139.8^\\circ. $\n(b)", "\\approx 139.8^\\circ. $$\n\n(b)");

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed missing $$ using plain replaceAll");
