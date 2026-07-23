export interface PastQuestion {
  id: string;
  chapterId: number;
  chapterTitle: string;
  year: number;
  section: 'A' | 'B';
  questionNumber: number;
  questionText: string;
  options?: string[];
  correctAnswerIndex?: number;
  solution: string;
}

export const pastQuestions: PastQuestion[] = [
  // 2026 Chapter 1 Section A
  {
    id: 'pq-2026-c1-q1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 1,
    questionText: 'If $z_1 = 6 - 17i$, $z_2 = 3 - bi$ and $\\frac{z_1}{z_2} = 4 - 3i$, then $b$ is',
    options: ['$1$', '$2$', '$3$', '$4$'],
    correctAnswerIndex: 1, // B. 2
    solution: `$$\\frac{z_1}{z_2} = 4 - 3i \\implies z_1 = z_2 (4 - 3i)$$

Substitute $z_1 = 6 - 17i$ and $z_2 = 3 - bi$:
$$\\begin{aligned}
6 - 17i &= (3 - bi)(4 - 3i) \\\\
6 - 17i &= 12 - 9i - 4bi + 3b i^2
\\end{aligned}$$
Since $i^2 = -1$:
$$6 - 17i = (12 - 3b) + (-9 - 4b)i$$

Equating the real parts:
$$12 - 3b = 6 \\implies 3b = 6 \\implies b = 2$$

*(Verification using imaginary parts: $-9 - 4(2) = -17$, which is correct).*`
  },
  {
    id: 'pq-2026-c1-q2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 2,
    questionText: 'The complex number $\\overline{(-2 + 3i)(5 + 2i)}$ lies in',
    options: ['first quadrant.', 'second quadrant.', 'third quadrant.', 'fourth quadrant.'],
    correctAnswerIndex: 2, // C. third quadrant
    solution: `Let $z = (-2 + 3i)(5 + 2i)$. Expand the product:
$$\\begin{aligned}
z &= -10 - 4i + 15i + 6i^2 \\\\
&= -10 + 11i - 6 \\\\
&= -16 + 11i
\\end{aligned}$$

Now find the complex conjugate $\\bar{z}$:
$$\\bar{z} = \\overline{-16 + 11i} = -16 - 11i$$

Since the real part $x = -16 < 0$ and the imaginary part $y = -11 < 0$, the point $(-16, -11)$ lies in the **third quadrant**.`
  },
  {
    id: 'pq-2026-c1-q3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 3,
    questionText: 'If $z_1 = (2, -3)$ and $z_2 = (-2, 1)$, then $z_1 z_2$ is',
    options: ['$(1, 8)$', '$(1, -8)$', '$(-1, 8)$', '$(-1, -8)$'],
    correctAnswerIndex: 2, // C. (-1, 8)
    solution: `Convert coordinate form $(x, y)$ to algebraic form $x + yi$:
$$z_1 = 2 - 3i$$
$$z_2 = -2 + i$$

Multiply the two complex numbers:
$$\\begin{aligned}
z_1 z_2 &= (2 - 3i)(-2 + i) \\\\
&= -4 + 2i + 6i - 3i^2 \\\\
&= -4 + 8i + 3 \\\\
&= -1 + 8i
\\end{aligned}$$

In ordered pair form $(x, y)$, this is **$(-1, 8)$**.`
  },
  {
    id: 'pq-2026-c1-q4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 4,
    questionText: 'The trigonometric form of $z = 1 + i$ with $-\\pi < \\theta \\le \\pi$ is',
    options: [
      '$\\sqrt{2}\\left(\\cos \\frac{\\pi}{4} + i \\sin \\frac{\\pi}{4}\\right)$',
      '$\\sqrt{2}\\left(\\cos \\frac{\\pi}{4} - i \\sin \\frac{\\pi}{4}\\right)$',
      '$2\\left(\\cos \\frac{\\pi}{3} + i \\sin \\frac{\\pi}{3}\\right)$',
      '$2\\left(\\cos \\frac{\\pi}{3} - i \\sin \\frac{\\pi}{3}\\right)$'
    ],
    correctAnswerIndex: 0, // A
    solution: `For $z = 1 + i$:
1. Modulus $r$:
   $$r = |z| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$$

2. Argument $\\theta$:
   Since $z$ is in the first quadrant ($x=1 > 0, y=1 > 0$):
   $$\\theta = \\tan^{-1}\\left(\\frac{1}{1}\\right) = \\frac{\\pi}{4}$$

3. Trigonometric (Polar) Form:
   $$z = r(\\cos \\theta + i \\sin \\theta) = \\sqrt{2}\\left(\\cos \\frac{\\pi}{4} + i \\sin \\frac{\\pi}{4}\\right)$$`
  },

  // 2025 Chapter 1 Section A
  {
    id: 'pq-2025-c1-q1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 1,
    questionText: 'The given complex number $i^9 + i^{19}$ in the form $a + bi$ is',
    options: ['$3 + 4i$', '$i$', '$3i$', '$0$'],
    correctAnswerIndex: 3, // D. 0
    solution: `Simplify powers of $i$:
$$\\begin{aligned}
i^9 &= i^{8+1} = (i^4)^2 \\cdot i = 1^2 \\cdot i = i \\\\
i^{19} &= i^{16+3} = (i^4)^4 \\cdot i^3 = 1^4 \\cdot (-i) = -i
\\end{aligned}$$

Summing the two terms:
$$i^9 + i^{19} = i + (-i) = 0$$`
  },
  {
    id: 'pq-2025-c1-q2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 2,
    questionText: '$x + 3 + (y - 2)i = 5 + 2i$, find the values of $x$ and $y$.',
    options: [
      '$x = 8$ and $y = 4$',
      '$x = 2$ and $y = 4$',
      '$x = 2$ and $y = 0$',
      '$x = 8$ and $y = 0$'
    ],
    correctAnswerIndex: 1, // B
    solution: `Equate the real and imaginary parts from both sides:

Real part:
$$x + 3 = 5 \\implies x = 2$$

Imaginary part:
$$y - 2 = 2 \\implies y = 4$$

Thus, **$x = 2$ and $y = 4$**.`
  },
  {
    id: 'pq-2025-c1-q3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 3,
    questionText: 'What is the value of $x + y$ if $(2x + y) + i(y - 5) = 0$?',
    options: ['$5$', '$-\\frac{5}{2}$', '$\\frac{5}{2}$', '$-5$'],
    correctAnswerIndex: 2, // C. 5/2
    solution: `Equate real and imaginary parts to $0 + 0i$:

Imaginary part:
$$y - 5 = 0 \\implies y = 5$$

Real part:
$$2x + y = 0 \\implies 2x + 5 = 0 \\implies x = -\\frac{5}{2}$$

Now calculate $x + y$:
$$\\begin{aligned}
x + y &= -\\frac{5}{2} + 5 \\\\
&= -\\frac{5}{2} + \\frac{10}{2} \\\\
&= \\frac{5}{2}
\\end{aligned}$$`
  },
  {
    id: 'pq-2025-c1-q4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 4,
    questionText: 'If $z_1 = 8 - 9i$, $z_2 = -1 - bi$ and $\\frac{z_1}{z_2} = 2 + 5i$, then $b$ is',
    options: ['$1$', '$2$', '$3$', '$4$'],
    correctAnswerIndex: 1, // B. 2
    solution: `$$\\frac{z_1}{z_2} = 2 + 5i \\implies z_1 = z_2 (2 + 5i)$$

Substitute $z_1 = 8 - 9i$ and $z_2 = -1 - bi$:
$$\\begin{aligned}
8 - 9i &= (-1 - bi)(2 + 5i) \\\\
8 - 9i &= -2 - 5i - 2bi - 5b i^2
\\end{aligned}$$
Since $i^2 = -1$:
$$8 - 9i = (-2 + 5b) + (-5 - 2b)i$$

Equating the real parts:
$$-2 + 5b = 8 \\implies 5b = 10 \\implies b = 2$$

*(Verification using imaginary parts: $-5 - 2(2) = -9$, which matches).*`
  },
  {
    id: 'pq-2025-c1-q5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 5,
    questionText: 'If $z_1 = a + bi$, $z_2 = 3 + i$ and $\\frac{z_1}{z_2} = \\frac{9}{10} + \\frac{7}{10}i$, then $a + b$ is',
    options: ['$4$', '$5$', '$6$', '$7$'],
    correctAnswerIndex: 1, // B. 5
    solution: `$$\\frac{z_1}{z_2} = \\frac{9}{10} + \\frac{7}{10}i \\implies z_1 = z_2 \\left(\\frac{9}{10} + \\frac{7}{10}i\\right)$$

Substitute $z_1 = a + bi$ and $z_2 = 3 + i$:
$$\\begin{aligned}
a + bi &= (3 + i)\\left(\\frac{9}{10} + \\frac{7}{10}i\\right) \\\\
a + bi &= 3\\left(\\frac{9}{10}\\right) + 3\\left(\\frac{7}{10}i\\right) + \\frac{9}{10}i + \\frac{7}{10}i^2 \\\\
a + bi &= \\frac{27}{10} + \\frac{21}{10}i + \\frac{9}{10}i - \\frac{7}{10} \\\\
a + bi &= \\left(\\frac{27 - 7}{10}\\right) + \\left(\\frac{21 + 9}{10}\\right)i \\\\
a + bi &= \\frac{20}{10} + \\frac{30}{10}i = 2 + 3i
\\end{aligned}$$

Hence, $a = 2$ and $b = 3$.
Therefore, $a + b = 2 + 3 = 5$.`
  },
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
    solution: `$$\\begin{aligned}
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
\\end{aligned}$$`
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
    solution: `$$\\begin{aligned}
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
\\end{aligned}$$`
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
    solution: `If $\\bar{z} = 2 - 3i$, then $z = 2 + 3i$.
$$\\begin{aligned}
z^2 - (\\bar{z})^2 &= (z - \\bar{z})(z + \\bar{z}) \\\\
z - \\bar{z} &= (2 + 3i) - (2 - 3i) = 6i \\\\
z + \\bar{z} &= (2 + 3i) + (2 - 3i) = 4 \\\\
z^2 - (\\bar{z})^2 &= (6i)(4) = 24i
\\end{aligned}$$`
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
    solution: `$$\\begin{aligned}
z^{-1} &= \\sqrt{3} + i \\\\
z &= \\frac{1}{\\sqrt{3} + i} \\\\
&= \\frac{1}{\\sqrt{3} + i} \\cdot \\frac{\\sqrt{3} - i}{\\sqrt{3} - i} \\\\
&= \\frac{\\sqrt{3} - i}{(\\sqrt{3})^2 - (i)^2} \\\\
&= \\frac{\\sqrt{3} - i}{3 - (-1)} \\\\
&= \\frac{\\sqrt{3} - i}{4} \\\\
&= \\frac{\\sqrt{3}}{4} - \\frac{1}{4}i
\\end{aligned}$$`
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
    solution: `First, find $z_1 z_2$:
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
\\end{aligned}$$`
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
    solution: `First, find $(1 + i)^2$:
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
\\end{aligned}$$`
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
    solution: `Write $z_1$ and $z_2$ in trigonometric form:
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
$$\\overline{-2i} = 2i$$`
  }
];
