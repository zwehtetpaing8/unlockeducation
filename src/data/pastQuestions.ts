export interface PastQuestion {
  id: string;
  chapterId: number;
  chapterTitle: string;
  year: number;
  /** Present when the same exam question appeared in multiple years */
  years?: number[];
  section: 'A' | 'B' | 'C' | 'D';
  questionNumber: number;
  questionText: string;
  options?: string[];
  correctAnswerIndex?: number;
  solution?: string;
  /** Matches `number` in ch2SectionC2024Solutions for interactive Whiteboard proof */
  animatedProofNumber?: number;
}

export const SECTION_META: Record<
  'A' | 'B' | 'C' | 'D',
  { label: string; subtitle: string; marks: string; instruction?: string }
> = {
  A: {
    label: 'Section (A)',
    subtitle: 'Multiple-choice questions',
    marks: '1 mark per question',
    instruction:
      'Choose the correct or the most appropriate answer for each question. Write the letter of the correct or the most appropriate answer.',
  },
  B: {
    label: 'Section (B)',
    subtitle: 'Short-answer questions',
    marks: '2 marks per question',
    instruction: 'Write only the solution of each question. (There is no need to show your working.)',
  },
  C: {
    label: 'Section (C)',
    subtitle: 'Structured questions',
    marks: '3 marks per question',
  },
  D: {
    label: 'Section (D)',
    subtitle: 'Extended questions',
    marks: '5 marks per question',
  },
};

export function getQuestionYears(q: PastQuestion): number[] {
  return q.years && q.years.length > 0 ? q.years : [q.year];
}

