import { AnimatedProofQuestion } from './ch2SectionC2024Solutions';

export const ch2SectionD2024Solutions: AnimatedProofQuestion[] = [
  {
    number: 1,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Prove that $1 \\cdot 2 + 2 \\cdot 2^2 + 3 \\cdot 2^3 + \\cdots + n \\cdot 2^n = (n - 1)2^{n+1} + 2$ for all natural numbers $n$ by using the mathematical induction. (2024)',
    lines: [
      {
        id: 'd2024-q1-1',
        kind: 'text',
        content:
          'Let $P(n)$ denote the statement $1 \\cdot 2 + 2 \\cdot 2^2 + \\cdots + n \\cdot 2^n = (n - 1)2^{n+1} + 2$.',
      },
      {
        id: 'd2024-q1-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q1-3',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1 \\cdot 2 = 2,',
      },
      {
        id: 'd2024-q1-4',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = (1 - 1)2^{1+1} + 2 = 2.',
      },
      {
        id: 'd2024-q1-5',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'd2024-q1-6',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q1-7',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q1-8',
        kind: 'math',
        indent: true,
        content: '1 \\cdot 2 + 2 \\cdot 2^2 + \\cdots + k \\cdot 2^k = (k - 1)2^{k+1} + 2.',
      },
      {
        id: 'd2024-q1-9',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'd2024-q1-10',
        kind: 'math',
        indent: true,
        content: '1 \\cdot 2 + 2 \\cdot 2^2 + \\cdots + k \\cdot 2^k + (k + 1)2^{k+1} = k2^{k+2} + 2.',
      },
      {
        id: 'd2024-q1-11',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'd2024-q1-12',
        kind: 'math',
        indent: true,
        content:
          '1 \\cdot 2 + 2 \\cdot 2^2 + \\cdots + k \\cdot 2^k + (k + 1)2^{k+1} = (k - 1)2^{k+1} + 2 + (k + 1)2^{k+1}',
      },
      {
        id: 'd2024-q1-13',
        kind: 'math',
        indent: true,
        content: '= 2k \\cdot 2^{k+1} + 2',
      },
      {
        id: 'd2024-q1-14',
        kind: 'math',
        indent: true,
        content: '= k2^{k+2} + 2.',
      },
      {
        id: 'd2024-q1-15',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q1-16',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 2,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Prove that $1^2 + 3^2 + 5^2 + \\cdots + (2n - 1)^2 = \\dfrac{n(2n - 1)(2n + 1)}{3}$ by using the mathematical induction principle for all natural numbers $n$. (2024)',
    lines: [
      {
        id: 'd2024-q2-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'd2024-q2-2',
        kind: 'math',
        content: '1^2 + 3^2 + \\cdots + (2n - 1)^2 = \\frac{n(2n - 1)(2n + 1)}{3}.',
      },
      {
        id: 'd2024-q2-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q2-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1^2 = 1,',
      },
      {
        id: 'd2024-q2-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1 \\cdot (2 \\cdot 1 - 1) \\cdot (2 \\cdot 1 + 1)}{3} = 1.',
      },
      {
        id: 'd2024-q2-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'd2024-q2-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q2-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q2-9',
        kind: 'math',
        indent: true,
        content: '1^2 + 3^2 + \\cdots + (2k - 1)^2 = \\frac{k(2k - 1)(2k + 1)}{3}.',
      },
      {
        id: 'd2024-q2-10',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'd2024-q2-11',
        kind: 'math',
        indent: true,
        content:
          '1^2 + 3^2 + \\cdots + (2k - 1)^2 + (2k + 1)^2 = \\frac{(k + 1)(2k + 1)(2k + 3)}{3}.',
      },
      {
        id: 'd2024-q2-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'd2024-q2-13',
        kind: 'math',
        indent: true,
        content:
          '1^2 + 3^2 + \\cdots + (2k - 1)^2 + (2k + 1)^2 = \\frac{k(2k - 1)(2k + 1)}{3} + (2k + 1)^2',
      },
      {
        id: 'd2024-q2-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(2k - 1)(2k + 1)}{3} + \\frac{3(2k + 1)^2}{3}',
      },
      {
        id: 'd2024-q2-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(2k - 1)(2k + 1) + 3(2k + 1)^2}{3}',
      },
      {
        id: 'd2024-q2-16',
        kind: 'math',
        indent: true,
        content: '= \\frac{(2k + 1)\\big(k(2k - 1) + 3(2k + 1)\\big)}{3}',
      },
      {
        id: 'd2024-q2-17',
        kind: 'math',
        indent: true,
        content: '= \\frac{(2k + 1)(2k^2 + 5k + 3)}{3}',
      },
      {
        id: 'd2024-q2-18',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(2k + 1)(2k + 3)}{3}.',
      },
      {
        id: 'd2024-q2-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q2-20',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 3,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Prove that $1^2 + 2^2 + 3^2 + \\cdots + n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}$ for all natural numbers $n$ by using the mathematical induction. (2024)',
    lines: [
      {
        id: 'd2024-q3-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'd2024-q3-2',
        kind: 'math',
        content: '1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}.',
      },
      {
        id: 'd2024-q3-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q3-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1^2 = 1,',
      },
      {
        id: 'd2024-q3-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1 \\cdot (1 + 1) \\cdot (2 \\cdot 1 + 1)}{6} = 1.',
      },
      {
        id: 'd2024-q3-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'd2024-q3-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q3-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q3-9',
        kind: 'math',
        indent: true,
        content: '1^2 + 2^2 + \\cdots + k^2 = \\frac{k(k + 1)(2k + 1)}{6}.',
      },
      {
        id: 'd2024-q3-10',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'd2024-q3-11',
        kind: 'math',
        indent: true,
        content: '1^2 + 2^2 + \\cdots + k^2 + (k + 1)^2 = \\frac{(k + 1)(k + 2)(2k + 3)}{6}.',
      },
      {
        id: 'd2024-q3-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'd2024-q3-13',
        kind: 'math',
        indent: true,
        content:
          '1^2 + 2^2 + \\cdots + k^2 + (k + 1)^2 = \\frac{k(k + 1)(2k + 1)}{6} + (k + 1)^2',
      },
      {
        id: 'd2024-q3-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(k + 1)(2k + 1)}{6} + \\frac{6(k + 1)^2}{6}',
      },
      {
        id: 'd2024-q3-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(k + 1)(2k + 1) + 6(k + 1)^2}{6}',
      },
      {
        id: 'd2024-q3-16',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)\\big(k(2k + 1) + 6(k + 1)\\big)}{6}',
      },
      {
        id: 'd2024-q3-17',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(2k^2 + 7k + 6)}{6}',
      },
      {
        id: 'd2024-q3-18',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(k + 2)(2k + 3)}{6}.',
      },
      {
        id: 'd2024-q3-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q3-20',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 4,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Prove that $4^{2n} - 1$ is divisible by $15$ for all natural numbers $n$ by using the mathematical induction. (2024)',
    lines: [
      {
        id: 'd2024-q4-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $4^{2n} - 1$ is divisible by $15$.',
      },
      {
        id: 'd2024-q4-2',
        kind: 'subheading',
        content: 'Method 1',
      },
      {
        id: 'd2024-q4-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q4-4',
        kind: 'math',
        indent: true,
        content: '4^{2(1)} - 1 = 4^2 - 1 = 16 - 1 = 15 = 15 \\cdot 1.',
      },
      {
        id: 'd2024-q4-5',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q4-6',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q4-7',
        kind: 'math',
        indent: true,
        content: '4^{2k} - 1 = 15m \\text{ for some integer } m.',
      },
      {
        id: 'd2024-q4-8',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that $4^{2(k+1)} - 1$ is divisible by $15$. It is proved that',
      },
      {
        id: 'd2024-q4-9',
        kind: 'math',
        indent: true,
        content: '4^{2(k+1)} - 1 = 4^2 \\cdot 4^{2k} - 1',
      },
      {
        id: 'd2024-q4-10',
        kind: 'math',
        indent: true,
        content: '= 16 \\cdot 4^{2k} - 1',
      },
      {
        id: 'd2024-q4-11',
        kind: 'math',
        indent: true,
        content: '= 16(4^{2k} - 1) + 15',
      },
      {
        id: 'd2024-q4-12',
        kind: 'math',
        indent: true,
        content: '= 16(15m) + 15',
      },
      {
        id: 'd2024-q4-13',
        kind: 'math',
        indent: true,
        content: '= 15(16m + 1).',
      },
      {
        id: 'd2024-q4-14',
        kind: 'text',
        indent: true,
        content:
          'Since $16m + 1$ is an integer, the expression is divisible by $15$. So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q4-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
      {
        id: 'd2024-q4-16',
        kind: 'subheading',
        content: 'Method 2',
      },
      {
        id: 'd2024-q4-17',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q4-18',
        kind: 'text',
        indent: true,
        content: '$4^{2 \\cdot 1} - 1 = 4^2 - 1 = 16 - 1 = 15$, which is divisible by $15$.',
      },
      {
        id: 'd2024-q4-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q4-20',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q4-21',
        kind: 'math',
        indent: true,
        content: '4^{2k} - 1 \\text{ is divisible by } 15.',
      },
      {
        id: 'd2024-q4-22',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that $4^{2(k+1)} - 1$ is divisible by $15$. It is proved that',
      },
      {
        id: 'd2024-q4-23',
        kind: 'math',
        indent: true,
        content: '4^{2(k+1)} - 1 = 4^2 \\cdot 4^{2k} - 1',
      },
      {
        id: 'd2024-q4-24',
        kind: 'math',
        indent: true,
        content: '= 16 \\cdot 4^{2k} - 1',
      },
      {
        id: 'd2024-q4-25',
        kind: 'math',
        indent: true,
        content: '= 16 \\cdot 4^{2k} - 16 + 15',
      },
      {
        id: 'd2024-q4-26',
        kind: 'math',
        indent: true,
        content: '= 16(4^{2k} - 1) + 15.',
      },
      {
        id: 'd2024-q4-27',
        kind: 'text',
        indent: true,
        content:
          'Since both $16(4^{2k} - 1)$ and $15$ are divisible by $15$, $16(4^{2k} - 1) + 15$ is also divisible by $15$. So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q4-28',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 5,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Use the mathematical induction principle to prove that $n^3 + 2n$ is divisible by $3$ for all natural numbers $n$. (2024)',
    lines: [
      {
        id: 'd2024-q5-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $n^3 + 2n$ is divisible by $3$.',
      },
      {
        id: 'd2024-q5-2',
        kind: 'subheading',
        content: 'Method 1',
      },
      {
        id: 'd2024-q5-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q5-4',
        kind: 'math',
        indent: true,
        content: '1^3 + 2(1) = 1 + 2 = 3 = 3 \\cdot 1.',
      },
      {
        id: 'd2024-q5-5',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q5-6',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q5-7',
        kind: 'math',
        indent: true,
        content: 'k^3 + 2k = 3m \\text{ for some integer } m.',
      },
      {
        id: 'd2024-q5-8',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that $(k + 1)^3 + 2(k + 1)$ is divisible by $3$. It is proved that',
      },
      {
        id: 'd2024-q5-9',
        kind: 'math',
        indent: true,
        content: '(k + 1)^3 + 2(k + 1) = (k^3 + 3k^2 + 3k + 1) + 2k + 2',
      },
      {
        id: 'd2024-q5-10',
        kind: 'math',
        indent: true,
        content: '= k^3 + 2k + 3k^2 + 3k + 3',
      },
      {
        id: 'd2024-q5-11',
        kind: 'math',
        indent: true,
        content: '= (k^3 + 2k) + 3(k^2 + k + 1)',
      },
      {
        id: 'd2024-q5-12',
        kind: 'math',
        indent: true,
        content: '= 3m + 3(k^2 + k + 1)',
      },
      {
        id: 'd2024-q5-13',
        kind: 'math',
        indent: true,
        content: '= 3(m + k^2 + k + 1).',
      },
      {
        id: 'd2024-q5-14',
        kind: 'text',
        indent: true,
        content:
          'Since $m + k^2 + k + 1$ is an integer, the expression is divisible by $3$. So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q5-15',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
      {
        id: 'd2024-q5-16',
        kind: 'subheading',
        content: 'Method 2',
      },
      {
        id: 'd2024-q5-17',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q5-18',
        kind: 'text',
        indent: true,
        content: '$1^3 + 2(1) = 3$, which is divisible by $3$.',
      },
      {
        id: 'd2024-q5-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q5-20',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'd2024-q5-21',
        kind: 'math',
        indent: true,
        content: 'k^3 + 2k \\text{ is divisible by } 3.',
      },
      {
        id: 'd2024-q5-22',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that $(k + 1)^3 + 2(k + 1)$ is divisible by $3$. It is proved that',
      },
      {
        id: 'd2024-q5-23',
        kind: 'math',
        indent: true,
        content: '(k + 1)^3 + 2(k + 1) = k^3 + 3k^2 + 3k + 1 + 2k + 2',
      },
      {
        id: 'd2024-q5-24',
        kind: 'math',
        indent: true,
        content: '= (k^3 + 2k) + 3(k^2 + k + 1).',
      },
      {
        id: 'd2024-q5-25',
        kind: 'text',
        indent: true,
        content:
          'Since both $(k^3 + 2k)$ and $3(k^2 + k + 1)$ are divisible by $3$, $(k^3 + 2k) + 3(k^2 + k + 1)$ is also divisible by $3$. So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q5-26',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 6,
    year: 2024,
    section: 'Section (D)',
    questionText:
      'Use the mathematical induction principle to prove that $2^n \\ge 1 + n$ for all natural numbers $n \\ge 1$. (2024)',
    lines: [
      {
        id: 'd2024-q6-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement $2^n \\ge 1 + n$ for $n \\ge 1$.',
      },
      {
        id: 'd2024-q6-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'd2024-q6-3',
        kind: 'math',
        indent: true,
        content: '2^1 = 2 = 1 + 1.',
      },
      {
        id: 'd2024-q6-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'd2024-q6-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, where $k \\ge 1$, that is,',
      },
      {
        id: 'd2024-q6-6',
        kind: 'math',
        indent: true,
        content: '2^k \\ge 1 + k.',
      },
      {
        id: 'd2024-q6-7',
        kind: 'text',
        indent: true,
        content:
          'We will show that the statement is true for $n = k + 1$, that is, we have to show that $2^{k+1} \\ge 1 + (k + 1)$. It is proved that',
      },
      {
        id: 'd2024-q6-8',
        kind: 'math',
        indent: true,
        content: '2^{k+1} = 2 \\cdot 2^k',
      },
      {
        id: 'd2024-q6-9',
        kind: 'math',
        indent: true,
        content: '\\ge 2(k + 1)',
      },
      {
        id: 'd2024-q6-10',
        kind: 'math',
        indent: true,
        content: '= 2k + 2',
      },
      {
        id: 'd2024-q6-11',
        kind: 'math',
        indent: true,
        content: '\\ge k + 2',
      },
      {
        id: 'd2024-q6-12',
        kind: 'math',
        indent: true,
        content: '= 1 + (k + 1).',
      },
      {
        id: 'd2024-q6-13',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'd2024-q6-14',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, $2^n \\ge 1 + n$ for all natural numbers $n \\ge 1$.',
      },
    ],
  },
];
