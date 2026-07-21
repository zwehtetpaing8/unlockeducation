const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
`Find two vectors starting from $A$:
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\\\ 1 \\end{pmatrix}. $$
Also,
$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} 20 \\\\ 5 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix}. $$
Now
$$ \\overrightarrow{AC} = 3\\overrightarrow{AB}. $$`,
`Find two vectors starting from $A$:
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\\\ 1 \\end{pmatrix}. $$
Also,
$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} 20 \\\\ 5 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix}. $$
Now $\\overrightarrow{AC} = 3\\overrightarrow{AB}$.`
);

code = code.replace(
`Thus,
$$ \\vec{p} \\cdot \\vec{q} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix} = 3(-2) + t(1). $$
So,
$$ -6 + t = 0, \\quad t = 6. $$`,
`Thus, $\\vec{p} \\cdot \\vec{q} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix} = 3(-2) + t(1)$.
So, $-6 + t = 0$, which gives $t = 6$.`
);

code = code.replace(
`For parallel vectors,
$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
From the first component,
$$ 3 = -2k, \\quad k = -\\frac{3}{2}, $$
so
$$ t = -\\frac{3}{2}. $$
Therefore,
$$ \\text{(i)} \\ t = 6, \\quad \\text{(ii)} \\ t = -\\frac{3}{2}. $$`,
`For parallel vectors,
$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
From the first component, $3 = -2k$, so $k = -\\frac{3}{2}$.
Thus, $t = -\\frac{3}{2}$.
Therefore, (i) $t = 6$, (ii) $t = -\\frac{3}{2}$.`
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