export const pastQuestions: PastQuestion[] = [
  // =========================================================================
  // CHAPTER 1: COMPLEX NUMBERS — SECTION (A) (22 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c1-a-1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 1,
    questionText: 'If $z_1 = 1 - 3i$, $z_2 = -3 - bi$ and $z_1 \\overline{z_2} = 9 + 13i$, then $b$ is',
    options: ['$2$', '$3$', '$4$', '$5$'],
    correctAnswerIndex: 2,
    solution: `If $z_2 = -3 - bi$, then its conjugate is $\\overline{z_2} = -3 + bi$.
$$\\begin{aligned}
z_1 \\overline{z_2} &= (1 - 3i)(-3 + bi) \\\\
9 + 13i &= -3 + bi + 9i - 3bi^2 \\\\
9 + 13i &= -3 + bi + 9i + 3b \\\\
9 + 13i &= (3b - 3) + (b + 9)i
\\end{aligned}$$
Equating imaginary parts:
$$\\begin{aligned}
b + 9 &= 13 \\\\
b &= 4
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 2,
    questionText:
      'If $z_1 = a + 3i$, $z_2 = -2 - 3i$ and $\\overline{\\left(\\dfrac{z_1}{z_2}\\right)} = 1 + 3i$, then $a$ is',
    options: ['$11$', '$10$', '$-11$', '$-10$'],
    correctAnswerIndex: 2,
    solution: `Let $w = \\dfrac{z_1}{z_2}$. We are given $\\overline{w} = 1 + 3i$.
Taking the conjugate of both sides gives $w = 1 - 3i$.
So, $\\dfrac{z_1}{z_2} = 1 - 3i$, which implies $z_1 = z_2(1 - 3i)$.

Substitute $z_1 = a + 3i$ and $z_2 = -2 - 3i$:
$$\\begin{aligned}
a + 3i &= (-2 - 3i)(1 - 3i) \\\\
a + 3i &= -2 + 6i - 3i + 9i^2 \\\\
a + 3i &= -2 + 3i - 9 \\\\
a + 3i &= -11 + 3i
\\end{aligned}$$
Equating real parts:
$$a = -11$$`,
  },
  {
    id: 'pq-c1-a-3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    years: [2024, 2026],
    section: 'A',
    questionNumber: 3,
    questionText: 'The trigonometric form of $z = 1 + i$ with $-\\pi < \\theta \\le \\pi$ is',
    options: [
      '$\\sqrt{2}\\left(\\cos \\dfrac{\\pi}{4} + i \\sin \\dfrac{\\pi}{4}\\right)$',
      '$\\sqrt{2}\\left(\\cos \\dfrac{\\pi}{4} - i \\sin \\dfrac{\\pi}{4}\\right)$',
      '$2\\left(\\cos \\dfrac{\\pi}{3} + i \\sin \\dfrac{\\pi}{3}\\right)$',
      '$2\\left(\\cos \\dfrac{\\pi}{3} - i \\sin \\dfrac{\\pi}{3}\\right)$',
    ],
    correctAnswerIndex: 0,
    solution: `For $z = 1 + i$:
1. Modulus $r$:
   $$r = |z| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$$

2. Argument $\\theta$:
   Since $z$ is in the first quadrant ($x = 1 > 0, y = 1 > 0$):
   $$\\theta = \\tan^{-1}\\left(\\frac{1}{1}\\right) = \\frac{\\pi}{4}$$

3. Trigonometric Form:
   $$z = r(\\cos \\theta + i \\sin \\theta) = \\sqrt{2}\\left(\\cos \\frac{\\pi}{4} + i \\sin \\frac{\\pi}{4}\\right)$$`,
  },
  {
    id: 'pq-c1-a-4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 4,
    questionText: 'The trigonometric form of $z = -i$ with $-\\pi < \\theta \\le \\pi$ is',
    options: [
      '$\\cos\\left(-\\dfrac{\\pi}{2}\\right) + i \\sin\\left(-\\dfrac{\\pi}{2}\\right)$',
      '$\\cos \\dfrac{\\pi}{2} - i \\sin \\dfrac{\\pi}{2}$',
      '$\\cos \\pi + i \\sin \\pi$',
      '$\\cos \\pi - i \\sin \\pi$',
    ],
    correctAnswerIndex: 0,
    solution: `For $z = -i = 0 - 1i$:
1. Modulus $r$:
   $$r = |z| = \\sqrt{0^2 + (-1)^2} = 1$$

2. Argument $\\theta$:
   The point $(0, -1)$ lies on the negative imaginary axis, so:
   $$\\theta = -\\frac{\\pi}{2}$$

3. Trigonometric Form:
   $$z = \\cos\\left(-\\frac{\\pi}{2}\\right) + i \\sin\\left(-\\frac{\\pi}{2}\\right)$$`,
  },
  {
    id: 'pq-c1-a-5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 5,
    questionText: 'If $z_1 = a + 3i$, $z_2 = -2 - 3i$ and $z_1 z_2 = 7 - 9i$, then $a$ is',
    options: ['$1$', '$0$', '$4$', '$2$'],
    correctAnswerIndex: 0,
    solution: `$$\\begin{aligned}
z_1 z_2 &= (a + 3i)(-2 - 3i) \\\\
7 - 9i &= -2a - 3ai - 6i - 9i^2 \\\\
7 - 9i &= -2a - 3ai - 6i + 9 \\\\
7 - 9i &= (-2a + 9) + (-3a - 6)i
\\end{aligned}$$
Equating real parts:
$$\\begin{aligned}
-2a + 9 &= 7 \\\\
-2a &= -2 \\\\
a &= 1
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'A',
    questionNumber: 6,
    questionText: 'If $z_1 = -2 + ai$, $z_2 = 1 - 2i$ and $z_1 z_2 = 4 + 7i$, then $a$ is',
    options: ['$0$', '$1$', '$2$', '$3$'],
    correctAnswerIndex: 3,
    solution: `$$\\begin{aligned}
z_1 z_2 &= (-2 + ai)(1 - 2i) \\\\
4 + 7i &= -2 + 4i + ai - 2ai^2 \\\\
4 + 7i &= -2 + 4i + ai + 2a \\\\
4 + 7i &= (2a - 2) + (a + 4)i
\\end{aligned}$$
Equating real parts:
$$\\begin{aligned}
2a - 2 &= 4 \\\\
2a &= 6 \\\\
a &= 3
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-7',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 7,
    questionText: '$(x + 3) + (y - 2)i = 5 + 2i$, find the values of $x$ and $y$.',
    options: [
      '$x = 8$ and $y = 4$',
      '$x = 2$ and $y = 4$',
      '$x = 2$ and $y = 0$',
      '$x = 8$ and $y = 0$',
    ],
    correctAnswerIndex: 1,
    solution: `Equate the real and imaginary parts from both sides:

Real part:
$$x + 3 = 5 \\implies x = 2$$

Imaginary part:
$$y - 2 = 2 \\implies y = 4$$

Thus, **$x = 2$ and $y = 4$**.`,
  },
  {
    id: 'pq-c1-a-8',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 8,
    questionText: 'If $z_1 = a - 3i$, $z_2 = -2 + 3i$ and $z_1 z_2 = 7 + 9i$, then $a$ is',
    options: ['$1$', '$-1$', '$3$', '$4$'],
    correctAnswerIndex: 0,
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
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-9',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 9,
    questionText: 'If $z_1 = 8 - 9i$, $z_2 = -1 - bi$ and $\\dfrac{z_1}{z_2} = 2 + 5i$, then $b$ is',
    options: ['$1$', '$2$', '$3$', '$4$'],
    correctAnswerIndex: 1,
    solution: `$$\\frac{z_1}{z_2} = 2 + 5i \\implies z_1 = z_2 (2 + 5i)$$

Substitute $z_1 = 8 - 9i$ and $z_2 = -1 - bi$:
$$\\begin{aligned}
8 - 9i &= (-1 - bi)(2 + 5i) \\\\
8 - 9i &= -2 - 5i - 2bi - 5b i^2
\\end{aligned}$$
Since $i^2 = -1$:
$$8 - 9i = (-2 + 5b) + (-5 - 2b)i$$

Equating the real parts:
$$-2 + 5b = 8 \\implies 5b = 10 \\implies b = 2$$`,
  },
  {
    id: 'pq-c1-a-10',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 10,
    questionText:
      'If $z_1 = (r, \\theta) = (2, \\pi)$ and $z_2 = (r, \\theta) = \\left(4, \\dfrac{\\pi}{2}\\right)$, then the value of the conjugate of $\\dfrac{z_2}{z_1}$ is',
    options: ['$2i$', '$-2i$', '$i$', '$-i$'],
    correctAnswerIndex: 0,
    solution: `Write $z_1$ and $z_2$ in trigonometric form:
$$\\begin{aligned}
z_1 &= 2(\\cos\\pi + i\\sin\\pi) = 2(-1 + 0i) = -2 \\\\
z_2 &= 4\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right) = 4(0 + i) = 4i
\\end{aligned}$$
Calculate $\\dfrac{z_2}{z_1}$:
$$\\frac{z_2}{z_1} = \\frac{4i}{-2} = -2i$$
The conjugate of $\\dfrac{z_2}{z_1}$ is:
$$\\overline{-2i} = 2i$$`,
  },
  {
    id: 'pq-c1-a-11',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 11,
    questionText: 'If $z_1 = 1 - bi$, $z_2 = 2 + i$ and $\\overline{z_1} + \\overline{z_2} = 3 + 2i$, then $b$ is',
    options: ['$2$', '$3$', '$4$', '$5$'],
    correctAnswerIndex: 1,
    solution: `$$\\begin{aligned}
\\overline{z_1} &= 1 + bi \\\\
\\overline{z_2} &= 2 - i
\\end{aligned}$$
$$\\begin{aligned}
\\overline{z_1} + \\overline{z_2} &= (1 + bi) + (2 - i) \\\\
3 + 2i &= 3 + (b - 1)i
\\end{aligned}$$
Equating imaginary parts:
$$b - 1 = 2 \\implies b = 3$$`,
  },
  {
    id: 'pq-c1-a-12',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 12,
    questionText: 'What is the value of $x + y$ if $(2x + y) + i(y - 5) = 0$?',
    options: ['$5$', '$-\\dfrac{5}{2}$', '$\\dfrac{5}{2}$', '$-5$'],
    correctAnswerIndex: 2,
    solution: `Equate real and imaginary parts to $0 + 0i$:

