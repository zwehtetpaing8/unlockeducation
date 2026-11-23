import { AnimatedProofQuestion } from './ch2SectionC2024Solutions';

export const ch2SectionC2025Solutions: AnimatedProofQuestion[] = [
  {
    number: 7,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction to prove that $1 + 5 + 9 + \\cdots + (4n - 3) = 2n^2 - n$ for all natural numbers $n$. (2025)',
    lines: [
      {
        id: 'q2025-1-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement $1 + 5 + 9 + \\cdots + (4n - 3) = 2n^2 - n$.',
      },
      {
        id: 'q2025-1-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-1-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1,',
      },
      {
        id: 'q2025-1-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 2(1)^2 - 1 = 1.',
      },
      {
        id: 'q2025-1-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2025-1-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-1-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2025-1-8',
        kind: 'math',
        indent: true,
        content: '1 + 5 + 9 + \\cdots + (4k - 3) = 2k^2 - k.',
      },
      {
        id: 'q2025-1-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-1-10',
        kind: 'math',
        indent: true,
        content: '1 + 5 + 9 + \\cdots + (4k - 3) + (4(k + 1) - 3) = 2(k + 1)^2 - (k + 1).',
      },
      {
        id: 'q2025-1-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-1-12',
        kind: 'math',
        indent: true,
        content: '1 + 5 + \\cdots + (4k - 3) + (4k + 1) = 2k^2 - k + (4k + 1)',
      },
      {
        id: 'q2025-1-13',
        kind: 'math',
        indent: true,
        content: '= 2k^2 + 3k + 1',
      },
      {
        id: 'q2025-1-14',
        kind: 'math',
        indent: true,
        content: '= 2k^2 + 4k + 2 - k - 1',
      },
      {
        id: 'q2025-1-15',
        kind: 'math',
        indent: true,
        content: '= 2(k + 1)^2 - (k + 1).',
      },
      {
        id: 'q2025-1-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-1-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 8,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Show that $\\dfrac{2}{3^1} + \\dfrac{2}{3^2} + \\cdots + \\dfrac{2}{3^n} = 1 - \\dfrac{1}{3^n}$ for all natural numbers $n$, by using principle of mathematical induction. (2025)',
    lines: [
      {
        id: 'q2025-2-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2025-2-2',
        kind: 'math',
        content: '\\frac{2}{3^1} + \\frac{2}{3^2} + \\cdots + \\frac{2}{3^n} = 1 - \\frac{1}{3^n}.',
      },
      {
        id: 'q2025-2-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-2-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = \\frac{2}{3},',
      },
      {
        id: 'q2025-2-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 1 - \\frac{1}{3^1} = \\frac{2}{3}.',
      },
      {
        id: 'q2025-2-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2025-2-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-2-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2025-2-9',
        kind: 'math',
        indent: true,
        content: '\\frac{2}{3^1} + \\frac{2}{3^2} + \\cdots + \\frac{2}{3^k} = 1 - \\frac{1}{3^k}.',
      },
      {
        id: 'q2025-2-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-2-11',
        kind: 'math',
        indent: true,
        content:
          '\\frac{2}{3^1} + \\frac{2}{3^2} + \\cdots + \\frac{2}{3^k} + \\frac{2}{3^{k+1}} = 1 - \\frac{1}{3^{k+1}}.',
      },
      {
        id: 'q2025-2-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-2-13',
        kind: 'math',
        indent: true,
        content:
          '\\frac{2}{3^1} + \\cdots + \\frac{2}{3^k} + \\frac{2}{3^{k+1}} = 1 - \\frac{1}{3^k} + \\frac{2}{3^{k+1}}',
      },
      {
        id: 'q2025-2-14',
        kind: 'math',
        indent: true,
        content: '= 1 - \\frac{3}{3^{k+1}} + \\frac{2}{3^{k+1}}',
      },
      {
        id: 'q2025-2-15',
        kind: 'math',
        indent: true,
        content: '= 1 - \\frac{1}{3^{k+1}}.',
      },
      {
        id: 'q2025-2-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-2-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 9,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Prove that $1 + 4 + 7 + \\cdots + (3n - 2) = \\dfrac{n(3n - 1)}{2}$ for all natural numbers $n$ by the use of the mathematical induction principle. (2025)',
    lines: [
      {
        id: 'q2025-3-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2025-3-2',
        kind: 'math',
        content: '1 + 4 + 7 + \\cdots + (3n - 2) = \\frac{n(3n - 1)}{2}.',
      },
      {
        id: 'q2025-3-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-3-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1,',
      },
      {
        id: 'q2025-3-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1(3(1) - 1)}{2} = 1.',
      },
      {
        id: 'q2025-3-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2025-3-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-3-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2025-3-9',
        kind: 'math',
        indent: true,
        content: '1 + 4 + 7 + \\cdots + (3k - 2) = \\frac{k(3k - 1)}{2}.',
      },
      {
        id: 'q2025-3-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-3-11',
        kind: 'math',
        indent: true,
        content: '1 + 4 + 7 + \\cdots + (3k - 2) + (3k + 1) = \\frac{(k + 1)(3(k + 1) - 1)}{2}.',
      },
      {
        id: 'q2025-3-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-3-13',
        kind: 'math',
        indent: true,
        content: '1 + 4 + \\cdots + (3k - 2) + (3k + 1) = \\frac{k(3k - 1)}{2} + 3k + 1',
      },
      {
        id: 'q2025-3-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{3k^2 + 5k + 2}{2}',
      },
      {
        id: 'q2025-3-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(3k + 2)}{2}',
      },
      {
        id: 'q2025-3-16',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(3(k + 1) - 1)}{2}.',
      },
      {
        id: 'q2025-3-17',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-3-18',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 10,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $1 + 2 + 3 + \\cdots + n = \\dfrac{n(n + 1)}{2}$, for all natural numbers $n$. (2025)',
    lines: [
      {
        id: 'q2025-4-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2025-4-2',
        kind: 'math',
        content: '1 + 2 + \\cdots + n = \\frac{n(n + 1)}{2}.',
      },
      {
        id: 'q2025-4-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-4-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1,',
      },
      {
        id: 'q2025-4-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1(1 + 1)}{2} = 1.',
      },
      {
        id: 'q2025-4-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2025-4-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-4-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2025-4-9',
        kind: 'math',
        indent: true,
        content: '1 + 2 + \\cdots + k = \\frac{k(k + 1)}{2}.',
      },
      {
        id: 'q2025-4-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-4-11',
        kind: 'math',
        indent: true,
        content: '1 + 2 + \\cdots + k + (k + 1) = \\frac{(k + 1)(k + 2)}{2}.',
      },
      {
        id: 'q2025-4-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-4-13',
        kind: 'math',
        indent: true,
        content: '1 + 2 + \\cdots + k + (k + 1) = \\frac{k(k + 1)}{2} + (k + 1)',
      },
      {
        id: 'q2025-4-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(k + 1) + 2(k + 1)}{2}',
      },
      {
        id: 'q2025-4-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(k + 2)}{2}.',
      },
      {
        id: 'q2025-4-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-4-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 11,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $6^n - 1$ is divisible by $5$ for all natural numbers $n$. (2025)',
    lines: [
      {
        id: 'q2025-5-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $6^n - 1$ is divisible by $5$.',
      },
      {
        id: 'q2025-5-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-5-3',
        kind: 'text',
        indent: true,
        content: '$6^1 - 1 = 5$, which is divisible by $5$.',
      },
      {
        id: 'q2025-5-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-5-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is',
      },
      {
        id: 'q2025-5-6',
        kind: 'math',
        indent: true,
        content: '6^k - 1 \\text{ is divisible by } 5.',
      },
      {
        id: 'q2025-5-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-5-8',
        kind: 'math',
        indent: true,
        content: '6^{k+1} - 1 \\text{ is divisible by } 5.',
      },
      {
        id: 'q2025-5-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-5-10',
        kind: 'math',
        indent: true,
        content: '6^{k+1} - 1 = 6 \\cdot 6^k - 1',
      },
      {
        id: 'q2025-5-11',
        kind: 'math',
        indent: true,
        content: '= 6 \\cdot 6^k - 6 + 5',
      },
      {
        id: 'q2025-5-12',
        kind: 'math',
        indent: true,
        content: '= 6(6^k - 1) + 5.',
      },
      {
        id: 'q2025-5-13',
        kind: 'text',
        indent: true,
        content:
          'Since both $6(6^k - 1)$ and $5$ are divisible by $5$, $6(6^k - 1) + 5$ is also divisible by $5$.',
      },
      {
        id: 'q2025-5-14',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-5-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 12,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Prove that $3^{2n} - 1$ is divisible by $8$ for all natural numbers $n \\ge 1$ by using principle of mathematical induction. (2025)',
    lines: [
      {
        id: 'q2025-6-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $3^{2n} - 1$ is divisible by $8$.',
      },
      {
        id: 'q2025-6-2',
        kind: 'text',
        content: '**(1)** For $n = 0$,',
      },
      {
        id: 'q2025-6-3',
        kind: 'text',
        indent: true,
        content: '$3^{2 \\cdot 0} - 1 = 0$, which is divisible by $8$.',
      },
      {
        id: 'q2025-6-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 0$.',
      },
      {
        id: 'q2025-6-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 0$, that is,',
      },
      {
        id: 'q2025-6-6',
        kind: 'math',
        indent: true,
        content: '3^{2k} - 1 \\text{ is divisible by } 8.',
      },
      {
        id: 'q2025-6-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-6-8',
        kind: 'math',
        indent: true,
        content: '3^{2(k+1)} - 1 \\text{ is divisible by } 8.',
      },
      {
        id: 'q2025-6-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-6-10',
        kind: 'math',
        indent: true,
        content: '3^{2(k+1)} - 1 = 9 \\cdot 3^{2k} - 1',
      },
      {
        id: 'q2025-6-11',
        kind: 'math',
        indent: true,
        content: '= 9 \\cdot 3^{2k} - 9 + 8',
      },
      {
        id: 'q2025-6-12',
        kind: 'math',
        indent: true,
        content: '= 9(3^{2k} - 1) + 8.',
      },
      {
        id: 'q2025-6-13',
        kind: 'text',
        indent: true,
        content:
          'Since both $9(3^{2k} - 1)$ and $8$ are divisible by $8$, $9(3^{2k} - 1) + 8$ is also divisible by $8$.',
      },
      {
        id: 'q2025-6-14',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-6-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all integers $n \\ge 0$.',
      },
    ],
  },
  {
    number: 13,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $5^n + 3$ is divisible by $4$ for all positive integers $n$. (2025)',
    lines: [
      {
        id: 'q2025-7-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $5^n + 3$ is divisible by $4$.',
      },
      {
        id: 'q2025-7-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-7-3',
        kind: 'text',
        indent: true,
        content: '$5^1 + 3 = 8$, which is divisible by $4$.',
      },
      {
        id: 'q2025-7-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-7-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 1$, that is,',
      },
      {
        id: 'q2025-7-6',
        kind: 'math',
        indent: true,
        content: '5^k + 3 \\text{ is divisible by } 4.',
      },
      {
        id: 'q2025-7-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-7-8',
        kind: 'math',
        indent: true,
        content: '5^{k+1} + 3 \\text{ is divisible by } 4.',
      },
      {
        id: 'q2025-7-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-7-10',
        kind: 'math',
        indent: true,
        content: '5^{k+1} + 3 = 5 \\cdot 5^k + 3',
      },
      {
        id: 'q2025-7-11',
        kind: 'math',
        indent: true,
        content: '= 5 \\cdot 5^k + 15 - 12',
      },
      {
        id: 'q2025-7-12',
        kind: 'math',
        indent: true,
        content: '= 5(5^k + 3) - 12.',
      },
      {
        id: 'q2025-7-13',
        kind: 'text',
        indent: true,
        content:
          'Since both $5(5^k + 3)$ and $12$ are divisible by $4$, their difference, $5(5^k + 3) - 12$, is also divisible by $4$.',
      },
      {
        id: 'q2025-7-14',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-7-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all positive integers $n$.',
      },
    ],
  },
  {
    number: 14,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the principle of mathematical induction to prove that $2n + 1 < n^2$ for all natural numbers $n \\ge 3$. (2025)',
    lines: [
      {
        id: 'q2025-8-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $2n + 1 < n^2$.',
      },
      {
        id: 'q2025-8-2',
        kind: 'text',
        content: '**(1)** For $n = 3$,',
      },
      {
        id: 'q2025-8-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2(3) + 1 = 7,',
      },
      {
        id: 'q2025-8-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 3^2 = 9.',
      },
      {
        id: 'q2025-8-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} < \\text{R.H.S.}',
      },
      {
        id: 'q2025-8-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 3$.',
      },
      {
        id: 'q2025-8-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 3$, that is,',
      },
      {
        id: 'q2025-8-8',
        kind: 'math',
        indent: true,
        content: '2k + 1 < k^2.',
      },
      {
        id: 'q2025-8-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-8-10',
        kind: 'math',
        indent: true,
        content: '2(k + 1) + 1 < (k + 1)^2.',
      },
      {
        id: 'q2025-8-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-8-12',
        kind: 'math',
        indent: true,
        content: '2(k + 1) + 1 = (2k + 1) + 2',
      },
      {
        id: 'q2025-8-13',
        kind: 'math',
        indent: true,
        content: '< k^2 + 2',
      },
      {
        id: 'q2025-8-14',
        kind: 'math',
        indent: true,
        content: '< k^2 + 2k + 1 \\qquad \\because\\ (2 < 2k + 1,\\ k \\ge 3)',
      },
      {
        id: 'q2025-8-15',
        kind: 'math',
        indent: true,
        content: '= (k + 1)^2.',
      },
      {
        id: 'q2025-8-16',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad 2(k + 1) + 1 < (k + 1)^2.',
      },
      {
        id: 'q2025-8-17',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-8-18',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \\ge 3$.',
      },
    ],
  },
  {
    number: 15,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $2n < 2^n - 1$ for all natural numbers $n \\ge 3$. (2025)',
    lines: [
      {
        id: 'q2025-9-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $2n < 2^n - 1$.',
      },
      {
        id: 'q2025-9-2',
        kind: 'text',
        content: '**(1)** For $n = 3$,',
      },
      {
        id: 'q2025-9-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2(3) = 6,',
      },
      {
        id: 'q2025-9-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 2^3 - 1 = 7.',
      },
      {
        id: 'q2025-9-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} < \\text{R.H.S.}',
      },
      {
        id: 'q2025-9-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 3$.',
      },
      {
        id: 'q2025-9-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 3$, that is,',
      },
      {
        id: 'q2025-9-8',
        kind: 'math',
        indent: true,
        content: '2k < 2^k - 1.',
      },
      {
        id: 'q2025-9-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-9-10',
        kind: 'math',
        indent: true,
        content: '2(k + 1) < 2^{k+1} - 1.',
      },
      {
        id: 'q2025-9-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-9-12',
        kind: 'math',
        indent: true,
        content: '2(k + 1) = 2k + 2',
      },
      {
        id: 'q2025-9-13',
        kind: 'math',
        indent: true,
        content: '< 2^k + 1 \\qquad (\\because\\ 2k < 2^k - 1)',
      },
      {
        id: 'q2025-9-14',
        kind: 'math',
        indent: true,
        content: '< 2^{k+1} - 1 \\qquad (2^k + 1 < 2^{k+1} - 1,\\ k \\ge 3).',
      },
      {
        id: 'q2025-9-15',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad 2(k + 1) < 2^{k+1} - 1.',
      },
      {
        id: 'q2025-9-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-9-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \\ge 3$.',
      },
    ],
  },
  {
    number: 16,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the principle of mathematical induction to prove that $4n^2 > n + 11$ for all natural numbers $n \\ge 2$. (2025)',
    lines: [
      {
        id: 'q2025-10-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $4n^2 > n + 11$.',
      },
      {
        id: 'q2025-10-2',
        kind: 'text',
        content: '**(1)** For $n = 2$,',
      },
      {
        id: 'q2025-10-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 4(2)^2 = 16,',
      },
      {
        id: 'q2025-10-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 2 + 11 = 13.',
      },
      {
        id: 'q2025-10-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} > \\text{R.H.S.}',
      },
      {
        id: 'q2025-10-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 2$.',
      },
      {
        id: 'q2025-10-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 2$, that is,',
      },
      {
        id: 'q2025-10-8',
        kind: 'math',
        indent: true,
        content: '4k^2 > k + 11.',
      },
      {
        id: 'q2025-10-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-10-10',
        kind: 'math',
        indent: true,
        content: '4(k + 1)^2 > (k + 1) + 11.',
      },
      {
        id: 'q2025-10-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-10-12',
        kind: 'math',
        indent: true,
        content: '4(k + 1)^2 = 4(k^2 + 2k + 1)',
      },
      {
        id: 'q2025-10-13',
        kind: 'math',
        indent: true,
        content: '= 4k^2 + 8k + 4',
      },
      {
        id: 'q2025-10-14',
        kind: 'math',
        indent: true,
        content: '> k + 11 + 8k + 4 \\qquad (\\because\\ 4k^2 > k + 11)',
      },
      {
        id: 'q2025-10-15',
        kind: 'math',
        indent: true,
        content: '= 9k + 15',
      },
      {
        id: 'q2025-10-16',
        kind: 'math',
        indent: true,
        content: '> k + 12 \\qquad (9k + 15 > k + 12,\\ k \\ge 2)',
      },
      {
        id: 'q2025-10-17',
        kind: 'math',
        indent: true,
        content: '= (k + 1) + 11.',
      },
      {
        id: 'q2025-10-18',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad 4(k + 1)^2 > (k + 1) + 11.',
      },
      {
        id: 'q2025-10-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-10-20',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \\ge 2$.',
      },
    ],
  },
  {
    number: 17,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Prove that $2n < 2^n$ for all natural numbers $n \\ge 3$ by using the mathematical induction. (2025)',
    lines: [
      {
        id: 'q2025-11-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $2n < 2^n$.',
      },
      {
        id: 'q2025-11-2',
        kind: 'text',
        content: '**(1)** For $n = 3$,',
      },
      {
        id: 'q2025-11-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2(3) = 6,',
      },
      {
        id: 'q2025-11-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 2^3 = 8.',
      },
      {
        id: 'q2025-11-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} < \\text{R.H.S.}',
      },
      {
        id: 'q2025-11-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 3$.',
      },
      {
        id: 'q2025-11-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 3$, that is,',
      },
      {
        id: 'q2025-11-8',
        kind: 'math',
        indent: true,
        content: '2k < 2^k.',
      },
      {
        id: 'q2025-11-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-11-10',
        kind: 'math',
        indent: true,
        content: '2(k + 1) < 2^{k+1}.',
      },
      {
        id: 'q2025-11-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-11-12',
        kind: 'math',
        indent: true,
        content: '2(k + 1) = 2k + 2',
      },
      {
        id: 'q2025-11-13',
        kind: 'math',
        indent: true,
        content: '< 2^k + 2 \\qquad (\\because\\ 2k < 2^k)',
      },
      {
        id: 'q2025-11-14',
        kind: 'math',
        indent: true,
        content: '< 2^k + 2^k \\qquad (\\because\\ 2^k \\ge 2^3 = 8 > 2,\\ k \\ge 3)',
      },
      {
        id: 'q2025-11-15',
        kind: 'math',
        indent: true,
        content: '= 2^{k+1}.',
      },
      {
        id: 'q2025-11-16',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad 2(k + 1) < 2^{k+1}.',
      },
      {
        id: 'q2025-11-17',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-11-18',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \\ge 3$.',
      },
    ],
  },
  {
    number: 18,
    year: 2025,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $2^n > n$ for all natural numbers $n$. (2025)',
    lines: [
      {
        id: 'q2025-12-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $2^n > n$.',
      },
      {
        id: 'q2025-12-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2025-12-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 2^1 = 2,',
      },
      {
        id: 'q2025-12-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = 1.',
      },
      {
        id: 'q2025-12-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} > \\text{R.H.S.}',
      },
      {
        id: 'q2025-12-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2025-12-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'q2025-12-8',
        kind: 'math',
        indent: true,
        content: '2^k > k.',
      },
      {
        id: 'q2025-12-9',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2025-12-10',
        kind: 'math',
        indent: true,
        content: '2^{k+1} > k + 1.',
      },
      {
        id: 'q2025-12-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2025-12-12',
        kind: 'math',
        indent: true,
        content: '2^{k+1} = 2 \\cdot 2^k',
      },
      {
        id: 'q2025-12-13',
        kind: 'math',
        indent: true,
        content: '> 2k',
      },
      {
        id: 'q2025-12-14',
        kind: 'math',
        indent: true,
        content: '\\ge k + 1 \\qquad (\\because\\ k \\ge 1).',
      },
      {
        id: 'q2025-12-15',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad 2^{k+1} > k + 1.',
      },
      {
        id: 'q2025-12-16',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2025-12-17',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
];
