const fs = require('fs');
let content = fs.readFileSync('src/data/pastQuestions.ts', 'utf8');

const newQuestions = `  ,
  // 2024 Chapter 1 Section A
  {
    id: 'pq-2024-c1-q1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 1,
    questionText: 'If $z_1 = a + 3i$, $z_2 = -2 - 3i$ and $z_1 z_2 = 7 - 9i$, then $a$ is',
    options: ['$1$', '$0$', '$4$', '$2$'],
    correctAnswerIndex: 0, // A. 1
    solution: \`$$\\\\begin{aligned}
z_1 z_2 &= (a + 3i)(-2 - 3i) \\\\\\\\
7 - 9i &= -2a - 3ai - 6i - 9i^2 \\\\\\\\
7 - 9i &= -2a - 3ai - 6i + 9 \\\\\\\\
7 - 9i &= (-2a + 9) + (-3a - 6)i
\\\\end{aligned}$$
Equating real parts:
$$\\\\begin{aligned}
-2a + 9 &= 7 \\\\\\\\
-2a &= -2 \\\\\\\\
a &= 1
\\\\end{aligned}$$\`
  },
  {
    id: 'pq-2024-c1-q2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 2,
    questionText: 'If $z_1 = -2 + ai$, $z_2 = 1 - 2i$ and $z_1 z_2 = 4 + 7i$, then $a$ is',
    options: ['$0$', '$1$', '$2$', '$3$'],
    correctAnswerIndex: 3, // D. 3
    solution: \`$$\\\\begin{aligned}
z_1 z_2 &= (-2 + ai)(1 - 2i) \\\\\\\\
4 + 7i &= -2 + 4i + ai - 2ai^2 \\\\\\\\
4 + 7i &= -2 + 4i + ai + 2a \\\\\\\\
4 + 7i &= (2a - 2) + (a + 4)i
\\\\end{aligned}$$
Equating real parts:
$$\\\\begin{aligned}
2a - 2 &= 4 \\\\\\\\
2a &= 6 \\\\\\\\
a &= 3
\\\\end{aligned}$$\`
  },
  {
    id: 'pq-2024-c1-q3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 3,
    questionText: 'If $z_1 = 1 - 3i$, $z_2 = -3 - bi$ and $z_1 \\\\bar{z}_2 = 9 + 13i$, then $b$ is',
    options: ['$2$', '$3$', '$4$', '$5$'],
    correctAnswerIndex: 2, // C. 4
    solution: \`If $z_2 = -3 - bi$, then its conjugate is $\\\\bar{z}_2 = -3 + bi$.
$$\\\\begin{aligned}
z_1 \\\\bar{z}_2 &= (1 - 3i)(-3 + bi) \\\\\\\\
9 + 13i &= -3 + bi + 9i - 3bi^2 \\\\\\\\
9 + 13i &= -3 + bi + 9i + 3b \\\\\\\\
9 + 13i &= (3b - 3) + (b + 9)i
\\\\end{aligned}$$
Equating imaginary parts:
$$\\\\begin{aligned}
b + 9 &= 13 \\\\\\\\
b &= 4
\\\\end{aligned}$$\`
  },
  {
    id: 'pq-2024-c1-q4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 4,
    questionText: 'If $z_1 = a + 3i$, $z_2 = -2 - 3i$ and $\\\\overline{\\\\left(\\\\frac{z_1}{z_2}\\\\right)} = 1 + 3i$ then $a$ is',
    options: ['$11$', '$10$', '$-11$', '$-10$'],
    correctAnswerIndex: 2, // C. -11
    solution: \`Let $w = \\\\frac{z_1}{z_2}$. We are given $\\\\bar{w} = 1 + 3i$.
Taking the conjugate of both sides gives $w = 1 - 3i$.
So, $\\\\frac{z_1}{z_2} = 1 - 3i$, which implies $z_1 = z_2(1 - 3i)$.
Substitute $z_1 = a + 3i$ and $z_2 = -2 - 3i$:
$$\\\\begin{aligned}
a + 3i &= (-2 - 3i)(1 - 3i) \\\\\\\\
a + 3i &= -2 + 6i - 3i + 9i^2 \\\\\\\\
a + 3i &= -2 + 3i - 9 \\\\\\\\
a + 3i &= -11 + 3i
\\\\end{aligned}$$
Equating real parts:
$$a = -11$$\`
  },
  {
    id: 'pq-2024-c1-q5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 5,
    questionText: 'The trigonometric form of $z = 1 + i$ with $-\\\\pi < \\\\theta \\\\le \\\\pi$ is',
    options: [
      '$\\\\sqrt{2}\\\\left(\\\\cos \\\\frac{\\\\pi}{4} + i \\\\sin \\\\frac{\\\\pi}{4}\\\\right)$',
      '$\\\\sqrt{2}\\\\left(\\\\cos \\\\frac{\\\\pi}{4} - i \\\\sin \\\\frac{\\\\pi}{4}\\\\right)$',
      '$2\\\\left(\\\\cos \\\\frac{\\\\pi}{3} + i \\\\sin \\\\frac{\\\\pi}{3}\\\\right)$',
      '$2\\\\left(\\\\cos \\\\frac{\\\\pi}{3} - i \\\\sin \\\\frac{\\\\pi}{3}\\\\right)$'
    ],
    correctAnswerIndex: 0, // A
    solution: \`For $z = 1 + i$:
1. Modulus $r$:
   $$r = |z| = \\\\sqrt{1^2 + 1^2} = \\\\sqrt{2}$$
2. Argument $\\\\theta$:
   Since $z$ is in the first quadrant ($x=1 > 0, y=1 > 0$):
   $$\\\\theta = \\\\tan^{-1}\\\\left(\\\\frac{1}{1}\\\\right) = \\\\frac{\\\\pi}{4}$$
3. Trigonometric Form:
   $$z = r(\\\\cos \\\\theta + i \\\\sin \\\\theta) = \\\\sqrt{2}\\\\left(\\\\cos \\\\frac{\\\\pi}{4} + i \\\\sin \\\\frac{\\\\pi}{4}\\\\right)$$\`
  },
  {
    id: 'pq-2024-c1-q6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 6,
    questionText: 'The trigonometric form of $z = -i$ with $-\\\\pi < \\\\theta \\\\le \\\\pi$ is',
    options: [
      '$\\\\cos\\\\left(-\\\\frac{\\\\pi}{2}\\\\right) + i \\\\sin\\\\left(-\\\\frac{\\\\pi}{2}\\\\right)$',
      '$\\\\cos\\\\left(-\\\\frac{\\\\pi}{2}\\\\right) - i \\\\sin\\\\left(-\\\\frac{\\\\pi}{2}\\\\right)$',
      '$\\\\cos \\\\pi + i \\\\sin \\\\pi$',
      '$\\\\cos \\\\pi - i \\\\sin \\\\pi$'
    ],
    correctAnswerIndex: 0, // A
    solution: \`For $z = -i = 0 - 1i$:
1. Modulus $r$:
   $$r = |z| = \\\\sqrt{0^2 + (-1)^2} = 1$$
2. Argument $\\\\theta$:
   The point $(0, -1)$ lies on the negative imaginary axis, so:
   $$\\\\theta = -\\\\frac{\\\\pi}{2}$$
3. Trigonometric Form:
   $$z = 1\\\\left(\\\\cos\\\\left(-\\\\frac{\\\\pi}{2}\\\\right) + i \\\\sin\\\\left(-\\\\frac{\\\\pi}{2}\\\\right)\\\\right) = \\\\cos\\\\left(-\\\\frac{\\\\pi}{2}\\\\right) + i \\\\sin\\\\left(-\\\\frac{\\\\pi}{2}\\\\right)$$\`
  }
];
`;

content = content.replace(/\n\];?\s*$/, () => newQuestions);
fs.writeFileSync('src/data/pastQuestions.ts', content, 'utf8');
