import { AnimatedProofQuestion } from './ch2SectionC2024Solutions';

export const ch2SectionC2026Solutions: AnimatedProofQuestion[] = [
  {
    number: 19,
    year: 2026,
    section: 'Section (C)',
    questionText:
      'Prove that $5^n - 1$ is divisible by $4$ for all natural numbers $n$ by using mathematical induction. (2026)',
    lines: [
      {
        id: 'q2026-2-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement that $5^n - 1$ is divisible by $4$.',
      },
      {
        id: 'q2026-2-2',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2026-2-3',
        kind: 'text',
        indent: true,
        content: '$5^1 - 1 = 4$, which is divisible by $4$.',
      },
      {
        id: 'q2026-2-4',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2026-2-5',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'q2026-2-6',
        kind: 'math',
        indent: true,
        content: '5^k - 1 \\text{ is divisible by } 4.',
      },
      {
        id: 'q2026-2-7',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2026-2-8',
        kind: 'math',
        indent: true,
        content: '5^{k+1} - 1 \\text{ is divisible by } 4.',
      },
      {
        id: 'q2026-2-9',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2026-2-10',
        kind: 'math',
        indent: true,
        content: '5^{k+1} - 1 = 5 \\cdot 5^k - 1',
      },
      {
        id: 'q2026-2-11',
        kind: 'math',
        indent: true,
        content: '= 5(5^k - 1) + 4.',
      },
      {
        id: 'q2026-2-12',
        kind: 'text',
        indent: true,
        content:
          'Since both $5(5^k - 1)$ and $4$ are divisible by $4$, their sum, $5(5^k - 1) + 4$, is also divisible by $4$.',
      },
      {
        id: 'q2026-2-13',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2026-2-14',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 20,
    year: 2026,
    section: 'Section (C)',
    questionText:
      'Use the mathematical induction principle to prove that $1 + 3 + 3^2 + \\cdots + 3^{n-1} = \\dfrac{3^n - 1}{2}$ for all natural numbers $n$. (2026)',
    lines: [
      {
        id: 'q2026-3-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2026-3-2',
        kind: 'math',
        content: '1 + 3 + 3^2 + \\cdots + 3^{n-1} = \\frac{3^n - 1}{2}.',
      },
      {
        id: 'q2026-3-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2026-3-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = 1,',
      },
      {
        id: 'q2026-3-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{3^1 - 1}{2} = 1.',
      },
      {
        id: 'q2026-3-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2026-3-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2026-3-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'q2026-3-9',
        kind: 'math',
        indent: true,
        content: '1 + 3 + 3^2 + \\cdots + 3^{k-1} = \\frac{3^k - 1}{2}.',
      },
      {
        id: 'q2026-3-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2026-3-11',
        kind: 'math',
        indent: true,
        content: '1 + 3 + 3^2 + \\cdots + 3^k = \\frac{3^{k+1} - 1}{2}.',
      },
      {
        id: 'q2026-3-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2026-3-13',
        kind: 'math',
        indent: true,
        content: '1 + 3 + 3^2 + \\cdots + 3^k = (1 + 3 + 3^2 + \\cdots + 3^{k-1}) + 3^k',
      },
      {
        id: 'q2026-3-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{3^k - 1}{2} + 3^k',
      },
      {
        id: 'q2026-3-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{3^k - 1 + 2 \\cdot 3^k}{2}',
      },
      {
        id: 'q2026-3-16',
        kind: 'math',
        indent: true,
        content: '= \\frac{3^{k+1} - 1}{2}.',
      },
      {
        id: 'q2026-3-17',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2026-3-18',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.',
      },
    ],
  },
  {
    number: 21,
    year: 2026,
    section: 'Section (C)',
    questionText:
      'Prove that $\\dfrac{1}{1 \\cdot 5} + \\dfrac{1}{5 \\cdot 9} + \\dfrac{1}{9 \\cdot 13} + \\cdots + \\dfrac{1}{(4n - 3)(4n + 1)} = \\dfrac{n}{4n + 1}$ for $n \\ge 1$ by using the principle of mathematical induction. (2026)',
    lines: [
      {
        id: 'q2026-4-1',
        kind: 'text',
        content: 'Let $P(n)$ denote the statement',
      },
      {
        id: 'q2026-4-2',
        kind: 'math',
        content:
          '\\frac{1}{1 \\cdot 5} + \\frac{1}{5 \\cdot 9} + \\frac{1}{9 \\cdot 13} + \\cdots + \\frac{1}{(4n - 3)(4n + 1)} = \\frac{n}{4n + 1}.',
      },
      {
        id: 'q2026-4-3',
        kind: 'text',
        content: '**(1)** For $n = 1$,',
      },
      {
        id: 'q2026-4-4',
        kind: 'math',
        indent: true,
        content: '\\text{L.H.S.} = \\frac{1}{1 \\cdot 5} = \\frac{1}{5},',
      },
      {
        id: 'q2026-4-5',
        kind: 'math',
        indent: true,
        content: '\\text{R.H.S.} = \\frac{1}{4(1) + 1} = \\frac{1}{5}.',
      },
      {
        id: 'q2026-4-6',
        kind: 'math',
        indent: true,
        content: '\\therefore \\quad \\text{L.H.S.} = \\text{R.H.S.}',
      },
      {
        id: 'q2026-4-7',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = 1$.',
      },
      {
        id: 'q2026-4-8',
        kind: 'text',
        content: '**(2)** Assume that the statement is true for $n = k$, that is,',
      },
      {
        id: 'q2026-4-9',
        kind: 'math',
        indent: true,
        content:
          '\\frac{1}{1 \\cdot 5} + \\frac{1}{5 \\cdot 9} + \\cdots + \\frac{1}{(4k - 3)(4k + 1)} = \\frac{k}{4k + 1}.',
      },
      {
        id: 'q2026-4-10',
        kind: 'text',
        indent: true,
        content: 'We will show that the statement is true for $n = k + 1$, that is, we have to show that',
      },
      {
        id: 'q2026-4-11',
        kind: 'math',
        indent: true,
        content:
          '\\frac{1}{1 \\cdot 5} + \\frac{1}{5 \\cdot 9} + \\cdots + \\frac{1}{(4k - 3)(4k + 1)} + \\frac{1}{(4k + 1)(4k + 5)} = \\frac{k + 1}{4k + 5}.',
      },
      {
        id: 'q2026-4-12',
        kind: 'text',
        indent: true,
        content: 'It is proved that',
      },
      {
        id: 'q2026-4-13',
        kind: 'math',
        indent: true,
        content:
          '\\frac{1}{1 \\cdot 5} + \\frac{1}{5 \\cdot 9} + \\cdots + \\frac{1}{(4k - 3)(4k + 1)} + \\frac{1}{(4k + 1)(4k + 5)}',
      },
      {
        id: 'q2026-4-14',
        kind: 'math',
        indent: true,
        content: '= \\frac{k}{4k + 1} + \\frac{1}{(4k + 1)(4k + 5)}',
      },
      {
        id: 'q2026-4-15',
        kind: 'math',
        indent: true,
        content: '= \\frac{k(4k + 5) + 1}{(4k + 1)(4k + 5)}',
      },
      {
        id: 'q2026-4-16',
        kind: 'math',
        indent: true,
        content: '= \\frac{4k^2 + 5k + 1}{(4k + 1)(4k + 5)}',
      },
      {
        id: 'q2026-4-17',
        kind: 'math',
        indent: true,
        content: '= \\frac{(k + 1)(4k + 1)}{(4k + 1)(4k + 5)}',
      },
      {
        id: 'q2026-4-18',
        kind: 'math',
        indent: true,
        content: '= \\frac{k + 1}{4k + 5}.',
      },
      {
        id: 'q2026-4-19',
        kind: 'text',
        indent: true,
        content: 'So, the statement is true for $n = k + 1$.',
      },
      {
        id: 'q2026-4-20',
        kind: 'text',
        content:
          '**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \\ge 1$.',
      },
    ],
  },
];
