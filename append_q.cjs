const fs = require('fs');
let content = fs.readFileSync('src/data/pastQuestions.ts', 'utf8');

const newQuestions = `  ,
  {
    id: 'pq-2025-c1-q6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 6,
    questionText: 'If $z_1 = 1 - bi$, $z_2 = 2 + i$ and $\\overline{z_1} + \\overline{z_2} = 3 + 2i$, then $b$ is',
    options: ['$2$', '$3$', '$4$', '$5$'],
    correctAnswerIndex: 1, // B. 3
    solution: \`$$\\begin{aligned}
\\overline{z_1} &= 1 + bi \\\\
\\overline{z_2} &= 2 - i
\\end{aligned}$$
$$\\begin{aligned}
\\overline{z_1} + \\overline{z_2} &= (1 + bi) + (2 - i) \\\\
3 + 2i &= 3 + (b - 1)i
\\end{aligned}$$
Equating imaginary parts:
$$\\begin{aligned}
b - 1 &= 2 \\\\
b &= 3
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q7',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 7,
    questionText: 'If $z_1 = a - 3i$, $z_2 = -2 + 3i$ and $z_1 z_2 = 7 + 9i$, then $a$ is',
    options: ['$1$', '$-1$', '$3$', '$4$'],
    correctAnswerIndex: 0, // A. 1
    solution: \`$$\\begin{aligned}
z_1 z_2 &= (a - 3i)(-2 + 3i) \\\\
7 + 9i &= -2a + 3ai + 6i - 9i^2 \\\\
7 + 9i &= -2a + 3ai + 6i + 9 \\\\
7 + 9i &= (-2a + 9) + (3a + 6)i
\\end{aligned}$$
Equating real parts:
$$\\begin{aligned}
-2a + 9 &= 7 \\\\
-2a &= -2 \\\\
a &= 1
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q8',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 8,
    questionText: 'If $\\bar{z} = 2 - 3i$, then $z^2 - (\\bar{z})^2$ is',
    options: ['$-24$', '$-24i$', '$24$', '$24i$'],
    correctAnswerIndex: 3, // D. 24i
    solution: \`If $\\bar{z} = 2 - 3i$, then $z = 2 + 3i$.
$$\\begin{aligned}
z^2 - (\\bar{z})^2 &= (z - \\bar{z})(z + \\bar{z}) \\\\
z - \\bar{z} &= (2 + 3i) - (2 - 3i) = 6i \\\\
z + \\bar{z} &= (2 + 3i) + (2 - 3i) = 4 \\\\
z^2 - (\\bar{z})^2 &= (6i)(4) = 24i
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q9',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 9,
    questionText: 'If $z^{-1} = \\sqrt{3} + i$, then the complex number $z$ is equal to',
    options: ['$\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i$', '$\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i$', '$\\frac{\\sqrt{3}}{4} - \\frac{1}{4}i$', '$\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i$'],
    correctAnswerIndex: 2, // C. 
    solution: \`$$\\begin{aligned}
z^{-1} &= \\sqrt{3} + i \\\\
z &= \\frac{1}{\\sqrt{3} + i} \\\\
&= \\frac{1}{\\sqrt{3} + i} \\cdot \\frac{\\sqrt{3} - i}{\\sqrt{3} - i} \\\\
&= \\frac{\\sqrt{3} - i}{(\\sqrt{3})^2 - (i)^2} \\\\
&= \\frac{\\sqrt{3} - i}{3 - (-1)} \\\\
&= \\frac{\\sqrt{3} - i}{4} \\\\
&= \\frac{\\sqrt{3}}{4} - \\frac{1}{4}i
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q10',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 10,
    questionText: 'If $z_1 = 2 + i$, $z_2 = 3 - i$ and then $\\overline{z_1 z_2}$ is',
    options: ['$-7 + i$', '$7 + i$', '$7 - i$', '$-7 - i$'],
    correctAnswerIndex: 2, // C. 7 - i
    solution: \`First, find $z_1 z_2$:
$$\\begin{aligned}
z_1 z_2 &= (2 + i)(3 - i) \\\\
&= 6 - 2i + 3i - i^2 \\\\
&= 6 + i - (-1) \\\\
&= 7 + i
\\end{aligned}$$
Then, find the conjugate $\\overline{z_1 z_2}$:
$$\\overline{z_1 z_2} = 7 - i$$
Alternatively, using properties $\\overline{z_1 z_2} = \\overline{z_1} \\cdot \\overline{z_2}$:
$$\\begin{aligned}
\\overline{z_1 z_2} &= (2 - i)(3 + i) \\\\
&= 6 + 2i - 3i - i^2 \\\\
&= 6 - i - (-1) = 7 - i
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q11',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 11,
    questionText: 'The value of the complex number $(1 + i)^{20}$ is',
    options: ['$1024$', '$-1025$', '$1025$', '$-1024$'],
    correctAnswerIndex: 3, // D. -1024
    solution: \`First, find $(1 + i)^2$:
$$\\begin{aligned}
(1 + i)^2 &= 1 + 2i + i^2 \\\\
&= 1 + 2i - 1 \\\\
&= 2i
\\end{aligned}$$
Now, evaluate $(1 + i)^{20}$:
$$\\begin{aligned}
(1 + i)^{20} &= ((1 + i)^2)^{10} \\\\
&= (2i)^{10} \\\\
&= 2^{10} \\cdot i^{10}
\\end{aligned}$$
We know that $2^{10} = 1024$ and $i^{10} = i^8 \\cdot i^2 = 1 \\cdot (-1) = -1$.
$$\\begin{aligned}
(1 + i)^{20} &= 1024 \\cdot (-1) \\\\
&= -1024
\\end{aligned}$$\`
  },
  {
    id: 'pq-2025-c1-q12',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 12,
    questionText: 'If $z_1 = (r, \\theta) = (2, \\pi)$ and $z_2 = (r, \\theta) = (4, \\frac{\\pi}{2})$, then the value of the conjugate of $\\frac{z_2}{z_1}$ is',
    options: ['$2i$', '$-2i$', '$i$', '$-i$'],
    correctAnswerIndex: 0, // A. 2i
    solution: \`Write $z_1$ and $z_2$ in trigonometric form:
$$\\begin{aligned}
z_1 &= 2(\\cos\\pi + i\\sin\\pi) = 2(-1 + 0i) = -2 \\\\
z_2 &= 4(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}) = 4(0 + i) = 4i
\\end{aligned}$$
Calculate $\\frac{z_2}{z_1}$:
$$\\begin{aligned}
\\frac{z_2}{z_1} &= \\frac{4i}{-2} \\\\
&= -2i
\\end{aligned}$$
The conjugate of $\\frac{z_2}{z_1}$ is:
$$\\overline{-2i} = 2i$$\`
  }
];
`;

content = content.replace(/\n\];?\s*$/, newQuestions);
fs.writeFileSync('src/data/pastQuestions.ts', content, 'utf8');
console.log('Appended questions 6-12');
