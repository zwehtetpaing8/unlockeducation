const fs = require('fs');
let text = fs.readFileSync('src/data/pastQuestions.ts', 'utf8');

text = text.replace(
`Equate the real and imaginary parts from both sides:
Real part:
$$x + 3 = 5 \\implies x = 2$$
Imaginary part:
$$y - 2 = 2 \\implies y = 4$$`,
`Equate the real and imaginary parts from both sides:
$$\\begin{aligned}
\\text{Real part: } x + 3 &= 5 \\implies x = 2 \\\\
\\text{Imaginary part: } y - 2 &= 2 \\implies y = 4
\\end{aligned}$$`);

text = text.replace(
`Equate real and imaginary parts to $0 + 0i$:
Imaginary part:
$$y - 5 = 0 \\implies y = 5$$
Real part:
$$2x + y = 0 \\implies 2x + 5 = 0 \\implies x = -\\frac{5}{2}$$`,
`Equate real and imaginary parts to $0 + 0i$:
$$\\begin{aligned}
\\text{Imaginary part: } y - 5 &= 0 \\implies y = 5 \\\\
\\text{Real part: } 2x + y &= 0 \\implies 2x + 5 = 0 \\implies x = -\\frac{5}{2}
\\end{aligned}$$`);

fs.writeFileSync('src/data/pastQuestions.ts', text, 'utf8');
console.log('Replaced successfully part 2');
