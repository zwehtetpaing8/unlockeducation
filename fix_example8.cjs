const fs = require('fs');

let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Example 8
content = content.replace(
`$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix}. $$
$$ \\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} $$
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} $$
$$ = (3)(5) + (4)(-12) $$
$$ = 15 - 48 $$
$$ = -33. $$
$$ |\\vec{a}| = \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13. $$
$$ \\cos\\theta = \\frac{-33}{(5)(13)} = -\\frac{33}{65}. $$
$$ \\theta = \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ. $$
$$ 120.5^\\circ $$`, 
`$$ \\begin{aligned}
\\vec{a} &= \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} \\\\
\\cos\\theta &= \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} \\\\
\\vec{a} \\cdot \\vec{b} &= \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} \\\\
&= (3)(5) + (4)(-12) \\\\
&= 15 - 48 \\\\
&= -33 \\\\
|\\vec{a}| &= \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13 \\\\
\\cos\\theta &= \\frac{-33}{(5)(13)} = -\\frac{33}{65} \\\\
\\theta &= \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ
\\end{aligned} $$`
);

fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log("Fixed example 8");
