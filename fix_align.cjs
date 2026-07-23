const fs = require('fs');
let text = fs.readFileSync('src/data/pastQuestions.ts', 'utf8');

text = text.replace(
  `    solution: \`$$\\frac{z_1}{z_2} = 4 - 3i \\implies z_1 = z_2 (4 - 3i)$$

Substitute $z_1 = 6 - 17i$ and $z_2 = 3 - bi$:
$$\\begin{aligned}
6 - 17i &= (3 - bi)(4 - 3i) \\\\
6 - 17i &= 12 - 9i - 4bi + 3b i^2
\\end{aligned}$$
Since $i^2 = -1$:
$$6 - 17i = (12 - 3b) + (-9 - 4b)i$$

Equating the real parts:
$$12 - 3b = 6 \\implies 3b = 6 \\implies b = 2$$`,
  `    solution: \`$$\\begin{aligned}
\\frac{z_1}{z_2} &= 4 - 3i \\\\
z_1 &= z_2 (4 - 3i)
\\end{aligned}$$

Substitute $z_1 = 6 - 17i$ and $z_2 = 3 - bi$:
$$\\begin{aligned}
6 - 17i &= (3 - bi)(4 - 3i) \\\\
6 - 17i &= 12 - 9i - 4bi + 3b i^2 \\\\
6 - 17i &= (12 - 3b) + (-9 - 4b)i
\\end{aligned}$$

Equating the real parts:
$$\\begin{aligned}
12 - 3b &= 6 \\\\
3b &= 6 \\\\
b &= 2
\\end{aligned}$$`
);

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
\\end{aligned}$$`
);

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
\\end{aligned}$$`
);

text = text.replace(
  `    solution: \`$$\\frac{z_1}{z_2} = 2 + 5i \\implies z_1 = z_2 (2 + 5i)$$

Substitute $z_1 = 8 - 9i$ and $z_2 = -1 - bi$:
$$\\begin{aligned}
8 - 9i &= (-1 - bi)(2 + 5i) \\\\
8 - 9i &= -2 - 5i - 2bi - 5b i^2
\\end{aligned}$$
Since $i^2 = -1$:
$$8 - 9i = (-2 + 5b) + (-5 - 2b)i$$

Equating the real parts:
$$-2 + 5b = 8 \\implies 5b = 10 \\implies b = 2$$`,
  `    solution: \`$$\\begin{aligned}
\\frac{z_1}{z_2} &= 2 + 5i \\\\
z_1 &= z_2 (2 + 5i)
\\end{aligned}$$

Substitute $z_1 = 8 - 9i$ and $z_2 = -1 - bi$:
$$\\begin{aligned}
8 - 9i &= (-1 - bi)(2 + 5i) \\\\
8 - 9i &= -2 - 5i - 2bi - 5b i^2 \\\\
8 - 9i &= (-2 + 5b) + (-5 - 2b)i
\\end{aligned}$$

Equating the real parts:
$$\\begin{aligned}
-2 + 5b &= 8 \\\\
5b &= 10 \\\\
b &= 2
\\end{aligned}$$`
);

fs.writeFileSync('src/data/pastQuestions.ts', text, 'utf8');
console.log('Replaced successfully');