Imaginary part:
$$y - 5 = 0 \\implies y = 5$$

Real part:
$$2x + y = 0 \\implies 2x + 5 = 0 \\implies x = -\\frac{5}{2}$$

Now calculate $x + y$:
$$x + y = -\\frac{5}{2} + 5 = \\frac{5}{2}$$`,
  },
  {
    id: 'pq-c1-a-13',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 13,
    questionText:
      'If $z_1 = a + bi$, $z_2 = 3 + i$ and $\\dfrac{z_1}{z_2} = \\dfrac{9}{10} + \\dfrac{7}{10}i$, then $a + b$ is',
    options: ['$4$', '$5$', '$6$', '$7$'],
    correctAnswerIndex: 1,
    solution: `$$\\frac{z_1}{z_2} = \\frac{9}{10} + \\frac{7}{10}i \\implies z_1 = z_2 \\left(\\frac{9}{10} + \\frac{7}{10}i\\right)$$

Substitute $z_1 = a + bi$ and $z_2 = 3 + i$:
$$\\begin{aligned}
a + bi &= (3 + i)\\left(\\frac{9}{10} + \\frac{7}{10}i\\right) \\\\
&= \\frac{27}{10} + \\frac{21}{10}i + \\frac{9}{10}i - \\frac{7}{10} \\\\
&= \\frac{20}{10} + \\frac{30}{10}i = 2 + 3i
\\end{aligned}$$

Hence, $a = 2$ and $b = 3$, so $a + b = 2 + 3 = 5$.`,
  },
  {
    id: 'pq-c1-a-14',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 14,
    questionText: 'If $z^{-1} = \\sqrt{3} + i$, then the complex number $z$ is equal to',
    options: [
      '$\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}i$',
      '$\\dfrac{\\sqrt{3}}{2} - \\dfrac{1}{2}i$',
      '$\\dfrac{\\sqrt{3}}{4} - \\dfrac{1}{4}i$',
      '$\\dfrac{\\sqrt{3}}{4} + \\dfrac{1}{4}i$',
    ],
    correctAnswerIndex: 2,
    solution: `$$\\begin{aligned}
z^{-1} &= \\sqrt{3} + i \\\\
z &= \\frac{1}{\\sqrt{3} + i} = \\frac{1}{\\sqrt{3} + i} \\cdot \\frac{\\sqrt{3} - i}{\\sqrt{3} - i} \\\\
&= \\frac{\\sqrt{3} - i}{3 - (-1)} = \\frac{\\sqrt{3} - i}{4} = \\frac{\\sqrt{3}}{4} - \\frac{1}{4}i
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-15',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 15,
    questionText: 'The value of the complex number $(1 + i)^{20}$ is',
    options: ['$1024$', '$-1025$', '$1025$', '$-1024$'],
    correctAnswerIndex: 3,
    solution: `First, find $(1 + i)^2$:
$$(1 + i)^2 = 1 + 2i + i^2 = 2i$$
Now evaluate $(1 + i)^{20}$:
$$\\begin{aligned}
(1 + i)^{20} &= ((1 + i)^2)^{10} = (2i)^{10} \\\\
&= 2^{10} \\cdot i^{10} = 1024 \\cdot (-1) = -1024
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-16',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 16,
    questionText: 'The given complex number $i^9 + i^{19}$ in the form $a + bi$ is',
    options: ['$3 + 4i$', '$i$', '$3i$', '$0$'],
    correctAnswerIndex: 3,
    solution: `$$\\begin{aligned}
