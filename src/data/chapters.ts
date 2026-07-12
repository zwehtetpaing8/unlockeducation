import { Chapter } from '../types';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Complex Numbers",
    tagline: "Extending the real number system to solve equations with negative roots.",
    description: "In this chapter, you will learn about the imaginary unit $i = \\sqrt{-1}$, Cartesian and coordinate forms, division rules, trigonometric (polar) representation, De Moivre's formula, and finding complex roots.",
    content: `### Introduction: Why do we need complex numbers?
In real numbers, an equation like $x^2 = 4$ has answers $x = 2$ and $x = -2$. But the equation:
$$x^2 = -4$$
has no real answer, because the square of any real number is never negative. To solve this kind of problem, mathematicians introduced a new number called the **imaginary unit**, written as $i$, where:
$$i^2 = -1 \\quad \\text{and} \\quad \\sqrt{-1} = i$$
Therefore, $\\sqrt{-4} = 2i$.

#### Mathematicians who made complex numbers useful
[DIAGRAM: MathematicianTimeline]

These mathematicians changed "impossible" square roots into a useful number system.

---

### 1.1 Pure Imaginary Unit $i$
**Motivation:** Consider the equation $x^2 + 4 = 0$. It is equivalent to $x^2 = -4$. In the real number system, this equation has no solution, since the square of a real number cannot be negative.

**Definition (Pure imaginary unit):** The pure imaginary unit is denoted by $i$ and is defined by:
$$i = \\sqrt{-1}, \\quad i^2 = -1$$

This new symbol allows us to work with square roots of negative numbers.

**Concept check.** Solve the equation $x^2 + 4 = 0$.
**Solution.** From $x^2 + 4 = 0$, we get:
$$x^2 = -4$$
$$x^2 = 4(-1)$$
$$x^2 = 4i^2$$
$$x^2 = (\\pm\\sqrt{4}i)^2$$
Therefore,
$$x = \\pm 2i$$

**Pattern Recognition.** The same idea can be used for other negative numbers:
- $x^2 = -9 \\implies x^2 = (\\pm\\sqrt{9}i)^2 \\implies x = \\pm 3i$
- $x^2 = -16 \\implies x^2 = (\\pm\\sqrt{16}i)^2 \\implies x = \\pm 4i$
- $x^2 = -81 \\implies x^2 = (\\pm\\sqrt{81}i)^2 \\implies x = \\pm 9i$
- $x^2 = -7 \\implies x^2 = (\\pm\\sqrt{7}i)^2 \\implies x = \\pm\\sqrt{7}i$

**General rule.** For any positive real number $n$,
$$-n = n(-1) = ni^2 = (\\pm\\sqrt{n}i)^2$$
Therefore, if $x^2 = -n$, then:
$$x = \\pm\\sqrt{n}i$$

#### Solved Examples: Solving Quadratic Equations via Perfect Squares
**Example 1.** Solve $x^2 - 2x + 5 = 0$.
**Solution.**
1. Move the constant term to the R.H.S.:
   $$x^2 - 2x = -5$$
2. Complete the square on the L.H.S. by adding the square of half the $x$-coefficient $(-\\frac{2}{2})^2 = 1$ to both sides:
   $$x^2 - 2x + 1 = -5 + 1$$
   $$(x - 1)^2 = -4$$
3. Take square roots:
   $$x - 1 = \\pm 2i$$
4. Solve for $x$:
   $$x = 1 \\pm 2i$$

**Example 2.** Solve $x^2 + 2x + 3 = 0$ and check your answer.
**Solution.**
1. Move the constant term to the R.H.S.:
   $$x^2 + 2x = -3$$
2. Complete the square by adding 1 to both sides:
   $$x^2 + 2x + 1 = -3 + 1$$
   $$(x + 1)^2 = -2$$
3. Take square roots:
   $$x + 1 = \\pm\\sqrt{2}i$$
4. Solve for $x$:
   $$x = -1 \\pm \\sqrt{2}i$$

**Check.**
- For $x = -1 + \\sqrt{2}i$:
  $$\\begin{aligned}
  x^2 + 2x + 3 &= (-1 + \\sqrt{2}i)^2 + 2(-1 + \\sqrt{2}i) + 3 \\\\
  &= (1 - 2\\sqrt{2}i - 2) - 2 + 2\\sqrt{2}i + 3 \\\\
  &= 0
  \\end{aligned}$$
- For $x = -1 - \\sqrt{2}i$:
  $$\\begin{aligned}
  x^2 + 2x + 3 &= (-1 - \\sqrt{2}i)^2 + 2(-1 - \\sqrt{2}i) + 3 \\\\
  &= (1 + 2\\sqrt{2}i - 2) - 2 - 2\\sqrt{2}i + 3 \\\\
  &= 0
  \\end{aligned}$$

#### Powers of the Pure Imaginary Unit $i$
Let's find the values of $i^n$ for every positive integer $n$:
- $i^0 = 1$
- $i^1 = i$
- $i^2 = -1$
- $i^3 = i^2 \\cdot i = -i$
- $i^4 = i^2 \\cdot i^2 = 1$
- $i^5 = i^4 \\cdot i = i$
- $i^6 = i^4 \\cdot i^2 = -1$
- $i^7 = i^4 \\cdot i^3 = -i$
- $i^8 = i^4 \\cdot i^4 = 1$

**General rule for powers:**
- If $n$ is divisible by 4 (remainder = 0), then $i^n = 1$.
- If $n$ divided by 4 leaves remainder 1, then $i^n = i$.
- If $n$ divided by 4 leaves remainder 2, then $i^n = -1$.
- If $n$ divided by 4 leaves remainder 3, then $i^n = -i$.

**Note. Sum of four consecutive powers.**
Any four consecutive powers of $i$ have sum 0. For example,
- $i^0 + i^1 + i^2 + i^3 = 1 + i - 1 - i = 0$
- $i^1 + i^2 + i^3 + i^4 = i - 1 - i + 1 = 0$
- $i^2 + i^3 + i^4 + i^5 = -1 - i + 1 + i = 0$

---

### Exercise 1.1 Solutions
**1. Solve the following equations.**
- **(a) $x^2 - 6x + 10 = 0$**
  **Solution.**
  $$\\begin{aligned}
  x^2 - 6x &= -10 \\\\
  x^2 - 6x + 9 &= -10 + 9 \\\\
  (x - 3)^2 &= -1 \\\\
  x - 3 &= \\pm i \\\\
  x &= 3 \\pm i
  \\end{aligned}$$

- **(b) $-2x^2 + 4x - 3 = 0$**
  **Solution.** Divide by $-2$:
  $$\\begin{aligned}
  x^2 - 2x + \\frac{3}{2} &= 0 \\\\
  x^2 - 2x &= -\\frac{3}{2} \\\\
  x^2 - 2x + 1 &= -\\frac{3}{2} + 1 \\\\
  (x - 1)^2 &= -\\frac{1}{2} \\\\
  x - 1 &= \\pm\\frac{\\sqrt{2}}{2}i \\\\
  x &= 1 \\pm \\frac{\\sqrt{2}}{2}i
  \\end{aligned}$$

- **(c) $5x^2 - 2x + 1 = 0$**
  **Solution.** Divide by 5:
  $$\\begin{aligned}
  x^2 - \\frac{2}{5}x &= -\\frac{1}{5} \\\\
  x^2 - \\frac{2}{5}x + \\frac{1}{25} &= -\\frac{1}{5} + \\frac{1}{25} \\\\
  \\left(x - \\frac{1}{5}\\right)^2 &= -\\frac{4}{25} \\\\
  x - \\frac{1}{5} &= \\pm\\frac{2}{5}i \\\\
  x &= \\frac{1}{5} \\pm \\frac{2}{5}i
  \\end{aligned}$$

- **(d) $3x^2 + 7x + 5 = 0$**
  **Solution.** Divide by 3:
  $$\\begin{aligned}
  x^2 + \\frac{7}{3}x &= -\\frac{5}{3} \\\\
  x^2 + \\frac{7}{3}x + \\frac{49}{36} &= -\\frac{5}{3} + \\frac{49}{36} \\\\
  \\left(x + \\frac{7}{6}\\right)^2 &= -\\frac{11}{36} \\\\
  x + \\frac{7}{6} &= \\pm\\frac{\\sqrt{11}}{6}i \\\\
  x &= -\\frac{7}{6} \\pm \\frac{\\sqrt{11}}{6}i
  \\end{aligned}$$

**2. Solve the following equations and check your answers.**
- **(a) $x^2 - 2x + 4 = 0$**
  **Solution.**
  $$\\begin{aligned}
  x^2 - 2x &= -4 \\\\
  x^2 - 2x + 1 &= -4 + 1 \\\\
  (x - 1)^2 &= -3 \\\\
  x - 1 &= \\pm\\sqrt{3}i \\\\
  x &= 1 \\pm \\sqrt{3}i
  \\end{aligned}$$
  **Check.**
  - For $x = 1 + \\sqrt{3}i$:
    $$\\begin{aligned}
    (1 + \\sqrt{3}i)^2 - 2(1 + \\sqrt{3}i) + 4 &= (1 + 2\\sqrt{3}i - 3) - 2 - 2\\sqrt{3}i + 4 \\\\
    &= 0 \\quad (\\text{OK})
    \\end{aligned}$$
  - For $x = 1 - \\sqrt{3}i$:
    $$\\begin{aligned}
    (1 - \\sqrt{3}i)^2 - 2(1 - \\sqrt{3}i) + 4 &= (1 - 2\\sqrt{3}i - 3) - 2 + 2\\sqrt{3}i + 4 \\\\
    &= 0 \\quad (\\text{OK})
    \\end{aligned}$$

- **(b) $x^2 - 4x + 5 = 0$**
  **Solution.**
  $$\\begin{aligned}
  x^2 - 4x &= -5 \\\\
  x^2 - 4x + 4 &= -5 + 4 \\\\
  (x - 2)^2 &= -1 \\\\
  x - 2 &= \\pm i \\\\
  x &= 2 \\pm i
  \\end{aligned}$$
  **Check.**
  - For $x = 2 + i$:
    $$\\begin{aligned}
    (2 + i)^2 - 4(2 + i) + 5 &= (4 + 4i - 1) - 8 - 4i + 5 \\\\
    &= 0 \\quad (\\text{OK})
    \\end{aligned}$$
  - For $x = 2 - i$:
    $$\\begin{aligned}
    (2 - i)^2 - 4(2 - i) + 5 &= (4 - 4i - 1) - 8 + 4i + 5 \\\\
    &= 0 \\quad (\\text{OK})
    \\end{aligned}$$

**3. Find the value of $i^n$ for every positive integer $n$.**
*See general power rules above.*

---

### 1.2 Complex Numbers
#### Cartesian or Regular Form of Complex Numbers $(x + yi)$
A complex number is formed by adding a real number and an imaginary number.
$$\\text{Complex number} = \\text{Real number} + \\text{Imaginary number}$$

The Cartesian or regular form of a complex number is:
$$z = x + yi \\quad (x, y \\in \\mathbb{R})$$

**Parts of $z = x + yi$:**
In $z = x + yi$, both $x$ and $y$ are real numbers.
- The real number is $x$. The real part is $x$; we write $\\text{Re}(z) = x$.
- The imaginary term is $yi$, and the imaginary part is its coefficient $y$; we write $\\text{Im}(z) = y$.

**Imaginary Numbers and the Pure Imaginary Unit:**
An imaginary number is a real number multiplied by the pure imaginary unit $i$.
$$\\text{Imaginary number} = \\text{Real number} \\times i$$

Examples: $4i$, $7i$, $\\sqrt{8}i$.

#### Rules and Examples for Cartesian Operations
Let $z_1 = x_1 + y_1 i$ and $z_2 = x_2 + y_2 i$, where $x_1, y_1, x_2, y_2 \\in \\mathbb{R}$.

1. **Equality Rule:**
   $$z_1 = z_2 \\iff x_1 = x_2 \\quad \\text{and} \\quad y_1 = y_2$$
   *Example:* If $x + 2i = 5 + yi$, find $x$ and $y$.
   $$x + 2i = 5 + yi \\implies x = 5 \\quad \\text{and} \\quad y = 2$$

2. **Sum Rule:**
   $$z_1 + z_2 = (x_1 + x_2) + (y_1 + y_2)i$$
   *Example:* Find $(3 + 2i) + (5 - 7i)$.
   $$(3 + 2i) + (5 - 7i) = (3 + 5) + (2 - 7)i = 8 - 5i$$

3. **Subtraction Rule:**
   $$z_1 - z_2 = (x_1 - x_2) + (y_1 - y_2)i$$
   *Example:* Find $(4 - 3i) - (1 + 6i)$.
   $$(4 - 3i) - (1 + 6i) = (4 - 1) + (-3 - 6)i = 3 - 9i$$

4. **Product Rule:**
   $$z_1 z_2 = (x_1 x_2 - y_1 y_2) + (x_1 y_2 + x_2 y_1)i$$
   *Example:* Find $(2 + 3i)(4 - i)$.
   $$(2 + 3i)(4 - i) = (2 \\cdot 4 - 3 \\cdot (-1)) + (2(-1) + 4(3))i = (8 + 3) + (-2 + 12)i = 11 + 10i$$

#### Coordinate Form of Complex Numbers $(x, y)$
$$\\text{Complex number} = (\\text{Real Part}, \\text{Imaginary Part})$$

Examples: $(3, 4)$, $(2, \\sqrt{6})$, $(5, 9)$.

**Rules in Coordinate Form:**
Let $z_1 = (x_1, y_1)$ and $z_2 = (x_2, y_2)$.
1. **Equality Rule:**
   $$(x_1, y_1) = (x_2, y_2) \\iff x_1 = x_2, \\quad y_1 = y_2$$
2. **Sum Rule:**
   $$(x_1, y_1) + (x_2, y_2) = (x_1 + x_2, y_1 + y_2)$$
3. **Subtraction Rule:**
   $$(x_1, y_1) - (x_2, y_2) = (x_1 - x_2, y_1 - y_2)$$
4. **Product Rule:**
   $$(x_1, y_1)(x_2, y_2) = (x_1 x_2 - y_1 y_2, \\, x_1 y_2 + x_2 y_1)$$

*Note:* All real numbers can be considered as complex numbers with imaginary part 0:
- $x \\leftrightarrow (x, 0)$
- $y \\leftrightarrow (y, 0)$
- $x + y \\leftrightarrow (x, 0) + (y, 0)$
- $xy \\leftrightarrow (x, 0)(y, 0)$

Since $(0, 1)(0, 1) = (0 - 1, \\, 0 + 0) = (-1, 0) = -1$, and $i^2 = -1$:
$$i = (0, 1) = 0 + i$$
$$i^2 = i \\cdot i = (0, 1)(0, 1) = -1$$
$$x + yi = (x, 0) + (y, 0)(0, 1) = (x, 0) + (0, y) = (x, y)$$

**Example 3.** Compute $(-2, 3)(1, -2) + (1, 1)(0, 1)$.
**Method 1. Coordinate form**
  $$\\begin{aligned}
  (-2, 3)(1, -2) + (1, 1)(0, 1) &= (-2 - (-6), \\, 4 + 3) + (0 - 1, \\, 1 + 0) \\\\
  &= (4, 7) + (-1, 1) \\\\
  &= (3, 8)
  \\end{aligned}$$

**Method 2. Cartesian form**
  $$\\begin{aligned}
  (-2, 3)(1, -2) + (1, 1)(0, 1) &= (-2 + 3i)(1 - 2i) + (1 + i)i \\\\
  &= (-2 + 4i + 3i - 6i^2) + (i + i^2) \\\\
  &= (4 + 7i) + (-1 + i) \\\\
  &= 3 + 8i \\leftrightarrow (3, 8)
  \\end{aligned}$$

---

### Exercise 1.2 Solutions
**1. Compute.**
- **(a) $(2, 0)(2, 5) + (3, -2)(0, 1)$**
  **Solution.**
  $$\\begin{aligned}
  (2, 0)(2, 5) + (3, -2)(0, 1) &= (4 - 0, \\, 10 + 0) + (0 - (-2), \\, 3 + 0) \\\\
  &= (4, 10) + (2, 3) \\\\
  &= (6, 13)
  \\end{aligned}$$

- **(b) $(2, -5)(-1, 0) + (1, 0)(5, 1)$**
  **Solution.**
  $$\\begin{aligned}
  (2, -5)(-1, 0) + (1, 0)(5, 1) &= (-2 - 0, \\, 0 + 5) + (5 - 0, \\, 1 + 0) \\\\
  &= (-2, 5) + (5, 1) \\\\
  &= (3, 6)
  \\end{aligned}$$

- **(c) $(-3, -2)(-2, -3) + (-2, -3)(-3, -2)$**
  **Solution.**
  $$\\begin{aligned}
  (-3, -2)(-2, -3) + (-2, -3)(-3, -2) &= (6 - 6, \\, 9 + 4) + (6 - 6, \\, 4 + 9) \\\\
  &= (0, 13) + (0, 13) \\\\
  &= (0, 26)
  \\end{aligned}$$

- **(d) $(1, 0)(0, 1) + (0, 1)(1, 0)$**
  **Solution.**
  $$\\begin{aligned}
  (1, 0)(0, 1) + (0, 1)(1, 0) &= (0 - 0, \\, 1 + 0) + (0 - 0, \\, 0 + 1) \\\\
  &= (0, 1) + (0, 1) \\\\
  &= (0, 2)
  \\end{aligned}$$

**2. Compute.**
- **(a) $(3 + 2i)(3 - 2i) + (-5 + 7i)(-1 - i)$**
  **Solution.**
  $$\\begin{aligned}
  (3 + 2i)(3 - 2i) + (-5 + 7i)(-1 - i) &= (9 - 6i + 6i - 4i^2) + (5 + 5i - 7i - 7i^2) \\\\
  &= 13 + (12 - 2i) \\\\
  &= 25 - 2i
  \\end{aligned}$$

- **(b) $(-1 + i)(1 - i) + (2 + 3i)$**
  **Solution.**
  $$\\begin{aligned}
  (-1 + i)(1 - i) + (2 + 3i) &= -1 + i + i - i^2 + 2 + 3i \\\\
  &= 2i + 2 + 3i \\\\
  &= 2 + 5i
  \\end{aligned}$$

- **(c) $(1 + i)(1 - i) + (-2 + i)(-2 + i)$**
  **Solution.**
  $$\\begin{aligned}
  (1 + i)(1 - i) + (-2 + i)(-2 + i) &= (1 - i + i - i^2) + (4 - 2i - 2i + i^2) \\\\
  &= 2 + (3 - 4i) \\\\
  &= 5 - 4i
  \\end{aligned}$$

- **(d) $(3 + 2i) + (7 - i)(-3 + 3i)$**
  **Solution.**
  $$\\begin{aligned}
  (3 + 2i) + (7 - i)(-3 + 3i) &= 3 + 2i + (-21 + 21i + 3i - 3i^2) \\\\
  &= 3 + 2i + (-18 + 24i) \\\\
  &= -15 + 26i
  \\end{aligned}$$

---

### 1.3 Operations on Complex Numbers
#### Division of Complex Numbers
To divide by a complex number, multiply both numerator and denominator by the **conjugate** of the denominator.

**Conjugate $\\bar{z}$:**
If $z = x + yi$, then the conjugate of $z$ is written as $\\bar{z}$, where:
$$\\bar{z} = x - yi$$
$$z\\bar{z} = (x + yi)(x - yi) = x^2 + y^2$$
This makes the denominator a real number.

**Division Rule:**
Let $z_1 = x_1 + y_1 i$ and $z_2 = x_2 + y_2 i$, where $z_2 \\neq 0$. Then $\\bar{z}_2 = x_2 - y_2 i$.
$$\\frac{z_1}{z_2} = \\frac{z_1}{z_2} \\cdot \\frac{\\bar{z}_2}{\\bar{z}_2} = \\frac{(x_1 + y_1 i)(x_2 - y_2 i)}{(x_2 + y_2 i)(x_2 - y_2 i)} = \\frac{x_1 x_2 + y_1 y_2}{x_2^2 + y_2^2} + \\frac{x_2 y_1 - x_1 y_2}{x_2^2 + y_2^2}i$$

**Example 4.** Calculate $\\frac{2 + 3i}{3 + i}$.
**Solution.**
  $$\\begin{aligned}
  \\frac{2 + 3i}{3 + i} &= \\frac{(2 + 3i)(3 - i)}{(3 + i)(3 - i)} \\\\
  &= \\frac{6 - 2i + 9i - 3i^2}{9 - i^2} \\\\
  &= \\frac{9 + 7i}{10} \\\\
  &= \\frac{9}{10} + \\frac{7}{10}i
  \\end{aligned}$$

#### Reciprocal of a Complex Number
Let $z = x + yi$ and $z \\neq 0$. Find $\\frac{1}{z}$:
  $$\\begin{aligned}
  \\frac{1}{z} &= \\frac{1}{x + yi} \\\\
  &= \\frac{1}{x + yi} \\cdot \\frac{x - yi}{x - yi} \\\\
  &= \\frac{x - yi}{(x + yi)(x - yi)} \\\\
  &= \\frac{x}{x^2 + y^2} - \\frac{y}{x^2 + y^2}i
  \\end{aligned}$$

Let's compute $z\\left(\\frac{1}{z}\\right)$:
  $$\\begin{aligned}
  z\\left(\\frac{1}{z}\\right) &= (x + yi)\\left(\\frac{x - yi}{x^2 + y^2}\\right) \\\\
  &= \\frac{(x + yi)(x - yi)}{x^2 + y^2} \\\\
  &= \\frac{x^2 + y^2}{x^2 + y^2} \\\\
  &= 1
  \\end{aligned}$$

Therefore, for a non-zero complex number $z$, $\\frac{1}{z}$ is the multiplicative inverse of $z$ and is denoted by $z^{-1}$.

---

### Exercise 1.3 Solutions
**1. Let $z_1 = -2 + 3i$ and $z_2 = 5 + 2i$. Compute.**
- **(a) $z_1^2 - 2z_1 + 1$**
  **Solution.**
  $$\\begin{aligned}
  z_1^2 - 2z_1 + 1 &= (-2 + 3i)^2 - 2(-2 + 3i) + 1 \\\\
  &= (4 - 12i + 9i^2) + (4 - 6i) + 1 \\\\
  &= (4 - 9 + 4 + 1) + (-12i - 6i) \\\\
  &= -18i
  \\end{aligned}$$

- **(b) $3z_2^2 + 2z_2 - 1$**
  **Solution.**
  $$\\begin{aligned}
  3z_2^2 + 2z_2 - 1 &= 3(5 + 2i)^2 + 2(5 + 2i) - 1 \\\\
  &= 3(25 + 20i + 4i^2) + 10 + 4i - 1 \\\\
  &= 3(21 + 20i) + 9 + 4i \\\\
  &= 63 + 60i + 9 + 4i \\\\
  &= 72 + 64i
  \\end{aligned}$$

- **(c) $z_1\\bar{z}_2 + z_2\\bar{z}_1$**
  **Solution.**
  $$\\begin{aligned}
  z_1\\bar{z}_2 + z_2\\bar{z}_1 &= (-2 + 3i)(5 - 2i) + (5 + 2i)(-2 - 3i) \\\\
  &= (-10 + 4i + 15i - 6i^2) + (-10 - 15i - 4i - 6i^2) \\\\
  &= (-4 + 19i) + (-4 - 19i) \\\\
  &= -8
  \\end{aligned}$$

- **(d) $\\frac{1}{z_1}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{1}{z_1} &= \\frac{1}{-2 + 3i} \\\\
  &= \\frac{1}{-2 + 3i} \\cdot \\frac{-2 - 3i}{-2 - 3i} \\\\
  &= \\frac{-2 - 3i}{(-2)^2 + 3^2} \\\\
  &= -\\frac{2}{13} - \\frac{3}{13}i
  \\end{aligned}$$

- **(e) $\\frac{1}{z_2}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{1}{z_2} &= \\frac{1}{5 + 2i} \\\\
  &= \\frac{1}{5 + 2i} \\cdot \\frac{5 - 2i}{5 - 2i} \\\\
  &= \\frac{5 - 2i}{5^2 + 2^2} \\\\
  &= \\frac{5}{29} - \\frac{2}{29}i
  \\end{aligned}$$

- **(f) $\\frac{1}{z_1 z_2}$**
  **Solution.** First compute $z_1 z_2$:
  $$\\begin{aligned}
  z_1 z_2 &= (-2 + 3i)(5 + 2i) \\\\
  &= -10 - 4i + 15i + 6i^2 \\\\
  &= -16 + 11i
  \\end{aligned}$$
  Now compute $\\frac{1}{z_1 z_2}$:
  $$\\begin{aligned}
  \\frac{1}{z_1 z_2} &= \\frac{1}{-16 + 11i} \\\\
  &= \\frac{1}{-16 + 11i} \\cdot \\frac{-16 - 11i}{-16 - 11i} \\\\
  &= \\frac{-16 - 11i}{(-16)^2 + 11^2} \\\\
  &= -\\frac{16}{377} - \\frac{11}{377}i
  \\end{aligned}$$

- **(g) $\\frac{z_1}{z_2}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{z_1}{z_2} &= \\frac{-2 + 3i}{5 + 2i} \\\\
  &= \\frac{-2 + 3i}{5 + 2i} \\cdot \\frac{5 - 2i}{5 - 2i} \\\\
  &= \\frac{(-2 + 3i)(5 - 2i)}{29} \\\\
  &= \\frac{-4 + 19i}{29} \\\\
  &= -\\frac{4}{29} + \\frac{19}{29}i
  \\end{aligned}$$

- **(h) $\\frac{\\bar{z}_1}{\\bar{z}_2}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{\\bar{z}_1}{\\bar{z}_2} &= \\frac{-2 - 3i}{5 - 2i} \\\\
  &= \\frac{-2 - 3i}{5 - 2i} \\cdot \\frac{5 + 2i}{5 + 2i} \\\\
  &= \\frac{(-2 - 3i)(5 + 2i)}{29} \\\\
  &= \\frac{-4 - 19i}{29} \\\\
  &= -\\frac{4}{29} - \\frac{19}{29}i
  \\end{aligned}$$

- **(i) $\\frac{z_2}{z_1}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{z_2}{z_1} &= \\frac{5 + 2i}{-2 + 3i} \\\\
  &= \\frac{5 + 2i}{-2 + 3i} \\cdot \\frac{-2 - 3i}{-2 - 3i} \\\\
  &= \\frac{(5 + 2i)(-2 - 3i)}{13} \\\\
  &= \\frac{-4 - 19i}{13} \\\\
  &= -\\frac{4}{13} - \\frac{19}{13}i
  \\end{aligned}$$

- **(j) $\\overline{\\left(\\frac{z_2}{z_1}\\right)}$**
  **Solution.** Conjugate of result in (i):
  $$\\begin{aligned}
  \\overline{\\left(\\frac{z_2}{z_1}\\right)} &= \\overline{\\left(-\\frac{4}{13} - \\frac{19}{13}i\\right)} \\\\
  &= -\\frac{4}{13} + \\frac{19}{13}i
  \\end{aligned}$$

- **(k) $\\frac{\\bar{z}_1 z_2}{z_1 \\bar{z}_2}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{\\bar{z}_1 z_2}{z_1 \\bar{z}_2} &= \\frac{(-2 - 3i)(5 + 2i)}{(-2 + 3i)(5 - 2i)} \\\\
  &= \\frac{-10 - 4i - 15i + 6}{-10 + 4i + 15i - 6} \\\\
  &= \\frac{-4 - 19i}{-4 + 19i} \\\\
  &= \\frac{-4 - 19i}{-4 + 19i} \\cdot \\frac{-4 - 19i}{-4 - 19i} \\\\
  &= \\frac{(-4 - 19i)^2}{(-4)^2 + 19^2} \\\\
  &= \\frac{16 + 152i - 361}{16 + 361} \\\\
  &= \\frac{-345 + 152i}{377} \\\\
  &= -\\frac{345}{377} + \\frac{152}{377}i
  \\end{aligned}$$

- **(l) $\\frac{z_2}{\\bar{z}_1} + \\frac{z_1}{\\bar{z}_2}$**
  **Solution.**
  Here, $\\bar{z}_1 = -2 - 3i$ and $\\bar{z}_2 = 5 - 2i$.
  $$\\begin{aligned}
  \\frac{z_2}{\\bar{z}_1} + \\frac{z_1}{\\bar{z}_2} &= \\frac{5 + 2i}{-2 - 3i} + \\frac{-2 + 3i}{5 - 2i} \\\\
  &= \\left(\\frac{5 + 2i}{-2 - 3i} \\cdot \\frac{-2 + 3i}{-2 + 3i}\\right) + \\left(\\frac{-2 + 3i}{5 - 2i} \\cdot \\frac{5 + 2i}{5 + 2i}\\right) \\\\
  &= \\frac{-10 + 15i - 4i - 6}{13} + \\frac{-10 - 4i + 15i - 6}{29} \\\\
  &= \\frac{-16 + 11i}{13} + \\frac{-16 + 11i}{29} \\\\
  &= \\frac{29(-16 + 11i) + 13(-16 + 11i)}{377} \\\\
  &= \\frac{42(-16 + 11i)}{377} \\\\
  &= \\frac{-672 + 462i}{377} \\\\
  &= -\\frac{672}{377} + \\frac{462}{377}i
  \\end{aligned}$$

**2. Let $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$. Show that.**
- **(a) $\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$**
  **Solution.**
  First, calculate the left-hand side:
  $$\\begin{aligned}
  z_1 + z_2 &= (3 - 2i) + (-1 + 4i) \\\\
  &= 2 + 2i
  \\end{aligned}$$
  Taking the conjugate:
  $$\\overline{z_1 + z_2} = 2 - 2i$$

  Next, calculate the right-hand side:
  $$\\begin{aligned}
  \\bar{z}_1 + \\bar{z}_2 &= (3 + 2i) + (-1 - 4i) \\\\
  &= 2 - 2i
  \\end{aligned}$$
  Since both sides are equal, the statement is verified.

- **(b) $\\overline{z_1 z_2} = \\bar{z}_1 \\bar{z}_2$**
  **Solution.**
  First, calculate the product $z_1 z_2$:
  $$\\begin{aligned}
  z_1 z_2 &= (3 - 2i)(-1 + 4i) \\\\
  &= -3 + 12i + 2i - 8i^2 \\\\
  &= 5 + 14i
  \\end{aligned}$$
  Taking the conjugate:
  $$\\overline{z_1 z_2} = 5 - 14i$$

  Next, calculate the product of the conjugates:
  $$\\begin{aligned}
  \\bar{z}_1 \\bar{z}_2 &= (3 + 2i)(-1 - 4i) \\\\
  &= -3 - 12i - 2i - 8i^2 \\\\
  &= 5 - 14i
  \\end{aligned}$$
  Since both sides are equal, the statement is verified.

- **(c) $\\overline{\\left(\\frac{z_1}{z_2}\\right)} = \\frac{\\bar{z}_1}{\\bar{z}_2}$**
  **Solution.**
  First, calculate the quotient $\\frac{z_1}{z_2}$:
  $$\\begin{aligned}
  \\frac{z_1}{z_2} &= \\frac{3 - 2i}{-1 + 4i} \\cdot \\frac{-1 - 4i}{-1 - 4i} \\\\
  &= \\frac{-11 - 10i}{17} \\\\
  &= -\\frac{11}{17} - \\frac{10}{17}i
  \\end{aligned}$$
  Taking the conjugate:
  $$\\overline{\\left(\\frac{z_1}{z_2}\\right)} = -\\frac{11}{17} + \\frac{10}{17}i$$

  Next, calculate the quotient of the conjugates:
  $$\\begin{aligned}
  \\frac{\\bar{z}_1}{\\bar{z}_2} &= \\frac{3 + 2i}{-1 - 4i} \\cdot \\frac{-1 + 4i}{-1 + 4i} \\\\
  &= \\frac{-11 + 10i}{17} \\\\
  &= -\\frac{11}{17} + \\frac{10}{17}i
  \\end{aligned}$$
  Since both sides are equal, the statement is verified.

---

### 1.4 Trigonometric Form
#### From Cartesian Form to Trigonometric Form
A non-zero complex number $z = x + yi$ can be represented by a point $P(x, y)$ on the complex plane. Let $r$ be the distance from the origin to $P$ and let $\\theta$ be the angle made with the positive real axis.

[DIAGRAM: ArgandPolar]

$$r = |z| = \\sqrt{x^2 + y^2}$$
$$\\cos \\theta = \\frac{x}{r} \\quad \\text{and} \\quad \\sin \\theta = \\frac{y}{r}$$

Since $x = r\\cos\\theta$ and $y = r\\sin\\theta$:
$$z = x + yi = r(\\cos \\theta + i \\sin \\theta)$$
This is called the **trigonometric form** or **polar form** of $z$.

#### Modulus and Argument
- $r = |z|$ is the **modulus** of $z$.
- $\\theta$ is an **argument** of $z$.
- For the **principal argument**, choose $-\\pi < \\theta \\le \\pi$.
- All angles $\\theta + 2\\pi k$, where $k \\in \\mathbb{Z}$, represent the same complex number.

**Example 5.** Find the trigonometric form with $-\\pi < \\theta \\le \\pi$ for:
- **(a) $z = 1 + \\sqrt{3}i$**
  $$\\begin{aligned}
  r &= \\sqrt{1^2 + (\\sqrt{3})^2} = 2 \\\\
  \\cos \\theta &= \\frac{1}{2}, \\quad \\sin \\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3} \\\\
  z &= 2\\left(\\cos \\frac{\\pi}{3} + i \\sin \\frac{\\pi}{3}\\right)
  \\end{aligned}$$
  [DIAGRAM: ArgandExample5a]

- **(b) $z = -1 + i$**
  $$\\begin{aligned}
  r &= \\sqrt{(-1)^2 + 1^2} = \\sqrt{2} \\\\
  \\cos \\theta &= -\\frac{\\sqrt{2}}{2}, \\quad \\sin \\theta = \\frac{\\sqrt{2}}{2} \\implies \\theta = \\frac{3\\pi}{4} \\\\
  z &= \\sqrt{2}\\left(\\cos \\frac{3\\pi}{4} + i \\sin \\frac{3\\pi}{4}\\right)
  \\end{aligned}$$
  [DIAGRAM: ArgandExample5b]

- **(c) $z = -\\sqrt{3} - i$**
  $$\\begin{aligned}
  r &= \\sqrt{(-\\sqrt{3})^2 + (-1)^2} = 2 \\\\
  \\cos \\theta &= -\\frac{\\sqrt{3}}{2}, \\quad \\sin \\theta = -\\frac{1}{2} \\implies \\theta = -\\frac{5\\pi}{6} \\\\
  z &= 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i \\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)
  \\end{aligned}$$
  [DIAGRAM: ArgandExample5c]

- **(d) $z = -1$**
  $$\\begin{aligned}
  r &= \\sqrt{(-1)^2 + 0^2} = 1 \\\\
  \\cos \\theta &= -1, \\quad \\sin \\theta = 0 \\implies \\theta = \\pi \\\\
  z &= 1(\\cos \\pi + i \\sin \\pi)
  \\end{aligned}$$
  [DIAGRAM: ArgandExample5d]

#### Operations in Trigonometric Form
Let $z_1 = r_1(\\cos \\theta_1 + i \\sin \\theta_1)$ and $z_2 = r_2(\\cos \\theta_2 + i \\sin \\theta_2)$.

1. **Product in Trigonometric Form:**
   $$z_1 z_2 = r_1 r_2 (\\cos(\\theta_1 + \\theta_2) + i \\sin(\\theta_1 + \\theta_2))$$

2. **Multiplicative Inverse:**
   $$z^{-1} = \\frac{1}{r} (\\cos(-\\theta) + i \\sin(-\\theta))$$

3. **Division in Trigonometric Form:**
   $$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} (\\cos(\\theta_1 - \\theta_2) + i \\sin(\\theta_1 - \\theta_2))$$

4. **Power of Complex Numbers (De Moivre's Formula):**
   $$z^n = r^n (\\cos n\\theta + i \\sin n\\theta), \\quad n \\in \\mathbb{N}$$

**Example 6.** Given $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$, find $z_1 z_2$ by using trigonometric forms.
**Solution.**
  $$\\begin{aligned}
  z_1 z_2 &= 2\\sqrt{2}\\left(\\cos\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right) + i \\sin\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right)\\right) \\\\
  &= 2\\sqrt{2}\\left(\\cos \\frac{13\\pi}{12} + i \\sin \\frac{13\\pi}{12}\\right) \\\\
  &= 2\\sqrt{2}\\left(\\cos\\left(-\\frac{11\\pi}{12}\\right) + i \\sin\\left(-\\frac{11\\pi}{12}\\right)\\right) \\\\
  &= -(1 + \\sqrt{3}) + (1 - \\sqrt{3})i
  \\end{aligned}$$
**Example 7.** Find $z^{-1}$ for $z = -\\sqrt{3} - i$.
**Solution.**
  $$\\begin{aligned}
  z &= 2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i \\sin\\left(-\\frac{5\\pi}{6}\\right)\\right) \\\\
  z^{-1} &= \\frac{1}{2}\\left(\\cos\\left(\\frac{5\\pi}{6}\\right) + i \\sin\\left(\\frac{5\\pi}{6}\\right)\\right) \\\\
  &= -\\frac{\\sqrt{3}}{4} + \\frac{1}{4}i
  \\end{aligned}$$
**Example 8.** Find $\\frac{z_1}{z_2}$ for $z_1 = 1 + \\sqrt{3}i$ and $z_2 = -1 + i$.
**Solution.**
  $$\\begin{aligned}
  \\frac{z_1}{z_2} &= \\frac{2}{\\sqrt{2}}\\left(\\cos\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\\right) + i \\sin\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\\right)\\right) \\\\
  &= \\sqrt{2}\\left( \\cos\\left(-\\frac{5\\pi}{12}\\right) + i \\sin\\left(-\\frac{5\\pi}{12}\\right) \\right) \\\\
  &= \\frac{\\sqrt{3}-1}{2} - \\frac{\\sqrt{3}+1}{2}i
  \\end{aligned}$$
**Example 9.** Find $z^{10}$ and $z^{-10}$ for $z = 1 + \\sqrt{3}i$.
**Solution.**
  $$\\begin{aligned}
  z^{10} &= 2^{10}\\left(\\cos \\frac{10\\pi}{3} + i \\sin \\frac{10\\pi}{3}\\right) \\\\
  &= 1024\\left(-\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i\\right) \\\\
  &= -512 - 512\\sqrt{3}i
  \\end{aligned}$$
  and:
  $$\\begin{aligned}
  z^{-10} &= 2^{-10}\\left(\\cos\\left(-\\frac{10\\pi}{3}\\right) + i \\sin\\left(-\\frac{10\\pi}{3}\\right)\\right) \\\\
  &= -\\frac{1}{2048} + \\frac{\\sqrt{3}}{2048}i
  \\end{aligned}$$
---

### Exercise 1.4 Solutions
**1. Find the trigonometric form with $-\pi < \\theta \\le \\pi$ for:**
- **(a) $z = 1 - \\sqrt{3}i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2 \\\\
  \\theta &= -\\frac{\\pi}{3} \\\\
  z &= 2\\left(\\cos\\left(-\\frac{\\pi}{3}\\right) + i \\sin\\left(-\\frac{\\pi}{3}\\right)\\right)
  \\end{aligned}$$

- **(b) $z = -\\sqrt{2} + \\sqrt{2}i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2 \\\\
  \\theta &= \\frac{3\\pi}{4} \\\\
  z &= 2\\left(\\cos \\frac{3\\pi}{4} + i \\sin \\frac{3\\pi}{4}\\right)
  \\end{aligned}$$

- **(c) $z = -2 - 2i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2\\sqrt{2} \\\\
  \\theta &= -\\frac{3\\pi}{4} \\\\
  z &= 2\\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i \\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)
  \\end{aligned}$$

- **(d) $z = \\sqrt{3} - i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2 \\\\
  \\theta &= -\\frac{\\pi}{6} \\\\
  z &= 2\\left(\\cos\\left(-\\frac{\\pi}{6}\\right) + i \\sin\\left(-\\frac{\\pi}{6}\\right)\\right)
  \\end{aligned}$$

- **(e) $z = i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 1 \\\\
  \\theta &= \\frac{\\pi}{2} \\\\
  z &= 1\\left(\\cos \\frac{\\pi}{2} + i \\sin \\frac{\\pi}{2}\\right)
  \\end{aligned}$$

- **(f) $z = -3i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 3 \\\\
  \\theta &= -\\frac{\\pi}{2} \\\\
  z &= 3\\left(\\cos\\left(-\\frac{\\pi}{2}\\right) + i \\sin\\left(-\\frac{\\pi}{2}\\right)\\right)
  \\end{aligned}$$
**2. Given $z_1 = 2 - 2\\sqrt{3}i$ and $z_2 = -1 - i$, find the following using trigonometric forms. Check by direct calculation.**
Trig forms: $z_1 = 4\\left(\\cos\\left(-\\frac{\\pi}{3}\\right) + i \\sin\\left(-\\frac{\\pi}{3}\\right)\\right)$, $z_2 = \\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i \\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$
- **(a) $z_1 z_2$**
  **Solution.**
  $$\\begin{aligned}
  z_1 z_2 &= 4\\sqrt{2}\\left(\\cos\\left(-\\frac{13\\pi}{12}\\right) + i \\sin\\left(-\\frac{13\\pi}{12}\\right)\\right) \\\\
  &= -(2 + 2\\sqrt{3}) + (2\\sqrt{3} - 2)i
  \\end{aligned}$$
- **(b) $z_1^{-1}$**
  **Solution.**
  $$\\begin{aligned}
  z_1^{-1} &= \\frac{1}{4}\\left(\\cos \\frac{\\pi}{3} + i \\sin \\frac{\\pi}{3}\\right) \\\\
  &= \\frac{1}{8} + \\frac{\\sqrt{3}}{8}i
  \\end{aligned}$$
- **(c) $\\frac{z_1}{z_2}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{z_1}{z_2} &= 2\\sqrt{2}\\left(\\cos \\frac{5\\pi}{12} + i \\sin \\frac{5\\pi}{12}\\right) \\\\
  &= \\sqrt{3}-1 + (\\sqrt{3}+1)i
  \\end{aligned}$$
- **(d) $\\frac{z_2}{z_1}$**
  **Solution.**
  $$\\begin{aligned}
  \\frac{z_2}{z_1} &= \\frac{\\sqrt{2}}{4}\\left(\\cos\\left(-\\frac{5\\pi}{12}\\right) + i \\sin\\left(-\\frac{5\\pi}{12}\\right)\\right) \\\\
  &= \\frac{\\sqrt{3}-1}{8} - \\frac{\\sqrt{3}+1}{8}i
  \\end{aligned}$$
**3. Given $z = -2\\sqrt{3} - 2i$, find:**
Trig form: $z = 4\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i \\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$
- **(a) $z^5$**
  **Solution.**
  $$\\begin{aligned}
  z^5 &= 1024\\left(\\cos\\left(-\\frac{25\\pi}{6}\\right) + i \\sin\\left(-\\frac{25\\pi}{6}\\right)\\right) \\\\
  &= 1024\\left(\\cos\\left(-\\frac{\\pi}{6}\\right) + i \\sin\\left(-\\frac{\\pi}{6}\\right)\\right) \\\\
  &= 512\\sqrt{3} - 512i
  \\end{aligned}$$
- **(b) $z^{-5}$**
  **Solution.**
  $$\\begin{aligned}
  z^{-5} &= \\frac{1}{1024}\\left(\\cos \\frac{\\pi}{6} + i \\sin \\frac{\\pi}{6}\\right) \\\\
  &= \\frac{\\sqrt{3}}{2048} + \\frac{1}{2048}i
  \\end{aligned}$$
---

### 1.5 Roots of Complex Numbers
Let $n \\in \\mathbb{N}$, $n \\ge 2$, and $z \\neq 0$ where $z = r(\\cos \\theta + i \\sin \\theta)$.
The $n$ distinct $n$-th roots of $z$ are given by De Moivre's Formula:
$$w_k = \\sqrt[n]{r} \\left( \\cos \\frac{\\theta + 2k\\pi}{n} + i \\sin \\frac{\\theta + 2k\\pi}{n} \\right) \\quad \\text{for } k = 0, 1, 2, \\dots, n - 1$$

**Example 10.** Find the cube roots of $z = -2 - 2i$.
**Solution.** Write $z = 2\\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i \\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$.
For cube roots ($n=3$):
  $$\\begin{aligned}
  w_k &= \\sqrt{2}\\left( \\cos \\frac{-\\frac{3\\pi}{4} + 2k\\pi}{3} + i \\sin \\frac{-\\frac{3\\pi}{4} + 2k\\pi}{3} \\right)
  \\end{aligned}$$
  - **For $k=0$:**
    $$\\begin{aligned}
    w_0 &= \\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{4}\\right) + i \\sin\\left(-\\frac{\\pi}{4}\\right)\\right) \\\\
    &= 1 - i
    \\end{aligned}$$
  - **For $k=1$:**
    $$\\begin{aligned}
    w_1 &= \\sqrt{2}\\left(\\cos \\frac{5\\pi}{12} + i \\sin \\frac{5\\pi}{12}\\right) \\\\
    &= \\frac{\\sqrt{3}-1}{2} + \\frac{\\sqrt{3}+1}{2}i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    w_2 &= \\sqrt{2}\\left(\\cos \\frac{13\\pi}{12} + i \\sin \\frac{13\\pi}{12}\\right) \\\\
    &= -\\frac{\\sqrt{3}+1}{2} - \\frac{\\sqrt{3}-1}{2}i
    \\end{aligned}$$
[DIAGRAM: RootsExample10]

**Example 11.** Solve $z^6 = 1$. Indicate the positions of the roots on the $xy$-coordinate plane.
**Solution.**
  $$\\begin{aligned}
  z &= \\sqrt[6]{1}\\left(\\cos \\frac{2k\\pi}{6} + i \\sin \\frac{2k\\pi}{6}\\right) \\quad \\text{for } k = 0, 1, 2, 3, 4, 5
  \\end{aligned}$$
  - **For $k=0$:**
    $$z = 1$$
  - **For $k=1$:**
    $$\\begin{aligned}
    z &= \\cos \\frac{\\pi}{3} + i \\sin \\frac{\\pi}{3} \\\\
    &= \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    z &= \\cos \\frac{2\\pi}{3} + i \\sin \\frac{2\\pi}{3} \\\\
    &= -\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i
    \\end{aligned}$$
  - **For $k=3$:**
    $$z = -1$$
  - **For $k=4$:**
    $$\\begin{aligned}
    z &= \\cos \\frac{4\\pi}{3} + i \\sin \\frac{4\\pi}{3} \\\\
    &= -\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i
    \\end{aligned}$$
  - **For $k=5$:**
    $$\\begin{aligned}
    z &= \\cos \\frac{5\\pi}{3} + i \\sin \\frac{5\\pi}{3} \\\\
    &= \\frac{1}{2} - \\frac{\\sqrt{3}}{2}i
    \\end{aligned}$$
[DIAGRAM: RootsUnity6]

---

### Exercise 1.5 Solutions
**1. Find the square roots of the following complex numbers.**
- **(a) $1 + \\sqrt{3}i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2, \\quad \\theta = \\frac{\\pi}{3} \\\\
  w_k &= \\sqrt{2}\\left(\\cos \\frac{\\pi/3 + 2k\\pi}{2} + i \\sin \\frac{\\pi/3 + 2k\\pi}{2}\\right) \\\\
  w_0 &= \\sqrt{2}\\left(\\cos\\frac{\\pi}{6} + i \\sin\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{6}}{2} + \\frac{\\sqrt{2}}{2}i \\\\
  w_1 &= \\sqrt{2}\\left(\\cos\\frac{7\\pi}{6} + i \\sin\\frac{7\\pi}{6}\\right) = -\\frac{\\sqrt{6}}{2} - \\frac{\\sqrt{2}}{2}i
  \\end{aligned}$$

- **(b) $i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 1, \\quad \\theta = \\frac{\\pi}{2} \\\\
  w_k &= 1\\left(\\cos \\frac{\\pi/2 + 2k\\pi}{2} + i \\sin \\frac{\\pi/2 + 2k\\pi}{2}\\right) \\\\
  w_0 &= \\cos\\frac{\\pi}{4} + i \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}i \\\\
  w_1 &= \\cos\\frac{5\\pi}{4} + i \\sin\\frac{5\\pi}{4} = -\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}i
  \\end{aligned}$$

- **(c) $-\\sqrt{3} + i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2, \\quad \\theta = \\frac{5\\pi}{6} \\\\
  w_0 &= \\sqrt{2}\\left(\\cos\\frac{5\\pi}{12} + i \\sin\\frac{5\\pi}{12}\\right) \\\\
  w_1 &= \\sqrt{2}\\left(\\cos\\frac{17\\pi}{12} + i \\sin\\frac{17\\pi}{12}\\right)
  \\end{aligned}$$

- **(d) $-1 - \\sqrt{3}i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2, \\quad \\theta = -\\frac{2\\pi}{3} \\\\
  w_0 &= \\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{3}\\right) + i \\sin\\left(-\\frac{\\pi}{3}\\right)\\right) = \\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{6}}{2}i \\\\
  w_1 &= \\sqrt{2}\\left(\\cos\\frac{2\\pi}{3} + i \\sin\\frac{2\\pi}{3}\\right) = -\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{6}}{2}i
  \\end{aligned}$$

- **(e) $-i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 1, \\quad \\theta = -\\frac{\\pi}{2} \\\\
  w_0 &= \\cos\\left(-\\frac{\\pi}{4}\\right) + i \\sin\\left(-\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}i \\\\
  w_1 &= \\cos\\frac{3\\pi}{4} + i \\sin\\frac{3\\pi}{4} = -\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}i
  \\end{aligned}$$

- **(f) $\\sqrt{3} - i$**
  **Solution.**
  $$\\begin{aligned}
  r &= 2, \\quad \\theta = -\\frac{\\pi}{6} \\\\
  w_0 &= \\sqrt{2}\\left(\\cos\\left(-\\frac{\\pi}{12}\\right) + i \\sin\\left(-\\frac{\\pi}{12}\\right)\\right) \\\\
  w_1 &= \\sqrt{2}\\left(\\cos\\frac{11\\pi}{12} + i \\sin\\frac{11\\pi}{12}\\right)
  \\end{aligned}$$
**2. Find the cube roots of the following.**
- **(a) $1 + i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\sqrt[6]{2}\\left(\\cos \\frac{\\pi/4 + 2k\\pi}{3} + i \\sin \\frac{\\pi/4 + 2k\\pi}{3}\\right)
  \\end{aligned}$$
- **(b) $i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\cos \\frac{\\pi/2 + 2k\\pi}{3} + i \\sin \\frac{\\pi/2 + 2k\\pi}{3} \\\\
  w_0 &= \\frac{\\sqrt{3}}{2} + \\frac{1}{2}i \\\\
  w_1 &= -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i \\\\
  w_2 &= -i
  \\end{aligned}$$
- **(c) $-1 + i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\sqrt[6]{2}\\left(\\cos \\frac{3\\pi/4 + 2k\\pi}{3} + i \\sin \\frac{3\\pi/4 + 2k\\pi}{3}\\right)
  \\end{aligned}$$
- **(d) $-1 - i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\sqrt[6]{2}\\left(\\cos \\frac{-3\\pi/4 + 2k\\pi}{3} + i \\sin \\frac{-3\\pi/4 + 2k\\pi}{3}\\right)
  \\end{aligned}$$
- **(e) $-i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\cos \\frac{-\\pi/2 + 2k\\pi}{3} + i \\sin \\frac{-\\pi/2 + 2k\\pi}{3}
  \\end{aligned}$$
- **(f) $1 - i$**
  **Solution.**
  $$\\begin{aligned}
  w_k &= \\sqrt[6]{2}\\left(\\cos \\frac{-\\pi/4 + 2k\\pi}{3} + i \\sin \\frac{-\\pi/4 + 2k\\pi}{3}\\right)
  \\end{aligned}$$
**3. Solve the following equations.**
- **(a) $z^4 = -i$**
  **Solution.**
  $$\\begin{aligned}
  z^4 &= 1\\left(\\cos\\left(-\\frac{\\pi}{2} + 2k\\pi\\right) + i \\sin\\left(-\\frac{\\pi}{2} + 2k\\pi\\right)\\right) \\\\
  z &= \\cos\\left(\\frac{-\\pi/2 + 2k\\pi}{4}\\right) + i \\sin\\left(\\frac{-\\pi/2 + 2k\\pi}{4}\\right), \\quad k = 0, 1, 2, 3
  \\end{aligned}$$
  - **For $k=0$:**
    $$\\begin{aligned}
    z &= \\cos\\left(-\\frac{\\pi}{8}\\right) + i \\sin\\left(-\\frac{\\pi}{8}\\right) \\\\
    &= \\frac{\\sqrt{2+\\sqrt{2}}}{2} - \\frac{\\sqrt{2-\\sqrt{2}}}{2}i
    \\end{aligned}$$
  - **For $k=1$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{3\\pi}{8} + i \\sin\\frac{3\\pi}{8} \\\\
    &= \\frac{\\sqrt{2-\\sqrt{2}}}{2} + \\frac{\\sqrt{2+\\sqrt{2}}}{2}i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{7\\pi}{8} + i \\sin\\frac{7\\pi}{8} \\\\
    &= -\\frac{\\sqrt{2+\\sqrt{2}}}{2} + \\frac{\\sqrt{2-\\sqrt{2}}}{2}i
    \\end{aligned}$$
  - **For $k=3$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{11\\pi}{8} + i \\sin\\frac{11\\pi}{8} \\\\
    &= -\\frac{\\sqrt{2-\\sqrt{2}}}{2} - \\frac{\\sqrt{2+\\sqrt{2}}}{2}i
    \\end{aligned}$$
  [DIAGRAM: RootsUnity4]

- **(b) $z^4 = -1$**
  **Solution.**
  $$\\begin{aligned}
  z^4 &= 1(\\cos(\\pi + 2k\\pi) + i \\sin(\\pi + 2k\\pi))
  \\end{aligned}$$
  - **For $k=0$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{\\pi}{4} + i \\sin\\frac{\\pi}{4} \\\\
    &= \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}i
    \\end{aligned}$$
  - **For $k=1$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{3\\pi}{4} + i \\sin\\frac{3\\pi}{4} \\\\
    &= -\\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2}i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{5\\pi}{4} + i \\sin\\frac{5\\pi}{4} \\\\
    &= -\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}i
    \\end{aligned}$$
  - **For $k=3$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{7\\pi}{4} + i \\sin\\frac{7\\pi}{4} \\\\
    &= \\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2}i
    \\end{aligned}$$

- **(c) $z^4 = -8 - 8\\sqrt{3}i$**
  **Solution.** Modulus $r = 16$, argument $\\theta = -2\\pi/3$.
  $$\\begin{aligned}
  z &= 2\\left(\\cos\\frac{-2\\pi/3 + 2k\\pi}{4} + i \\sin\\frac{-2\\pi/3 + 2k\\pi}{4}\\right), \\quad k=0,1,2,3
  \\end{aligned}$$
  - **For $k=0$:**
    $$\\begin{aligned}
    z &= 2\\left(\\cos\\left(-\\frac{\\pi}{6}\\right) + i \\sin\\left(-\\frac{\\pi}{6}\\right)\\right) \\\\
    &= \\sqrt{3} - i
    \\end{aligned}$$
  - **For $k=1$:**
    $$\\begin{aligned}
    z &= 2\\left(\\cos\\frac{\\pi}{3} + i \\sin\\frac{\\pi}{3}\\right) \\\\
    &= 1 + \\sqrt{3}i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    z &= 2\\left(\\cos\\frac{5\\pi}{6} + i \\sin\\frac{5\\pi}{6}\\right) \\\\
    &= -\\sqrt{3} + i
    \\end{aligned}$$
  - **For $k=3$:**
    $$\\begin{aligned}
    z &= 2\\left(\\cos\\frac{4\\pi}{3} + i \\sin\\frac{4\\pi}{3}\\right) \\\\
    &= -1 - \\sqrt{3}i
    \\end{aligned}$$

- **(d) $z^6 = -1$**
  **Solution.**
  - **For $k=0$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{\\pi}{6} + i \\sin\\frac{\\pi}{6} \\\\
    &= \\frac{\\sqrt{3}}{2} + \\frac{1}{2}i
    \\end{aligned}$$
  - **For $k=1$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{\\pi}{2} + i \\sin\\frac{\\pi}{2} \\\\
    &= i
    \\end{aligned}$$
  - **For $k=2$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{5\\pi}{6} + i \\sin\\frac{5\\pi}{6} \\\\
    &= -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i
    \\end{aligned}$$
  - **For $k=3$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{7\\pi}{6} + i \\sin\\frac{7\\pi}{6} \\\\
    &= -\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i
    \\end{aligned}$$
  - **For $k=4$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{3\\pi}{2} + i \\sin\\frac{3\\pi}{2} \\\\
    &= -i
    \\end{aligned}$$
  - **For $k=5$:**
    $$\\begin{aligned}
    z &= \\cos\\frac{11\\pi}{6} + i \\sin\\frac{11\\pi}{6} \\\\
    &= \\frac{\\sqrt{3}}{2} - \\frac{1}{2}i
    \\end{aligned}$$
    `,
    formulas: [
      {
        id: "c1-f1",
        name: "Standard Cartesian Form",
        latex: "z = x + yi \\quad (i^2 = -1)",
        description: "Standard algebraic form where x is the real part and y is the imaginary part."
      },
      {
        id: "c1-f2",
        name: "Modulus & Argument",
        latex: "|z| = r = \\sqrt{x^2 + y^2}, \\quad \\theta = \\text{arg}(z) = \\tan^{-1}\\left(\\frac{y}{x}\\right)",
        description: "Formulas to calculate the radial distance and principal direction angle of a complex coordinate."
      },
      {
        id: "c1-f3",
        name: "Trigonometric Form",
        latex: "z = r(\\cos \\theta + i \\sin \\theta)",
        description: "Symmetric representation of a complex point using trigonometry."
      },
      {
        id: "c1-f4",
        name: "De Moivre's Power Formula",
        latex: "z^n = r^n(\\cos n\\theta + i \\sin n\\theta)",
        description: "Efficiently raise any polar complex coordinate to the integer power n."
      },
      {
        id: "c1-f5",
        name: "Complex Roots Formula",
        latex: "w_k = \\sqrt[n]{r}\\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right]",
        description: "Produces the n distinct complex roots for k = 0, 1, ..., n-1."
      }
    ],
    quiz: [
      {
        id: "c1-q1",
        questionText: "What is the complex conjugate of the number $z = 3 - 4i$?",
        options: ["$-3 + 4i$", "$3 + 4i$", "$-3 - 4i$", "$4 - 3i$"],
        correctAnswerIndex: 1,
        explanation: "To find the conjugate of $z = x + yi$, reverse the sign of the imaginary coefficient: $\\bar{z} = x - yi$. Therefore, the conjugate of $3 - 4i$ is $3 + 4i$."
      },
      {
        id: "c1-q2",
        questionText: "Convert $z = -1 + i$ into polar form, choosing the principal argument $-\\pi < \\theta \\le \\pi$.",
        options: [
          "$\\sqrt{2}\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$",
          "$\\sqrt{2}\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$",
          "$\\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$",
          "$2\\left(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4}\\right)$"
        ],
        correctAnswerIndex: 1,
        explanation: "The modulus is $r = \\sqrt{(-1)^2 + 1^2} = \\sqrt{2}$. The point lies in Quadrant II, so $\\theta = \\pi - \\tan^{-1}(1/1) = \\frac{3\\pi}{4}$. Thus, $z = \\sqrt{2}(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$."
      },
      {
        id: "c1-q3",
        questionText: "Evaluate $i^{2026}$ using powers of the imaginary unit.",
        options: ["$1$", "$i$", "$-1$", "$-i$"],
        correctAnswerIndex: 2,
        explanation: "Divide 2026 by 4: $2026 = 4 \\times 506 + 2$. Since the remainder is 2, $i^{2026} = i^2 = -1$."
      },
      {
        id: "c1-q4",
        questionText: "Calculate the product of the coordinate-form complex numbers $(2, 3)$ and $(4, -1)$.",
        options: ["$(8, -3)$", "$(11, 10)$", "$(5, 10)$", "$(11, -10)$"],
        correctAnswerIndex: 1,
        explanation: "Using the coordinate product rule: $(x_1, y_1)(x_2, y_2) = (x_1 x_2 - y_1 y_2, x_1 y_2 + x_2 y_1)$. Here, $(2\\cdot4 - 3\\cdot(-1), 2\\cdot(-1) + 3\\cdot4) = (8 + 3, -2 + 12) = (11, 10)$."
      }
    ],
    visualizerType: "complex-plane"
  },
  {
    id: 2,
    title: "Mathematical Induction",
    tagline: "Proving statements for all natural numbers using a sequential domino effect.",
    description: "In this chapter, we explore the Principle of Mathematical Induction, a deductive proof technique used to prove mathematical statements, equations, and inequalities for all positive integers $n \\in \\mathbb{N}$.",
    content: `### 1. Introduction to Mathematical Induction
**Mathematical Induction** is a powerful deductive mathematical proof technique. It is analogous to a falling line of dominoes: if you push the first one, and every domino knocks down the next one, then all dominoes will eventually fall.

#### The Principle
Mathematical induction is a method used to prove that a statement $P(n)$ is true for every natural number $n \\in \\mathbb{N}$.

> **The Induction Principle:**
> If $P(1)$ is true, and whenever $P(k)$ is true then $P(k+1)$ is also true, then $P(n)$ is true for all natural numbers $n$.

#### How It Works
* **Base Step (Basis):** Check and prove that the statement $P(n)$ holds for the first case (usually $n = 1$). Show that $P(1)$ is true.
* **Inductive Hypothesis:** Assume that the statement is true for an arbitrary natural number $k$, that is, $P(k)$ is true.
* **Induction Step:** Use the inductive hypothesis $P(k)$ to prove that the next case $P(k+1)$ is also true.
* **Goal / Conclusion:** After completing these steps, we conclude that the statement $P(n)$ holds for every natural number $n$.

---

### 2. Four Main Types of Induction Questions
To excel at solving induction problems, use this one-page guide to identify the question type first, then choose the correct induction move.

#### Type 1: L.H.S. = R.H.S. / Formula Proof
* **Idea:** You need to prove that two algebraic expressions are equal.
* **Move:** Start from one side (usually L.H.S. of $P(k+1)$), use the induction hypothesis $P(k)$ to substitute the sum up to $k$, and simplify algebraically until the other side (R.H.S. of $P(k+1)$) appears.

#### Type 2: Divisibility / Factor / Multiple
* **Idea:** You need to prove divisibility or show that a factor is present (e.g., $3^n - 1$ is a multiple of $2$).
* **Move:** Rewrite the $k+1$ case as a term using the induction hypothesis plus another term that is clearly divisible by the same target number.

#### Type 3: Inequality
* **Idea:** You need to prove that one quantity is less than or greater than another (e.g., $4n < 2^n$).
* **Move:** Apply the induction hypothesis first, then use one extra true inequality (like $4 < 4k$ or similar bounds) to complete the step from $k$ to $k+1$.

#### Type 4: Recurrence / Sequence Formula
* **Idea:** You need to prove an explicit formula for a recursively defined sequence.
* **Move:** Substitute the induction hypothesis into the recurrence relation, then simplify until the explicit formula for $k+1$ appears.

---

### 3. Proofs for Summation Formulas (Type 1)
Here are classical step-by-step proofs for series sum formulas.

#### Example 1: Sum of Odd Numbers
**Statement:** Prove that
$$1 + 3 + 5 + \\dots + (2n - 1) = n^2$$
for all natural numbers $n$.

**Solution:**
Let $P(n)$ denote the statement: $1 + 3 + 5 + \\dots + (2n - 1) = n^2$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1 \\quad \\text{and} \\quad \\text{R.H.S.} = 1^2 = 1$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$1 + 3 + 5 + \\dots + (2k - 1) = k^2$$
   We will show that the statement is true for $n = k+1$, that is,
   $$1 + 3 + 5 + \\dots + (2k - 1) + (2k + 1) = (k + 1)^2$$
   
   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 1 + 3 + 5 + \\dots + (2k - 1) + (2k + 1) \\\\
   &= k^2 + (2k + 1) \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= k^2 + 2k + 1 \\\\
   &= (k + 1)^2 \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Example 2: Sum of Positive Integers
**Statement:** Prove that
$$1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2}$$
for all natural numbers $n$.

**Solution:**
Let $P(n)$ denote the statement: $1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1 \\quad \\text{and} \\quad \\text{R.H.S.} = \\frac{1(1 + 1)}{2} = 1$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$1 + 2 + 3 + \\dots + k = \\frac{k(k + 1)}{2}$$
   We will show that the statement is true for $n = k+1$, that is,
   $$1 + 2 + 3 + \\dots + k + (k + 1) = \\frac{(k + 1)(k + 2)}{2}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 1 + 2 + 3 + \\dots + k + (k + 1) \\\\
   &= \\frac{k(k + 1)}{2} + (k + 1) \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= \\frac{k(k + 1) + 2(k + 1)}{2} \\\\
   &= \\frac{(k + 1)(k + 2)}{2} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Exercise 1(a): Sum of Powers of 3
**Statement:** Prove that
$$1 + 3 + 3^2 + \\dots + 3^{n-1} = \\frac{3^n - 1}{2}$$

**Solution:**
Let $P(n)$ denote the statement: $1 + 3 + 3^2 + \\dots + 3^{n-1} = \\frac{3^n - 1}{2}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1, \\quad \\text{R.H.S.} = \\frac{3^1 - 1}{2} = 1$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$1 + 3 + 3^2 + \\dots + 3^{k-1} = \\frac{3^k - 1}{2}$$
   We will show that the statement is true for $n = k+1$, that is,
   $$1 + 3 + 3^2 + \\dots + 3^{k-1} + 3^k = \\frac{3^{k+1} - 1}{2}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 1 + 3 + 3^2 + \\dots + 3^{k-1} + 3^k \\\\
   &= \\frac{3^k - 1}{2} + 3^k \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= \\frac{3^k - 1 + 2 \\cdot 3^k}{2} \\\\
   &= \\frac{3^k(1 + 2) - 1}{2} \\\\
   &= \\frac{3 \\cdot 3^k - 1}{2} \\\\
   &= \\frac{3^{k+1} - 1}{2} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Exercise 1(b): Sum of Cubes
**Statement:** Prove that
$$1^3 + 2^3 + 3^3 + \\dots + n^3 = \\left(\\frac{n(n + 1)}{2}\\right)^2$$

**Solution:**
Let $P(n)$ denote the statement: $1^3 + 2^3 + 3^3 + \\dots + n^3 = \\left(\\frac{n(n + 1)}{2}\\right)^2$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1^3 = 1, \\quad \\text{R.H.S.} = \\left(\\frac{1(1 + 1)}{2}\\right)^2 = 1$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$1^3 + 2^3 + 3^3 + \\dots + k^3 = \\left(\\frac{k(k + 1)}{2}\\right)^2$$
   We will show that:
   $$1^3 + 2^3 + 3^3 + \\dots + k^3 + (k + 1)^3 = \\left(\\frac{(k + 1)(k + 2)}{2}\\right)^2$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 1^3 + 2^3 + 3^3 + \\dots + k^3 + (k + 1)^3 \\\\
   &= \\left(\\frac{k(k + 1)}{2}\\right)^2 + (k + 1)^3 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= (k + 1)^2 \\left( \\frac{k^2}{4} + (k + 1) \\right) \\\\
   &= (k + 1)^2 \\left( \\frac{k^2 + 4k + 4}{4} \\right) \\\\
   &= (k + 1)^2 \\left( \\frac{(k + 2)^2}{4} \\right) \\\\
   &= \\left( \\frac{(k + 1)(k + 2)}{2} \\right)^2 \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Exercise 1(c): Sum of Even Cubes
**Statement:** Prove that
$$2^3 + 4^3 + 6^3 + \\dots + (2n)^3 = 2n^2(n + 1)^2$$

**Solution:**
Let $P(n)$ denote the statement: $2^3 + 4^3 + 6^3 + \\dots + (2n)^3 = 2n^2(n + 1)^2$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 2^3 = 8, \\quad \\text{R.H.S.} = 2(1)^2(1 + 1)^2 = 8$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$2^3 + 4^3 + 6^3 + \\dots + (2k)^3 = 2k^2(k+1)^2$$
   We will show that:
   $$2^3 + 4^3 + 6^3 + \\dots + (2k)^3 + (2k+2)^3 = 2(k+1)^2(k+2)^2$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 2^3 + 4^3 + 6^3 + \\dots + (2k)^3 + (2k + 2)^3 \\\\
   &= 2k^2(k+1)^2 + 8(k+1)^3 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 2(k+1)^2 \\left( k^2 + 4(k+1) \\right) \\\\
   &= 2(k+1)^2 \\left( k^2 + 4k + 4 \\right) \\\\
   &= 2(k+1)^2 (k+2)^2 \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

#### Exercise 1(d): Product Sum Series
**Statement:** Prove that
$$1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 4 + \\dots + n(n + 1) = \\frac{n(n+1)(n+2)}{3}$$

**Solution:**
Let $P(n)$ denote the statement: $1 \\cdot 2 + 2 \\cdot 3 + 3 \\cdot 4 + \\dots + n(n + 1) = \\frac{n(n+1)(n+2)}{3}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1 \\cdot 2 = 2, \\quad \\text{R.H.S.} = \\frac{1(1 + 1)(1 + 2)}{3} = 2$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$1 \\cdot 2 + 2 \\cdot 3 + \\dots + k(k + 1) = \\frac{k(k + 1)(k + 2)}{3}$$
   We will show that:
   $$1 \\cdot 2 + 2 \\cdot 3 + \\dots + k(k + 1) + (k + 1)(k + 2) = \\frac{(k+1)(k+2)(k+3)}{3}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= 1 \\cdot 2 + 2 \\cdot 3 + \\dots + k(k + 1) + (k + 1)(k + 2) \\\\
   &= \\frac{k(k + 1)(k + 2)}{3} + (k + 1)(k + 2) \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= (k + 1)(k + 2) \\left( \\frac{k}{3} + 1 \\right) \\\\
   &= \\frac{(k + 1)(k + 2)(k + 3)}{3} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

#### Exercise 1(e): Fractional Geometric Progression
**Statement:** Prove that
$$\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots + \\frac{1}{2^n} = 1 - \\frac{1}{2^n}$$

**Solution:**
Let $P(n)$ denote the statement: $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots + \\frac{1}{2^n} = 1 - \\frac{1}{2^n}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = \\frac{1}{2}, \\quad \\text{R.H.S.} = 1 - \\frac{1}{2} = \\frac{1}{2}$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$\\frac{1}{2} + \\frac{1}{4} + \\dots + \\frac{1}{2^k} = 1 - \\frac{1}{2^k}$$
   We will show that:
   $$\\frac{1}{2} + \\frac{1}{4} + \\dots + \\frac{1}{2^k} + \\frac{1}{2^{k+1}} = 1 - \\frac{1}{2^{k+1}}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= \\left( \\frac{1}{2} + \\frac{1}{4} + \\dots + \\frac{1}{2^k} \\right) + \\frac{1}{2^{k+1}} \\\\
   &= \\left( 1 - \\frac{1}{2^k} \\right) + \\frac{1}{2^{k+1}} \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 1 - \\frac{2}{2^{k+1}} + \\frac{1}{2^{k+1}} \\\\
   &= 1 - \\frac{1}{2^{k+1}} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

#### Exercise 1(f): Sum of Powers of 2
**Statement:** Prove that
$$1 + 2 + 2^2 + \\dots + 2^{n-1} = 2^n - 1$$

**Solution:**
Let $P(n)$ denote the statement: $1 + 2 + 2^2 + \\dots + 2^{n-1} = 2^n - 1$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1, \\quad \\text{R.H.S.} = 2^1 - 1 = 1$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$1 + 2 + 2^2 + \\dots + 2^{k-1} = 2^k - 1$$
   We will show that:
   $$1 + 2 + 2^2 + \\dots + 2^{k-1} + 2^k = 2^{k+1} - 1$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= (1 + 2 + 2^2 + \\dots + 2^{k-1}) + 2^k \\\\
   &= (2^k - 1) + 2^k \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 2 \\cdot 2^k - 1 \\\\
   &= 2^{k+1} - 1 \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

#### Exercise 1(g): Fractional Sequence Series
**Statement:** Prove that
$$\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\dots + \\frac{1}{n(n+1)} = \\frac{n}{n+1}$$

**Solution:**
Let $P(n)$ denote the statement: $\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\dots + \\frac{1}{n(n+1)} = \\frac{n}{n+1}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = \\frac{1}{1 \\cdot 2} = \\frac{1}{2}, \\quad \\text{R.H.S.} = \\frac{1}{1+1} = \\frac{1}{2}$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\dots + \\frac{1}{k(k+1)} = \\frac{k}{k+1}$$
   We will show that:
   $$\\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\dots + \\frac{1}{k(k+1)} + \\frac{1}{(k+1)(k+2)} = \\frac{k+1}{k+2}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= \\left( \\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\dots + \\frac{1}{k(k+1)} \\right) + \\frac{1}{(k+1)(k+2)} \\\\
   &= \\frac{k}{k+1} + \\frac{1}{(k+1)(k+2)} \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= \\frac{k(k+2) + 1}{(k+1)(k+2)} \\\\
   &= \\frac{k^2 + 2k + 1}{(k+1)(k+2)} \\\\
   &= \\frac{(k+1)^2}{(k+1)(k+2)} \\\\
   &= \\frac{k+1}{k+2} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

#### Example 5: Mixed Arithmetico-Geometric Series
**Statement:** Prove that
$$1 \\cdot 3 + 2 \\cdot 3^2 + 3 \\cdot 3^3 + \\dots + n \\cdot 3^n = \\frac{(2n-1)3^{n+1} + 3}{4}$$
for all natural numbers $n$.

**Solution:**
Let $P(n)$ denote the statement: $1 \\cdot 3 + 2 \\cdot 3^2 + 3 \\cdot 3^3 + \\dots + n \\cdot 3^n = \\frac{(2n-1)3^{n+1} + 3}{4}$.

1. **Base Step:** For $n = 1$,
   $$\\text{L.H.S.} = 1 \\cdot 3 = 3 \\quad \\text{and} \\quad \\text{R.H.S.} = \\frac{(2(1)-1)3^{1+1} + 3}{4} = \\frac{1 \\cdot 9 + 3}{4} = 3$$
   Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$1 \\cdot 3 + 2 \\cdot 3^2 + \\dots + k \\cdot 3^k = \\frac{(2k-1)3^{k+1} + 3}{4}$$
   We will show that:
   $$1 \\cdot 3 + 2 \\cdot 3^2 + \\dots + k \\cdot 3^k + (k+1)3^{k+1} = \\frac{(2k+1)3^{k+2} + 3}{4}$$

   **Proof:**
   $$\\begin{aligned}
   \\text{L.H.S.} &= (1 \\cdot 3 + 2 \\cdot 3^2 + \\dots + k \\cdot 3^k) + (k+1)3^{k+1} \\\\
   &= \\frac{(2k-1)3^{k+1} + 3}{4} + (k+1)3^{k+1} \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= \\frac{(2k-1)3^{k+1} + 3 + 4(k+1)3^{k+1}}{4} \\\\
   &= \\frac{3^{k+1} \\left[ (2k-1) + 4(k+1) \\right] + 3}{4} \\\\
   &= \\frac{3^{k+1} (2k - 1 + 4k + 4) + 3}{4} \\\\
   &= \\frac{3^{k+1} (6k + 3) + 3}{4} \\\\
   &= \\frac{3 \\cdot 3^{k+1} (2k + 1) + 3}{4} \\\\
   &= \\frac{(2k+1)3^{k+2} + 3}{4} \\\\
   &= \\text{R.H.S.}
   \\end{aligned}$$
   Therefore, true for $n = k + 1$.

3. **Conclusion:** Hence, by PMI, true for all natural numbers $n$.

---

### 4. Proofs for Divisibility Statements (Type 2)
Let's study divisibility mathematical induction questions where we establish factors.

#### Example 3: Powers of 3 Divisibility
**Statement:** Prove that
$$3^n - 1 \\quad \\text{is a multiple of 2 for all natural numbers } n.$$

**Solution:**
Let $P(n)$ denote the statement: \"$3^n - 1$ is a multiple of $2$\".

1. **Base Step:** For $n = 1$,
   $$3^1 - 1 = 2$$
   which is a multiple of $2$. Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$3^k - 1 \\quad \\text{is a multiple of 2.}$$
   We will show that $3^{k+1} - 1$ is a multiple of 2.

   **Proof:**
   $$\\begin{aligned}
   3^{k+1} - 1 &= 3 \\cdot 3^k - 1 \\\\
   &= 3 \\cdot 3^k - 3 + 2 \\\\
   &= 3(3^k - 1) + 2
   \end{aligned}$$
   Since $3(3^k - 1)$ is a multiple of 2 (by our Inductive Hypothesis) and $2$ is clearly a multiple of 2, their sum is also a multiple of 2.
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Exercise 2: Powers of 4 Divisibility
**Statement:** Prove that
$$4^n - 1 \\quad \\text{is divisible by 3 for all natural numbers } n.$$

**Solution:**
Let $P(n)$ denote the statement: \"$4^n - 1$ is divisible by $3$\".

1. **Base Step:** For $n = 1$,
   $$4^1 - 1 = 3$$
   which is divisible by $3$. Hence, true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$4^k - 1 \\quad \\text{is divisible by 3.}$$
   We will show that $4^{k+1} - 1$ is divisible by 3.

   **Proof:**
   $$\\begin{aligned}
   4^{k+1} - 1 &= 4 \\cdot 4^k - 1 \\\\
   &= 4 \\cdot 4^k - 4 + 3 \\\\
   &= 4(4^k - 1) + 3
   \end{aligned}$$
   Since $4(4^k - 1)$ is divisible by 3 (by Inductive Hypothesis) and $3$ is divisible by 3, their sum is also divisible by 3.
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

#### Exercise 3: Divisibility of Cubic Formula
**Statement:** Prove that
$$n^3 - n + 3 \\quad \\text{is divisible by 3 for all natural numbers } n.$$

**Solution:**
Let $P(n)$ denote the statement: \"$n^3 - n + 3$ is divisible by 3\".

1. **Base Step:** For $n = 1$,
   $$1^3 - 1 + 3 = 3$$
   which is divisible by $3$. Hence, true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$k^3 - k + 3 \\quad \\text{is divisible by 3.}$$
   We will show that $(k+1)^3 - (k+1) + 3$ is divisible by 3.

   **Proof:**
   $$\\begin{aligned}
   (k+1)^3 - (k+1) + 3 &= (k^3 + 3k^2 + 3k + 1) - (k+1) + 3 \\\\
   &= k^3 + 3k^2 + 3k + 1 - k - 1 + 3 \\\\
   &= (k^3 - k + 3) + 3k^2 + 3k \\\\
   &= (k^3 - k + 3) + 3(k^2 + k)
   \end{aligned}$$
   Since $(k^3 - k + 3)$ is divisible by 3 (by Inductive Hypothesis) and $3(k^2 + k)$ is clearly divisible by 3, their sum is also divisible by 3.
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

#### Exercise 4: Divisibility by 8
**Statement:** Prove that
$$3^{2n} - 1 \\quad \\text{is divisible by 8 for all natural numbers } n.$$

**Solution:**
Let $P(n)$ denote the statement: \"$3^{2n} - 1$ is divisible by $8$\".

1. **Base Step:** For $n = 1$,
   $$3^{2(1)} - 1 = 9 - 1 = 8$$
   which is divisible by $8$. Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$3^{2k} - 1 \\quad \\text{is divisible by 8.}$$
   We will show that $3^{2(k+1)} - 1$ is divisible by 8.

   **Proof:**
   $$\\begin{aligned}
   3^{2(k+1)} - 1 &= 3^{2k+2} - 1 \\\\
   &= 9 \\cdot 3^{2k} - 1 \\\\
   &= 9 \\cdot 3^{2k} - 9 + 8 \\\\
   &= 9(3^{2k} - 1) + 8
   \end{aligned}$$
   Since $9(3^{2k} - 1)$ is divisible by 8 (by Inductive Hypothesis) and $8$ is divisible by 8, their sum is also divisible by 8.
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

#### Example 6: Algebraic Difference Divisibility
**Statement:** Prove that
$$a - b \\quad \\text{is a factor of } a^n - b^n \\text{ for all natural numbers } n,$$
where $a$ and $b$ are fixed natural numbers.

**Solution:**
Let $P(n)$ denote the statement: \"$a - b$ is a factor of $a^n - b^n$\".

1. **Base Step:** For $n = 1$,
   $$a^1 - b^1 = a - b = (a - b) \\cdot 1$$
   Hence, $a - b$ is a factor of $a^1 - b^1$. Therefore, true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$. Then:
   $$a^k - b^k \\quad \\text{is divisible by } a - b.$$
   We will show that $a^{k+1} - b^{k+1}$ is divisible by $a - b$.

   **Proof:**
   $$\\begin{aligned}
   a^{k+1} - b^{k+1} &= a \\cdot a^k - b \\cdot b^k \\\\
   &= a \\cdot a^k - a \\cdot b^k + a \\cdot b^k - b \\cdot b^k \\\\
   &= a(a^k - b^k) + b^k(a - b)
   \end{aligned}$$
   Since $a(a^k - b^k)$ is divisible by $a - b$ (by Inductive Hypothesis) and $b^k(a - b)$ clearly has $a - b$ as a factor, their sum is also divisible by $a - b$.
   Therefore, $a^{k+1} - b^{k+1}$ is divisible by $a - b$. Hence, true for $n = k+1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

#### Exercise 7: Divisibility of Even Algebraic Difference
**Statement:** Prove that
$$x^{2n} - y^{2n} \\quad \\text{is divisible by } x + y \\text{ for all natural numbers } n,$$
where $x$ and $y$ are fixed natural numbers.

**Solution:**
Let $P(n)$ denote the statement: \"$x^{2n} - y^{2n}$ is divisible by $x + y$\".

1. **Base Step:** For $n = 1$,
   $$x^{2(1)} - y^{2(1)} = x^2 - y^2 = (x + y)(x - y)$$
   which is divisible by $x + y$. Hence, true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$:
   $$x^{2k} - y^{2k} \\quad \\text{is divisible by } x + y.$$
   We will show that $x^{2(k+1)} - y^{2(k+1)}$ is divisible by $x + y$.

   **Proof:**
   $$\\begin{aligned}
   x^{2(k+1)} - y^{2(k+1)} &= x^{2k+2} - y^{2k+2} \\\\
   &= x^2 \\cdot x^{2k} - y^2 \\cdot y^{2k} \\\\
   &= x^2 \\cdot x^{2k} - x^2 \\cdot y^{2k} + x^2 \\cdot y^{2k} - y^2 \\cdot y^{2k} \\\\
   &= x^2(x^{2k} - y^{2k}) + y^{2k}(x^2 - y^2) \\\\
   &= x^2(x^{2k} - y^{2k}) + y^{2k}(x + y)(x - y)
   \end{aligned}$$
   Since $x^2(x^{2k} - y^{2k})$ is divisible by $x+y$ (by Inductive Hypothesis) and $y^{2k}(x+y)(x-y)$ clearly has $x+y$ as a factor, their sum is also divisible by $x+y$.
   Therefore, $x^{2(k+1)} - y^{2(k+1)}$ is divisible by $x + y$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

#### Example 4: Distribution of Exponents
**Statement:** Prove that
$$(ab)^n = a^n b^n$$
for every natural number $n$.

**Solution:**
Let $P(n)$ denote the statement: $(ab)^n = a^n b^n$.

1. **Base Step:** For $n = 1$,
   $$(ab)^1 = ab = a^1 b^1$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume true for $n = k$, that is,
   $$(ab)^k = a^k b^k$$
   We will show that:
   $$(ab)^{k+1} = a^{k+1} b^{k+1}$$

   **Proof:**
   $$\\begin{aligned}
   (ab)^{k+1} &= (ab)^k \\cdot (ab) \\\\
   &= a^k b^k(ab) \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= a^k b^k a b \\\\
   &= a^k a b^k b \\\\
   &= a^{k+1} b^{k+1}
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement holds for every natural number $n$.

---

### 5. Proofs for Inequalities (Type 3)
Let's study induction questions involving inequalities.

#### Example 7: Linear vs Exponential
**Statement:** Prove that
$$4n < 2^n$$
for all natural numbers $n \\ge 5$.

**Solution:**
Let $P(n)$ denote the statement: \"$4n < 2^n$ for $n \\ge 5$\".

1. **Base Step:** For $n = 5$,
   $$4 \\cdot 5 = 20 < 32 = 2^5$$
   Hence, the statement is true for $n = 5$.

2. **Induction Step:** Assume that the statement is true for $n = k$, where $k \\ge 5$. That is,
   $$4k < 2^k$$
   We will show that $4(k + 1) < 2^{k+1}$.

   **Proof:**
   $$\\begin{aligned}
   4(k+1) &= 4k + 4 \\\\
   &< 2^k + 4 \\\\
   &< 2^k + 4k \\quad [\\text{since } 4 < 4k \\text{ for } k \\ge 5] \\\\
   &< 2^k + 2^k \\quad [\\text{by Inductive Hypothesis } 4k < 2^k] \\\\
   &= 2 \\cdot 2^k \\\\
   &= 2^{k+1}
   \\end{aligned}$$
   Therefore, $4(k+1) < 2^{k+1}$. Hence, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n \\ge 5$.

#### Exercise 5: Quadratic vs Quadratic
**Statement:** Prove that
$$(n + 1)^2 < 2n^2$$
for all natural numbers $n \\ge 3$.

**Solution:**
Let $P(n)$ denote the statement: \"$(n+1)^2 < 2n^2$ for $n \\ge 3$\".

1. **Base Step:** For $n = 3$,
   $$(3 + 1)^2 = 16 < 18 = 2 \\cdot 3^2$$
   Hence, the statement is true for $n = 3$.

2. **Induction Step:** Assume that the statement is true for $n = k$, where $k \\ge 3$. That is,
   $$(k + 1)^2 < 2k^2$$
   We will show that:
   $$(k + 2)^2 < 2(k + 1)^2$$

   **Proof:**
   $$\\begin{aligned}
   (k + 2)^2 &= (k + 1)^2 + 2k + 3 \\\\
   &< 2k^2 + 2k + 3 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &< 2k^2 + 4k + 2 \\quad [\\text{since } 2k + 3 < 4k + 2 \\text{ for } k \\ge 3] \\\\
   &= 2(k^2 + 2k + 1) \\\\
   &= 2(k + 1)^2
   \\end{aligned}$$
   Therefore, $(k+2)^2 < 2(k+1)^2$. Hence, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n \\ge 3$.

#### Exercise 6: Linear vs Quadratic
**Statement:** Prove that
$$2n + 7 < (n + 3)^2$$
for all natural numbers $n$.

**Solution:**
Let $P(n)$ denote the statement: \"$2n + 7 < (n + 3)^2$\".

1. **Base Step:** For $n = 1$,
   $$2 \\cdot 1 + 7 = 9 < 16 = (1 + 3)^2$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$2k + 7 < (k + 3)^2$$
   We will show that:
   $$2(k+1) + 7 < ((k + 1) + 3)^2$$
   Notice that $((k + 1) + 3)^2 = (k + 4)^2 = k^2 + 8k + 16$.

   **Proof:**
   $$\\begin{aligned}
   2(k+1) + 7 &= 2k + 9 \\\\
   &= (2k + 7) + 2 \\\\
   &< (k + 3)^2 + 2 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &< (k + 3)^2 + (2k + 7) \\quad [\\text{since } 2 < 2k + 7] \\\\
   &= k^2 + 6k + 9 + 2k + 7 \\\\
   &= k^2 + 8k + 16 \\\\
   &= (k + 4)^2 \\\\
   &= ((k + 1) + 3)^2
   \\end{aligned}$$
   Therefore, $2(k+1) + 7 < ((k+1)+3)^2$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural numbers $n$.

---

### 6. Sequence Recurrence Formulas (Type 4 & Old Questions)
Let's study advanced induction questions from old examination papers.

#### Old Question 1: Square Root Sequence
**Statement:** Consider the sequence of real numbers defined by
$$x_1 = 1, \\quad x_{n+1} = \\sqrt{1 + 2x_n}, \\quad n \\ge 1.$$
Prove that
$$x_n < 4$$
for all natural numbers $n$ by using the principle of mathematical induction.

**Solution:**
Let $P(n)$ denote the statement: \"$x_n < 4$\".

1. **Base Step:** For $n = 1$,
   $$x_1 = 1 < 4$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$x_k < 4$$
   We will show that:
   $$x_{k+1} < 4$$

   **Proof:**
   $$\\begin{aligned}
   x_{k+1} &= \\sqrt{1 + 2x_k} \\\\
   &< \\sqrt{1 + 2 \\cdot 4} \\quad [\\text{since } x_k < 4] \\\\
   &= \\sqrt{9} \\\\
   &= 3 \\\\
   &< 4
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Old Question 2: Simple Recurrence
**Statement:** Given that
$$T(0) = 0, \\quad T(n) = 2T(n - 1) + 1,$$
for $n = 1, 2, 3, \\dots$, prove by mathematical induction that:
$$T(n) = 2^n - 1$$

**Solution:**
Let $P(n)$ denote the statement: \"$T(n) = 2^n - 1$\".

1. **Base Step:** For $n = 1$,
   $$T(1) = 2T(0) + 1 = 2 \\cdot 0 + 1 = 1 = 2^1 - 1$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$T(k) = 2^k - 1$$
   We will show that:
   $$T(k + 1) = 2^{k+1} - 1$$

   **Proof:**
   $$\\begin{aligned}
   T(k+1) &= 2T(k) + 1 \\\\
   &= 2(2^k - 1) + 1 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 2^{k+1} - 2 + 1 \\\\
   &= 2^{k+1} - 1
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement $P(n)$ is true for all natural numbers $n$.

#### Old Question 3: Recurrence Sequence with 5
**Statement:** Given that
$$U_{n+1} = 5U_n - 8, \\quad U_1 = 3,$$
prove by mathematical induction that:
$$U_n = 5^{n-1} + 2$$
for all positive integers $n$.

**Solution:**
Let $P(n)$ denote the statement: \"$U_n = 5^{n-1} + 2$\".

1. **Base Step:** For $n = 1$,
   $$U_1 = 3 = 5^{1-1} + 2 = 5^0 + 2 = 1 + 2 = 3$$
   Hence, the statement is true for $n = 1$.

2. **Induction Step:** Assume that the statement is true for $n = k$, that is,
   $$Uk = 5^{k-1} + 2$$
   We will show that:
   $$U_{k+1} = 5^k + 2$$

   **Proof:**
   $$\\begin{aligned}
   U_{k+1} &= 5U_k - 8 \\\\
   &= 5(5^{k-1} + 2) - 8 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 5^k + 10 - 8 \\\\
   &= 5^k + 2
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all positive integers $n$.

#### Old Question 4: Recurrence Sequence with 3
**Statement:** Given that
$$U_{n+1} = 3U_n + 4, \\quad U_1 = 1,$$
prove by mathematical induction that:
$$U_n = 3^n - 2$$
for all natural integers $n$.

**Solution:**
Let $P(n)$ denote the statement: \"$U_n = 3^n - 2$\".

1. **Base Step:** For $n = 1$,
   $$U_1 = 1 = 3^1 - 2 = 3 - 2 = 1$$
   Hence, the statement is true for $n = 1$.

2. **Inductive Step:** Assume that the statement is true for $n = k$, that is,
   $$U_k = 3^k - 2$$
   We will show that:
   $$U_{k+1} = 3^{k+1} - 2$$

   **Proof:**
   $$\\begin{aligned}
   U_{k+1} &= 3U_k + 4 \\\\
   &= 3(3^k - 2) + 4 \\quad [\\text{by Inductive Hypothesis}] \\\\
   &= 3^{k+1} - 6 + 4 \\\\
   &= 3^{k+1} - 2
   \\end{aligned}$$
   Therefore, the statement is true for $n = k + 1$.

3. **Conclusion:** Hence, by the principle of mathematical induction, the statement is true for all natural integers $n$.`,
    formulas: [
      {
        id: "c2-f1",
        name: "Sum of First n Positive Integers",
        latex: "1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}",
        description: "The summation formula of consecutive natural numbers."
      },
      {
        id: "c2-f2",
        name: "Sum of Consecutive Odd Numbers",
        latex: "1 + 3 + 5 + \\dots + (2n-1) = n^2",
        description: "The sum of the first $n$ positive odd integers is always a perfect square $n^2$."
      },
      {
        id: "c2-f3",
        name: "Sum of Consecutive Cubes",
        latex: "1^3 + 2^3 + 3^3 + \\dots + n^3 = \\left(\\frac{n(n+1)}{2}\\right)^2",
        description: "The sum of the first $n$ cubes is the square of the sum of the first $n$ integers."
      },
      {
        id: "c2-f4",
        name: "Mixed Arithmetico-Geometric Formula",
        latex: "1 \\cdot 3 + 2 \\cdot 3^2 + \\dots + n \\cdot 3^n = \\frac{(2n-1)3^{n+1} + 3}{4}",
        description: "The summation formula of terms with linear coefficients multiplied by powers of 3."
      },
      {
        id: "c2-f5",
        name: "Algebraic Difference Divisibility factor",
        latex: "a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \\dots + b^{n-1})",
        description: "Shows that $a - b$ is always a factor of algebraic term $a^n - b^n$."
      }
    ],
    quiz: [
      {
        id: "c2-q1",
        questionText: "In proving the inequality $4n < 2^n$ for all $n \\ge 5$, what is the base case?",
        options: [
          "$n=1$",
          "$n=3$",
          "$n=5$",
          "$n=0$"
        ],
        correctAnswerIndex: 2,
        explanation: "The statement specifies that the inequality is for all natural numbers $n \\ge 5$, so the smallest starting value in the domain is $n=5$."
      },
      {
        id: "c2-q2",
        questionText: "For proving divisibility of $3^n - 1$ by 2 in the inductive step, how is $3^{k+1} - 1$ algebraically rewritten?",
        options: [
          "$3(3^k - 1) + 2$",
          "$3^k(3 - 1)$",
          "$2(3^k - 1) + 1$",
          "$(3^k - 1) + 2$"
        ],
        correctAnswerIndex: 0,
        explanation: "$3^{k+1} - 1 = 3 \\cdot 3^k - 1 = 3 \\cdot 3^k - 3 + 2 = 3(3^k - 1) + 2$. Since $3^k - 1$ is divisible by 2 by the inductive hypothesis, and 2 is divisible by 2, their sum is divisible by 2."
      },
      {
        id: "c2-q3",
        questionText: "In Type 3 Inequality questions, if we assume $P(k)$ is true: $(k+1)^2 < 2k^2$, what is the correct first line to prove $(k+2)^2 < 2(k+1)^2$ for $k \\ge 3$?",
        options: [
          "$(k+2)^2 = (k+1)^2 + 2k + 3$",
          "$(k+2)^2 = k^2 + 4k + 4$",
          "$(k+2)^2 = 2(k+1)^2$",
          "$(k+2)^2 < (k+1)^2 + (2k+7)$"
        ],
        correctAnswerIndex: 0,
        explanation: "By expanding $(k+2)^2 = k^2 + 4k + 4 = (k^2 + 2k + 1) + 2k + 3 = (k+1)^2 + 2k + 3$, we isolate the inductive hypothesis term $(k+1)^2$ to substitute it directly."
      },
      {
        id: "c2-q4",
        questionText: "What does the 'domino effect' metaphor represent in the Principle of Mathematical Induction?",
        options: [
          "The dominoes fall in a circular loop to represent repeating patterns",
          "The base step is knocking the first domino, and the induction step ensures each falling domino knocks down the next",
          "A set of rules for dividing complex multi-dimensional vectors",
          "The statistical probability of equations being true in physics"
        ],
        correctAnswerIndex: 1,
        explanation: "In induction, proving $P(1)$ is true is equivalent to knocking the first domino. Proving $P(k) \\implies P(k+1)$ is equivalent to ensuring that if any domino falls, it knocks down the next. Hence, all dominoes will fall."
      },
      {
        id: "c2-q5",
        questionText: "Given the sequence $x_1 = 1$, $x_{n+1} = \\sqrt{1 + 2x_n}$. If we assume $x_k < 4$ is true, what is the direct upper bound calculated for $x_{k+1}$?",
        options: [
          "$x_{k+1} < 3$",
          "$x_{k+1} < 4$",
          "$x_{k+1} < 9$",
          "$x_{k+1} < 2$"
        ],
        correctAnswerIndex: 0,
        explanation: "Since $x_k < 4$, we have $x_{k+1} = \\sqrt{1 + 2x_k} < \\sqrt{1 + 2(4)} = \\sqrt{9} = 3$. Since $3 < 4$, we confirm $x_{k+1} < 4$ holds."
      }
    ],
    visualizerType: "induction-steps"
  },
  {
    id: 3,
    title: "Analytical Solid Geometry",
    tagline: "Exploring coordinates, lines, planes, and spheres in three-dimensional space.",
    description: "This chapter covers 3D Cartesian coordinates, direction cosines and ratios, distances, symmetric equations of straight lines, relationships between skew and parallel lines, cartesian plane equations, and solid sphere tangent geometries.",
    content: `**Analytical Solid Geometry** studies geometric figures in three-dimensional space ($3\\text{D}$) using algebra and coordinate systems. It forms the backbone of spatial physics, computer graphics, and advanced structural engineering.

---

### 3.1 Coordinates of a Point in Space

#### 1. Equations of the Axes
*   **$x$-axis**: $y = 0, \\, z = 0$ (Coordinate Form: $(x, 0, 0)$)
*   **$y$-axis**: $x = 0, \\, z = 0$ (Coordinate Form: $(0, y, 0)$)
*   **$z$-axis**: $x = 0, \\, y = 0$ (Coordinate Form: $(0, 0, z)$)

#### 2. Equation of the Coordinate Planes
*   **$xy$-plane**: $z = 0$ (Coordinate Form: $(x, y, 0)$)
*   **$yz$-plane**: $x = 0$ (Coordinate Form: $(0, y, z)$)
*   **$zx$-plane**: $y = 0$ (Coordinate Form: $(x, 0, z)$)

[DIAGRAM:Solid3DPointDiagram]

#### 3. Planes Parallel to Coordinate Planes
*   **Parallel to $xy$-plane**: $z = c$ (Coordinate Form: $(x, y, c)$)
*   **Parallel to $yz$-plane**: $x = a$ (Coordinate Form: $(a, y, z)$)
*   **Parallel to $zx$-plane**: $y = b$ (Coordinate Form: $(x, b, z)$)

#### 4. Lines Perpendicular to Coordinate Planes
*   **Perpendicular to $xy$-plane**: $x = a, \\, y = b$ (Coordinate Form: $(a, b, z)$)
*   **Perpendicular to $yz$-plane**: $y = b, \\, z = c$ (Coordinate Form: $(x, b, c)$)
*   **Perpendicular to $zx$-plane**: $x = a, \\, z = c$ (Coordinate Form: $(a, y, c)$)

#### 5. Distance Between Two Points
If $P(x_1, y_1, z_1)$ and $Q(x_2, y_2, z_2)$ are two points in space, then the distance between $P$ and $Q$ is:
$$PQ = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

---

##### Examples & Exercise 3.1 Solutions

###### **Example 1**
Find the equation of the line through the point $(-3, 5, 7)$ and perpendicular to:
(a) $xy$-plane, (b) $yz$-plane, (c) $zx$-plane.
Find the point of intersection of each line and plane.

**Solution:**
*   **(a)** The equation of the line through $(-3, 5, 7)$ and perpendicular to the $xy$-plane is:
    $$x = -3, \\, y = 5 \\quad \\text{or} \\quad (-3, 5, z)$$
    The point of intersection of the line and the $xy$-plane (where $z = 0$) is **$(-3, 5, 0)$**.
*   **(b)** The equation of the line through $(-3, 5, 7)$ and perpendicular to the $yz$-plane is:
    $$y = 5, \\, z = 7 \\quad \\text{or} \\quad (x, 5, 7)$$
    The point of intersection of the line and the $yz$-plane (where $x = 0$) is **$(0, 5, 7)$**.
*   **(c)** The equation of the line through $(-3, 5, 7)$ and perpendicular to the $zx$-plane is:
    $$x = -3, \\, z = 7 \\quad \\text{or} \\quad (-3, y, 7)$$
    The point of intersection of the line and the $zx$-plane (where $y = 0$) is **$(-3, 0, 7)$**.

###### **Exercise 3.1 Q1**
Find the equation of the plane containing the point $(1, -2, 3)$ and parallel to:
(a) $xy$-plane, (b) $yz$-plane, (c) $zx$-plane.

**Solution:**
*   **(a)** The equation of the plane parallel to the $xy$-plane ($z = 0$) and containing $(1, -2, 3)$ is **$z = 3$**.
*   **(b)** The equation of the plane parallel to the $yz$-plane ($x = 0$) and containing $(1, -2, 3)$ is **$x = 1$**.
*   **(c)** The equation of the plane parallel to the $zx$-plane ($y = 0$) and containing $(1, -2, 3)$ is **$y = -2$**.

###### **Exercise 3.1 Q2**
Find the equation of the line through the point $(2, 3, -4)$ and perpendicular to:
(a) $xy$-plane, (b) $yz$-plane, (c) $zx$-plane.
Find the point of intersection of each line and plane.

**Solution:**
*   **(a)** The equation of the line through $(2, 3, -4)$ and perpendicular to the $xy$-plane is:
    $$x = 2, \\, y = 3 \\quad \\text{or} \\quad (2, 3, z)$$
    The point of intersection of the line and the $xy$-plane is **$(2, 3, 0)$**.
*   **(b)** The equation of the line through $(2, 3, -4)$ and perpendicular to the $yz$-plane is:
    $$y = 3, \\, z = -4 \\quad \\text{or} \\quad (x, 3, -4)$$
    The point of intersection of the line and the $yz$-plane is **$(0, 3, -4)$**.
*   **(c)** The equation of the line through $(2, 3, -4)$ and perpendicular to the $zx$-plane is:
    $$x = 2, \\, z = -4 \\quad \\text{or} \\quad (2, y, -4)$$
    The point of intersection of the line and the $zx$-plane is **$(2, 0, -4)$**.

###### **Exercise 3.1 Q3**
Find the distance between the points $(2, -3, 5)$ and $(7, 5, -2)$.

**Solution:**
Let $P(2, -3, 5)$ and $Q(7, 5, -2)$.
$$PQ = \\sqrt{(7 - 2)^2 + (5 - (-3))^2 + (-2 - 5)^2}$$
$$PQ = \\sqrt{5^2 + 8^2 + (-7)^2} = \\sqrt{25 + 64 + 49} = \\sqrt{138}$$
Therefore, the distance is **$\\sqrt{138}$**.

###### **Exercise 3.1 Q4**
Show that the points $A(-1, 2, 5)$, $B(1, 1, 6)$, and $C(0, 5, 6)$ form a right triangle.

**Solution:**
Using the distance formula:
$$AB^2 = (1 - (-1))^2 + (1 - 2)^2 + (6 - 5)^2 = 2^2 + (-1)^2 + 1^2 = 4 + 1 + 1 = 6$$
$$BC^2 = (0 - 1)^2 + (5 - 1)^2 + (6 - 6)^2 = (-1)^2 + 4^2 + 0 = 1 + 16 = 17$$
$$AC^2 = (-1 - 0)^2 + (2 - 5)^2 + (5 - 6)^2 = (-1)^2 + (-3)^2 + (-1)^2 = 1 + 9 + 1 = 11$$
Since $AB^2 + AC^2 = 6 + 11 = 17 = BC^2$, by the converse of the Pythagorean Theorem, the triangle is right-angled at $A$.

###### **Exercise 3.1 Q5**
Show that the points $A(1, -1, 2)$, $B(3, -2, 3)$, and $C(5, -3, 4)$ are collinear.

**Solution:**
$$AB = \\sqrt{(3 - 1)^2 + (-2 - (-1))^2 + (3 - 2)^2} = \\sqrt{2^2 + (-1)^2 + 1^2} = \\sqrt{6}$$
$$BC = \\sqrt{(5 - 3)^2 + (-3 - (-2))^2 + (4 - 3)^2} = \\sqrt{2^2 + (-1)^2 + 1^2} = \\sqrt{6}$$
$$AC = \\sqrt{(5 - 1)^2 + (-3 - (-1))^2 + (4 - 2)^2} = \\sqrt{4^2 + (-2)^2 + 2^2} = \\sqrt{16 + 4 + 4} = \\sqrt{24} = 2\\sqrt{6}$$
Since $AB + BC = \\sqrt{6} + \\sqrt{6} = 2\\sqrt{6} = AC$, the point $B$ lies on the line segment joining $A$ and $C$. Therefore, the points $A, B$, and $C$ are collinear.

---

### 3.2 Lines

#### 1. Directed Values of a Line Segment
The directed values of a line segment $PQ$ with terminals $P(x_1, y_1, z_1)$ and $Q(x_2, y_2, z_2)$ are:
$$\\langle PQ \\rangle = \\langle l, m, n \\rangle = \\langle x_2 - x_1, \\, y_2 - y_1, \\, z_2 - z_1 \\rangle$$

The length of the line segment $PQ$ is:
$$|PQ| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2} = \\sqrt{l^2 + m^2 + n^2}$$

#### 2. Equation of the Line
*   **Coordinate (Parametric) Form**:
    $$(x, y, z) = (x_1 + kl, \\, y_1 + km, \\, z_1 + kn)$$
*   **Symmetric Form**:
    $$\\frac{x - x_1}{l} = \\frac{y - y_1}{m} = \\frac{z - z_1}{n} \\quad (l \\neq 0, \\, m \\neq 0, \\, n \\neq 0)$$

---

##### Examples & Exercise 3.2 Solutions

###### **Example 2**
Given $P(1, 2, 3)$ and $Q(3, 6, 5)$, find the coordinates of the point $R(x, y, z)$ on the line $PQ$ with respect to the point $P$ for the following values of $k$:
(a) $k = \\frac{1}{2}$, (b) $k = 2$, (c) $k = -2$.

**Solution:**
$$\\langle PQ \\rangle = \\langle 3 - 1, \\, 6 - 2, \\, 5 - 3 \\rangle = \\langle 2, 4, 2 \\rangle$$
Coordinates of any point on the line $PQ$ are:
$$(x, y, z) = (1 + 2k, \\, 2 + 4k, \\, 3 + 2k)$$
*   **(a) When $k = \\frac{1}{2}$**:
    $$R(x, y, z) = \\left(1 + 2\\left(\\frac{1}{2}\\right), \\, 2 + 4\\left(\\frac{1}{2}\\right), \\, 3 + 2\\left(\\frac{1}{2}\\right)\\right) = \\mathbf{(2, 4, 4)}$$
*   **(b) When $k = 2$**:
    $$R(x, y, z) = (1 + 2(2), \\, 2 + 4(2), \\, 3 + 2(2)) = \\mathbf{(5, 10, 7)}$$
*   **(c) When $k = -2$**:
    $$R(x, y, z) = (1 + 2(-2), \\, 2 + 4(-2), \\, 3 + 2(-2)) = \\mathbf{(-3, -6, -1)}$$

###### **Exercise 3.2 Q1**
Given $P(3, 1, 5)$ and $Q(-3, 7, -2)$, find the coordinates of the point $R(x, y, z)$ on the line $PQ$ with respect to the point $P$ for the following values of $k$:
(a) $k = \\frac{1}{2}$, (b) $k = 3$, (c) $k = -2$.

**Solution:**
$$\\langle PQ \\rangle = \\langle -3 - 3, \\, 7 - 1, \\, -2 - 5 \\rangle = \\langle -6, 6, -7 \\rangle$$
Coordinates of any point on the line $PQ$ are:
$$(x, y, z) = (3 - 6k, \\, 1 + 6k, \\, 5 - 7k)$$
*   **(a) When $k = \\frac{1}{2}$**:
    $$R(x, y, z) = \\left(3 - 6\\left(\\frac{1}{2}\\right), \\, 1 + 6\\left(\\frac{1}{2}\\right), \\, 5 - 7\\left(\\frac{1}{2}\\right)\\right) = \\mathbf{\\left(0, 4, \\frac{3}{2}\\right)}$$
*   **(b) When $k = 3$**:
    $$R(x, y, z) = (3 - 6(3), \\, 1 + 6(3), \\, 5 - 7(3)) = \\mathbf{(-15, 19, -16)}$$
*   **(c) When $k = -2$**:
    $$R(x, y, z) = (3 - 6(-2), \\, 1 + 6(-2), \\, 5 - 7(-2)) = \\mathbf{(15, -11, 19)}$$

###### **Example 3**
Given $P(-1, 2, 3)$ and $Q(3, 5, -2)$, determine whether or not the following points are on the line $PQ$. If the point is on the line, find the corresponding parameter $k$:
(a) $\\left(1, \\frac{7}{2}, \\frac{1}{2}\\right)$, (b) $(7, 8, -7)$, (c) $(-5, -1, 8)$, (d) $(7, 8, -2)$.

**Solution:**
$$\\langle PQ \\rangle = \\langle 3 - (-1), \\, 5 - 2, \\, -2 - 3 \\rangle = \\langle 4, 3, -5 \\rangle$$
Any point on $PQ$ is of the form:
$$(x, y, z) = (-1 + 4k, \\, 2 + 3k, \\, 3 - 5k)$$
*   **(a)** If $(x,y,z) = \\left(1, \\frac{7}{2}, \\frac{1}{2}\\right)$:
    $$1 = -1 + 4k \\implies k = \\frac{1}{2}$$
    $$\\frac{7}{2} = 2 + 3k \\implies k = \\frac{1}{2}$$
    $$\\frac{1}{2} = 3 - 5k \\implies k = \\frac{1}{2}$$
    Since all $k$ values are equal, the point is **on the line** with **$k = \\frac{1}{2}$**.
*   **(b)** If $(x,y,z) = (7, 8, -7)$:
    $$7 = -1 + 4k \\implies k = 2$$
    $$8 = 2 + 3k \\implies k = 2$$
    $$-7 = 3 - 5k \\implies k = 2$$
    Since all $k$ are equal, the point is **on the line** with **$k = 2$**.
*   **(c)** If $(x,y,z) = (-5, -1, 8)$:
    $$-5 = -1 + 4k \\implies k = -1$$
    $$-1 = 2 + 3k \\implies k = -1$$
    $$8 = 3 - 5k \\implies k = -1$$
    Since all $k$ are equal, the point is **on the line** with **$k = -1$**.
*   **(d)** If $(x,y,z) = (7, 8, -2)$:
    $$7 = -1 + 4k \\implies k = 2$$
    $$8 = 2 + 3k \\implies k = 2$$
    $$-2 = 3 - 5k \\implies k = 1$$
    Since $2 \\neq 1$, the point is **NOT on the line**.

###### **Example 4**
Given $P(2, 1, 3)$ and $Q(6, -5, 3)$, determine whether or not the following points are on the line $PQ$. If the point is on the line, find the parameter $k$:
(a) $(4, -2, 3)$, (b) $(-2, 7, 3)$, (c) $(10, -11, 3)$, (d) $(1, 1, 3)$.

**Solution:**
$$\\langle PQ \\rangle = \\langle 6-2, \\, -5-1, \\, 3-3 \\rangle = \\langle 4, -6, 0 \\rangle$$
Line points: $(x,y,z) = (2 + 4k, \\, 1 - 6k, \\, 3)$
*   **(a)** $(4, -2, 3)$:
    $$4 = 2 + 4k \\implies k = \\frac{1}{2}$$
    $$-2 = 1 - 6k \\implies k = \\frac{1}{2}$$
    $$3 = 3 \\quad \\text{(always true)}$$
    The point is **on the line** with **$k = \\frac{1}{2}$**.
*   **(b)** $(-2, 7, 3)$:
    $$-2 = 2 + 4k \\implies k = -1$$
    $$7 = 1 - 6k \\implies k = -1$$
    $$3 = 3 \\quad \\text{(always true)}$$
    The point is **on the line** with **$k = -1$**.
*   **(c)** $(10, -11, 3)$:
    $$10 = 2 + 4k \\implies k = 2$$
    $$-11 = 1 - 6k \\implies k = 2$$
    $$3 = 3 \\quad \\text{(always true)}$$
    The point is **on the line** with **$k = 2$**.
*   **(d)** $(1, 1, 3)$:
    $$1 = 2 + 4k \\implies k = -\\frac{1}{4}$$
    $$1 = 1 - 6k \\implies k = 0$$
    Since $k$ values differ, the point is **NOT on the line**.

###### **Exercise 3.2 Q2**
Given $P(-2, 1, 3)$ and $Q(4, 4, -3)$, determine whether or not the following points are on the line $PQ$. If the point is on the line, find the parameter $k$:
(a) $(6, 3, -6)$, (b) $(6, 5, -5)$, (c) $(-4, 0, 5)$, (d) $(7, 8, -2)$.

**Solution:**
$$\\langle PQ \\rangle = \\langle 4 - (-2), \\, 4 - 1, \\, -3 - 3 \\rangle = \\langle 6, 3, -6 \\rangle$$
Line points: $(x,y,z) = (-2 + 6k, \\, 1 + 3k, \\, 3 - 6k)$
*   **(a)** $(6, 3, -6)$:
    $$6 = -2 + 6k \\implies k = \\frac{4}{3}$$
    $$3 = 1 + 3k \\implies k = \\frac{2}{3}$$
    Since $k$ values differ, the point is **NOT on the line**.
*   **(b)** $(6, 5, -5)$:
    $$6 = -2 + 6k \\implies k = \\frac{4}{3}$$
    $$5 = 1 + 3k \\implies k = \\frac{4}{3}$$
    $$-5 = 3 - 6k \\implies k = \\frac{4}{3}$$
    The point is **on the line** with **$k = \\frac{4}{3}$**.
*   **(c)** $(-4, 0, 5)$:
    $$-4 = -2 + 6k \\implies k = -\\frac{1}{3}$$
    $$0 = 1 + 3k \\implies k = -\\frac{1}{3}$$
    $$5 = 3 - 6k \\implies k = -\\frac{1}{3}$$
    The point is **on the line** with **$k = -\\frac{1}{3}$**.
*   **(d)** $(7, 8, -2)$:
    $$7 = -2 + 6k \\implies k = \\frac{3}{2}$$
    $$8 = 1 + 3k \\implies k = \\frac{7}{3}$$
    Since $k$ values differ, the point is **NOT on the line**.

###### **Exercise 3.2 Q3**
Given $P(3, 2, -1)$ and $Q(4, 2, 5)$, determine whether or not the following points are on the line $PQ$. If the point is on the line, find the parameter $k$:
(a) $(5, 2, 11)$, (b) $(2, 2, -7)$, (c) $\\left(\\frac{7}{2}, 2, 2\\right)$, (d) $(6, 2, 10)$.

**Solution:**
$$\\langle PQ \\rangle = \\langle 4 - 3, \\, 2 - 2, \\, 5 - (-1) \\rangle = \\langle 1, 0, 6 \\rangle$$
Line points: $(x, y, z) = (3 + k, \\, 2, \\, -1 + 6k)$
*   **(a)** $(5, 2, 11)$:
    $$5 = 3 + k \\implies k = 2$$
    $$11 = -1 + 6k \\implies k = 2$$
    Since $y=2$, the point is **on the line** with **$k = 2$**.
*   **(b)** $(2, 2, -7)$:
    $$2 = 3 + k \\implies k = -1$$
    $$-7 = -1 + 6k \\implies k = -1$$
    Since $y=2$, the point is **on the line** with **$k = -1$**.
*   **(c)** $\\left(\\frac{7}{2}, 2, 2\\right)$:
    $$\\frac{7}{2} = 3 + k \\implies k = \\frac{1}{2}$$
    $$2 = -1 + 6k \\implies k = \\frac{1}{2}$$
    Since $y=2$, the point is **on the line** with **$k = \\frac{1}{2}$**.
*   **(d)** $(6, 2, 10)$:
    $$6 = 3 + k \\implies k = 3$$
    $$10 = -1 + 6k \\implies k = \\frac{11}{6}$$
    Since $k$ values differ, the point is **NOT on the line**.

---

### 3.3 Parallel, Skew, and Perpendicular Lines

#### 1. Parallel Lines
$$\\langle PQ \\rangle = k \\langle OA \\rangle \\iff PQ \\parallel OA$$

#### 2. Skew Lines
In space, there are pairs of lines that are neither parallel nor intersect. These lines are called **skew lines**.

[DIAGRAM:SkewLinesDiagram]

#### 3. Angle Between Two Lines
Let the directed values of two lines be $\\langle l_1, m_1, n_1 \\rangle$ and $\\langle l_2, m_2, n_2 \\rangle$.
$$\\cos \\angle PAQ = \\frac{l_1 l_2 + m_1 m_2 + n_1 n_2}{\\sqrt{l_1^2 + m_1^2 + n_1^2}\\sqrt{l_2^2 + m_2^2 + n_2^2}}$$

#### 4. Perpendicular Lines
Two lines are perpendicular if and only if they intersect and:
$$l_1 l_2 + m_1 m_2 + n_1 n_2 = 0$$

---

##### Examples & Exercise 3.3 Solutions

###### **Example 5**
Given $P(2, 1, 3)$, $Q(6, -5, 4)$, $R(2, 3, 4)$, and $S(-1, 5, 1)$, determine whether the lines $PQ$ and $RS$ are parallel or skew or intersect.

**Solution:**
$$\\langle PQ \\rangle = \\langle 6-2, \\, -5-1, \\, 4-3 \\rangle = \\langle 4, -6, 1 \\rangle$$
$$\\langle RS \\rangle = \\langle -1-2, \\, 5-3, \\, 1-4 \\rangle = \\langle -3, 2, -3 \\rangle$$
Since $\\langle PQ \\rangle$ is not a scalar multiple of $\\langle RS \\rangle$, the lines are **not parallel**.
Coordinates of points on the lines:
$$PQ: (x,y,z) = (2 + 4s, \\, 1 - 6s, \\, 3 + s)$$
$$RS: (x,y,z) = (2 - 3t, \\, 3 + 2t, \\, 4 - 3t)$$
If they intersect:
$$2 + 4s = 2 - 3t \\implies 4s = -3t \\implies t = -\\frac{4s}{3}$$
$$1 - 6s = 3 + 2t \\implies -6s - 2 = 2t$$
Substitute $t = -\\frac{4s}{3}$:
$$-6s - 2 = 2\\left(-\\frac{4s}{3}\\right) \\implies -18s - 6 = -8s \\implies -10s = 6 \\implies s = -\\frac{3}{5}, \\, t = \\frac{4}{5}$$
Let's check the third coordinate:
$$3 + s = 3 - \\frac{3}{5} = \\frac{12}{5}$$
$$4 - 3t = 4 - 3\\left(\\frac{4}{5}\\right) = \\frac{8}{5}$$
Since $\\frac{12}{5} \\neq \\frac{8}{5}$, there is no common intersection point.
Therefore, the lines $PQ$ and $RS$ are **skew lines**.

###### **Example 6**
Given $P(0, 0, 1)$, $Q(3, 6, 4)$, $R(0, 3, 1)$, and $S(3, 0, 4)$, show that the lines $PQ$ and $RS$ are perpendicular.

**Solution:**
$$\\langle PQ \\rangle = \\langle 3, 6, 3 \\rangle, \\quad \\langle RS \\rangle = \\langle 3, -3, 3 \\rangle$$
For intersection:
$$PQ: (3s, \\, 6s, \\, 1+3s)$$
$$RS: (3t, \\, 3-3t, \\, 1+3t)$$
Setting coordinates equal:
$$3s = 3t \\implies s = t$$
$$6s = 3 - 3t \\implies 6s = 3 - 3s \\implies 9s = 3 \\implies s = \\frac{1}{3}, \\, t = \\frac{1}{3}$$
Check third coordinate:
$$1 + 3s = 1 + 3\\left(\\frac{1}{3}\\right) = 2$$
$$1 + 3t = 1 + 3\\left(\\frac{1}{3}\\right) = 2 \\quad \\text{(equal!)}$$
The lines intersect at $(1, 2, 2)$.
Now check the dot product of direction ratios:
$$l_1 l_2 + m_1 m_2 + n_1 n_2 = (3)(3) + (6)(-3) + (3)(3) = 9 - 18 + 9 = 0$$
Since the lines intersect and the sum of products of direction ratios is $0$, they are **perpendicular**.

###### **Example 7**
Find the equation of the line passing through $(-4, 7, -3)$ and perpendicular to the line $(x,y,z) = (3+2k, \\, -1+3k, \\, 1-k)$. Find also the point of intersection of the two lines.

**Solution:**
Directed values of given line: $\\langle 2, 3, -1 \\rangle$.
Directed values of required line from point $(-4,7,-3)$ to a point on the given line:
$$\\langle (3+2k) - (-4), \\, (-1+3k) - 7, \\, (1-k) - (-3) \\rangle = \\langle 7+2k, \\, -8+3k, \\, 4-k \\rangle$$
Since they are perpendicular:
$$2(7 + 2k) + 3(-8 + 3k) + (-1)(4 - k) = 0$$
$$14 + 4k - 24 + 9k - 4 + k = 0 \\implies 14k - 14 = 0 \\implies k = 1$$
So the directed values of the required line are:
$$\\langle 7+2(1), \\, -8+3(1), \\, 4-1 \\rangle = \\langle 9, -5, 3 \\rangle \\quad \\text{or} \\quad \\langle -9, 5, -3 \\rangle$$
The equation of the line is:
$$(x, y, z) = (-4 - 9t, \\, 7 + 5t, \\, -3 - 3t)$$
The point of intersection (when $k=1$ in given line) is:
$$(3+2(1), \\, -1+3(1), \\, 1-1) = \\mathbf{(5, 2, 0)}$$

###### **Exercise 3.3 Q1**
Find $\\cos \\angle PAQ$ for:
(a) $P(1, 2, -1)$, $A(-2, 1, 5)$, $Q(2, -1, 0)$
(b) $P(0, 2, -3)$, $A(2, -1, 5)$, $Q(-2, 3, -1)$

**Solution:**
*   **(a)** Directed values:
    $$\\langle AP \\rangle = \\langle 1 - (-2), \\, 2 - 1, \\, -1 - 5 \\rangle = \\langle 3, 1, -6 \\rangle$$
    $$\\langle AQ \\rangle = \\langle 2 - (-2), \\, -1 - 1, \\, 0 - 5 \\rangle = \\langle 4, -2, -5 \\rangle$$
    $$\\cos \\angle PAQ = \\frac{(3)(4) + (1)(-2) + (-6)(-5)}{\\sqrt{3^2+1^2+(-6)^2}\\sqrt{4^2+(-2)^2+(-5)^2}} = \\frac{12 - 2 + 30}{\\sqrt{46}\\sqrt{45}} = \\frac{40}{3\\sqrt{230}} \\approx \\mathbf{0.8792}$$
*   **(b)** Directed values:
    $$\\langle AP \\rangle = \\langle 0 - 2, \\, 2 - (-1), \\, -3 - 5 \\rangle = \\langle -2, 3, -8 \\rangle$$
    $$\\langle AQ \\rangle = \\langle -2 - 2, \\, 3 - (-1), \\, -1 - 5 \\rangle = \\langle -4, 4, -6 \\rangle$$
    $$\\cos \\angle PAQ = \\frac{(-2)(-4) + (3)(4) + (-8)(-6)}{\\sqrt{(-2)^2+3^2+(-8)^2}\\sqrt{(-4)^2+4^2+(-6)^2}} = \\frac{8 + 12 + 48}{\\sqrt{77}\\sqrt{68}} = \\frac{68}{\\sqrt{5236}} = \\frac{34}{\\sqrt{1309}} \\approx \\mathbf{0.9397}$$

###### **Exercise 3.3 Q2**
Determine whether the lines $PQ$ and $RS$ are parallel or skew or intersect. If they intersect, are they perpendicular?
(a) $P(1, 2, 3)$, $Q(4, 5, 6)$, $R(-2, 3, 5)$, $S(4, 9, 11)$
(b) $P(3, -1, -3)$, $Q(2, -3, 1)$, $R(3, -2, 5)$, $S(-1, -2, 1)$
(c) $P(4, -2, 5)$, $Q(-2, 6, 1)$, $R(-1, 1, 4)$, $S(3, 3, 2)$
(d) $P(-3, -1, 6)$, $Q(-1, 3, 0)$, $R(0, 6, 7)$, $S(-4, -4, -1)$

**Solution:**
*   **(a)** $\\langle PQ \\rangle = \\langle 3, 3, 3 \\rangle, \\, \\langle RS \\rangle = \\langle 6, 6, 6 \\rangle$. Since $\\langle PQ \\rangle = \\frac{1}{2} \\langle RS \\rangle$, the lines are **parallel**.
*   **(b)** $\\langle PQ \\rangle = \\langle -1, -2, 4 \\rangle, \\, \\langle RS \\rangle = \\langle -4, 0, -4 \\rangle$. Not parallel.
    $$PQ: (3-s, -1-2s, -3+4s)$$
    $$RS: (3-4t, -2, 5-4t)$$
    If they intersect, from $y$: $-1-2s = -2 \\implies s = \\frac{1}{2}$.
    From $x$: $3-s = 3-4t \\implies 3 - \\frac{1}{2} = 3-4t \\implies t = \\frac{1}{8}$.
    Check $z$: $-3+4s = -3+4(\\frac{1}{2}) = -1$.
    $$5-4t = 5-4(\\frac{1}{8}) = \\frac{9}{2}$$.
    Since $-1 \\neq \\frac{9}{2}$, the lines are **skew**.
*   **(c)** $\\langle PQ \\rangle = \\langle -6, 8, -4 \\rangle, \\, \\langle RS \\rangle = \\langle 4, 2, -2 \\rangle$. Not parallel.
    $$PQ: (4-6s, -2+8s, 5-4s)$$
    $$RS: (-1+4t, 1+2t, 4-2t)$$
    Solving: $4-6s = -1+4t \\implies 5 - 6s = 4t$
    $-2+8s = 1+2t \\implies -3+8s = 2t$
    Substituting $t = 2s - \\frac{1}{2}$ into second equation gives $s = \\frac{1}{2}, \\, t = \\frac{1}{2}$.
    Both coordinates give intersection point $(1, 2, 3)$.
    Checking dot product: $(-6)(4) + (8)(2) + (-4)(-2) = -24 + 16 + 8 = 0$.
    They intersect and are **perpendicular**.
*   **(d)** $\\langle PQ \\rangle = \\langle 2, 4, -6 \\rangle, \\, \\langle RS \\rangle = \\langle -4, -10, -8 \\rangle$. Not parallel.
    $$PQ: (-3+2s, -1+4s, 6-6s)$$
    $$RS: (-4t, 6-10t, 7-8t)$$
    Solving gives $s = \\frac{1}{2}, \\, t = \\frac{1}{2}$ with intersection point $(-2, 1, 3)$.
    Checking dot product: $(2)(-4) + (4)(-10) + (-6)(-8) = -8 - 40 + 48 = 0$.
    They intersect and are **perpendicular**.

###### **Exercise 3.3 Q3**
Find the equation of the line passing through $(8, -1, -10)$ and perpendicular to the line $(x,y,z) = (1+2k, \\, 2-k, \\, 3-7k)$. Find also the point of intersection of the two lines.

**Solution:**
Directed values of given line: $\\langle 2, -1, -7 \\rangle$.
Directed values of required line:
$$\\langle 8 - (1+2k), \\, -1 - (2-k), \\, -10 - (3-7k) \\rangle = \\langle 7-2k, \\, -3+k, \\, -13+7k \\rangle$$
Perpendicular check:
$$2(7 - 2k) + (-1)(-3 + k) + (-7)(-13 + 7k) = 0$$
$$14 - 4k + 3 - k + 91 - 49k = 0 \\implies 108 - 54k = 0 \\implies k = 2$$
Directed values of required line (when $k=2$):
$$\\langle 7-2(2), \\, -3+2, \\, -13+7(2) \\rangle = \\langle 3, -1, 1 \\rangle$$
The equation of the line is:
$$(x, y, z) = (8 + 3t, \\, -1 - t, \\, -10 + t)$$
The point of intersection (when $k=2$ in given line) is:
$$(1+2(2), \\, 2-2, \\, 3-7(2)) = \\mathbf{(5, 0, -11)}$$

---

### 3.4 Planes

#### 1. Equation of a Plane
If a plane contains points $A$, $B$, and $C$, we can write its equation using directed values:
$$\\langle AB \\rangle = \\langle l_1, m_1, n_1 \\rangle \\quad \\text{and} \\quad \\langle AC \\rangle = \\langle l_2, m_2, n_2 \\rangle$$
The coefficients of the plane equation $ax + by + cz = d$ are:
$$a = m_1 n_2 - m_2 n_1$$
$$b = n_1 l_2 - n_2 l_1$$
$$c = l_1 m_2 - l_2 m_1$$
$$d = ax_1 + by_1 + cz_1$$

---

##### Examples & Exercise 3.4 Solutions

###### **Example 8**
Find the equation of the plane containing $A(1, 0, 1)$, $B(3, 6, 4)$, and $C(-2, 3, 1)$.

**Solution:**
$$\\langle AB \\rangle = \\langle 2, 6, 3 \\rangle, \\quad \\langle AC \\rangle = \\langle -3, 3, 0 \\rangle$$
$$a = (6)(0) - (3)(3) = -9$$
$$b = (3)(-3) - (0)(2) = -9$$
$$c = (2)(3) - (-3)(6) = 24$$
Using point $A(1, 0, 1)$:
$$-9x - 9y + 24z = d \\implies d = -9(1) - 9(0) + 24(1) = 15$$
$$-9x - 9y + 24z = 15 \\implies \\mathbf{3x + 3y - 8z = -5}$$

###### **Exercise 3.4 Q1**
Find the equation of the plane containing:
(a) $A(2, -5, 4)$, $B(-5, 2, 4)$, and $C(-2, 3, -1)$
(b) $A(4, 2, -3)$, $B(1, -2, 4)$, and $C(-1, 0, 3)$

**Solution:**
*   **(a)** $\\langle AB \\rangle = \\langle -7, 7, 0 \\rangle, \\, \\langle AC \\rangle = \\langle -4, 8, -5 \\rangle$.
    $$a = 7(-5) - 8(0) = -35$$
    $$b = 0(-4) - (-5)(-7) = -35$$
    $$c = (-7)(8) - (-4)(7) = -28$$
    Using $A(2, -5, 4)$:
    $$-35x - 35y - 28z = d \\implies d = -35(2) - 35(-5) - 28(4) = -7$$
    $$-35x - 35y - 28z = -7 \\implies \\mathbf{5x + 5y + 4z = 1}$$
*   **(b)** $\\langle AB \\rangle = \\langle -3, -4, 7 \\rangle, \\, \\langle AC \\rangle = \\langle -5, -2, 6 \\rangle$.
    $$a = (-4)(6) - (-2)(7) = -10$$
    $$b = (7)(-5) - (6)(-3) = -17$$
    $$c = (-3)(-2) - (-5)(-4) = -14$$
    Using $A(4, 2, -3)$:
    $$-10x - 17y - 14z = d \\implies d = -10(4) - 17(2) - 14(-3) = -32$$
    $$-10x - 17y - 14z = -32 \\implies \\mathbf{10x + 17y + 14z = 32}$$

###### **Example 9**
Find the equation of the line through the point $(-1, 3, 2)$ and perpendicular to the plane $3x - 2y - z = 3$. Find the point of intersection of the line and plane.

**Solution:**
Directed values perpendicular to the plane: $\\langle 3, -2, -1 \\rangle$.
Equation of the line:
$$\\frac{x + 1}{3} = \\frac{y - 3}{-2} = \\frac{z - 2}{-1} = k$$
$$(x, y, z) = (-1 + 3k, \\, 3 - 2k, \\, 2 - k)$$
Since point $P$ lies on the plane:
$$3(-1 + 3k) - 2(3 - 2k) - (2 - k) = 3$$
$$-3 + 9k - 6 + 4k - 2 + k = 3 \\implies 14k - 11 = 3 \\implies 14k = 14 \\implies k = 1$$
Intersection point:
$$P = (-1 + 3(1), \\, 3 - 2(1), \\, 2 - 1) = \\mathbf{(2, 1, 1)}$$

###### **Exercise 3.4 Q2**
Find the equation of the line that passes through $(3, -2, -2)$ and perpendicular to the plane $-2x + 3y - z = 4$. Find the point of intersection of the line and the given plane.

**Solution:**
Directed values: $\\langle -2, 3, -1 \\rangle$.
Equation of the line:
$$\\frac{x - 3}{-2} = \\frac{y + 2}{3} = \\frac{z + 2}{-1} = k$$
$$(x, y, z) = (3 - 2k, \\, -2 + 3k, \\, -2 - k)$$
Substitute into plane:
$$-2(3 - 2k) + 3(-2 + 3k) - (-2 - k) = 4$$
$$-6 + 4k - 6 + 9k + 2 + k = 4 \\implies 14k - 10 = 4 \\implies 14k = 14 \\implies k = 1$$
Intersection point:
$$P = (3 - 2(1), \\, -2 + 3(1), \\, -2 - 1) = \\mathbf{(1, 1, -3)}$$

###### **Example 10**
Find the equation of the plane containing the point $(-1, 3, 2)$ and parallel to the plane $3x - 2y - 3z = 2$.

**Solution:**
Parallel planes have the same normal vector $\\langle 3, -2, -3 \\rangle$.
Equation: $3x - 2y - 3z = d$
Using point $(-1, 3, 2)$:
$$d = 3(-1) - 2(3) - 3(2) = -15$$
Equation: **$3x - 2y - 3z = -15$**

###### **Exercise 3.4 Q3**
Find the equation of the plane containing the point $(2, 3, -1)$ and parallel to the plane $-2x + y + 3z = 6$.

**Solution:**
Parallel plane: $-2x + y + 3z = d$
Using point $(2, 3, -1)$:
$$d = -2(2) + 3 + 3(-1) = -4$$
Equation: **$-2x + y + 3z = -4$**

---

### 3.5 Spheres

#### 1. Equation of the Sphere
*   **Standard Form**:
    $$(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$$
*   **General Form**:
    $$x^2 + y^2 + z^2 + 2ux + 2vy + 2wz + d = 0$$
    with Center $= (-u, -v, -w)$ and Radius $r = \\sqrt{u^2 + v^2 + w^2 - d}$.

#### 2. Tangent Plane to a Sphere
The equation of the tangent plane at $(x_0, y_0, z_0)$ is:
$$(x_0 - x_1)(x - x_1) + (y_0 - y_1)(y - y_1) + (z_0 - z_1)(z - z_1) = r^2$$

---

##### Examples & Exercise 3.5 Solutions

###### **Example 11**
Find the equation of the plane tangent to the sphere $(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 14$ at the point $(3, 4, 1)$.

**Solution:**
Center of the sphere is $C(2, 1, -1)$.
Directed values of radius $CP$ are: $\\langle 3 - 2, \\, 4 - 1, \\, 1 - (-1) \\rangle = \\langle 1, 3, 2 \\rangle$.
This is the normal vector to the tangent plane.
Equation: $x + 3y + 2z = d$
Using point $P(3, 4, 1)$:
$$d = 3 + 3(4) + 2(1) = 17$$
Equation: **$x + 3y + 2z = 17$**

[DIAGRAM:SpherePlaneTangentDiagram]

###### **Exercise 3.5 Q1**
Find the equation of the sphere with center $C$ and radius $r$:
(a) $C(1, -2, 4)$, $r = 3$
(b) $C(2, 6, -3)$, $r = 2$
(c) $C(2, 3, 5)$, $r = 5$

**Solution:**
*   **(a)** **$(x - 1)^2 + (y + 2)^2 + (z - 4)^2 = 9$**
*   **(b)** **$(x - 2)^2 + (y - 6)^2 + (z + 3)^2 = 4$**
*   **(c)** **$(x - 2)^2 + (y - 3)^2 + (z - 5)^2 = 25$**

###### **Exercise 3.5 Q2**
Check whether the given point $P$ lies inside, outside or on the sphere centered at $C(0, 0, 0)$ with radius $r = 3$:
(a) $P(1, 1, 1)$, (b) $P(2, 1, 2)$, (c) $P(10, 10, 10)$

**Solution:**
*   **(a)** $CP = \\sqrt{1^2+1^2+1^2} = \\sqrt{3} < 3 \\implies$ **Inside** the sphere.
*   **(b)** $CP = \\sqrt{2^2+1^2+2^2} = \\sqrt{9} = 3 \\implies$ **On** the sphere.
*   **(c)** $CP = \\sqrt{10^2+10^2+10^2} = \\sqrt{300} = 10\\sqrt{3} > 3 \\implies$ **Outside** the sphere.

###### **Exercise 3.5 Q3**
Find the equation of the sphere on the join of $(1, -1, 1)$ and $(-3, 4, 5)$ as diameter.

**Solution:**
Center is the midpoint of the diameter:
$$C = \\left(\\frac{1 + (-3)}{2}, \\, \\frac{-1 + 4}{2}, \\, \\frac{1 + 5}{2}\\right) = \\left(-1, \\, \\frac{3}{2}, \\, 3\\right)$$
Length of diameter $AB = \\sqrt{(-3 - 1)^2 + (4 - (-1))^2 + (5 - 1)^2} = \\sqrt{16 + 25 + 16} = \\sqrt{57}$
Radius $r = \\frac{\\sqrt{57}}{2} \\implies r^2 = \\frac{57}{4}$
Equation: **$(x + 1)^2 + \\left(y - \\frac{3}{2}\\right)^2 + (z - 3)^2 = \\frac{57}{4}$**

###### **Exercise 3.5 Q4**
Find the equation of the plane tangent to the sphere $(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 27$ at the point $(3, 2, -2)$.

**Solution:**
Center is $C(-2, 1, -3)$.
Directed values $CP = \\langle 3 - (-2), \\, 2 - 1, \\, -2 - (-3) \\rangle = \\langle 5, 1, 1 \\rangle$.
Equation: $5x + y + z = d$
Using point $(3, 2, -2)$:
$$d = 5(3) + 2 + (-2) = 15$$
Equation: **$5x + y + z = 15$**

###### **Example 12**
Find the equation of the sphere with center $(0, 1, 0)$ and touching the plane $x - 2y + 2z + 5 = 0$.

**Solution:**
Perpendicular distance from $(0, 1, 0)$ to the plane is the radius $r$:
$$r = \\frac{|(0) - 2(1) + 2(0) + 5|}{\\sqrt{1^2 + (-2)^2 + 2^2}} = \\frac{|3|}{\\sqrt{9}} = 1$$
Sphere equation: **$x^2 + (y - 1)^2 + z^2 = 1$**

###### **Exercise 3.5 Q5**
Find the equation of the sphere with center $(6, -7, -3)$ and touching the plane $4x - 2y - z = 17$.

**Solution:**
Perpendicular distance (radius $r$):
Using direct geometric projection, the tangent point $R$ has coordinates $k = -\\frac{8}{7}$ where it touches.
Solving for distance yields radius $r = \\sqrt{\\frac{64}{21}}$.
Sphere equation: **$(x - 6)^2 + (y + 7)^2 + (z + 3)^2 = \\frac{64}{21}$**

###### **Exercise 3.5 Q6**
What is the equation of the sphere which passes through the points $(3, 0, 2)$, $(-1, 1, 1)$, and $(2, -5, 4)$ and whose center lies on the plane $2x + 3y + 4z = 6$?

**Solution:**
Let center be $C(x_1, y_1, z_1)$. Since it lies on the plane:
$$2x_1 + 3y_1 + 4z_1 = 6 \\quad \\text{--- (4)}$$
Equating distances from center to $(3,0,2)$ and $(-1,1,1)$:
$$(3 - x_1)^2 + (0 - y_1)^2 + (2 - z_1)^2 = (-1 - x_1)^2 + (1 - y_1)^2 + (1 - z_1)^2$$
Simplifying yields:
$$-4x_1 + y_1 - z_1 = -5 \\quad \\text{--- (5)}$$
Adding $2 \\times$ (4) to (5) eliminates $x_1$:
$$7y_1 + 7z_1 = 7 \\implies y_1 + z_1 = 1 \\quad \\text{--- (6)}$$
Similarly, equating $(3,0,2)$ and $(2,-5,4)$ and combining equations:
$$x_1 = 0, \\, y_1 = -2, \\, z_1 = 3$$
Center $C(0, -2, 3)$.
Radius $r^2 = (3 - 0)^2 + (0 - (-2))^2 + (2 - 3)^2 = 9 + 4 + 1 = 14$.
Sphere equation: **$x^2 + (y + 2)^2 + (z - 3)^2 = 14$**

###### **Example 13**
Find the equation of a sphere that passes through the points $(9, 0, 0)$, $(3, 13, 5)$, and $(11, 0, 10)$, given that its center lies on the $yz$-plane.

**Solution:**
Since the center lies on the $yz$-plane, its $x$-coordinate is $0$. Let center be $C(0, y_1, z_1)$.
Equating distances from $C$ to $(9,0,0)$ and $(11,0,10)$:
$$9^2 + y_1^2 + z_1^2 = 11^2 + y_1^2 + (10 - z_1)^2$$
$$81 = 121 + 100 - 20z_1 \\implies 20z_1 = 140 \\implies z_1 = 7$$
Equating distances to $(9,0,0)$ and $(3,13,5)$ with $z_1 = 7$:
$$81 + y_1^2 + 49 = 3^2 + (13 - y_1)^2 + (5 - 7)^2$$
$$130 = 9 + 169 - 26y_1 + 4 \\implies 26y_1 = 52 \\implies y_1 = 2$$
Center $C(0, 2, 7)$.
Radius $r^2 = 81 + 2^2 + 7^2 = 81 + 4 + 49 = 134$.
Sphere equation: **$x^2 + (y - 2)^2 + (z - 7)^2 = 134$**`,
    formulas: [
      {
        id: "c3-f1",
        name: "3D Distance Formula",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}",
        description: "Calculates the straight-line distance between two points $P_1(x_1,y_1,z_1)$ and $P_2(x_2,y_2,z_2)$ in space."
      },
      {
        id: "c3-f2",
        name: "Direction Cosines Fundamental Relation",
        latex: "l^2 + m^2 + n^2 = 1",
        description: "For direction angles $\\alpha, \\beta, \\gamma$ with coordinate axes, $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$."
      },
      {
        id: "c3-f3",
        name: "Symmetric Equation of a Line",
        latex: "\\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c}",
        description: "Represents a straight line in 3D through point $(x_1, y_1, z_1)$ with direction ratios $(a, b, c)$."
      },
      {
        id: "c3-f4",
        name: "Cartesian Equation of a Plane",
        latex: "ax + by + cz = d",
        description: "The general flat plane where the coefficients $(a,b,c)$ represent the perpendicular Normal Vector coordinates."
      },
      {
        id: "c3-f5",
        name: "Standard Equation of a Sphere",
        latex: "(x-x_1)^2 + (y-y_1)^2 + (z-z_1)^2 = r^2",
        description: "A sphere centered at $(x_1, y_1, z_1)$ with radius $r$."
      },
      {
        id: "c3-f6",
        name: "Sphere Radius from General Form",
        latex: "r = \\sqrt{u^2 + v^2 + w^2 - d}",
        description: "Finds the radius of a sphere written in general polynomial form: $x^2 + y^2 + z^2 + 2ux + 2vy + 2wz + d = 0$."
      }
    ],
    quiz: [
      {
        id: "c3-q1",
        questionText: "Find the distance between the points $A(1, 2, 3)$ and $B(4, 6, 3)$.",
        options: ["$3$", "$5$", "$2\\sqrt{5}$", "$\\sqrt{13}$"],
        correctAnswerIndex: 1,
        explanation: "Using the distance formula: $d = \\sqrt{(4-1)^2 + (6-2)^2 + (3-3)^2} = \\sqrt{3^2 + 4^2 + 0^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
      },
      {
        id: "c3-q2",
        questionText: "What do the coefficients $(a, b, c)$ represent in the plane equation $ax + by + cz = d$?",
        options: [
          "A point on the plane",
          "The coordinate intercepts with the axes",
          "The direction ratios of the normal vector to the plane",
          "The angles the plane makes with the coordinate axes"
        ],
        correctAnswerIndex: 2,
        explanation: "The coefficients $(a, b, c)$ represent the components of the normal vector, which is a vector perpendicular to the surface of the plane."
      },
      {
        id: "c3-q3",
        questionText: "Which of the following points represents the projection of $P(3, -4, 5)$ onto the $yz$-plane?",
        options: [
          "$(3, 0, 0)$",
          "$(3, -4, 0)$",
          "$(0, -4, 5)$",
          "$(0, 0, 5)$"
        ],
        correctAnswerIndex: 2,
        explanation: "On the $yz$-plane, the $x$-coordinate is always $0$. Thus, projecting $(3, -4, 5)$ onto $yz$-plane yields $(0, -4, 5)$."
      },
      {
        id: "c3-q4",
        questionText: "If a line has direction cosines $l = 1/2$ and $m = 1/2$, find the absolute value of the third direction cosine $n$.",
        options: [
          "$1/4$",
          "$1/2$",
          "$\\sqrt{2}/2$",
          "$\\sqrt{3}/2$"
        ],
        correctAnswerIndex: 2,
        explanation: "Since $l^2 + m^2 + n^2 = 1$, we have $(1/2)^2 + (1/2)^2 + n^2 = 1 \\implies 1/4 + 1/4 + n^2 = 1 \\implies n^2 = 1/2 \\implies |n| = \\sqrt{1/2} = \\sqrt{2}/2$."
      },
      {
        id: "c3-q5",
        questionText: "Find the center and radius of the sphere represented by: $x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0$.",
        options: [
          "Center $(1, -2, 3)$, Radius $4$",
          "Center $(-1, 2, -3)$, Radius $4$",
          "Center $(1, -2, 3)$, Radius $16$",
          "Center $(-2, 4, -6)$, Radius $2$"
        ],
        correctAnswerIndex: 0,
        explanation: "Rearranging by completing the squares: $(x-1)^2 + (y+2)^2 + (z-3)^2 - 1 - 4 - 9 - 2 = 0 \\implies (x-1)^2 + (y+2)^2 + (z-3)^2 = 16$. So the center is $(1, -2, 3)$ and the radius is $\\sqrt{16} = 4$."
      },
      {
        id: "c3-q6",
        questionText: "If lines $L_1$ with direction ratios $\\langle 1, 2, k \\rangle$ and $L_2$ with direction ratios $\\langle -2, 1, 3 \\rangle$ are perpendicular, find the value of $k$.",
        options: [
          "$0$",
          "$1$",
          "$-1$",
          "$2$"
        ],
        correctAnswerIndex: 0,
        explanation: "For perpendicular lines, the sum of products of direction ratios is $0$: $(1)(-2) + (2)(1) + (k)(3) = 0 \\implies -2 + 2 + 3k = 0 \\implies 3k = 0 \\implies k = 0$."
      }
    ],
    visualizerType: "solid-geometry"
  },
  {
    id: 4,
    title: "Vector Algebra",
    tagline: "Unlocking spatial reasoning using vectors, dot products, and cross products.",
    description: "This chapter covers vector representations in 3D space, position vectors, direction, operations like vector addition, dot products, cross products, and their physical applications.",
    content: `A **Vector** is a mathematical object that has both **magnitude** and **direction**. It is commonly represented as an arrow from an initial point to a terminal point.

### 1. Component Form of a Vector
In 3D Cartesian coordinates, any vector $\\mathbf{a}$ can be decomposed into unit vectors along the coordinate axes: $\\mathbf{i}$, $\\mathbf{j}$, and $\\mathbf{k}$:
$$\\mathbf{a} = a_x\\mathbf{i} + a_y\\mathbf{j} + a_z\\mathbf{k}$$
The magnitude of $\\mathbf{a}$ is:
$$|\\mathbf{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$$

### 2. The Dot Product (Scalar Product)
The dot product of two vectors $\\mathbf{a}$ and $\\mathbf{b}$ yields a scalar:
$$\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}| |\\mathbf{b}| \\cos \\theta$$
where $\\theta$ is the angle between the vectors ($0 \\le \\theta \\le \\pi$).
In component form:
$$\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y + a_z b_z$$
- **Orthogonality:** If $\\mathbf{a}$ and $\\mathbf{b}$ are non-zero, then $\\mathbf{a} \\cdot \\mathbf{b} = 0$ if and only if they are perpendicular (orthogonal).

### 3. The Cross Product (Vector Product)
The cross product of two vectors $\\mathbf{a}$ and $\\mathbf{b}$ yields a **new vector** perpendicular to both:
$$\\mathbf{a} \\times \\mathbf{b} = (|\\mathbf{a}| |\\mathbf{b}| \\sin \\theta) \\mathbf{n}$$
where $\\mathbf{n}$ is a unit vector perpendicular to the plane containing $\\mathbf{a}$ and $\\mathbf{b}$, with its direction determined by the right-hand rule.
In determinant form:
$$\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix}$$
- **Area of a Parallelogram:** The magnitude $|\\mathbf{a} \\times \\mathbf{b}|$ is equal to the area of the parallelogram formed by $\\mathbf{a}$ and $\\mathbf{b}$.`,
    formulas: [
      {
        id: "c4-f1",
        name: "Vector Magnitude",
        latex: "|\\mathbf{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}",
        description: "The length of vector $\\mathbf{a}$."
      },
      {
        id: "c4-f2",
        name: "Dot Product",
        latex: "\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y + a_z b_z = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta",
        description: "The scalar product, used to find angles and check for perpendicular vectors."
      },
      {
        id: "c4-f3",
        name: "Cross Product Determinant",
        latex: "\\mathbf{a} \\times \\mathbf{b} = \\det \\begin{pmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{pmatrix}",
        description: "The vector product, perpendicular to both input vectors."
      }
    ],
    quiz: [
      {
        id: "c4-q1",
        questionText: "Find the dot product of $\\mathbf{a} = 2\\mathbf{i} + 3\\mathbf{j} - \\mathbf{k}$ and $\\mathbf{b} = \\mathbf{i} - 2\\mathbf{j} + 2\\mathbf{k}$.",
        options: ["$-6$", "$6$", "$-4$", "$0$"],
        correctAnswerIndex: 0,
        explanation: "Use the dot product formula: $\\mathbf{a} \\cdot \\mathbf{b} = (2)(1) + (3)(-2) + (-1)(2) = 2 - 6 - 2 = -6$."
      },
      {
        id: "c4-q2",
        questionText: "If $\\mathbf{a} \\cdot \\mathbf{b} = 0$, what can you say about the non-zero vectors $\\mathbf{a}$ and $\\mathbf{b}$?",
        options: ["They are parallel", "They are orthogonal (perpendicular)", "They have equal magnitudes", "They are opposite in direction"],
        correctAnswerIndex: 1,
        explanation: "Since $\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta$, a dot product of zero implies $\\cos\\theta = 0$, which means $\\theta = 90^\\circ$ (they are perpendicular)."
      }
    ],
    visualizerType: "vector-calc"
  },
  {
    id: 5,
    title: "Permutations and Combinations",
    tagline: "Mastering the rules of systematic counting, arrangements, and selection.",
    description: "This chapter covers the Fundamental Counting Principle, factorials, permutations (arranging items where order matters), combinations (selecting items where order does not matter), and resolving circular permutations.",
    content: `**Combinatorics** is the branch of mathematics dealing with counting, arrangement, and combinations of objects.

### 1. Fundamental Counting Principle
If one event can occur in $m$ ways, and a second event can occur in $n$ ways independently, then the two events can occur in sequence in:
$$m \\times n \\text{ ways.}$$

### 2. Factorial Notation
For any positive integer $n$:
$$n! = n \\times (n-1) \\times (n-2) \\times \\dots \\times 2 \\times 1$$
By definition, $0! = 1$.

### 3. Permutations (Order Matters)
A **Permutation** is an arrangement of a set of items in a specific order. The number of ways to arrange $r$ items selected from a pool of $n$ distinct items is:
$$P(n, r) = \\frac{n!}{(n-r)!}$$

*Key Subtypes:*
- **Circular Permutations:** The number of ways to arrange $n$ distinct objects in a circle is $(n-1)!$.
- **Permutations with Repetitions:** If there are $n$ items where $p$ items are of type 1, $q$ items of type 2, the arrangements equal $\\frac{n!}{p! q!}$.

### 4. Combinations (Order Does NOT Matter)
A **Combination** is a selection of items where the order of selection is irrelevant (e.g., choosing a committee). The number of ways to select $r$ items from $n$ distinct items is:
$$C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$

*Crucial Identity:*
$$\\binom{n}{r} = \\binom{n}{n-r}$$`,
    formulas: [
      {
        id: "c5-f1",
        name: "Permutations Formula",
        latex: "P(n, r) = \\frac{n!}{(n-r)!}",
        description: "Number of ordered arrangements of $r$ objects from $n$ unique objects."
      },
      {
        id: "c5-f2",
        name: "Combinations Formula",
        latex: "C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}",
        description: "Number of unordered selections of $r$ objects from $n$ unique objects."
      },
      {
        id: "c5-f3",
        name: "Circular Permutations",
        latex: "P_{\\text{circular}} = (n - 1)!",
        description: "Arranging $n$ objects in a closed circle (removing rotational redundancy)."
      }
    ],
    quiz: [
      {
        id: "c5-q1",
        questionText: "How many ways can a president, vice president, and secretary be chosen from a class of 10 students?",
        options: ["$120$", "$720$", "$1000$", "$30$"],
        correctAnswerIndex: 1,
        explanation: "Since the roles are distinct, order matters (this is a permutation). We calculate $P(10, 3) = \\frac{10!}{(10-3)!} = \\frac{10!}{7!} = 10 \\times 9 \\times 8 = 720$."
      },
      {
        id: "c5-q2",
        questionText: "How many different 5-card hands can be chosen from a standard deck of 52 cards?",
        options: ["$2,598,960$", "$311,875,200$", "$270,725$", "$\\binom{52}{5}$"],
        correctAnswerIndex: 0,
        explanation: "Since the order of cards in a hand doesn't matter, this is a combination: $C(52, 5) = \\frac{52!}{5!(52-5)!} = 2,598,960$."
      }
    ],
    visualizerType: "perm-comb"
  },
  {
    id: 6,
    title: "Conic Sections",
    tagline: "Exploring curves formed by the intersection of a cone and a plane.",
    description: "This chapter covers the geometric definitions and standard equations of curves including circles, parabolas, ellipses, and hyperbolas, and their features (foci, vertices, directrices).",
    content: `**Conic Sections** are curves obtained by intersecting a double-napped right circular cone with a flat plane. Depending on the angle of the plane, we obtain four distinct shapes:

### 1. The Circle
Formed when the plane cuts perpendicular to the axis of the cone.
Standard equation centered at $(h, k)$ with radius $r$:
$$(x - h)^2 + (y - k)^2 = r^2$$

### 2. The Parabola
Formed when the plane is parallel to a generator line of the cone. It represents the set of all points equidistant from a fixed point (focus) and a fixed line (directrix).
Standard equation opening horizontally:
$$y^2 = 4ax \\quad (a > 0)$$
- **Focus:** $(a, 0)$
- **Directrix:** $x = -a$

### 3. The Ellipse
Formed when the plane slices through one nap at an angle. The sum of the distances from any point on the ellipse to two fixed points (foci) is constant ($2a$).
Standard equation centered at $(0, 0)$ with major axis along the $x$-axis:
$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (a > b)$$
- **Eccentricity:** $e = \\sqrt{1 - \\frac{b^2}{a^2}} < 1$
- **Foci:** $(\\pm ae, 0)$

### 4. The Hyperbola
Formed when the plane slices through both naps of the cone. The difference of the distances from any point to two fixed foci is constant ($2a$).
Standard equation centered at $(0, 0)$:
$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$$
- **Eccentricity:** $e = \\sqrt{1 + \\frac{b^2}{a^2}} > 1$
- **Asymptotes:** $y = \\pm \\frac{b}{a} x$`,
    formulas: [
      {
        id: "c6-f1",
        name: "Circle Equation",
        latex: "(x-h)^2 + (y-k)^2 = r^2",
        description: "Equation of a circle with center $(h, k)$ and radius $r$."
      },
      {
        id: "c6-f2",
        name: "Parabola Equation",
        latex: "y^2 = 4ax",
        description: "Parabola symmetric to the x-axis, vertex at $(0, 0)$, focus at $(a, 0)$."
      },
      {
        id: "c6-f3",
        name: "Ellipse Equation",
        latex: "\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (a > b)",
        description: "Horizontal ellipse centered at origin with semi-major axis $a$ and semi-minor axis $b$."
      },
      {
        id: "c6-f4",
        name: "Hyperbola Equation",
        latex: "\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1",
        description: "Horizontal hyperbola with asymptotes $y = \\pm \\frac{b}{a}x$."
      }
    ],
    quiz: [
      {
        id: "c6-q1",
        questionText: "What is the focus of the parabola $y^2 = 12x$?",
        options: ["$(12, 0)$", "$(3, 0)$", "$(0, 3)$", "$(6, 0)$"],
        correctAnswerIndex: 1,
        explanation: "Compare $y^2 = 12x$ with $y^2 = 4ax$. We find $4a = 12 \\implies a = 3$. The focus is $(a, 0) = (3, 0)$."
      },
      {
        id: "c6-q2",
        questionText: "What is the eccentricity $e$ of a circle?",
        options: ["$e = 1$", "$e > 1$", "$e = 0$", "$0 < e < 1$"],
        correctAnswerIndex: 2,
        explanation: "For a circle, the two foci merge into a single center, meaning the distance between them is zero. Thus, the eccentricity $e = 0$."
      }
    ],
    visualizerType: "conic-explorer"
  },
  {
    id: 7,
    title: "Trigonometric Functions",
    tagline: "Analyzing periodic behaviors, identities, and wave equations.",
    description: "This chapter covers trigonometric definitions on the unit circle, fundamental identities, double-angle and half-angle formulas, addition formulas, periodic properties, and graphing.",
    content: `**Trigonometry** is the study of relationship between side lengths and angles of triangles, extended to periodic functions on the unit circle.

### 1. Circular Definitions
In a unit circle (radius $= 1$), any angle $\\theta$ corresponds to a point $(x, y) = (\\cos\\theta, \\sin\\theta)$.
- $\\tan \\theta = \\frac{\\sin\\theta}{\\cos\\theta}$
- $\\sec \\theta = \\frac{1}{\\cos\\theta}$
- $\\csc \\theta = \\frac{1}{\\sin\\theta}$
- $\\cot \\theta = \\frac{\\cos\\theta}{\\sin\\theta}$

### 2. Pythagorean Identities
The coordinate relation $x^2 + y^2 = 1$ leads directly to:
$$\\sin^2 \\theta + \\cos^2 \\theta = 1$$
Dividing by $\\cos^2 \\theta$ and $\\sin^2 \\theta$ gives:
$$1 + \\tan^2 \\theta = \\sec^2 \\theta$$
$$1 + \\cot^2 \\theta = \\csc^2 \\theta$$

### 3. Compound Angle Formulas
$$\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B$$
$$\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B$$
$$\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}$$

### 4. Double Angle Formulas
Setting $B = A$ in the compound angle formulas yields:
$$\\sin 2\\theta = 2 \\sin \\theta \\cos \\theta$$
$$\\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta = 2\\cos^2 \\theta - 1 = 1 - 2\\sin^2 \\theta$$
$$\\tan 2\\theta = \\frac{2\\tan\\theta}{1 - \\tan^2 \\theta}$$`,
    formulas: [
      {
        id: "c7-f1",
        name: "Pythagorean Identity",
        latex: "\\sin^2 \\theta + \\cos^2 \\theta = 1",
        description: "The fundamental identity relating sine and cosine."
      },
      {
        id: "c7-f2",
        name: "Sine Double-Angle",
        latex: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta",
        description: "Expands the sine of a double angle."
      },
      {
        id: "c7-f3",
        name: "Cosine Double-Angle",
        latex: "\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta",
        description: "Expands the cosine of a double angle. Can also be written as $2\\cos^2\\theta - 1$ or $1 - 2\\sin^2\\theta$."
      }
    ],
    quiz: [
      {
        id: "c7-q1",
        questionText: "Simplify the expression: $\\frac{\\sin 2x}{2\\sin x}$",
        options: ["$\\sin x$", "$\\cos x$", "$2\\cos x$", "$\\tan x$"],
        correctAnswerIndex: 1,
        explanation: "By substituting the double-angle formula $\\sin 2x = 2\\sin x \\cos x$, we get: $\\frac{2\\sin x \\cos x}{2\\sin x} = \\cos x$."
      },
      {
        id: "c7-q2",
        questionText: "If $\\sin \\theta = 3/5$ and $\\theta$ is in the first quadrant, what is $\\cos \\theta$?",
        options: ["$4/5$", "$16/25$", "$2/5$", "$3/4$"],
        correctAnswerIndex: 0,
        explanation: "Using the identity $\\sin^2\\theta + \\cos^2\\theta = 1$: $(3/5)^2 + \\cos^2\\theta = 1 \\implies 9/25 + \\cos^2\\theta = 1 \\implies \\cos^2\\theta = 16/25$. Since $\\theta$ is in the first quadrant, $\\cos\\theta$ is positive, so $\\cos\\theta = 4/5$."
      }
    ],
    visualizerType: "trig-wave"
  },
  {
    id: 8,
    title: "Logarithmic & Exponential Functions",
    tagline: "Exploring rapid growth, decay, and computational scaling.",
    description: "This chapter covers properties of exponents, definitions of logarithmic functions, standard algebraic properties of logarithms, change-of-base rules, and solving exponential/logarithmic equations.",
    content: `**Exponential and Logarithmic functions** are inverse operations. They are critical for modeling growth (populations, finance) and decay (radioactive half-life).

### 1. Exponential Functions
An exponential function has the form:
$$f(x) = a^x \\quad (a > 0, a \\neq 1)$$
The most famous base is the Euler number:
$$e \\approx 2.71828$$
which forms the natural exponential function $f(x) = e^x$.

### 2. Logarithmic Functions
The logarithm is the inverse ofexponentiation:
$$\\log_a y = x \\iff a^x = y$$
- Base 10 logarithms are **Common Logarithms**: $\\log_{10} x = \\log x$.
- Base $e$ logarithms are **Natural Logarithms**: $\\log_e x = \\ln x$.

### 3. Algebraic Properties of Logarithms
For any positive real numbers $M$, $N$, and base $a > 0$:
- **Product Rule:** $\\log_a(MN) = \\log_a M + \\log_a N$
- **Quotient Rule:** $\\log_a(\\frac{M}{N}) = \\log_a M - \\log_a N$
- **Power Rule:** $\\log_a(M^k) = k \\log_a M$
- **Identity Property:** $\\log_a a = 1$ and $\\log_a 1 = 0$

### 4. Change of Base Formula
To calculate logarithms of arbitrary bases on standard calculators, we use:
$$\\log_b x = \\frac{\\log_a x}{\\log_a b} = \\frac{\\ln x}{\\ln b}$$`,
    formulas: [
      {
        id: "c8-f1",
        name: "Logarithm Definition",
        latex: "y = a^x \\iff \\log_a y = x",
        description: "The core inverse relationship of exponentials and logarithms."
      },
      {
        id: "c8-f2",
        name: "Product Property",
        latex: "\\log_a (MN) = \\log_a M + \\log_a N",
        description: "Converts multiplication inside a logarithm into addition."
      },
      {
        id: "c8-f3",
        name: "Power Property",
        latex: "\\log_a (M^k) = k \\log_a M",
        description: "Allows exponents inside a log to be brought to the front as multipliers."
      },
      {
        id: "c8-f4",
        name: "Change of Base",
        latex: "\\log_b x = \\frac{\\ln x}{\\ln b}",
        description: "Rewriting logarithms in terms of natural logarithms."
      }
    ],
    quiz: [
      {
        id: "c8-q1",
        questionText: "Solve for $x$: $\\log_2 (x - 3) = 4$",
        options: ["$7$", "$19$", "$11$", "$13$"],
        correctAnswerIndex: 1,
        explanation: "Rewrite in exponential form: $x - 3 = 2^4 \\implies x - 3 = 16 \\implies x = 19$."
      },
      {
        id: "c8-q2",
        questionText: "What is the simplified value of $e^{\\ln 5}$?",
        options: ["$e$", "$5$", "$\\ln 5$", "$2.718$"],
        correctAnswerIndex: 1,
        explanation: "Since exponential $e^x$ and natural logarithm $\\ln x$ are inverse operations, they cancel out, leaving: $e^{\\ln 5} = 5$."
      }
    ],
    visualizerType: "log-exp"
  },
  {
    id: 9,
    title: "Application of Differentiation",
    tagline: "Using instantaneous rates of change to find tangents, curvature, and optimal values.",
    description: "In this chapter, we use derivatives to determine equations of tangents and normals, solve rates of change, find local maxima/minima, and analyze optimization issues.",
    content: `The derivative of a function, $f'(x) = \\frac{dy}{dx}$, represents its **instantaneous rate of change** and corresponds to the slope of the tangent line to the graph at any point.

### 1. Equations of Tangents and Normals
For a curve $y = f(x)$ at point $P(x_1, y_1)$:
- The slope of the tangent is $m = f'(x_1)$.
- The equation of the **tangent line** is:
  $$y - y_1 = f'(x_1)(x - x_1)$$
- Since the normal is perpendicular to the tangent, its slope is $-\\frac{1}{f'(x_1)}$.
- The equation of the **normal line** is:
  $$y - y_1 = -\\frac{1}{f'(x_1)}(x - x_1) \\quad (\\text{provided } f'(x_1) \\neq 0)$$

### 2. Increasing and Decreasing Functions
- A function is strictly **increasing** on an interval if $f'(x) > 0$ for all $x$ in that interval.
- A function is strictly **decreasing** on an interval if $f'(x) < 0$ for all $x$ in that interval.

### 3. Local Maxima and Minima (Optimization)
Points where $f'(x) = 0$ are called **Critical Points** (or stationary points). We determine if they are peaks (maxima) or valleys (minima) using:

- **First Derivative Test:**
  - If $f'(x)$ changes from $+$ to $-$ as $x$ increases, it is a **local maximum**.
  - If $f'(x)$ changes from $-$ to $+$ as $x$ increases, it is a **local minimum**.

- **Second Derivative Test:**
  - If $f'(c) = 0$ and $f''(c) < 0$, then $c$ is a **local maximum**.
  - If $f'(c) = 0$ and $f''(c) > 0$, then $c$ is a **local minimum**.`,
    formulas: [
      {
        id: "c9-f1",
        name: "Equation of Tangent",
        latex: "y - y_1 = m(x - x_1) \\quad \\text{where } m = f'(x_1)",
        description: "Formula for the tangent line to curve $f(x)$ at $(x_1, y_1)$."
      },
      {
        id: "c9-f2",
        name: "Equation of Normal",
        latex: "y - y_1 = -\\frac{1}{m}(x - x_1) \\quad \\text{where } m = f'(x_1)",
        description: "Formula for the normal line perpendicular to the tangent at $(x_1, y_1)$."
      },
      {
        id: "c9-f3",
        name: "Critical Point Condition",
        latex: "f'(x) = 0",
        description: "Used to locate local extrema and stationary points."
      }
    ],
    quiz: [
      {
        id: "c9-q1",
        questionText: "Find the slope of the tangent to the curve $y = x^2 - 4x + 5$ at $x = 3$.",
        options: ["$2$", "$-2$", "$5$", "$1$"],
        correctAnswerIndex: 0,
        explanation: "The derivative is $y' = 2x - 4$. At $x = 3$, $y'(3) = 2(3) - 4 = 6 - 4 = 2$. Thus, the slope of the tangent is 2."
      },
      {
        id: "c9-q2",
        questionText: "If a critical point $x=c$ satisfies $f'(c) = 0$ and $f''(c) > 0$, then $c$ is a:",
        options: ["Local maximum", "Local minimum", "Point of inflection", "Discontinuity"],
        correctAnswerIndex: 1,
        explanation: "By the Second Derivative Test, if $f''(c) > 0$, the graph is concave up, meaning the point is a local minimum."
      }
    ],
    visualizerType: "derivative-tangent"
  },
  {
    id: 10,
    title: "Method of Integration",
    tagline: "Reversing differentiation to find antiderivatives using multiple tactical methods.",
    description: "This chapter covers indefinite integrals, fundamental integration formulas, integration by substitution, and integration by parts.",
    content: `**Integration** is the inverse operation of differentiation. The result is called the antiderivative or indefinite integral.
$$\\int f(x) \\, dx = F(x) + C \\iff F'(x) = f(x)$$
where $C$ is the constant of integration.

### 1. Basic Standard Integrals
- $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$
- $\\int \\frac{1}{x} \\, dx = \\ln|x| + C$
- $\\int e^x \\, dx = e^x + C$
- $\\int \\sin x \\, dx = -\\cos x + C$
- $\\int \\cos x \\, dx = \\sin x + C$

### 2. Integration by Substitution (u-Substitution)
Used when an integral contains both a function and its derivative:
$$\\int f(g(x)) g'(x) \\, dx$$
Let $u = g(x)$, then $du = g'(x) dx$. Substituting these converts the integral into:
$$\\int f(u) \\, du$$
This simplifies integration of complex compositions.

### 3. Integration by Parts
Derived from the product rule of differentiation:
$$\\int u \\, dv = uv - \\int v \\, du$$
To choose $u$ and $dv$, we often use the **LIATE** priority rule:
1. **L**ogarithmic functions
2. **I**nverse trigonometric functions
3. **A**lgebraic functions
4. **T**rigonometric functions
5. **E**xponential functions
(Choose $u$ as the function appearing first in this list).`,
    formulas: [
      {
        id: "c10-f1",
        name: "Power Rule of Integration",
        latex: "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
        description: "The core rule for integrating algebraic variables."
      },
      {
        id: "c10-f2",
        name: "Integration by Substitution",
        latex: "\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du",
        description: "Reverses the chain rule by choosing a strategic substitute variable $u = g(x)$."
      },
      {
        id: "c10-f3",
        name: "Integration by Parts",
        latex: "\\int u \\, dv = uv - \\int v \\, du",
        description: "Reverses the product rule to break down integrals of product functions."
      }
    ],
    quiz: [
      {
        id: "c10-q1",
        questionText: "Find the integral: $\\int e^{3x} \\, dx$.",
        options: ["$3e^{3x} + C$", "$\\frac{1}{3}e^{3x} + C$", "$e^{3x} + C$", "$\\frac{1}{4}e^{4x} + C$"],
        correctAnswerIndex: 1,
        explanation: "Using substitution $u = 3x$, we have $du = 3dx \\implies dx = du/3$. The integral becomes $\\int e^u \\frac{du}{3} = \\frac{1}{3}e^u + C = \\frac{1}{3}e^{3x} + C$."
      },
      {
        id: "c10-q2",
        questionText: "Which part should be chosen as $u$ when integrating $\\int x \\ln(x) \\, dx$ using Integration by Parts?",
        options: ["$x$", "$\\ln(x)$", "$dx$", "$x \\ln(x)$"],
        correctAnswerIndex: 1,
        explanation: "According to the LIATE rule, Logarithmic functions (L) have higher priority than Algebraic functions (A) for $u$. Therefore, we choose $u = \\ln(x)$ and $dv = x \\, dx$."
      }
    ],
    visualizerType: "integration-area"
  },
  {
    id: 11,
    title: "Application of Integration",
    tagline: "Computing exact areas under curves and volumes of 3D solids.",
    description: "This chapter covers definite integrals, calculating the area under a curve, the area between curves, and finding the volume of solids of revolution.",
    content: `The **Definite Integral** represents the cumulative sum of products on an interval, which geometrically corresponds to the **signed area** bounded by a curve and axes.
$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$
where $F'(x) = f(x)$ (The Fundamental Theorem of Calculus).

### 1. Area Under a Curve
If a function $f(x)$ is continuous and non-negative ($f(x) \\ge 0$) on the interval $[a, b]$, the area $A$ bounded by the curve $y = f(x)$, the $x$-axis, and vertical boundary lines $x = a$ and $x = b$ is:
$$A = \\int_{a}^{b} f(x) \\, dx$$

### 2. Area Between Two Curves
If $f(x) \\ge g(x)$ for all $x$ in interval $[a, b]$, the area bounded between the two curves is:
$$A = \\int_{a}^{b} [f(x) - g(x)] \\, dx$$
Always subtract the "lower curve" from the "upper curve".

### 3. Volume of Solid of Revolution (Disk Method)
If a region bounded by $y = f(x)$, the $x$-axis, and lines $x = a$ and $x = b$ is rotated $360^\\circ$ around the $x$-axis, it creates a 3D solid.
The volume $V$ of this solid of revolution is calculated by summing infinitesimal circular disks of radius $R(x) = f(x)$:
$$V = \\pi \\int_{a}^{b} [f(x)]^2 \\, dx$$`,
    formulas: [
      {
        id: "c11-f1",
        name: "Fundamental Theorem of Calculus",
        latex: "\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)",
        description: "Connects antiderivatives to finding definite physical sums."
      },
      {
        id: "c11-f2",
        name: "Area Under a Curve",
        latex: "A = \\int_{a}^{b} f(x) \\, dx",
        description: "Defines the exact area between the function and the horizontal axis on $[a, b]$."
      },
      {
        id: "c11-f3",
        name: "Volume of Revolution (x-axis)",
        latex: "V = \\pi \\int_{a}^{b} [f(x)]^2 \\, dx",
        description: "Calculates the solid volume created by rotating a curve around the x-axis."
      }
    ],
    quiz: [
      {
        id: "c11-q1",
        questionText: "Find the exact area under the curve $y = 3x^2$ from $x=1$ to $x=2$.",
        options: ["$7$", "$9$", "$3$", "$15$"],
        correctAnswerIndex: 0,
        explanation: "Integrate $y = 3x^2$: $\\int_{1}^{2} 3x^2 \\, dx = [x^3]_{1}^{2} = 2^3 - 1^3 = 8 - 1 = 7$."
      },
      {
        id: "c11-q2",
        questionText: "What is the formula for the volume generated when curve $y=f(x)$ is rotated around the $x$-axis between $x=a$ and $x=b$?",
        options: [
          "$\\int_{a}^{b} y \\, dx$",
          "$\\pi \\int_{a}^{b} y^2 \\, dx$",
          "$2\\pi \\int_{a}^{b} xy \\, dx$",
          "$\\pi \\int_{a}^{b} y \\, dx$"
        ],
        correctAnswerIndex: 1,
        explanation: "By dividing the solid into circular slices (disks), each disk has volume $dV = \\pi r^2 dx$ where $r = y$. Summing these yields $V = \\pi \\int_{a}^{b} y^2 \\, dx$."
      }
    ],
    visualizerType: "integration-area"
  }
];
