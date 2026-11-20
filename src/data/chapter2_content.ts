export const chapter2Content = String.raw`[DIAGRAM:Chapter2Header]

### 2.1 Introduction

#### What is a Statement in Mathematics?

A mathematical statement is a sentence that is definitely **true** or **false**, but not both.

* “$2 + 3 = 5$” is a true statement.
* “$7$ is an even number” is a false statement.
* “$x + 2 = 5$” is not a statement until the value of $x$ is specified.

#### Check Your Understanding

**Which of the following sentences are statements?**

(1) $8 + 5 = 13$.

(2) $9$ is a prime number.

(3) $x + 4 = 10$.

(4) Close the door.

(5) Is $12$ divisible by $3$?

#### What is Mathematical Induction?

Mathematical induction is a powerful and elegant technique for proving certain type of mathematical statements, general propositions which assert that something is true for all natural numbers or for all natural numbers from some point on.

Before we state the principle of mathematical induction, let us consider an example. Consider the sum of the first $n$ odd positive integers. That is,
$$\begin{aligned}
\text{if } n &= 1, & 1 &= 1^2, \\
\text{if } n &= 2, & 1 + 3 &= 4 = 2^2, \\
\text{if } n &= 3, & 1 + 3 + 5 &= 9 = 3^2, \\
\text{if } n &= 4, & 1 + 3 + 5 + 7 &= 16 = 4^2, \\
\text{if } n &= 5, & 1 + 3 + 5 + 7 + 9 &= 25 = 5^2, \\
\text{if } n &= 6, & 1 + 3 + 5 + 7 + 9 + 11 &= 36 = 6^2.
\end{aligned}$$

To express this statement symbolically, first observe that the $n^{\text{th}}$ odd natural number is $2n - 1$. Then the statement can be expressed as:
$$1 + 3 + 5 + 7 + 9 + \cdots + (2n - 1) = n^2.$$

---

### 2.2 Principle of Mathematical Induction

To understand the principle of mathematical induction, suppose that a row of thin rectangular dominoes is placed on end, as shown in Figure 2.1.

[DIAGRAM:DominoChainFigure]

To apply the principle of mathematical induction, there are two steps:

**The initial step:** Prove that the statement is true for $n = 1$.

**The inductive step:** Assume that the statement is true for $n = k$, and use this assumption to prove that the statement is true for $n = k + 1$.

**Conclusion:** The statement has been proved for $n = 1$. By the inductive step, since the statement is true for $n = 1$, it is also true for $n = 2$. Again, by the inductive step, since the statement is true for $n = 2$, it is also true for $n = 3$. And since the statement is true for $n = 3$, it is also true for $n = 4$, and so on. Finally, we conclude that the statement is true for all natural numbers $n$.

**Remark.** In the inductive step we do not prove that the statement is true for $n = k$. We only show that if the statement, is true for $n = k$, then the statement is also true for $n = k + 1$. The assumption that the statement is true for $n = k$, is called ***the induction hypothesis***.

In this chapter, we will study four main types of mathematical induction problems:

1. Formula proofs (L.H.S. = R.H.S.)
2. Divisibility problems
3. Inequality problems
4. Recurrence relations and sequence formulas

---

#### Examples

**Example 1.** Use the mathematical induction principle to prove that $1 + 3 + 5 + \cdots + (2n - 1) = n^2$, for all natural numbers $n$.

**Solution.**
Let $P(n)$ denote the statement
$$1 + 3 + 5 + \cdots + (2n - 1) = n^2.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1 \qquad \text{and} \qquad \text{R.H.S.} = 1^2 = 1.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 + 3 + 5 + \cdots + (2k - 1) = k^2.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 + 3 + 5 + \cdots + (2k - 1) + (2k + 1) = (k + 1)^2.$$
It is proved that,
$$\begin{aligned}
1 + 3 + 5 + \cdots + (2k - 1) + (2k + 1) &= k^2 + (2k + 1) \\
&= k^2 + 2k + 1 \\
&= (k + 1)^2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 2.** Use the mathematical induction principle to prove that $1 + 2 + 3 + \cdots + n = \dfrac{n(n + 1)}{2}$, for all natural numbers $n$.

**Solution.**
Let $P(n)$ denote the statement
$$1 + 2 + 3 + \cdots + n = \frac{n(n + 1)}{2}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1 \qquad \text{and} \qquad \text{R.H.S.} = \frac{1(1 + 1)}{2} = 1.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 + 2 + 3 + \cdots + k = \frac{k(k + 1)}{2}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 + 2 + 3 + \cdots + k + (k + 1) = \frac{(k + 1)(k + 2)}{2}.$$
It is proved that,
$$\begin{aligned}
1 + 2 + 3 + \cdots + k + (k + 1) &= \frac{k(k + 1)}{2} + (k + 1) \\
&= \frac{k(k + 1) + 2(k + 1)}{2} \\
&= \frac{(k + 1)(k + 2)}{2}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 3.** Use the mathematical induction principle to prove that $3^n - 1$ is a multiple of $2$ for all natural numbers $n$.

**Solution.**
Let $P(n)$ denote the statement $3^n - 1$ is a multiple of $2$.

**(1)** For $n = 1$, $3^1 - 1 = 2$ which is a multiple of $2$. The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$3^k - 1 \text{ is a multiple of } 2.$$
We will show that the statement is true for $n = k + 1$, that is we have to show that $3^{k+1} - 1$ is a multiple of $2$.
It is proved that
$$\begin{aligned}
3^{k+1} - 1 &= 3 \cdot 3^k - 1 \\
&= 2 \cdot 3^k + 3^k - 1.
\end{aligned}$$
Since $2 \cdot 3^k$ is a multiple of $2$ and $3^k - 1$ is a multiple of $2$, $2 \cdot 3^k + 3^k - 1$ is also a multiple of $2$.
So, $3^{k+1} - 1$ is also a multiple of $2$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 4.** Prove that $(ab)^n = a^n b^n$ for every natural number $n$.

**Solution.**
Let $P(n)$ denote the statement
$$(ab)^n = a^n b^n.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = (ab)^1 = ab, \qquad \text{R.H.S.} = a^1 b^1 = ab.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$(ab)^k = a^k b^k.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$(ab)^{k+1} = a^{k+1} b^{k+1}.$$
It is proved that,
$$\begin{aligned}
(ab)^{k+1} &= (ab)^k (ab) \\
&= a^k b^k ab \\
&= a^k a b^k b \\
&= a^{k+1} b^{k+1}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 5.** Prove that $1 \cdot 3 + 2 \cdot 3^2 + 3 \cdot 3^3 + \cdots + n \cdot 3^n = \dfrac{(2n - 1)3^{n+1} + 3}{4}$ for all natural numbers $n$ by the use of the mathematical induction principle.

**Solution.**
Let $P(n)$ denote the statement
$$1 \cdot 3 + 2 \cdot 3^2 + 3 \cdot 3^3 + \cdots + n \cdot 3^n = \frac{(2n - 1)3^{n+1} + 3}{4}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1 \cdot 3 = 3 \qquad \text{and} \qquad \text{R.H.S.} = \frac{(2 \cdot 1 - 1)3^{1+1} + 3}{4} = \frac{9 + 3}{4} = 3.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 \cdot 3 + 2 \cdot 3^2 + 3 \cdot 3^3 + \cdots + k \cdot 3^k = \frac{(2k - 1)3^{k+1} + 3}{4}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 \cdot 3 + 2 \cdot 3^2 + 3 \cdot 3^3 + \cdots + k \cdot 3^k + (k + 1)3^{k+1} = \frac{(2k + 1)3^{k+2} + 3}{4}.$$
It is proved that,
$$\begin{aligned}
&1 \cdot 3 + 2 \cdot 3^2 + 3 \cdot 3^3 + \cdots + k \cdot 3^k + (k + 1)3^{k+1} \\
&= \frac{(2k - 1)3^{k+1} + 3}{4} + (k + 1)3^{k+1} \\
&= \frac{(2k - 1)3^{k+1} + 3 + 4(k + 1)3^{k+1}}{4} \\
&= \frac{(6k + 3)3^{k+1} + 3}{4} \\
&= \frac{(2k + 1)3^{k+2} + 3}{4}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 6.** Use the mathematical induction principle to prove that $a - b$ is a factor of $a^n - b^n$ for all natural numbers $n$.

**Solution.**
Let $P(n)$ denote the statement $a - b$ is a factor of $a^n - b^n$.

**(1)** For $n = 1$,
$$a^1 - b^1 = a - b.$$
Hence, $a - b$ is a factor of $a^1 - b^1$.
Therefore, the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$a - b \text{ is a factor of } a^k - b^k.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$a - b \text{ is a factor of } a^{k+1} - b^{k+1}.$$
It is proved that,
$$\begin{aligned}
a^{k+1} - b^{k+1} &= a \cdot a^k - b \cdot b^k \\
&= a \cdot a^k - a \cdot b^k + a \cdot b^k - b \cdot b^k \\
&= a(a^k - b^k) + b^k(a - b).
\end{aligned}$$
Since $a - b$ is a factor of $a^k - b^k$ and $a - b$ is a factor of $b^k(a - b)$, $a - b$ is also a factor of $a(a^k - b^k) + b^k(a - b)$.
So, $a - b$ is a factor of $a^{k+1} - b^{k+1}$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Example 7.** Use the mathematical induction principle to prove that $4n < 2^n$ for all natural numbers $n \ge 5$.

**Solution.**
Let $P(n)$ denote the statement $4n < 2^n$.

**(1)** For $n = 5$,
$$\begin{aligned}
\text{L.H.S.} &= 4(5) = 20, \\
\text{R.H.S.} &= 2^5 = 32.
\end{aligned}$$
$$\text{L.H.S.} < \text{R.H.S.}$$
The statement is true for $n = 5$.

**(2)** Assume that the statement is true for $n = k \ge 5$, that is
$$4k < 2^k.$$
We will show that the statement is true for $n = k + 1$, that is we have to show that
$$4(k + 1) < 2^{k+1}.$$
It is proved that,
$$\begin{aligned}
4(k + 1) &= 4k + 4 \\
&< 2^k + 4 \\
&< 2^k + 4k \qquad (\text{since } 4 < 4k) \\
&< 2^k + 2^k \\
&= 2^{k+1}.
\end{aligned}$$
Hence, $4(k + 1) < 2^{k+1}$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \ge 5$.

---

### Exercise 2.1

**1.** Prove the following by using the principle of mathematical induction for all natural numbers $n$.

**(a)**
$$1 + 3 + 3^2 + \cdots + 3^{n-1} = \frac{3^n - 1}{2}.$$

**Solution.**
Let $P(n)$ denote the statement
$$1 + 3 + 3^2 + \cdots + 3^{n-1} = \frac{3^n - 1}{2}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1, \qquad \text{R.H.S.} = \frac{3^1 - 1}{2} = 1.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 + 3 + 3^2 + \cdots + 3^{k-1} = \frac{3^k - 1}{2}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 + 3 + 3^2 + \cdots + 3^{k-1} + 3^k = \frac{3^{k+1} - 1}{2}.$$
It is proved that,
$$\begin{aligned}
1 + 3 + 3^2 + \cdots + 3^{k-1} + 3^k &= \frac{3^k - 1}{2} + 3^k \\
&= \frac{3^k - 1 + 2 \cdot 3^k}{2} \\
&= \frac{3^{k+1} - 1}{2}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(b)** **Method 1**
$$1^3 + 2^3 + 3^3 + \cdots + n^3 = \left(\frac{n(n + 1)}{2}\right)^2.$$

**Solution.**
Let $P(n)$ denote the statement
$$1^3 + 2^3 + 3^3 + \cdots + n^3 = \left(\frac{n(n + 1)}{2}\right)^2.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1^3 = 1, \qquad \text{R.H.S.} = \left(\frac{1(1 + 1)}{2}\right)^2 = 1.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1^3 + 2^3 + 3^3 + \cdots + k^3 = \left(\frac{k(k + 1)}{2}\right)^2.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1^3 + 2^3 + 3^3 + \cdots + k^3 + (k + 1)^3 = \left(\frac{(k + 1)(k + 2)}{2}\right)^2.$$
It is proved that,
$$\begin{aligned}
1^3 + 2^3 + 3^3 + \cdots + k^3 + (k + 1)^3 &= \left(\frac{k(k + 1)}{2}\right)^2 + (k + 1)^3 \\
&= (k + 1)^2\left(\frac{k^2}{4} + k + 1\right) \\
&= (k + 1)^2\left(\frac{(k + 2)^2}{4}\right) \\
&= \left(\frac{(k + 1)(k + 2)}{2}\right)^2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(b)** **Method 2**

**Solution.**
Use denominator adjustment to prove the same result as in Method 1.

**(1)** The base step is the same as in Method 1, so the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1^3 + 2^3 + 3^3 + \cdots + k^3 = \left(\frac{k(k + 1)}{2}\right)^2.$$
Using a common denominator of $4$,
$$\begin{aligned}
1^3 + 2^3 + 3^3 + \cdots + k^3 + (k + 1)^3 &= \left(\frac{k(k + 1)}{2}\right)^2 + (k + 1)^3 \\
&= \frac{k^2(k + 1)^2}{4} + \frac{4(k + 1)^3}{4} \\
&= \frac{(k + 1)^2(k^2 + 4k + 4)}{4} \\
&= \frac{(k + 1)^2(k + 2)^2}{4} \\
&= \left(\frac{(k + 1)(k + 2)}{2}\right)^2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(c)**
$$2^3 + 4^3 + 6^3 + \cdots + (2n)^3 = 2n^2(n + 1)^2.$$

**Solution.**
Let $P(n)$ denote the statement
$$2^3 + 4^3 + 6^3 + \cdots + (2n)^3 = 2n^2(n + 1)^2.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 2^3 = 8, \qquad \text{R.H.S.} = 2(1)^2(1 + 1)^2 = 8.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$2^3 + 4^3 + 6^3 + \cdots + (2k)^3 = 2k^2(k + 1)^2.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$2^3 + 4^3 + 6^3 + \cdots + (2k)^3 + (2k + 2)^3 = 2(k + 1)^2(k + 2)^2.$$
It is proved that,
$$\begin{aligned}
2^3 + 4^3 + 6^3 + \cdots + (2k)^3 + (2k + 2)^3 &= 2k^2(k + 1)^2 + 8(k + 1)^3 \\
&= 2(k + 1)^2(k^2 + 4k + 4) \\
&= 2(k + 1)^2(k + 2)^2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(d)**
$$1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + n(n + 1) = \frac{n(n + 1)(n + 2)}{3}.$$

**Solution.**
Let $P(n)$ denote the statement
$$1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + n(n + 1) = \frac{n(n + 1)(n + 2)}{3}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1 \cdot 2 = 2, \qquad \text{R.H.S.} = \frac{1(1 + 1)(1 + 2)}{3} = 2.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + k(k + 1) = \frac{k(k + 1)(k + 2)}{3}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + k(k + 1) + (k + 1)(k + 2) = \frac{(k + 1)(k + 2)(k + 3)}{3}.$$
It is proved that,
$$\begin{aligned}
&\left(1 \cdot 2 + 2 \cdot 3 + 3 \cdot 4 + \cdots + k(k + 1)\right) + (k + 1)(k + 2) \\
&= \frac{k(k + 1)(k + 2)}{3} + (k + 1)(k + 2) \\
&= (k + 1)(k + 2)\left(\frac{k}{3} + 1\right) \\
&= \frac{(k + 1)(k + 2)(k + 3)}{3}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(e)**
$$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^n} = 1 - \frac{1}{2^n}.$$

**Solution.**
Let $P(n)$ denote the statement
$$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^n} = 1 - \frac{1}{2^n}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = \frac{1}{2}, \qquad \text{R.H.S.} = 1 - \frac{1}{2} = \frac{1}{2}.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^k} = 1 - \frac{1}{2^k}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^k} + \frac{1}{2^{k+1}} = 1 - \frac{1}{2^{k+1}}.$$
It is proved that,
$$\begin{aligned}
\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots + \frac{1}{2^k} + \frac{1}{2^{k+1}} &= \left(1 - \frac{1}{2^k}\right) + \frac{1}{2^{k+1}} \\
&= 1 - \frac{2}{2^{k+1}} + \frac{1}{2^{k+1}} \\
&= 1 - \frac{1}{2^{k+1}}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(f)**
$$1 + 2 + 2^2 + \cdots + 2^{n-1} = 2^n - 1.$$

**Solution.**
Let $P(n)$ denote the statement
$$1 + 2 + 2^2 + \cdots + 2^{n-1} = 2^n - 1.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = 1, \qquad \text{R.H.S.} = 2^1 - 1 = 1.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$1 + 2 + 2^2 + \cdots + 2^{k-1} = 2^k - 1.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$1 + 2 + 2^2 + \cdots + 2^{k-1} + 2^k = 2^{k+1} - 1.$$
It is proved that,
$$\begin{aligned}
1 + 2 + 2^2 + \cdots + 2^{k-1} + 2^k &= (2^k - 1) + 2^k \\
&= 2 \cdot 2^k - 1 \\
&= 2^{k+1} - 1.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**(g)**
$$\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \cdots + \frac{1}{n(n + 1)} = \frac{n}{n + 1}.$$

**Solution.**
Let $P(n)$ denote the statement
$$\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \cdots + \frac{1}{n(n + 1)} = \frac{n}{n + 1}.$$

**(1)** For $n = 1$,
$$\text{L.H.S.} = \frac{1}{1 \cdot 2} = \frac{1}{2}, \qquad \text{R.H.S.} = \frac{1}{1 + 1} = \frac{1}{2}.$$
$$\text{L.H.S.} = \text{R.H.S.}$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \cdots + \frac{1}{k(k + 1)} = \frac{k}{k + 1}.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \cdots + \frac{1}{k(k + 1)} + \frac{1}{(k + 1)(k + 2)} = \frac{k + 1}{k + 2}.$$
It is proved that,
$$\begin{aligned}
\left(\frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \cdots + \frac{1}{k(k + 1)}\right) + \frac{1}{(k + 1)(k + 2)} &= \frac{k}{k + 1} + \frac{1}{(k + 1)(k + 2)} \\
&= \frac{k(k + 2) + 1}{(k + 1)(k + 2)} \\
&= \frac{(k + 1)^2}{(k + 1)(k + 2)} \\
&= \frac{k + 1}{k + 2}.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**2.** Prove that $3$ is a factor of $4^n - 1$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $3$ is a factor of $4^n - 1$.

**(1)** For $n = 1$,
$$4^1 - 1 = 3,$$
So, $3$ is a factor of $4^1 - 1$.
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$3 \text{ is a factor of } 4^k - 1.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$3 \text{ is a factor of } 4^{k+1} - 1.$$
It is proved that,
$$\begin{aligned}
4^{k+1} - 1 &= 4 \cdot 4^k - 1 \\
&= 4 \cdot 4^k - 4 + 3 \\
&= 4(4^k - 1) + 3.
\end{aligned}$$
Since $3$ is a factor of $4^k - 1$ and $3$ is a factor of $3$, $3$ is a factor of $4(4^k - 1) + 3$.
So, $3$ is a factor of $4^{k+1} - 1$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**3.** Prove that $n^3 - n + 3$ is divisible by $3$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $n^3 - n + 3$ is divisible by $3$.

**(1)** For $n = 1$, $1^3 - 1 + 3 = 3$, which is divisible by $3$.
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$k^3 - k + 3 \text{ is divisible by } 3.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$(k + 1)^3 - (k + 1) + 3 \text{ is divisible by } 3.$$
It is proved that,
$$\begin{aligned}
(k + 1)^3 - (k + 1) + 3 &= k^3 + 3k^2 + 3k + 1 - k - 1 + 3 \\
&= (k^3 - k + 3) + 3k^2 + 3k \\
&= (k^3 - k + 3) + 3(k^2 + k).
\end{aligned}$$
Since $k^3 - k + 3$ is divisible by $3$ and $3(k^2 + k)$ is also divisible by $3$, $(k^3 - k + 3) + 3(k^2 + k)$ is divisible by $3$.
So, $(k + 1)^3 - (k + 1) + 3$ is also divisible by $3$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**4.** Prove that $3^{2n} - 1$ is divisible by $8$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $3^{2n} - 1$ is divisible by $8$.

**(1)** For $n = 1$, $3^{2 \cdot 1} - 1 = 3^2 - 1 = 9 - 1 = 8$, which is divisible by $8$.
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$3^{2k} - 1 \text{ is divisible by } 8.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$3^{2(k+1)} - 1 \text{ is divisible by } 8.$$
It is proved that,
$$\begin{aligned}
3^{2(k+1)} - 1 &= 3^{2k+2} - 1 \\
&= 9 \cdot 3^{2k} - 1 \\
&= 9 \cdot 3^{2k} - 9 + 8 \\
&= 9(3^{2k} - 1) + 8.
\end{aligned}$$
Since $3^{2k} - 1$ is divisible by $8$ and $8$ is divisible by $8$, $9(3^{2k} - 1) + 8$ is also divisible by $8$.
So, $3^{2(k+1)} - 1$ is also divisible by $8$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**5.** Prove that $(n + 1)^2 < 2n^2$ for all natural numbers $n \ge 3$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $(n + 1)^2 < 2n^2$ for $n \ge 3$.

**(1)** For $n = 3$,
$$(3 + 1)^2 = 16 < 18 = 2 \cdot 3^2.$$
The statement is true for $n = 3$.

**(2)** Assume that the statement is true for $n = k \ge 3$, that is
$$(k + 1)^2 < 2k^2.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$((k + 1) + 1)^2 < 2(k + 1)^2.$$
It is proved that,
$$\begin{aligned}
((k + 1) + 1)^2 &= (k + 1)^2 + 2k + 3 \\
&< 2k^2 + 2k + 3 \\
&< 2k^2 + 4k + 2 \qquad (\text{since } 2k + 3 < 4k + 2,\; k \ge 3) \\
&= 2(k + 1)^2.
\end{aligned}$$
So, $((k + 1) + 1)^2 < 2(k + 1)^2$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n \ge 3$.

**6.** Prove that $2n + 7 < (n + 3)^2$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $2n + 7 < (n + 3)^2$.

**(1)** For $n = 1$,
$$2 \cdot 1 + 7 = 9 < 16 = (1 + 3)^2.$$
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$2k + 7 < (k + 3)^2.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$2(k + 1) + 7 < ((k + 1) + 3)^2.$$
It is proved that,
$$\begin{aligned}
2(k + 1) + 7 &= 2k + 2 + 7 \\
&= (2k + 7) + 2 \\
&< (k + 3)^2 + 2 \\
&= k^2 + 6k + 9 + 2 \\
&< k^2 + 6k + 9 + 2k + 7 \qquad (\text{since } 2 < 2k + 7) \\
&= k^2 + 8k + 16 \\
&= (k + 4)^2 \\
&= ((k + 1) + 3)^2.
\end{aligned}$$
So, $2(k + 1) + 7 < ((k + 1) + 3)^2$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**7.** Prove that $x^{2n} - y^{2n}$ is divisible by $x + y$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $x^{2n} - y^{2n}$ is divisible by $x + y$.

**(1)** For $n = 1$, $x^{2 \cdot 1} - y^{2 \cdot 1} = x^2 - y^2 = (x + y)(x - y)$, which is divisible by $x + y$.
The statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is
$$x^{2k} - y^{2k} \text{ is divisible by } x + y.$$
We will show that the statement is true for $n = k + 1$, that is we have to prove that
$$x^{2(k+1)} - y^{2(k+1)} \text{ is divisible by } x + y.$$
It is proved that,
$$\begin{aligned}
x^{2(k+1)} - y^{2(k+1)} &= x^{2k+2} - y^{2k+2} \\
&= x^2 x^{2k} - y^2 y^{2k} \\
&= x^2 x^{2k} - x^2 y^{2k} + x^2 y^{2k} - y^2 y^{2k} \\
&= x^2(x^{2k} - y^{2k}) + y^{2k}(x^2 - y^2).
\end{aligned}$$
Since $x^{2k} - y^{2k}$ is divisible by $x + y$ and $y^{2k}(x^2 - y^2)$ is divisible by $x + y$, $x^2(x^{2k} - y^{2k}) + y^{2k}(x^2 - y^2)$ is also divisible by $x + y$.
So, $x^{2(k+1)} - y^{2(k+1)}$ is also divisible by $x + y$.
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

---

### Old Questions

**Old Question 1.** Consider the sequence of real numbers defined by
$$x_1 = 1, \qquad x_{n+1} = \sqrt{1 + 2x_n}, \qquad n \ge 1.$$
Prove that $x_n < 4$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $x_n < 4$.

**(1)** For $n = 1$,
$$x_1 = 1 < 4.$$
Hence, the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$x_k < 4.$$
We will show that
$$x_{k+1} < 4.$$
It is proved that,
$$\begin{aligned}
x_{k+1} &= \sqrt{1 + 2x_k} \\
&< \sqrt{1 + 2 \cdot 4} \\
&= \sqrt{9} \\
&= 3 \\
&< 4.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Old Question 2.** Given that $T(0) = 0$ and $T(n) = 2T(n - 1) + 1$ for $n = 1, 2, 3, \dots$, prove that $T(n) = 2^n - 1$ for all natural numbers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $T(n) = 2^n - 1$.

**(1)** For $n = 1$,
$$T(1) = 2T(0) + 1 = 2 \cdot 0 + 1 = 1 = 2^1 - 1.$$
Hence, the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$T(k) = 2^k - 1.$$
We will show that
$$T(k + 1) = 2^{k+1} - 1.$$
It is proved that,
$$\begin{aligned}
T(k + 1) &= 2T(k) + 1 \\
&= 2(2^k - 1) + 1 \\
&= 2^{k+1} - 2 + 1 \\
&= 2^{k+1} - 1.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

**Old Question 3.** Given that $U_1 = 3$ and $U_{n+1} = 5U_n - 8$ for $n = 1, 2, 3, \dots$, prove that $U_n = 5^{n-1} + 2$ for all positive integers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $U_n = 5^{n-1} + 2$.

**(1)** For $n = 1$,
$$U_1 = 3 = 5^{1-1} + 2 = 5^0 + 2 = 1 + 2 = 3.$$
Hence, the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$U_k = 5^{k-1} + 2.$$
We will show that
$$U_{k+1} = 5^k + 2.$$
It is proved that,
$$\begin{aligned}
U_{k+1} &= 5U_k - 8 \\
&= 5(5^{k-1} + 2) - 8 \\
&= 5^k + 10 - 8 \\
&= 5^k + 2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all positive integers $n$.

**Old Question 4.** Given that $U_1 = 1$ and $U_{n+1} = 3U_n + 4$ for $n = 1, 2, 3, \dots$, prove that $U_n = 3^n - 2$ for all positive integers $n$ by using mathematical induction.

**Solution.**
Let $P(n)$ denote the statement $U_n = 3^n - 2$.

**(1)** For $n = 1$,
$$U_1 = 1 = 3^1 - 2 = 3 - 2 = 1.$$
Hence, the statement is true for $n = 1$.

**(2)** Assume that the statement is true for $n = k$, that is,
$$U_k = 3^k - 2.$$
We will show that
$$U_{k+1} = 3^{k+1} - 2.$$
It is proved that,
$$\begin{aligned}
U_{k+1} &= 3U_k + 4 \\
&= 3(3^k - 2) + 4 \\
&= 3^{k+1} - 6 + 4 \\
&= 3^{k+1} - 2.
\end{aligned}$$
Therefore, the statement is true for $n = k + 1$.

**(3)** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural integers $n$.
`;