i^9 + i^{19} &= i^{4 \\cdot 2 + 1} + i^{4 \\cdot 4 + 3} \\\\
&= i^1 + i^3 \\\\
&= i - i = 0
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-17',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 17,
    questionText: 'If $z_1 = 2 + i$, $z_2 = 3 - i$ and then $\\overline{z_1 z_2}$ is',
    options: ['$-7 + i$', '$7 + i$', '$7 - i$', '$-7 - i$'],
    correctAnswerIndex: 2,
    solution: `First, find $z_1 z_2$:
$$\\begin{aligned}
z_1 z_2 &= (2 + i)(3 - i) \\\\
&= 6 - 2i + 3i - i^2 = 7 + i
\\end{aligned}$$
Then find the conjugate:
$$\\overline{z_1 z_2} = 7 - i$$`,
  },
  {
    id: 'pq-c1-a-18',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 18,
    questionText:
      'If $z_1 = x + yi$ where $x$ and $y$ are real numbers, $z_2 = 4 + 5i$, $z_3 = 1 + 3i$ and $z_1 = \\overline{z_2} z_3$, then $y$ is',
    options: ['$7$', '$8$', '$9$', '$10$'],
    correctAnswerIndex: 0,
    solution: `Since $z_2 = 4 + 5i$, we have $\\overline{z_2} = 4 - 5i$.
$$\\begin{aligned}
z_1 &= \\overline{z_2} z_3 \\\\
&= (4 - 5i)(1 + 3i) \\\\
&= 4 + 12i - 5i - 15i^2 \\\\
&= 19 + 7i
\\end{aligned}$$
Thus $y = 7$.`,
  },
  {
    id: 'pq-c1-a-19',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'A',
    questionNumber: 19,
    questionText: 'If $\\overline{z} = 2 - 3i$, then $z^2 - (\\overline{z})^2 =$',
    options: ['$-24$', '$-24i$', '$24$', '$24i$'],
    correctAnswerIndex: 3,
    solution: `Since $\\overline{z} = 2 - 3i$, we have $z = 2 + 3i$.
$$\\begin{aligned}
z^2 - (\\overline{z})^2 &= (2 + 3i)^2 - (2 - 3i)^2 \\\\
&= (z - \\overline{z})(z + \\overline{z}) \\\\
&= (6i)(4) = 24i
\\end{aligned}$$`,
  },
  {
    id: 'pq-c1-a-20',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 20,
    questionText: 'If $z_1 = 6 - 17i$, $z_2 = 3 - bi$ and $\\dfrac{z_1}{z_2} = 4 - 3i$, then $b$ is',
    options: ['$1$', '$2$', '$3$', '$4$'],
    correctAnswerIndex: 1,
    solution: `$$\\frac{z_1}{z_2} = 4 - 3i \\implies z_1 = z_2(4 - 3i)$$
Substitute $z_1 = 6 - 17i$ and $z_2 = 3 - bi$:
$$\\begin{aligned}
6 - 17i &= (3 - bi)(4 - 3i) \\\\
6 - 17i &= 12 - 9i - 4bi + 3b i^2 \\\\
6 - 17i &= (12 - 3b) + (-9 - 4b)i
\\end{aligned}$$
Equating real parts:
$$12 - 3b = 6 \\implies 3b = 6 \\implies b = 2$$`,
  },
  {
    id: 'pq-c1-a-21',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 21,
    questionText: 'If $z_1 = (2, -3)$ and $z_2 = (-2, 1)$, then $z_1 z_2$ is',
    options: ['$(1, 8)$', '$(1, -8)$', '$(-1, 8)$', '$(-1, -8)$'],
    correctAnswerIndex: 2,
    solution: `Convert to algebraic form: $z_1 = 2 - 3i$ and $z_2 = -2 + i$.
$$\\begin{aligned}
z_1 z_2 &= (2 - 3i)(-2 + i) \\\\
&= -4 + 2i + 6i - 3i^2 \\\\
&= -1 + 8i
\\end{aligned}$$
Therefore, the ordered pair is **$(-1, 8)$**.`,
  },
  {
    id: 'pq-c1-a-22',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'A',
    questionNumber: 22,
    questionText: 'The complex number $(-2 + 3i)(5 + 2i)$ lies in',
    options: ['first quadrant', 'second quadrant', 'third quadrant', 'fourth quadrant'],
    correctAnswerIndex: 1,
    solution: `Expand the product:
$$\\begin{aligned}
(-2 + 3i)(5 + 2i) &= -10 - 4i + 15i + 6i^2 \\\\
&= -10 + 11i - 6 \\\\
&= -16 + 11i
\\end{aligned}$$
Its real part is negative ($-16 < 0$) and its imaginary part is positive ($11 > 0$), so it lies in the **second quadrant**.`,
  },

  // =========================================================================
  // CHAPTER 1: COMPLEX NUMBERS — SECTION (B) (22 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c1-b-1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    years: [2024, 2025],
    section: 'B',
    questionNumber: 1,
    questionText:
      'Let $w_0$ and $w_1$ be the square roots of the complex number $2 + 2\\sqrt{3}\\,i$. Find their product $w_0 w_1$.',
  },
  {
    id: 'pq-c1-b-2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'B',
    questionNumber: 2,
    questionText:
      'Given that $z = 2 - 2\\sqrt{3}\\,i$, find $z^6$. Give your answer in the form $z = x + iy$, where $x$ and $y$ are real numbers.',
  },
  {
    id: 'pq-c1-b-3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 3,
    questionText:
      'Given that $z = -2\\sqrt{3} - 2i$, find $z^6$. Give your answer in the form $z = x + yi$ where $x$ and $y$ are real numbers.',
  },
  {
    id: 'pq-c1-b-4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'B',
    questionNumber: 4,
    questionText: 'Calculate $\\dfrac{2 - 3i}{3 - i}$.',
  },
  {
    id: 'pq-c1-b-5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'B',
    questionNumber: 5,
    questionText: 'Find the value of $z^5$ where $z = -2 - 2i$.',
  },
  {
    id: 'pq-c1-b-6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'B',
    questionNumber: 6,
    questionText:
      'Consider $w = \\dfrac{z_1}{z_2}$, where $z_1 = 3 + 3\\sqrt{2}\\,i$ and $z_2 = 2 - 2i$. Find $w$ in the form of $w = a + bi$.',
  },
  {
    id: 'pq-c1-b-7',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'B',
    questionNumber: 7,
    questionText: 'Let $z_1 = 3 - 2i$ and $z_2 = 1 + i$ be two complex numbers. Find $\\dfrac{\\overline{z_1}}{z_2}$.',
  },
  {
    id: 'pq-c1-b-8',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 8,
    questionText:
      'Let $w = \\dfrac{z_2}{z_1}$, where $z_1 = 2 - \\sqrt{2}\\,i$ and $z_2 = 3 + 3\\sqrt{2}\\,i$. Find $w$ in the form of $w = a + bi$.',
  },
  {
    id: 'pq-c1-b-9',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 9,
    questionText: 'Write down the trigonometric form of $(-\\sqrt{3} + i)^{-1}$.',
  },
  {
    id: 'pq-c1-b-10',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 10,
    questionText: 'Find the complex number $z$ such that $3iz + 2\\overline{z} = 3 - 3i$.',
  },
  {
    id: 'pq-c1-b-11',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 11,
    questionText: 'Express the given complex number $(1 - i)^4$ in the form $a + bi$.',
  },
  {
    id: 'pq-c1-b-12',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 12,
    questionText: 'Find the complex number $z$ satisfying the equation $z + 4 = 3i\\overline{z}$.',
  },
  {
    id: 'pq-c1-b-13',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 13,
    questionText: 'Find the trigonometric form of $z = i^{2025} + i^{2026}$ with $-\\pi < \\theta \\le \\pi$.',
  },
  {
    id: 'pq-c1-b-14',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 14,
    questionText: 'Write down the trigonometric form of $z = -2 - 2\\sqrt{3}\\,i$ with $-\\pi < \\theta \\le \\pi$.',
  },
  {
    id: 'pq-c1-b-15',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 15,
    questionText:
      'If the complex numbers are $z_1 = (1, 2)$, $z_2 = (-2, 3)$ and $z_3 = (1, -1)$, find the conjugate of $z = \\dfrac{z_1}{z_2} + \\dfrac{z_2}{z_3} + \\dfrac{z_3}{z_1}$.',
  },
  {
    id: 'pq-c1-b-16',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 16,
    questionText:
      'Given that $z_1 = 1 + \\sqrt{3}\\,i$ and $z_2 = -1 + i$, find $\\overline{\\left(\\dfrac{z_1}{z_2}\\right)}$, by using the trigonometric form.',
  },
  {
    id: 'pq-c1-b-17',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 17,
    questionText: 'Find the absolute value of the conjugate of $\\dfrac{11 + 3i}{-1 - 7i}$.',
  },
  {
    id: 'pq-c1-b-18',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'B',
    questionNumber: 18,
    questionText: 'Compute $(0, 2)(1, -4)(1, 1)$.',
  },
  {
    id: 'pq-c1-b-19',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'B',
    questionNumber: 19,
    questionText: 'If $z_1 = 1 + \\sqrt{3}\\,i$ and $z_2 = -1 + i$, find $\\dfrac{z_1}{z_2}$.',
  },
  {
    id: 'pq-c1-b-20',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'B',
    questionNumber: 20,
    questionText:
      'Evaluate $\\left(\\dfrac{\\cos \\dfrac{4\\pi}{3} + i \\sin \\dfrac{4\\pi}{3}}{\\cos \\dfrac{\\pi}{6} + i \\sin \\dfrac{\\pi}{6}}\\right)^4$.',
  },
  {
    id: 'pq-c1-b-21',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'B',
    questionNumber: 21,
    questionText: 'Calculate $\\dfrac{2 + 3i}{3 + i}$.',
  },
  {
    id: 'pq-c1-b-22',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'B',
    questionNumber: 22,
    questionText: 'Find the absolute value of complex number $\\dfrac{3 + 4i}{1 - 2i}$.',
  },

  // =========================================================================
  // CHAPTER 1: COMPLEX NUMBERS — SECTION (C) (23 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c1-c-1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 1,
    questionText: 'Solve the equation $z^3 - 1 = 0$, where $z$ is a complex number.',
  },
  {
    id: 'pq-c1-c-2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 2,
    questionText: 'Find the square roots of $z = 1 + i$.',
  },
  {
    id: 'pq-c1-c-3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 3,
    questionText: 'Find the square roots of $z = \\sqrt{3} + i$.',
  },
  {
    id: 'pq-c1-c-4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 4,
    questionText: 'Find the square roots of $z = -\\sqrt{3} - i$.',
  },
  {
    id: 'pq-c1-c-5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 5,
    questionText: 'Given that $z = -1 + \\sqrt{3}\\,i$, find $z^5$.',
  },
  {
    id: 'pq-c1-c-6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'C',
    questionNumber: 6,
    questionText: 'Find $z^4$ for the complex number $z = -\\sqrt{2} + \\sqrt{2}\\,i$.',
  },
  {
    id: 'pq-c1-c-7',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 7,
    questionText:
      'Given that $z = -\\sqrt{3} + i$, using trigonometric form of $z$, find $z^{-1}$. Check your answer showing that $zz^{-1} = 1$.',
  },
  {
    id: 'pq-c1-c-8',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 8,
    questionText:
      'Given that $z = -1 + \\sqrt{3}\\,i$, using trigonometric form of $z$, find $z^{-1}$. Check your answer showing that $zz^{-1} = 1$.',
  },
  {
    id: 'pq-c1-c-9',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 9,
    questionText: 'Verify that $z = 1 + 2i$ is a solution of $z^2 - 5z^{-1}\\overline{z} - 8i = 0$.',
  },
  {
    id: 'pq-c1-c-10',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 10,
    questionText: 'Find the square roots of $z = -8 - 8\\sqrt{3}\\,i$.',
  },
  {
    id: 'pq-c1-c-11',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 11,
    questionText: 'Evaluate $\\left(\\dfrac{1}{3} + 3i\\right)^3$ in the form $a + bi$.',
  },
  {
    id: 'pq-c1-c-12',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 12,
    questionText: 'Find the absolute value of the inverse of complex number $z = -\\sqrt{3} - i$.',
  },
  {
    id: 'pq-c1-c-13',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 13,
    questionText: 'If $\\dfrac{a + ib}{c + id} = x + iy$, prove that $x^2 + y^2 = \\dfrac{a^2 + b^2}{c^2 + d^2}$.',
  },
  {
    id: 'pq-c1-c-14',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 14,
    questionText: 'If $z_1 = 1 + 3i$ and $z_2 = -2 + i$, find the value of $z_1\\overline{z_2} + \\overline{z_1}z_2$.',
  },
  {
    id: 'pq-c1-c-15',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 15,
    questionText:
      'If a complex number $z = \\dfrac{5}{2} + \\dfrac{5\\sqrt{3}}{2}i$, find $\\dfrac{z}{\\overline{z}}$ by using trigonometric forms.',
  },
  {
    id: 'pq-c1-c-16',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 16,
    questionText: 'Given that $z = -1 + i$, find the trigonometric form where $-\\pi < \\theta \\le \\pi$.',
  },
  {
    id: 'pq-c1-c-17',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 17,
    questionText:
      'Find the trigonometric form of the complex number $z = -\\dfrac{1}{2}(1 - \\sqrt{3}\\,i)$ with $-\\pi < \\theta \\le \\pi$.',
  },
  {
    id: 'pq-c1-c-18',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 18,
    questionText:
      'Find the trigonometric form of the complex number $z = \\dfrac{5}{2}(-\\sqrt{3} + i)$ with $-\\pi < \\theta \\le \\pi$.',
  },
  {
    id: 'pq-c1-c-19',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'C',
    questionNumber: 19,
    questionText: 'Solve the equation $z^3 + 1 = 0$, where $z$ is a complex number.',
  },
  {
    id: 'pq-c1-c-20',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'C',
    questionNumber: 20,
    questionText: 'Given that $z = 1 + \\sqrt{3}\\,i$, find $z^3$.',
  },
  {
    id: 'pq-c1-c-21',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'C',
    questionNumber: 21,
    questionText:
      'Let $z_1 = (1, -2)$ and $z_2 = (3, 5)$ be two complex numbers. Express $\\dfrac{z_1}{z_2} + z_1$ in the form $x + yi$.',
  },
  {
    id: 'pq-c1-c-22',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'C',
    questionNumber: 22,
    questionText: 'Given that $z = 1 + \\sqrt{3}\\,i$, find $z^{10}$.',
  },
  {
    id: 'pq-c1-c-23',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'C',
    questionNumber: 23,
    questionText: 'Given that $z = -2\\sqrt{3} - 2i$. Find $z^3$.',
  },

  // =========================================================================
  // CHAPTER 1: COMPLEX NUMBERS — SECTION (D) (20 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c1-d-1',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'D',
    questionNumber: 1,
    questionText:
      'Using trigonometric forms, evaluate the expression $\\dfrac{(1 - i)^{40}(1 + \\sqrt{3}\\,i)^2}{(-\\sqrt{3} + i)^{18}}$ and express your answer in $x + yi$ form.',
  },
  {
    id: 'pq-c1-d-2',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'D',
    questionNumber: 2,
    questionText: 'Find all the solutions of $z^3 + 27i = 0$ and indicate their positions in the $xy$-coordinate plane.',
  },
  {
    id: 'pq-c1-d-3',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'D',
    questionNumber: 3,
    questionText: 'Solve $z^4 = 1$.',
  },
  {
    id: 'pq-c1-d-4',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'D',
    questionNumber: 4,
    questionText: 'Given that $z_1 = 2 - i$ and $z_2 = -4 + 3i$, find the inverse of $z_1 z_2$ and $\\dfrac{z_1}{z_2}$.',
  },
  {
    id: 'pq-c1-d-5',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2024,
    section: 'D',
    questionNumber: 5,
    questionText: 'Find the cube roots of complex number $z = 2 + 2i$.',
  },
  {
    id: 'pq-c1-d-6',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    years: [2025, 2026],
    section: 'D',
    questionNumber: 6,
    questionText:
      'Solve $z^3 = 1$. *(2025)*\n\n**OR**\n\nSolve the equation $z^3 = 1$, where $z$ is a complex number. *(2026)*',
  },
  {
    id: 'pq-c1-d-7',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 7,
    questionText: 'Solve the equation $z^4 = 4 + 4\\sqrt{3}\\,i$.',
  },
  {
    id: 'pq-c1-d-8',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 8,
    questionText: 'Find all the solutions of $z^4 + 16 = 0$ and indicate their positions on the $xy$-coordinate plane.',
  },
  {
    id: 'pq-c1-d-9',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 9,
    questionText: 'Solve the equation $z^3 + 8i = 0$.',
  },
  {
    id: 'pq-c1-d-10',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 10,
    questionText: 'Find all the solutions of $z^3 = 8$ and indicate their positions on the $xy$-coordinate plane.',
  },
  {
    id: 'pq-c1-d-11',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 11,
    questionText: 'Find all the solutions of $z^4 - 16i = 0$ and indicate their positions on the $xy$-coordinate plane.',
  },
  {
    id: 'pq-c1-d-12',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 12,
    questionText: 'Solve the equation $z^4 = -4$ where $z$ is a complex number.',
  },
  {
    id: 'pq-c1-d-13',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 13,
    questionText: 'Solve the equation $z^4 = -8 + 8\\sqrt{3}\\,i$, where $z$ is a complex number.',
  },
  {
    id: 'pq-c1-d-14',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 14,
    questionText: 'Find the cube roots of the complex number $z = i$.',
  },
  {
    id: 'pq-c1-d-15',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 15,
    questionText: 'Solve the equation $z^4 = 32(1 + \\sqrt{3}\\,i)$, where $z$ is a complex number.',
  },
  {
    id: 'pq-c1-d-16',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 16,
    questionText: 'Find the cube roots of the complex number $z = 8 + 8i$.',
  },
  {
    id: 'pq-c1-d-17',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2025,
    section: 'D',
    questionNumber: 17,
    questionText: 'Find all the solutions of $z^6 + 1 = 0$ and indicate their positions on the $xy$-coordinate plane.',
  },
  {
    id: 'pq-c1-d-18',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'D',
    questionNumber: 18,
    questionText: 'Solve $z^4 = -1$.',
  },
  {
    id: 'pq-c1-d-19',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'D',
    questionNumber: 19,
    questionText:
      'Find the values of $a, b \\in \\mathbb{R}$ such that $(a - i)(6 + bi) = 7a + 6 - 15i$. Hence, find the square roots of $a + bi$.',
  },
  {
    id: 'pq-c1-d-20',
    chapterId: 1,
    chapterTitle: 'Complex Numbers',
    year: 2026,
    section: 'D',
    questionNumber: 20,
    questionText: 'Find the four fourth roots of $-16$ and indicate their positions on the $xy$-coordinate plane.',
  },

  // =========================================================================
  // CHAPTER 2: MATHEMATICAL INDUCTION — SECTION (C) (21 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c2-c-1',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 1,
    questionText:
      'Prove that $10 \\cdot 3^n + 6^{2n}$ is divisible by $11$ for all integers $n \\ge 0$ by using principle of mathematical induction.',
    animatedProofNumber: 1,
  },
  {
    id: 'pq-c2-c-2',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 2,
    questionText:
      'Prove that $\\dfrac{2}{5} + \\dfrac{4}{5} + \\dfrac{6}{5} + \\cdots + \\dfrac{2n}{5} = \\dfrac{1}{5}n(n + 1)$ for all natural numbers $n$ by the use of the mathematical induction principle.',
    animatedProofNumber: 2,
  },
  {
    id: 'pq-c2-c-3',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 3,
    questionText:
      'Prove that $n^3 + 2n$ is divisible by $3$ for all natural numbers $n$ by using the mathematical induction.',
    animatedProofNumber: 3,
  },
  {
    id: 'pq-c2-c-4',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 4,
    questionText:
      'Prove that $2 + 4 + 6 + \\cdots + 2n = n(n + 1)$ for all natural numbers by using principle of mathematical induction.',
    animatedProofNumber: 4,
  },
  {
    id: 'pq-c2-c-5',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 5,
    questionText:
      'Prove that $\\dfrac{1}{2} + \\left(\\dfrac{1}{2}\\right)^2 + \\cdots + \\left(\\dfrac{1}{2}\\right)^n = 1 - \\left(\\dfrac{1}{2}\\right)^n$ by using principle of mathematical induction for all natural numbers.',
    animatedProofNumber: 5,
  },
  {
    id: 'pq-c2-c-6',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'C',
    questionNumber: 6,
    questionText:
      'Use the mathematical induction principle to prove that $2 \\cdot 1 + 2 \\cdot 2 + 2 \\cdot 3 + \\cdots + 2 \\cdot n = n^2 + n$ for all natural numbers $n$.',
    animatedProofNumber: 6,
  },
  {
    id: 'pq-c2-c-7',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 7,
    questionText:
      'Use the mathematical induction to prove that $1 + 5 + 9 + \\cdots + (4n - 3) = 2n^2 - n$ for all natural numbers $n$.',
    animatedProofNumber: 7,
  },
  {
    id: 'pq-c2-c-8',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 8,
    questionText:
      'Show that $\\dfrac{2}{3^1} + \\dfrac{2}{3^2} + \\cdots + \\dfrac{2}{3^n} = 1 - \\dfrac{1}{3^n}$ for all natural numbers $n$, by using principle of mathematical induction.',
    animatedProofNumber: 8,
  },
  {
    id: 'pq-c2-c-9',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 9,
    questionText:
      'Prove that $1 + 4 + 7 + \\cdots + (3n - 2) = \\dfrac{n(3n - 1)}{2}$ for all natural numbers $n$ by the use of the mathematical induction principle.',
    animatedProofNumber: 9,
  },
  {
    id: 'pq-c2-c-10',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 10,
    questionText:
      'Use the mathematical induction principle to prove that $1 + 2 + 3 + \\cdots + n = \\dfrac{n(n + 1)}{2}$, for all natural numbers $n$.',
    animatedProofNumber: 10,
  },
  {
    id: 'pq-c2-c-11',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 11,
    questionText:
      'Use the mathematical induction principle to prove that $6^n - 1$ is divisible by $5$ for all natural numbers $n$.',
    animatedProofNumber: 11,
  },
  {
    id: 'pq-c2-c-12',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    years: [2025, 2026],
    section: 'C',
    questionNumber: 12,
    questionText:
      'Prove that $3^{2n} - 1$ is divisible by $8$ for all natural numbers $n \\ge 1$ by using principle of mathematical induction. *(2025)*\n\n**OR**\n\nUse mathematical induction principle to prove that $3^{2n} - 1$ is divisible by $8$, for all natural numbers $n$. *(2026)*',
    animatedProofNumber: 12,
  },
  {
    id: 'pq-c2-c-13',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 13,
    questionText:
      'Use the mathematical induction principle to prove that $5^n + 3$ is divisible by $4$ for all positive integers $n$.',
    animatedProofNumber: 13,
  },
  {
    id: 'pq-c2-c-14',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 14,
    questionText:
      'Use the principle of mathematical induction to prove that $2n + 1 < n^2$ for all natural numbers $n \\ge 3$.',
    animatedProofNumber: 14,
  },
  {
    id: 'pq-c2-c-15',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 15,
    questionText:
      'Use the mathematical induction principle to prove that $2n < 2^n - 1$ for all natural numbers $n \\ge 3$.',
    animatedProofNumber: 15,
  },
  {
    id: 'pq-c2-c-16',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 16,
    questionText:
      'Use the principle of mathematical induction to prove that $4n^2 > n + 11$ for all natural numbers $n \\ge 2$.',
    animatedProofNumber: 16,
  },
  {
    id: 'pq-c2-c-17',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 17,
    questionText:
      'Prove that $2n < 2^n$ for all natural numbers $n \\ge 3$ by using the mathematical induction.',
    animatedProofNumber: 17,
  },
  {
    id: 'pq-c2-c-18',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'C',
    questionNumber: 18,
    questionText:
      'Use the mathematical induction principle to prove that $2^n > n$ for all natural numbers $n$.',
    animatedProofNumber: 18,
  },
  {
    id: 'pq-c2-c-19',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'C',
    questionNumber: 19,
    questionText:
      'Prove that $5^n - 1$ is divisible by $4$ for all natural numbers $n$ by using mathematical induction.',
    animatedProofNumber: 19,
  },
  {
    id: 'pq-c2-c-20',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'C',
    questionNumber: 20,
    questionText:
      'Use the mathematical induction principle to prove that $1 + 3 + 3^2 + \\cdots + 3^{n-1} = \\dfrac{3^n - 1}{2}$ for all natural numbers $n$.',
    animatedProofNumber: 20,
  },
  {
    id: 'pq-c2-c-21',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'C',
    questionNumber: 21,
    questionText:
      'Prove that $\\dfrac{1}{1 \\cdot 5} + \\dfrac{1}{5 \\cdot 9} + \\dfrac{1}{9 \\cdot 13} + \\cdots + \\dfrac{1}{(4n - 3)(4n + 1)} = \\dfrac{n}{4n + 1}$ for $n \\ge 1$ by using the principle of mathematical induction.',
    animatedProofNumber: 21,
  },

  // =========================================================================
  // CHAPTER 2: MATHEMATICAL INDUCTION — SECTION (D) (20 Questions, 2024–2026)
  // =========================================================================
  {
    id: 'pq-c2-d-1',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 1,
    questionText:
      'Prove that $1 \\cdot 2 + 2 \\cdot 2^2 + 3 \\cdot 2^3 + \\cdots + n \\cdot 2^n = (n - 1)2^{n+1} + 2$ for all natural numbers $n$ by using the mathematical induction.',
  },
  {
    id: 'pq-c2-d-2',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 2,
    questionText:
      'Prove that $1^2 + 3^2 + 5^2 + \\cdots + (2n - 1)^2 = \\dfrac{n(2n - 1)(2n + 1)}{3}$ by using the mathematical induction principle for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-3',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 3,
    questionText:
      'Prove that $1^2 + 2^2 + 3^2 + \\cdots + n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}$ for all natural numbers $n$ by using the mathematical induction.',
  },
  {
    id: 'pq-c2-d-4',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 4,
    questionText:
      'Prove that $4^{2n} - 1$ is divisible by $15$ for all natural numbers $n$ by using the mathematical induction.',
  },
  {
    id: 'pq-c2-d-5',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 5,
    questionText:
      'Use the mathematical induction principle to prove that $n^3 + 2n$ is divisible by $3$ for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-6',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2024,
    section: 'D',
    questionNumber: 6,
    questionText:
      'Use the mathematical induction principle to prove that $2^n \\ge 1 + n$ for all natural numbers $n \\ge 1$.',
  },
  {
    id: 'pq-c2-d-7',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 7,
    questionText:
      'Prove that $\\dfrac{1}{1 \\cdot 3} + \\dfrac{1}{3 \\cdot 5} + \\dfrac{1}{5 \\cdot 7} + \\cdots + \\dfrac{1}{(2n - 1)(2n + 1)} = \\dfrac{n}{2n + 1}$ for all natural numbers $n$ by the use of the mathematical induction principle.',
  },
  {
    id: 'pq-c2-d-8',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 8,
    questionText:
      'Prove that $1 + \\dfrac{1}{1 + 2} + \\dfrac{1}{1 + 2 + 3} + \\cdots + \\dfrac{1}{1 + 2 + 3 + \\cdots + n} = \\dfrac{2n}{n + 1}$ for all natural numbers $n$ by the use of the mathematical induction principle.',
  },
  {
    id: 'pq-c2-d-9',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 9,
    questionText:
      'Prove that $\\dfrac{1}{3} + \\dfrac{1}{9} + \\dfrac{1}{27} + \\cdots + \\dfrac{1}{3^n} = \\dfrac{3^n - 1}{2(3^n)}$ for all natural numbers $n$, by using the principle of the mathematical induction.',
  },
  {
    id: 'pq-c2-d-10',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 10,
    questionText:
      'Prove that $1^3 + 3^3 + 5^3 + \\cdots + (2n - 1)^3 = n^2(2n^2 - 1)$ for all natural numbers $n$ by the use of the mathematical induction principle.',
  },
  {
    id: 'pq-c2-d-11',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 11,
    questionText:
      'Prove that $2^2 + 4^2 + 6^2 + \\cdots + (2n)^2 = \\dfrac{2}{3}n(n + 1)(2n + 1)$ for all natural numbers $n$ by using the mathematical induction.',
  },
  {
    id: 'pq-c2-d-12',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 12,
    questionText:
      'Show by the principle of mathematical induction that $2^{2n-1} + 5^{2n-1}$ is divisible by $7$ for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-13',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 13,
    questionText:
      'Use the mathematical induction principle to prove that $3^n - 1$ is divisible by $2$ for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-14',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 14,
    questionText:
      'Use the mathematical induction principle to prove that $n! > 3^n$ for all natural numbers $n \\ge 7$.',
  },
  {
    id: 'pq-c2-d-15',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 15,
    questionText:
      'Given that the sequence of real numbers is defined by $x_1 = 1$ and $x_{n+1} = \\sqrt{1 + 2x_n}$ for $n \\ge 1$. Use the mathematical induction principle to prove that $x_n < 4$ for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-16',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2025,
    section: 'D',
    questionNumber: 16,
    questionText:
      'Use the mathematical induction principle to prove that $x + y$ is a factor of $x^{2n+1} + y^{2n+1}$ for all natural numbers $n \\ge 1$.',
  },
  {
    id: 'pq-c2-d-17',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'D',
    questionNumber: 17,
    questionText:
      'Use the mathematical induction principle to prove that $4n < 2^n$ for all natural numbers $n \\ge 5$.',
  },
  {
    id: 'pq-c2-d-18',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'D',
    questionNumber: 18,
    questionText:
      'Prove that $1^2 - 2^2 + 3^2 - 4^2 + \\cdots + (-1)^{n-1}n^2 = (-1)^{n-1}\\dfrac{n(n + 1)}{2}$ by using the mathematical induction principle for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-19',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'D',
    questionNumber: 19,
    questionText:
      'Use the mathematical induction principle to prove that $x^{2n} - y^{2n}$ is divisible by $x + y$ for all natural numbers $n$.',
  },
  {
    id: 'pq-c2-d-20',
    chapterId: 2,
    chapterTitle: 'Mathematical Induction',
    year: 2026,
    section: 'D',
    questionNumber: 20,
    questionText:
      'Prove that $4n < n^2 - 5$ for all natural numbers $n \\ge 6$ by using the mathematical induction.',
  },
];
