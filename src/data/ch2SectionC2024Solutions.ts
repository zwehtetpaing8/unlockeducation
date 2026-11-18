export interface ProofLine {
  id: string;
  kind: 'text' | 'math' | 'subheading';
  content: string;
  indent?: boolean;
}

export interface AnimatedProofQuestion {
  number: number;
  year: number;
  section: string;
  questionText: string;
  lines: ProofLine[];
}

export const ch2SectionC2024Solutions: AnimatedProofQuestion[] = [
  {
    number: 1,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Prove that $10 \\cdot 3^n + 6^{2n}$ is divisible by $11$ for all integers $n \\ge 0$ by using principle of mathematical induction. (2024)',
    lines: [
      {
        id: 'q1-1',
        kind: 'text',
        content: 'Let $P(n)$ be the statement that $10 \\cdot 3^n + 6^{2n}$ is divisible by $11$.',
      },
      {
        id: 'q1-2',
        kind: 'text',
        content: '**(1)** For $n = 0$,',
      },
      {
        id: 'q1-3',
        kind: 'text',
        indent: true,
        content: '$10 \\cdot 3^0 + 6^0 = 10 \\cdot 1 + 1 = 11$, which is divisible by $11$.',
      },
      {
        id: 'q1-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 0$.',
      },
      {
        id: 'q1-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k \\ge 0$, that is',
      },
      {
        id: 'q1-6',
        kind: 'math',
        indent: true,
        content: '10 \\cdot 3^k + 6^{2k} \\text{ is divisible by } 11.',
      },
      {
        id: 'q1-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q1-8',
        kind: 'math',
        indent: true,
        content: '10 \\cdot 3^{k+1} + 6^{2(k+1)} \\text{ is divisible by } 11.',
      },
      {
        id: 'q1-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q1-10',
        kind: 'math',
        indent: true,
        content: '10 \\cdot 3^{k+1} + 6^{2(k+1)} = 10 \\cdot 3^k \\cdot 3 + 6^{2k+2}',
      },
      {
        id: 'q1-11',
        kind: 'math',
        indent: true,
        content: '= 30 \\cdot 3^k + 36 \\cdot 6^{2k}',
      },
      {
        id: 'q1-12',
        kind: 'math',
        indent: true,
        content: '= 30 \\cdot 3^k + 3 \\cdot 6^{2k} + 33 \\cdot 6^{2k}',
      },
      {
        id: 'q1-13',
        kind: 'math',
        indent: true,
        content: '= 3\\left(10 \\cdot 3^k + 6^{2k}\\right) + 33 \\cdot 6^{2k}.',
      },
      {
        id: 'q1-14',
        kind: 'text',
        indent: true,
        content:
          'Since both $\\left(10 \\cdot 3^k + 6^{2k}\\right)$ and $33$ are divisible by $11$, $3\\left(10 \\cdot 3^k + 6^{2k}\\right) + 33 \\cdot 6^{2k}$ is also divisible by $11$.',
      },
      {
        id: 'q1-15',
        kind: 'text',
        indent: true,
        content: 'So, $10 \\cdot 3^{k+1} + 6^{2(k+1)}$ is divisible by $11$.',
      },
      {
        id: 'q1-16',
        kind: 'text',
        indent: true,
        content: 'Therefore, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q1-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all integers $n \\ge 0$.',
      },
    ],
  },
  {
    number: 2,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Prove that $\\dfrac{2}{5} + \\dfrac{4}{5} + \\dfrac{6}{5} + \\cdots + \\dfrac{2n}{5} = \\dfrac{1}{5}n(n+1)$ for all natural numbers $n$ by the use of the mathematical induction principle. (2024)',
    lines: [
      {
        id: 'q2-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2-2',
        kind: 'math',
        content: '\\frac{2}{5} + \\frac{4}{5} + \\cdots + \\frac{2n}{5} = \\frac{1}{5}n(n+1).',
      },
      {
        id: 'q2-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = \\frac{2}{5},',
      },
      {
        id: 'q2-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1}{5}(1)(1+1) = \\frac{2}{5}.',
      },
      {
        id: 'q2-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2-9',
        kind: 'math',
        indent: true,
        content: '\\frac{2}{5} + \\frac{4}{5} + \\cdots + \\frac{2k}{5} = \\frac{1}{5}k(k+1).',
      },
      {
        id: 'q2-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2-11',
        kind: 'math',
        indent: true,
        content: '\\frac{2}{5} + \\frac{4}{5} + \\cdots + \\frac{2k}{5} + \\frac{2(k+1)}{5} = \\frac{1}{5}(k+1)(k+2).',
      },
      {
        id: 'q2-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2-13',
        kind: 'math',
        indent: true,
        content:
          '\\frac{2}{5} + \\frac{4}{5} + \\cdots + \\frac{2k}{5} + \\frac{2(k+1)}{5} = \\frac{1}{5}k(k+1) + \\frac{2(k+1)}{5}',
      },
      {
        id: 'q2-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{1}{5}(k+1)(k+2).',
      },
      {
        id: 'q2-15',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2-16',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 3,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Prove that $n^3 + 2n$ is divisible by $3$ for all natural numbers $n$ by using the mathematical induction. (2024)',
    lines: [
      {
        id: 'q3-1',
        kind: 'text',
        content: 'Let $P(n)$ be the statement that $n^3 + 2n$ is divisible by $3$.',
      },
      {
        id: 'q3-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q3-3',
        kind: 'text',
        indent: true,
        content: '$1^3 + 2(1) = 3$, which is divisible by $3$.',
      },
      {
        id: 'q3-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q3-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q3-6',
        kind: 'math',
        indent: true,
        content: 'k^3 + 2k \\text{ is divisible by } 3.',
      },
      {
        id: 'q3-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q3-8',
        kind: 'math',
        indent: true,
        content: '(k+1)^3 + 2(k+1) \\text{ is divisible by } 3.',
      },
      {
        id: 'q3-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q3-10',
        kind: 'math',
        indent: true,
        content: '(k+1)^3 + 2(k+1) = k^3 + 3k^2 + 3k + 1 + 2k + 2',
      },
      {
        id: 'q3-11',
        kind: 'math',
        indent: true,
        content: '= (k^3 + 2k) + 3(k^2 + k + 1).',
      },
      {
        id: 'q3-12',
        kind: 'text',
        indent: true,
        content:
          'Since both $(k^3 + 2k)$ and $3(k^2 + k + 1)$ are divisible by $3$, $(k^3 + 2k) + 3(k^2 + k + 1)$ is also divisible by $3$. Hence, $P(k+1)$ is true.',
      },
      {
        id: 'q3-13',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 4,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Prove that $2 + 4 + 6 + \\cdots + 2n = n(n+1)$ for all natural numbers by using principle of mathematical induction. (2024)',
    lines: [
      {
        id: 'q4-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the given equality.',
      },
      {
        id: 'q4-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q4-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2,',
      },
      {
        id: 'q4-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 1(1+1) = 2.',
      },
      {
        id: 'q4-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q4-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q4-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q4-8',
        kind: 'math',
        indent: true,
        content: '2 + 4 + \\cdots + 2k = k(k+1).',
      },
      {
        id: 'q4-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q4-10',
        kind: 'math',
        indent: true,
        content: '2 + 4 + \\cdots + 2k + 2(k+1) = (k+1)(k+2).',
      },
      {
        id: 'q4-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q4-12',
        kind: 'math',
        indent: true,
        content: '2 + 4 + \\cdots + 2k + 2(k+1) = k(k+1) + 2(k+1)',
      },
      {
        id: 'q4-13',
        kind: 'math',
        indent: true,
        content: '= (k+1)(k+2).',
      },
      {
        id: 'q4-14',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q4-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 5,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Prove that $\\dfrac{1}{2} + \\left(\\dfrac{1}{2}\\right)^2 + \\cdots + \\left(\\dfrac{1}{2}\\right)^n = 1 - \\left(\\dfrac{1}{2}\\right)^n$ by using principle of mathematical induction for all natural numbers. (2024)',
    lines: [
      {
        id: 'q5-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q5-2',
        kind: 'math',
        content: '\\frac{1}{2} + \\left(\\frac{1}{2}\\right)^2 + \\cdots + \\left(\\frac{1}{2}\\right)^n = 1 - \\left(\\frac{1}{2}\\right)^n.',
      },
      {
        id: 'q5-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q5-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = \\frac{1}{2},',
      },
      {
        id: 'q5-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 1 - \\left(\\frac{1}{2}\\right)^1 = \\frac{1}{2}.',
      },
      {
        id: 'q5-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q5-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q5-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q5-9',
        kind: 'math',
        indent: true,
        content: '\\frac{1}{2} + \\left(\\frac{1}{2}\\right)^2 + \\cdots + \\left(\\frac{1}{2}\\right)^k = 1 - \\left(\\frac{1}{2}\\right)^k.',
      },
      {
        id: 'q5-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q5-11',
        kind: 'math',
        indent: true,
        content:
          '\\frac{1}{2} + \\left(\\frac{1}{2}\\right)^2 + \\cdots + \\left(\\frac{1}{2}\\right)^k + \\left(\\frac{1}{2}\\right)^{k+1} = 1 - \\left(\\frac{1}{2}\\right)^{k+1}.',
      },
      {
        id: 'q5-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q5-13',
        kind: 'math',
        indent: true,
        content:
          '\\frac{1}{2} + \\cdots + \\left(\\frac{1}{2}\\right)^k + \\left(\\frac{1}{2}\\right)^{k+1} = 1 - \\left(\\frac{1}{2}\\right)^k + \\left(\\frac{1}{2}\\right)^{k+1}',
      },
      {
        id: 'q5-14',
        kind: 'math',
        indent: true,
        content: '= 1 - 2\\left(\\frac{1}{2}\\right)^{k+1} + \\left(\\frac{1}{2}\\right)^{k+1}',
      },
      {
        id: 'q5-15',
        kind: 'math',
        indent: true,
        content: '= 1 - \\left(\\frac{1}{2}\\right)^{k+1}.',
      },
      {
        id: 'q5-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q5-17',
        kind: 'subheading',
        indent: true,
        content: 'Alternative method.',
      },
      {
        id: 'q5-18',
        kind: 'math',
        indent: true,
        content:
          '1 - \\left(\\frac{1}{2}\\right)^k + \\frac{1}{2}\\left(\\frac{1}{2}\\right)^k = 1 - \\frac{1}{2}\\left(\\frac{1}{2}\\right)^k',
      },
      {
        id: 'q5-19',
        kind: 'math',
        indent: true,
        content: '= 1 - \\left(\\frac{1}{2}\\right)^{k+1}.',
      },
      {
        id: 'q5-20',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 6,
    year: 2024,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $2 \\cdot 1 + 2 \\cdot 2 + 2 \\cdot 3 + \\cdots + 2 \\cdot n = n^2 + n$ for all natural numbers $n$. (2024)',
    lines: [
      {
        id: 'q6-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q6-2',
        kind: 'math',
        content: '2 \\cdot 1 + 2 \\cdot 2 + \\cdots + 2 \\cdot n = n^2 + n.',
      },
      {
        id: 'q6-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q6-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2 \\cdot 1 = 2,',
      },
      {
        id: 'q6-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 1^2 + 1 = 2.',
      },
      {
        id: 'q6-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q6-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q6-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q6-9',
        kind: 'math',
        indent: true,
        content: '2 \\cdot 1 + 2 \\cdot 2 + \\cdots + 2 \\cdot k = k^2 + k.',
      },
      {
        id: 'q6-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q6-11',
        kind: 'math',
        indent: true,
        content: '2 \\cdot 1 + 2 \\cdot 2 + \\cdots + 2 \\cdot k + 2(k+1) = (k+1)^2 + (k+1).',
      },
      {
        id: 'q6-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q6-13',
        kind: 'math',
        indent: true,
        content: '2 \\cdot 1 + \\cdots + 2 \\cdot k + 2(k+1) = k^2 + k + 2(k+1)',
      },
      {
        id: 'q6-14',
        kind: 'math',
        indent: true,
        content: '= k^2 + 3k + 2',
      },
      {
        id: 'q6-15',
        kind: 'math',
        indent: true,
        content: '= k^2 + 2k + 1 + k + 1',
      },
      {
        id: 'q6-16',
        kind: 'math',
        indent: true,
        content: '= (k+1)^2 + (k+1).',
      },
      {
        id: 'q6-17',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q6-18',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
];
