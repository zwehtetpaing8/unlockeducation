export const chapter1Content = String.raw`[DIAGRAM:Chapter1Header]

### Introduction

#### Why Complex Numbers?
Real numbers can solve equations such as $x^2 = 4$, but they cannot solve $x^2 = -4$. The new unit $i$, defined by $i^2 = -1$, fills this gap.

| Real solution | No real solution | Complex solution |
| --- | --- | --- |
| $x^2 = 4 \implies x = \pm 2$ | $x^2 = -4 \implies x \notin \mathbb{R}$ | $x^2 = -4 \implies x = \pm\sqrt{-4} = \pm 2i$ |

#### How the Idea Developed
[DIAGRAM: MathematicianTimeline]

1. **First calculations:** Cardano encountered negative roots, and Bombelli created practical rules for using them.
2. **A clearer theory:** Descartes called them "imaginary," while Euler connected them with trigonometry.
3. **Modern form:** Argand introduced the complex plane, and Gauss established the form $a + bi$.

---

### 1.1 Pure Imaginary Unit $i$

Consider the equation
$$x^2 + 4 = 0.$$

It is equivalent to
$$x^2 = -4.$$

In the real number system this equation has no solution, since the square of a real number cannot be negative.

Therefore, to solve equations such as $x^2 = -4$, the real number system must be extended. We introduce a new number $i$, called the pure imaginary unit. Using this new unit, imaginary numbers can be formed and equations involving square roots of negative numbers can be solved.

#### The Pure Imaginary Unit and Imaginary Numbers
The pure imaginary unit is denoted by $i$ and is defined by $\boxed{i^2 = -1}$.

An imaginary number is a real number multiplied by $i$:
$$\boxed{\text{Imaginary number} = \text{Real number} \times i}.$$

For example, $4i$, $7i$, and $\sqrt{8}\,i$ are imaginary numbers.

**Concept check.** Solve the equation $x^2 + 4 = 0$.

**Solution.** From $x^2 + 4 = 0$, we get
$$\begin{aligned}
x^2 &= -4 \\
&= 4(-1) \\
&= 4i^2 \\
&= (\pm\sqrt{4}\,i)^2.
\end{aligned}$$

Therefore,
$$\boxed{x = \pm 2i}.$$

#### Pattern Recognition
The same idea can be used for other negative numbers:
$$\begin{aligned}
x^2 &= -9 &&\Rightarrow& x^2 &= (\pm\sqrt{9}\,i)^2 &&\Rightarrow& x &= \pm 3i, \\
x^2 &= -16 &&\Rightarrow& x^2 &= (\pm\sqrt{16}\,i)^2 &&\Rightarrow& x &= \pm 4i, \\
x^2 &= -81 &&\Rightarrow& x^2 &= (\pm\sqrt{81}\,i)^2 &&\Rightarrow& x &= \pm 9i, \\
x^2 &= -7 &&\Rightarrow& x^2 &= (\pm\sqrt{7}\,i)^2 &&\Rightarrow& x &= \pm\sqrt{7}\,i.
\end{aligned}$$

**General rule.** For any positive real number $n$,
$$-n = n(-1) = ni^2 = (\pm\sqrt{n}\,i)^2.$$

Therefore, if $x^2 = -n$, then
$$\boxed{x = \pm\sqrt{n}\,i}.$$

> **$ax^2 + bx + c = 0$ ကို perfect square ပြောင်းနည်း**
> 1. $x^2$ ၏ မြှောက်ဖော်ကိန်း $a$ ကို $1$ ဖြစ်အောင်လုပ်ပါ။
> 2. ကိန်းသေ $c$ ကို R.H.S သို့ပို့ပါ။
> 3. အလယ်ကိန်း ($bx$) ၏ မြှောက်ဖော်ကိန်းကို $2$ ဖြင့်စားပါ။
> 4. ရလာသောအဖြေကို $2$ ထပ်တင်ပြီး ညီမျှခြင်းနှစ်ဖက်စလုံးတွင် ပေါင်းပါ။

**Example 1.** Solve
$$x^2 - 2x + 5 = 0.$$

**Solution.**
$$\begin{aligned}
x^2 - 2x &= -5 \\
x^2 - 2x + 1^2 &= -5 + 1^2 \\
(x - 1)^2 &= -4 \\
x - 1 &= \pm 2i \\
x &= 1 \pm 2i
\end{aligned}$$

**Example 2.** Solve
$$x^2 + 2x + 3 = 0$$
and check your answer.

**Solution.**
$$\begin{aligned}
x^2 + 2x &= -3 \\
x^2 + 2x + 1^2 &= -3 + 1^2 \\
(x + 1)^2 &= -2 \\
x + 1 &= \pm\sqrt{2}\,i \\
x &= -1 \pm \sqrt{2}\,i
\end{aligned}$$

**Check.**
For $x = -1 + \sqrt{2}\,i$,
$$\begin{aligned}
x^2 + 2x + 3 &= (-1 + \sqrt{2}\,i)^2 + 2(-1 + \sqrt{2}\,i) + 3 \\
&= (1 - 2\sqrt{2}\,i - 2) - 2 + 2\sqrt{2}\,i + 3 \\
&= 0.
\end{aligned}$$

For $x = -1 - \sqrt{2}\,i$,
$$\begin{aligned}
x^2 + 2x + 3 &= (-1 - \sqrt{2}\,i)^2 + 2(-1 - \sqrt{2}\,i) + 3 \\
&= (1 + 2\sqrt{2}\,i - 2) - 2 - 2\sqrt{2}\,i + 3 \\
&= 0.
\end{aligned}$$

---

### Exercise 1.1

**1. Solve the following equations.**

**(a)** $x^2 - 6x + 10 = 0$

**Solution.**
$$\begin{aligned}
x^2 - 6x &= -10 \\
x^2 - 6x + 3^2 &= -10 + 3^2 \\
(x - 3)^2 &= -1 \\
x - 3 &= \pm i \\
x &= 3 \pm i
\end{aligned}$$

**(b)** $-2x^2 + 4x - 3 = 0$

**Solution.**
$$\begin{aligned}
x^2 - 2x + \frac{3}{2} &= 0 \\
x^2 - 2x &= -\frac{3}{2} \\
x^2 - 2x + 1^2 &= -\frac{3}{2} + 1^2 \\
(x - 1)^2 &= -\frac{1}{2} \\
x &= 1 \pm \frac{\sqrt{2}}{2}i
\end{aligned}$$

**(c)** $5x^2 - 2x + 1 = 0$

**Solution.**
$$\begin{aligned}
x^2 - \frac{2}{5}x &= -\frac{1}{5} \\
x^2 - \frac{2}{5}x + \left(\frac{1}{5}\right)^2 &= -\frac{1}{5} + \left(\frac{1}{5}\right)^2 \\
\left(x - \frac{1}{5}\right)^2 &= -\frac{4}{25} \\
x - \frac{1}{5} &= \pm\frac{2}{5}i \\
x &= \frac{1}{5} \pm \frac{2}{5}i
\end{aligned}$$

**(d)** $3x^2 + 7x + 5 = 0$

**Solution.**
$$\begin{aligned}
x^2 + \frac{7}{3}x &= -\frac{5}{3} \\
x^2 + \frac{7}{3}x + \left(\frac{7}{6}\right)^2 &= -\frac{5}{3} + \left(\frac{7}{6}\right)^2 \\
\left(x + \frac{7}{6}\right)^2 &= -\frac{11}{36} \\
x + \frac{7}{6} &= \pm\frac{\sqrt{11}}{6}i \\
x &= -\frac{7}{6} \pm \frac{\sqrt{11}}{6}i
\end{aligned}$$

**2. Solve the following equations and check your answers.**

**(a)** $x^2 - 2x + 4 = 0$

**Solution.**
$$\begin{aligned}
x^2 - 2x &= -4 \\
x^2 - 2x + 1^2 &= -4 + 1^2 \\
(x - 1)^2 &= -3 \\
x - 1 &= \pm\sqrt{3}\,i \\
x &= 1 \pm \sqrt{3}\,i
\end{aligned}$$

**Check.**
For $x = 1 + \sqrt{3}\,i$,
$$\begin{aligned}
x^2 - 2x + 4 &= (1 + \sqrt{3}\,i)^2 - 2(1 + \sqrt{3}\,i) + 4 \\
&= (1 + 2\sqrt{3}\,i - 3) - 2 - 2\sqrt{3}\,i + 4 \\
&= 0.
\end{aligned}$$

For $x = 1 - \sqrt{3}\,i$,
$$\begin{aligned}
x^2 - 2x + 4 &= (1 - \sqrt{3}\,i)^2 - 2(1 - \sqrt{3}\,i) + 4 \\
&= (1 - 2\sqrt{3}\,i - 3) - 2 + 2\sqrt{3}\,i + 4 \\
&= 0.
\end{aligned}$$

**(b)** $x^2 - 4x + 5 = 0$

**Solution.**
$$\begin{aligned}
x^2 - 4x &= -5 \\
x^2 - 4x + 2^2 &= -5 + 2^2 \\
(x - 2)^2 &= -1 \\
x - 2 &= \pm i \\
x &= 2 \pm i
\end{aligned}$$

**Check.**
For $x = 2 + i$,
$$\begin{aligned}
x^2 - 4x + 5 &= (2 + i)^2 - 4(2 + i) + 5 \\
&= (4 + 4i - 1) - 8 - 4i + 5 \\
&= 0.
\end{aligned}$$

For $x = 2 - i$,
$$\begin{aligned}
x^2 - 4x + 5 &= (2 - i)^2 - 4(2 - i) + 5 \\
&= (4 - 4i - 1) - 8 + 4i + 5 \\
&= 0.
\end{aligned}$$

**3. Find the value of $i^n$ for every positive integer $n$, where $i^2 = -1$, $i^3 = i^2 \cdot i$, $i^4 = i^2 \cdot i^2$, etc.**

**Solution.**
$$\begin{aligned}
i^1 &= i & i^5 &= i^4 i = i & i^9 &= i^8 i = i \\
i^2 &= -1 & i^6 &= i^4 i^2 = -1 & i^{10} &= i^8 i^2 = -1 \\
i^3 &= i^2 i = -i & i^7 &= i^4 i^3 = -i & i^{11} &= i^8 i^3 = -i \\
i^4 &= i^2 i^2 = 1 & i^8 &= i^4 i^4 = 1 & i^{12} &= i^8 i^4 = 1
\end{aligned}$$

- If $n$ is divisible by $4$ ($\text{remainder} = 0$), $i^n = 1$.
- If $n$ has a remainder of $1$ when divided by $4$, $i^n = i$.
- If $n$ has a remainder of $2$ when divided by $4$, $i^n = -1$.
- If $n$ has a remainder of $3$ when divided by $4$, $i^n = -i$.

**Note.** **Sum of Four Consecutive Powers**
Any four consecutive powers of $i$ have sum $0$. For example,
$$\begin{aligned}
i^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\
i^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\
i^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.
\end{aligned}$$

---

### 1.2 Complex Numbers

#### Forms of Complex Numbers
1. Cartesian Form or Rectangular Form
2. Coordinate Form
3. Trigonometric Form or Polar Form
4. Exponential Form or Euler's Form

#### Cartesian or Rectangular Form of Complex Numbers ($x + yi$)
A complex number is formed by adding a **real number** and an **imaginary number**.

$$\boxed{\text{Complex number} = \text{Real number} + \text{Imaginary number}}$$

The Cartesian or rectangular form of a complex number is
$$\boxed{z = x + yi} \qquad (x, y \in \mathbb{R}).$$

#### Parts of $z = x + yi$
In $z = x + yi$, both $x$ and $y$ are real numbers.
- The **real part** is $x$; thus $\operatorname{Re}(z) = x$.
- The **imaginary term** is $yi$.
- The **imaginary part** is the coefficient $y$; thus $\operatorname{Im}(z) = y$.

#### Rules and Examples in Cartesian Form
Let $z_1 = x_1 + y_1i$ and $z_2 = x_2 + y_2i$ be complex numbers, where $x_1, y_1, x_2, y_2 \in \mathbb{R}$.

1. **Equality**
$$\boxed{x_1 + y_1i = x_2 + y_2i \iff x_1 = x_2 \text{ and } y_1 = y_2}$$
**Example.** $x + 2i = 5 + yi \iff x = 5$ and $y = 2$.

2. **Sum**
$$\boxed{(x_1 + y_1i) + (x_2 + y_2i) = (x_1 + x_2) + (y_1 + y_2)i}$$
**Example.** $(3 + 2i) + (5 - 7i) = 8 - 5i$.

3. **Subtraction**
$$\boxed{(x_1 + y_1i) - (x_2 + y_2i) = (x_1 - x_2) + (y_1 - y_2)i}$$
**Example.** $(4 - 3i) - (1 + 6i) = 3 - 9i$.

4. **Product**
$$\begin{aligned}
(x_1 + y_1i)(x_2 + y_2i) &= x_1x_2 + x_1y_2i + y_1x_2i + y_1y_2i^2 \\
&= x_1x_2 + x_1y_2i + y_1x_2i - y_1y_2 \\
&= (x_1x_2 - y_1y_2) + (x_1y_2 + y_1x_2)i.
\end{aligned}$$
Here, $i^2 = -1$.

**Example.**
$$\begin{aligned}
(2 + 3i)(4 - i) &= 2 \cdot 4 + 2(-i) + 3i \cdot 4 + 3i(-i) \\
&= 8 - 2i + 12i - 3i^2 \\
&= 8 + 10i + 3 \\
&= 11 + 10i.
\end{aligned}$$

#### Coordinate Form of Complex Numbers $(x, y)$
$$\boxed{\text{Complex number} = (\text{Real Part},\ \text{Imaginary Part})}$$

**Examples:** $(3, -4)$, $(2, \sqrt{6})$, $(5, 9)$

#### Rules and Examples in Coordinate Form
Let $z_1 = (x_1, y_1)$ and $z_2 = (x_2, y_2)$ be complex numbers, where $x_1, y_1, x_2, y_2 \in \mathbb{R}$.

1. **Equality**
$$\boxed{(x_1, y_1) = (x_2, y_2) \iff x_1 = x_2 \text{ and } y_1 = y_2}$$
**Example.** $(x, 2) = (5, y) \implies x = 5$ and $y = 2$.

2. **Sum**
$$\boxed{(x_1, y_1) + (x_2, y_2) = (x_1 + x_2, y_1 + y_2)}$$
**Example.** $(3, 2) + (5, -7) = (8, -5)$.

3. **Subtraction**
$$\boxed{(x_1, y_1) - (x_2, y_2) = (x_1 - x_2, y_1 - y_2)}$$
**Example.** $(4, -3) - (1, 6) = (3, -9)$.

4. **Product**
$$\boxed{(x_1, y_1)(x_2, y_2) = (x_1x_2 - y_1y_2,\ x_1y_2 + x_2y_1)}$$
**Example.** $(2, 3)(4, -1) = (11, 10)$.

#### Real Numbers in Coordinate Form
Every real number is also a complex number with imaginary part $0$.

| Real Numbers | Complex Numbers |
| --- | --- |
| $x$ | $(x, 0)$ |
| $y$ | $(y, 0)$ |
| $x + y$ | $(x, 0) + (y, 0)$ |
| $xy$ | $(x, 0)(y, 0)$ |

#### Connection Between the Two Forms
In coordinate form, the pure imaginary unit is represented by $(0, 1)$ because
$$\begin{aligned}
(0, 1)(0, 1) &= (0 \cdot 0 - 1 \cdot 1,\ 0 \cdot 1 + 1 \cdot 0) \\
&= (-1, 0) = -1.
\end{aligned}$$

Hence
$$\boxed{i = (0, 1)}.$$

Now
$$\begin{aligned}
x + yi &= (x, 0) + (y, 0)(0, 1) \\
&= (x, 0) + (0, y) \\
&= (x, y).
\end{aligned}$$

Therefore,
$$\boxed{x + yi = (x, y)}.$$

**Example 3.** Compute
$$(-2, 3)(1, -2) + (1, 1)(0, 1).$$

**Solution.**

**Method 1.** Coordinate form
$$\begin{aligned}
(-2, 3)(1, -2) + (1, 1)(0, 1) &= (-2 - (-6),\ 4 + 3) + (0 - 1,\ 1 + 0) \\
&= (4, 7) + (-1, 1) \\
&= (3, 8).
\end{aligned}$$

**Method 2.** Cartesian form
$$\begin{aligned}
(-2 + 3i)(1 - 2i) + (1 + i)i &= (-2 + 4i + 3i - 6i^2) + (i + i^2) \\
&= -2 + 8i - 5i^2 \\
&= -2 + 8i + 5 \\
&= 3 + 8i.
\end{aligned}$$

---

### Exercise 1.2

**1. Compute.**

**(a)** $(2, 0)(2, 5) + (3, -2)(0, 1)$

**Solution.**
$$\begin{aligned}
(2, 0)(2, 5) + (3, -2)(0, 1) &= (4 - 0,\ 10 + 0) + (0 - (-2),\ 3 + 0) \\
&= (4, 10) + (2, 3) \\
&= (6, 13).
\end{aligned}$$

**(b)** $(2, -5)(-1, 0) + (1, 0)(5, 1)$

**Solution.**
$$\begin{aligned}
(2, -5)(-1, 0) + (1, 0)(5, 1) &= (-2 - 0,\ 0 + 5) + (5 - 0,\ 1 + 0) \\
&= (-2, 5) + (5, 1) \\
&= (3, 6).
\end{aligned}$$

**(c)** $(-3, -2)(-2, -3) + (-2, -3)(-3, -2)$

**Solution.**
$$\begin{aligned}
(-3, -2)(-2, -3) + (-2, -3)(-3, -2) &= (6 - 6,\ 9 + 4) + (6 - 6,\ 4 + 9) \\
&= (0, 13) + (0, 13) \\
&= (0, 26).
\end{aligned}$$

**(d)** $(1, 0)(0, 1) + (0, 1)(1, 0)$

**Solution.**
$$\begin{aligned}
(1, 0)(0, 1) + (0, 1)(1, 0) &= (0 - 0,\ 1 + 0) + (0 - 0,\ 0 + 1) \\
&= (0, 1) + (0, 1) \\
&= (0, 2).
\end{aligned}$$

**2. Compute.**

**(a)** $(3 + 2i)(3 - 2i) + (-5 + 7i)(-1 - i)$

**Solution.**
$$\begin{aligned}
(3 + 2i)(3 - 2i) + (-5 + 7i)(-1 - i) &= (9 - 6i + 6i - 4i^2) + (5 + 5i - 7i - 7i^2) \\
&= 13 + (12 - 2i) \\
&= 25 - 2i.
\end{aligned}$$

**(b)** $(-1 + i)(1 - i) + (2 + 3i)$

**Solution.**
$$\begin{aligned}
(-1 + i)(1 - i) + (2 + 3i) &= -1 + i + i - i^2 + 2 + 3i \\
&= 2i + 2 + 3i \\
&= 2 + 5i.
\end{aligned}$$

**(c)** $(1 + i)(1 - i) + (-2 + i)(-2 + i)$

**Solution.**
$$\begin{aligned}
(1 + i)(1 - i) + (-2 + i)(-2 + i) &= (1 - i + i - i^2) + (4 - 2i - 2i + i^2) \\
&= 2 + (3 - 4i) \\
&= 5 - 4i.
\end{aligned}$$

**(d)** $(3 + 2i) + (7 - i)(-3 + 3i)$

**Solution.**
$$\begin{aligned}
(3 + 2i) + (7 - i)(-3 + 3i) &= 3 + 2i + (-21 + 21i + 3i - 3i^2) \\
&= 3 + 2i + (-18 + 24i) \\
&= -15 + 26i.
\end{aligned}$$

---

### 1.3 Operations on Complex Numbers

#### Division of Complex Numbers
Addition, subtraction, and multiplication of complex numbers have already been studied. In this section, we focus on **division**.

To divide by a complex number, multiply both the numerator and denominator by the **conjugate of the denominator**. This changes the denominator into a real number.

#### Conjugate of a Complex Number
If $z = x + yi$, its conjugate is obtained by changing the sign of the imaginary term:
$$\boxed{\bar{z} = x - yi}.$$

The product of a complex number and its conjugate is always real:
$$\boxed{z\bar{z} = (x + yi)(x - yi) = x^2 + y^2}.$$

#### Division
Let $z_1 = x_1 + y_1i$ and $z_2 = x_2 + y_2i$, where $z_2 \neq 0$. Then $\overline{z_2} = x_2 - y_2i$ and
$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{z_1}{z_2} \cdot \frac{\overline{z_2}}{\overline{z_2}} = \frac{(x_1 + y_1i)(x_2 - y_2i)}{(x_2 + y_2i)(x_2 - y_2i)} \\
&= \frac{(x_1x_2 + y_1y_2) + (y_1x_2 - x_1y_2)i}{x_2^2 + y_2^2} \\
&= \boxed{\frac{x_1x_2 + y_1y_2}{x_2^2 + y_2^2} + \frac{y_1x_2 - x_1y_2}{x_2^2 + y_2^2}i}.
\end{aligned}$$

**Example 4.** Calculate $\dfrac{2 + 3i}{3 + i}$.

**Solution.**
$$\begin{aligned}
\frac{2 + 3i}{3 + i} &= \frac{(2 + 3i)(3 - i)}{(3 + i)(3 - i)} \\
&= \frac{6 - 2i + 9i - 3i^2}{9 - i^2} \\
&= \frac{9 + 7i}{10} \\
&= \frac{9}{10} + \frac{7}{10}i.
\end{aligned}$$

#### Reciprocal of a Complex Number
Let $z = x + yi \neq 0$. Then $x$ and $y$ are not both zero, so $x^2 + y^2 \neq 0$.

**Find $\dfrac{1}{z}$.**
$$\begin{aligned}
\frac{1}{z} &= \frac{1}{x + yi} \\
&= \frac{1}{x + yi} \cdot \frac{x - yi}{x - yi} \\
&= \frac{x - yi}{(x + yi)(x - yi)} \\
&= \frac{x - yi}{x^2 + y^2} \\
&= \boxed{\frac{x}{x^2 + y^2} - \frac{y}{x^2 + y^2}i}.
\end{aligned}$$

**Verification**
$$\begin{aligned}
z\left(\frac{1}{z}\right) &= (x + yi)\left(\frac{x - yi}{x^2 + y^2}\right) \\
&= \frac{(x + yi)(x - yi)}{x^2 + y^2} \\
&= \frac{x^2 + y^2}{x^2 + y^2} = 1.
\end{aligned}$$

Therefore, $\dfrac{1}{z}$ is the multiplicative inverse of $z$ and is denoted by $z^{-1}$. Hence division of complex numbers can be defined as
$$\boxed{\frac{z_1}{z_2} = z_1 z_2^{-1}, \qquad z_2 \neq 0}.$$

**Note.** The method used in Example 4 is usually the easier method for direct calculation.

---

### Exercise 1.3

**1. Let $z_1 = -2 + 3i$ and $z_2 = 5 + 2i$. Compute.**

**(a)** $z_1^2 - 2z_1 + 1$

**Solution.**
$z_1 = -2 + 3i$, $z_2 = 5 + 2i$, $\overline{z_1} = -2 - 3i$ and $\overline{z_2} = 5 - 2i$.
$$\begin{aligned}
z_1^2 - 2z_1 + 1 &= (-2 + 3i)^2 - 2(-2 + 3i) + 1 \\
&= 4 - 12i + 9i^2 + 4 - 6i + 1 \\
&= 4 - 12i - 9 + 4 - 6i + 1 \\
&= 0 - 18i \\
&= -18i.
\end{aligned}$$

**(b)** $3z_2^2 + 2z_2 - 1$

**Solution.**
$$\begin{aligned}
3z_2^2 + 2z_2 - 1 &= 3(5 + 2i)^2 + 2(5 + 2i) - 1 \\
&= 3(25 + 20i + 4i^2) + 10 + 4i - 1 \\
&= 3(21 + 20i) + 9 + 4i \\
&= 63 + 60i + 9 + 4i \\
&= 72 + 64i.
\end{aligned}$$

**(c)** $z_1\overline{z_2} + z_2\overline{z_1}$

**Solution.**
$$\begin{aligned}
z_1\overline{z_2} &= (-2 + 3i)(5 - 2i) \\
&= -10 + 4i + 15i - 6i^2 \\
&= -10 + 19i + 6 \\
&= -4 + 19i, \\[4pt]
z_2\overline{z_1} &= (5 + 2i)(-2 - 3i) \\
&= -10 - 15i - 4i - 6i^2 \\
&= -10 - 19i + 6 \\
&= -4 - 19i, \\[4pt]
z_1\overline{z_2} + z_2\overline{z_1} &= (-4 + 19i) + (-4 - 19i) \\
&= (-4 - 4) + (19 - 19)i \\
&= -8.
\end{aligned}$$

**(d)** $\dfrac{1}{z_1}$

**Solution.**
$$\begin{aligned}
\frac{1}{z_1} &= \frac{1}{-2 + 3i} \\
&= \frac{1}{-2 + 3i} \cdot \frac{-2 - 3i}{-2 - 3i} \\
&= \frac{-2 - 3i}{4 + 9} \\
&= \frac{-2 - 3i}{13} \\
&= -\frac{2}{13} - \frac{3}{13}i.
\end{aligned}$$

**(e)** $\dfrac{1}{z_2}$

**Solution.**
$$\begin{aligned}
\frac{1}{z_2} &= \frac{1}{5 + 2i} \\
&= \frac{1}{5 + 2i} \cdot \frac{5 - 2i}{5 - 2i} \\
&= \frac{5 - 2i}{25 + 4} \\
&= \frac{5 - 2i}{29} \\
&= \frac{5}{29} - \frac{2}{29}i.
\end{aligned}$$

**(f)** $\dfrac{1}{z_1z_2}$

**Solution.**
$$\begin{aligned}
z_1z_2 &= (-2 + 3i)(5 + 2i) \\
&= -10 - 4i + 15i + 6i^2 \\
&= -10 + 11i - 6 \\
&= -16 + 11i, \\[4pt]
\frac{1}{z_1z_2} &= \frac{1}{-16 + 11i} \cdot \frac{-16 - 11i}{-16 - 11i} \\
&= \frac{-16 - 11i}{256 + 121} \\
&= \frac{-16 - 11i}{377} \\
&= -\frac{16}{377} - \frac{11}{377}i.
\end{aligned}$$

**(g)** $\dfrac{z_1}{z_2}$

**Solution.**
$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{-2 + 3i}{5 + 2i} \\
&= \frac{-2 + 3i}{5 + 2i} \cdot \frac{5 - 2i}{5 - 2i} \\
&= \frac{-10 + 4i + 15i - 6i^2}{25 + 4} \\
&= \frac{-10 + 19i + 6}{29} \\
&= \frac{-4 + 19i}{29} \\
&= -\frac{4}{29} + \frac{19}{29}i.
\end{aligned}$$

**(h)** $\dfrac{\overline{z_1}}{\overline{z_2}}$

**Solution.**
$$\begin{aligned}
\frac{\overline{z_1}}{\overline{z_2}} &= \overline{\left(\frac{z_1}{z_2}\right)} \\
&= \overline{\left(-\frac{4}{29} + \frac{19}{29}i\right)} \\
&= -\frac{4}{29} - \frac{19}{29}i.
\end{aligned}$$

**(i)** $\dfrac{z_2}{z_1}$

**Solution.**
$$\begin{aligned}
\frac{z_2}{z_1} &= \frac{5 + 2i}{-2 + 3i} \\
&= \frac{5 + 2i}{-2 + 3i} \cdot \frac{-2 - 3i}{-2 - 3i} \\
&= \frac{-10 - 15i - 4i - 6i^2}{4 + 9} \\
&= \frac{-10 - 19i + 6}{13} \\
&= \frac{-4 - 19i}{13} \\
&= -\frac{4}{13} - \frac{19}{13}i.
\end{aligned}$$

**(j)** $\overline{\left(\dfrac{z_2}{z_1}\right)}$

**Solution.**
$$\begin{aligned}
\overline{\left(\frac{z_2}{z_1}\right)} &= \overline{\left(-\frac{4}{13} - \frac{19}{13}i\right)} \\
&= -\frac{4}{13} + \frac{19}{13}i.
\end{aligned}$$

**(k)** $\dfrac{\overline{z_1}z_2}{z_1\overline{z_2}}$

**Solution.**
$$\begin{aligned}
\frac{\overline{z_1}z_2}{z_1\overline{z_2}} &= \frac{-4 - 19i}{-4 + 19i} \\
&= \frac{-4 - 19i}{-4 + 19i} \cdot \frac{-4 - 19i}{-4 - 19i} \\
&= \frac{16 + 76i + 76i + 361i^2}{16 + 361} \\
&= \frac{16 + 152i - 361}{16 + 361} \\
&= \frac{-345 + 152i}{377} \\
&= -\frac{345}{377} + \frac{152}{377}i.
\end{aligned}$$

**(l)** $\dfrac{z_2}{\overline{z_1}} + \dfrac{z_1}{\overline{z_2}}$

**Solution.**
$$\begin{aligned}
\frac{z_2}{\overline{z_1}} + \frac{z_1}{\overline{z_2}} &= \frac{5 + 2i}{-2 - 3i} + \frac{-2 + 3i}{5 - 2i} \\
&= \frac{5 + 2i}{-2 - 3i} \cdot \frac{-2 + 3i}{-2 + 3i} + \frac{-2 + 3i}{5 - 2i} \cdot \frac{5 + 2i}{5 + 2i} \\
&= \frac{-10 + 15i - 4i + 6i^2}{4 + 9} + \frac{-10 - 4i + 15i + 6i^2}{25 + 4} \\
&= \frac{-16 + 11i}{4 + 9} + \frac{-16 + 11i}{25 + 4} \\
&= \frac{-16 + 11i}{13} + \frac{-16 + 11i}{29} \\
&= \frac{29(-16 + 11i) + 13(-16 + 11i)}{13 \cdot 29} \\
&= \frac{-672 + 462i}{377} \\
&= -\frac{672}{377} + \frac{462}{377}i.
\end{aligned}$$

**2. Let $z_1 = 3 - 2i$ and $z_2 = -1 + 4i$. Show that**

**(a)** $\overline{(z_1 + z_2)} = \overline{z_1} + \overline{z_2}$

**Solution.**
$$\begin{aligned}
z_1 + z_2 &= (3 - 2i) + (-1 + 4i) = 2 + 2i, \\
\overline{(z_1 + z_2)} &= 2 - 2i, \\
\overline{z_1} + \overline{z_2} &= (3 + 2i) + (-1 - 4i) = 2 - 2i.
\end{aligned}$$
Therefore, $\overline{(z_1 + z_2)} = \overline{z_1} + \overline{z_2}$.

**(b)** $\overline{z_1z_2} = \overline{z_1}\,\overline{z_2}$

**Solution.**
$$\begin{aligned}
z_1z_2 &= (3 - 2i)(-1 + 4i) = 5 + 14i, \\
\overline{z_1z_2} &= 5 - 14i, \\
\overline{z_1}\,\overline{z_2} &= (3 + 2i)(-1 - 4i) = 5 - 14i.
\end{aligned}$$
Therefore, $\overline{z_1z_2} = \overline{z_1}\,\overline{z_2}$.

**(c)** $\overline{\left(\dfrac{z_1}{z_2}\right)} = \dfrac{\overline{z_1}}{\overline{z_2}}$

**Solution.**
$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{3 - 2i}{-1 + 4i} = \frac{(3 - 2i)(-1 - 4i)}{(-1 + 4i)(-1 - 4i)} = \frac{-11 - 10i}{17} \\
&= -\frac{11}{17} - \frac{10}{17}i, \\[4pt]
\overline{\left(\frac{z_1}{z_2}\right)} &= -\frac{11}{17} + \frac{10}{17}i, \\[4pt]
\frac{\overline{z_1}}{\overline{z_2}} &= \frac{3 + 2i}{-1 - 4i} = \frac{(3 + 2i)(-1 + 4i)}{(-1 - 4i)(-1 + 4i)} = \frac{-11 + 10i}{17} \\
&= -\frac{11}{17} + \frac{10}{17}i.
\end{aligned}$$
Therefore, $\overline{\left(\dfrac{z_1}{z_2}\right)} = \dfrac{\overline{z_1}}{\overline{z_2}}$.

---

### 1.4 Trigonometric Form

#### From Cartesian Form to Trigonometric Form
A non-zero complex number $z = x + yi$ is represented by $P(x, y)$ on the complex plane. Let $r = OP$ and let $\theta$ be the angle measured from the positive real axis to $OP$.

$$r = |z| = \sqrt{x^2 + y^2}, \qquad \cos\theta = \frac{x}{r}, \qquad \sin\theta = \frac{y}{r}.$$

[DIAGRAM: ArgandPolar]

Since $x = r\cos\theta$ and $y = r\sin\theta$,
$$\boxed{z = x + yi = r(\cos\theta + i\sin\theta)}$$

This is the **trigonometric form** or **polar form** of $z$.

The coordinates $(x, y)$ are called **Cartesian or rectangular coordinates**, and $(r, \theta)$ are called **polar coordinates**.

#### Argument and Principal Argument
An **argument** is an angle from the **positive real axis** to the ray representing $z$. The **principal argument**, $\operatorname{Arg} z$, is the unique argument $\theta$ satisfying $-\pi < \theta \le \pi$. All angles are in radians. Each coloured dot marks the start.

[DIAGRAM: ArgandPrincipalQuadrants]

**For each point: same starting axis, same final ray.**
$$\boxed{\text{All arguments: } \theta + 2k\pi, \quad k \in \mathbb{Z}}$$

**Note.** On the negative real axis, choose $\pi$, not $-\pi$. At $z = 0$, the argument is undefined.

#### Note: Converting to Trigonometric Form
For a non-zero complex number $z = x + yi$:
1. Sketch an Argand diagram: plot $z = (x, y)$ and draw the ray from the origin through the point. Mark the angle $\theta$ from the positive real axis to the ray.
2. Find the modulus: $r = \sqrt{x^2 + y^2}$.
3. Find $\theta$ using $\cos\theta = \dfrac{x}{r}$ and $\sin\theta = \dfrac{y}{r}$. Use the diagram to choose $\theta$ in the required interval. For the principal argument, use $-\pi < \theta \le \pi$.
4. Write the trigonometric form: $z = r(\cos\theta + i\sin\theta)$.

**Example 5.** Find the trigonometric form with $-\pi < \theta \le \pi$.

**(a)** $z = 1 + \sqrt{3}i$

**Solution.**
$$\begin{aligned}
z &= 1 + \sqrt{3}i = (1, \sqrt{3}) \\
r &= \sqrt{1^2 + (\sqrt{3})^2} = 2 \\
\cos\theta &= \frac{1}{2} \quad \text{and} \quad \sin\theta = \frac{\sqrt{3}}{2} \\
\theta &= \frac{\pi}{3} \\
z &= 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)
\end{aligned}$$
[DIAGRAM: ArgandExample5a]

**(b)** $z = -1 + i$

**Solution.**
$$\begin{aligned}
z &= -1 + i = (-1, 1) \\
r &= \sqrt{(-1)^2 + 1^2} = \sqrt{2} \\
\cos\theta &= -\frac{\sqrt{2}}{2} \quad \text{and} \quad \sin\theta = \frac{\sqrt{2}}{2} \\
\theta &= \frac{3\pi}{4} \\
z &= \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right)
\end{aligned}$$
[DIAGRAM: ArgandExample5b]

**(c)** $z = -\sqrt{3} - i$

**Solution.**
$$\begin{aligned}
z &= -\sqrt{3} - i = (-\sqrt{3}, -1) \\
r &= \sqrt{(-\sqrt{3})^2 + (-1)^2} = 2 \\
\cos\theta &= -\frac{\sqrt{3}}{2} \quad \text{and} \quad \sin\theta = -\frac{1}{2} \\
\theta &= -\frac{5\pi}{6} \\
z &= 2\left(\cos\left(-\frac{5\pi}{6}\right) + i\sin\left(-\frac{5\pi}{6}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandExample5c]

**(d)** $z = -1$

**Solution.**
$$\begin{aligned}
z &= -1 = (-1, 0) \\
r &= \sqrt{(-1)^2} = 1 \\
\cos\theta &= -1 \quad \text{and} \quad \sin\theta = 0 \\
\theta &= \pi \\
z &= 1(\cos\pi + i\sin\pi)
\end{aligned}$$
[DIAGRAM: ArgandExample5d]

#### Product in Trigonometric Form
Let $z_1 = r_1(\cos\theta_1 + i\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$. Then their product is
$$\begin{aligned}
z_1z_2 &= r_1(\cos\theta_1 + i\sin\theta_1)\,r_2(\cos\theta_2 + i\sin\theta_2) \\
&= r_1r_2(\cos\theta_1 + i\sin\theta_1)(\cos\theta_2 + i\sin\theta_2) \\
&= r_1r_2\bigl(\cos\theta_1\cos\theta_2 + i\cos\theta_1\sin\theta_2 + i\sin\theta_1\cos\theta_2 + i^2\sin\theta_1\sin\theta_2\bigr) \\
&= r_1r_2\bigl((\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2) + i(\sin\theta_1\cos\theta_2 + \cos\theta_1\sin\theta_2)\bigr) \\
&= r_1r_2\bigl(\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)\bigr).
\end{aligned}$$

$$\boxed{z_1z_2 = r_1r_2\bigl(\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)\bigr)}$$

**Remember:** Multiply the moduli and add the arguments.

**Example 6.** Given that $z_1 = 1 + \sqrt{3}i$ and $z_2 = -1 + i$, find $z_1z_2$ by using trigonometric forms. Check your answer by direct multiplication.

**Solution.**
$$z_1 = 1 + \sqrt{3}i, \qquad z_2 = -1 + i.$$
$$z_1 = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right), \qquad z_2 = \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right).$$

$$\begin{aligned}
z_1z_2 &= 2\sqrt{2}\left(\cos\left(\frac{\pi}{3} + \frac{3\pi}{4}\right) + i\sin\left(\frac{\pi}{3} + \frac{3\pi}{4}\right)\right) \\
&= 2\sqrt{2}\left(\cos\frac{13\pi}{12} + i\sin\frac{13\pi}{12}\right) \\
&= 2\sqrt{2}\left[\left(\frac{(-\sqrt{3} - 1)\sqrt{2}}{4}\right) + i\left(\frac{(-\sqrt{3} + 1)\sqrt{2}}{4}\right)\right] \\
&= -(1 + \sqrt{3}) + (1 - \sqrt{3})i.
\end{aligned}$$

$$\begin{aligned}
z_1z_2 &= (1 + \sqrt{3}i)(-1 + i) \\
&= -1 + i - \sqrt{3}i + \sqrt{3}i^2 \\
&= -(1 + \sqrt{3}) + (1 - \sqrt{3})i.
\end{aligned}$$

#### Multiplicative Inverse in Trigonometric Form
Let $z = x + yi$ and $z \neq 0$.
$$\begin{aligned}
z^{-1} &= \frac{x}{x^2 + y^2} - \frac{y}{x^2 + y^2}i \\
&= \frac{1}{x^2 + y^2}(x - yi).
\end{aligned}$$

Since $r^2 = x^2 + y^2$, $x = r\cos\theta$, and $y = r\sin\theta$,
$$\begin{aligned}
z^{-1} &= \frac{1}{r^2}(r\cos\theta - ir\sin\theta) \\
&= \frac{1}{r}(\cos\theta - i\sin\theta) \\
&= \frac{1}{r}\bigl(\cos(-\theta) + i\sin(-\theta)\bigr).
\end{aligned}$$

$$\boxed{z^{-1} = \frac{1}{r}\bigl(\cos(-\theta) + i\sin(-\theta)\bigr)}$$

**Remember:** Take the reciprocal of the modulus and change the sign of the argument.

**Example 7.** Given that $z = -\sqrt{3} - i$, using the trigonometric form of $z$, find $z^{-1}$. Check your answer by showing that $zz^{-1} = 1$.

**Solution.**
$$\begin{aligned}
z &= -\sqrt{3} - i \\
&= 2\left(\cos\left(-\frac{5\pi}{6}\right) + i\sin\left(-\frac{5\pi}{6}\right)\right).
\end{aligned}$$

$$\begin{aligned}
z^{-1} &= \frac{1}{2}\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right) \\
&= \frac{1}{2}\left(-\frac{\sqrt{3}}{2} + \frac{1}{2}i\right) \\
&= -\frac{\sqrt{3}}{4} + \frac{1}{4}i.
\end{aligned}$$

**Check.**
$$\begin{aligned}
zz^{-1} &= (-\sqrt{3} - i)\left(-\frac{\sqrt{3}}{4} + \frac{1}{4}i\right) \\
&= \frac{3}{4} - \frac{\sqrt{3}}{4}i + \frac{\sqrt{3}}{4}i - \frac{1}{4}i^2 \\
&= 1.
\end{aligned}$$

**Check.** $zz^{-1} = 1$ ဖြစ်သောကြောင့် $z$ ၏ multiplicative inverse သည် $z^{-1}$ ဖြစ်သည်။

#### Division in Trigonometric Form
Let $z_1 = r_1(\cos\theta_1 + i\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$, where $z_2 \neq 0$. Then
$$\begin{aligned}
\frac{z_1}{z_2} &= z_1 z_2^{-1} \\
&= r_1(\cos\theta_1 + i\sin\theta_1) \cdot \frac{1}{r_2}\bigl(\cos(-\theta_2) + i\sin(-\theta_2)\bigr) \\
&= \frac{r_1}{r_2}\bigl(\cos(\theta_1 + (-\theta_2)) + i\sin(\theta_1 + (-\theta_2))\bigr) \\
&= \frac{r_1}{r_2}\bigl(\cos(\theta_1 - \theta_2) + i\sin(\theta_1 - \theta_2)\bigr).
\end{aligned}$$

$$\boxed{\frac{z_1}{z_2} = \frac{r_1}{r_2}\bigl(\cos(\theta_1 - \theta_2) + i\sin(\theta_1 - \theta_2)\bigr), \qquad z_2 \neq 0}$$

**Remember:** Divide the moduli and subtract the arguments.

**Example 8.** Given that $z_1 = 1 + \sqrt{3}i$ and $z_2 = -1 + i$, find $\dfrac{z_1}{z_2}$ by using trigonometric form. Check your answer by direct calculation.

**Solution.**
$$\begin{aligned}
z_1 &= 1 + \sqrt{3}i = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right), \\
z_2 &= -1 + i = \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right).
\end{aligned}$$

$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{2}{\sqrt{2}}\left(\cos\left(\frac{\pi}{3} - \frac{3\pi}{4}\right) + i\sin\left(\frac{\pi}{3} - \frac{3\pi}{4}\right)\right) \\
&= \sqrt{2}\left(\cos\left(-\frac{5\pi}{12}\right) + i\sin\left(-\frac{5\pi}{12}\right)\right) \\
&= \sqrt{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} - \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt{3} - 1}{2} - \frac{\sqrt{3} + 1}{2}i.
\end{aligned}$$

$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{1 + \sqrt{3}i}{-1 + i} \\
&= \frac{(1 + \sqrt{3}i)(-1 - i)}{(-1 + i)(-1 - i)} \\
&= \frac{-1 - i - \sqrt{3}i - \sqrt{3}i^2}{1 + 1} \\
&= \frac{(\sqrt{3} - 1) - (1 + \sqrt{3})i}{2} \\
&= \frac{\sqrt{3} - 1}{2} - \frac{\sqrt{3} + 1}{2}i.
\end{aligned}$$

$$\therefore \quad \frac{z_1}{z_2} = \frac{\sqrt{3} - 1}{2} - \frac{\sqrt{3} + 1}{2}i.$$

#### Power of Complex Numbers (De Moivre's Formula)
Let
$$z = r(\cos\theta + i\sin\theta).$$

By applying the product rule repeatedly, we get
$$\begin{aligned}
z^n &= \underbrace{z \cdot z \cdots z}_{n\text{ factors}} \\
&= r^n\bigl(\cos(\theta + \theta + \cdots + \theta) + i\sin(\theta + \theta + \cdots + \theta)\bigr) \\
&= r^n\bigl(\cos n\theta + i\sin n\theta\bigr).
\end{aligned}$$

Thus, the modulus is raised to the $n^{\text{th}}$ power and the argument is multiplied by $n$.

$$\boxed{z^n = r^n(\cos n\theta + i\sin n\theta), \qquad n \in \mathbb{Z}}$$

**Remember:** Raise the modulus to the $n^{\text{th}}$ power and multiply the argument by $n$.

**Example 9.** Given that $z = 1 + \sqrt{3}i$, find:

**(a)** $z^{10}$

**Solution.**
$$z = 1 + \sqrt{3}i = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right).$$
$$\begin{aligned}
z^{10} &= 2^{10}\left(\cos\frac{10\pi}{3} + i\sin\frac{10\pi}{3}\right) \\
&= 1024\left(-\frac{1}{2} - \frac{\sqrt{3}}{2}i\right) \\
&= -512 - 512\sqrt{3}i.
\end{aligned}$$

**(b)** $z^{-10}$

**Solution.**
$$z = 1 + \sqrt{3}i = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right).$$
$$\begin{aligned}
z^{-10} &= 2^{-10}\left(\cos\left(-\frac{10\pi}{3}\right) + i\sin\left(-\frac{10\pi}{3}\right)\right) \\
&= \frac{1}{1024}\left(-\frac{1}{2} + \frac{\sqrt{3}}{2}i\right) \\
&= -\frac{1}{2048} + \frac{\sqrt{3}}{2048}i.
\end{aligned}$$

#### Trigonometric Form Summary
If $z_1 = r_1(\cos\theta_1 + i\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$ then
$$\begin{aligned}
z_1z_2 &= r_1r_2\bigl(\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)\bigr), & \frac{z_1}{z_2} &= \frac{r_1}{r_2}\bigl(\cos(\theta_1 - \theta_2) + i\sin(\theta_1 - \theta_2)\bigr), \\
z^{-1} &= \frac{1}{r}\bigl(\cos(-\theta) + i\sin(-\theta)\bigr), & z^n &= r^n(\cos n\theta + i\sin n\theta), \quad n \in \mathbb{Z}.
\end{aligned}$$

---

### Exercise 1.4

**1. Find the trigonometric form with $-\pi < \theta \le \pi$.**

**(a)** $z = 1 - \sqrt{3}i$

**Solution.**
$$\begin{aligned}
z &= 1 - \sqrt{3}i = (1, -\sqrt{3}) \\
r &= \sqrt{1^2 + (-\sqrt{3})^2} = 2 \\
\cos\theta &= \frac{1}{2} \quad \text{and} \quad \sin\theta = -\frac{\sqrt{3}}{2} \\
\theta &= -\frac{\pi}{3} \\
z &= 2\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1a]

**(b)** $z = -\sqrt{2} + \sqrt{2}i$

**Solution.**
$$\begin{aligned}
z &= -\sqrt{2} + \sqrt{2}i = (-\sqrt{2}, \sqrt{2}) \\
r &= \sqrt{(-\sqrt{2})^2 + (\sqrt{2})^2} = 2 \\
\cos\theta &= -\frac{\sqrt{2}}{2} \quad \text{and} \quad \sin\theta = \frac{\sqrt{2}}{2} \\
\theta &= \frac{3\pi}{4} \\
z &= 2\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1b]

**(c)** $z = -2 - 2i$

**Solution.**
$$\begin{aligned}
z &= -2 - 2i = (-2, -2) \\
r &= \sqrt{(-2)^2 + (-2)^2} = 2\sqrt{2} \\
\cos\theta &= -\frac{\sqrt{2}}{2} \quad \text{and} \quad \sin\theta = -\frac{\sqrt{2}}{2} \\
\theta &= -\frac{3\pi}{4} \\
z &= 2\sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1c]

**(d)** $z = \sqrt{3} - i$

**Solution.**
$$\begin{aligned}
z &= \sqrt{3} - i = (\sqrt{3}, -1) \\
r &= \sqrt{(\sqrt{3})^2 + (-1)^2} = 2 \\
\cos\theta &= \frac{\sqrt{3}}{2} \quad \text{and} \quad \sin\theta = -\frac{1}{2} \\
\theta &= -\frac{\pi}{6} \\
z &= 2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1d]

**(e)** $z = i$

**Solution.**
$$\begin{aligned}
z &= i = (0, 1) \\
r &= \sqrt{1^2} = 1 \\
\cos\theta &= 0 \quad \text{and} \quad \sin\theta = 1 \\
\theta &= \frac{\pi}{2} \\
z &= 1\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1e]

**(f)** $z = -3i$

**Solution.**
$$\begin{aligned}
z &= -3i = (0, -3) \\
r &= \sqrt{(-3)^2} = 3 \\
\cos\theta &= 0 \quad \text{and} \quad \sin\theta = -1 \\
\theta &= -\frac{\pi}{2} \\
z &= 3\left(\cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_4_1f]

**2. Given that $z_1 = 2 - 2\sqrt{3}i$ and $z_2 = -1 - i$, find the following by using trigonometric forms. Check your answer by direct calculation.**

**(a)** $z_1z_2$

**Solution.**
$$z_1 = 4\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right), \qquad z_2 = \sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right).$$

$$\begin{aligned}
z_1z_2 &= 4\sqrt{2}\left(\cos\left(-\frac{\pi}{3} + \left(-\frac{3\pi}{4}\right)\right) + i\sin\left(-\frac{\pi}{3} + \left(-\frac{3\pi}{4}\right)\right)\right) \\
&= 4\sqrt{2}\left(\cos\left(-\frac{13\pi}{12}\right) + i\sin\left(-\frac{13\pi}{12}\right)\right) \\
&= 4\sqrt{2}\left(\frac{-\sqrt{6} - \sqrt{2}}{4} + i\frac{\sqrt{6} - \sqrt{2}}{4}\right) \\
&= \sqrt{2}(-\sqrt{6} - \sqrt{2}) + \sqrt{2}(\sqrt{6} - \sqrt{2})i \\
&= (-2\sqrt{3} - 2) + (2\sqrt{3} - 2)i \\
&= -(2 + 2\sqrt{3}) + (2\sqrt{3} - 2)i.
\end{aligned}$$

$$\begin{aligned}
z_1z_2 &= (2 - 2\sqrt{3}i)(-1 - i) \\
&= -2 - 2i + 2\sqrt{3}i + 2\sqrt{3}(-1) \\
&= -(2 + 2\sqrt{3}) + (2\sqrt{3} - 2)i.
\end{aligned}$$

**(b)** $z_1^{-1}$

**Solution.**
$$z_1 = 4\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right).$$

$$\begin{aligned}
z_1^{-1} &= \frac{1}{4}\left(\cos\left(-\left(-\frac{\pi}{3}\right)\right) + i\sin\left(-\left(-\frac{\pi}{3}\right)\right)\right) \\
&= \frac{1}{4}\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right) \\
&= \frac{1}{4}\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) \\
&= \frac{1}{8} + \frac{\sqrt{3}}{8}i.
\end{aligned}$$

$$\begin{aligned}
z_1^{-1} &= \frac{1}{2 - 2\sqrt{3}i} \cdot \frac{2 + 2\sqrt{3}i}{2 + 2\sqrt{3}i} \\
&= \frac{2 + 2\sqrt{3}i}{2^2 + (2\sqrt{3})^2} \\
&= \frac{2 + 2\sqrt{3}i}{16} = \frac{1}{8} + \frac{\sqrt{3}}{8}i.
\end{aligned}$$

**(c)** $\dfrac{z_1}{z_2}$

**Solution.**
$$z_1 = 4\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right), \qquad z_2 = \sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right).$$

$$\begin{aligned}
\frac{z_1}{z_2} &= 2\sqrt{2}\left(\cos\left(-\frac{\pi}{3} - \left(-\frac{3\pi}{4}\right)\right) + i\sin\left(-\frac{\pi}{3} - \left(-\frac{3\pi}{4}\right)\right)\right) \\
&= 2\sqrt{2}\left(\cos\frac{5\pi}{12} + i\sin\frac{5\pi}{12}\right) \\
&= 2\sqrt{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} + i\frac{\sqrt{6} + \sqrt{2}}{4}\right) \\
&= \frac{\sqrt{2}}{2}(\sqrt{6} - \sqrt{2}) + \frac{\sqrt{2}}{2}(\sqrt{6} + \sqrt{2})i \\
&= \sqrt{3} - 1 + (\sqrt{3} + 1)i.
\end{aligned}$$

$$\begin{aligned}
\frac{z_1}{z_2} &= \frac{2 - 2\sqrt{3}i}{-1 - i} \cdot \frac{-1 + i}{-1 + i} \\
&= \frac{(2 - 2\sqrt{3}i)(-1 + i)}{(-1)^2 + 1^2} \\
&= \frac{(-2 + 2\sqrt{3}) + (2 + 2\sqrt{3})i}{2} \\
&= \sqrt{3} - 1 + (\sqrt{3} + 1)i.
\end{aligned}$$

**(d)** $\dfrac{z_2}{z_1}$

**Solution.**
$$z_1 = 4\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right), \qquad z_2 = \sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right).$$

$$\begin{aligned}
\frac{z_2}{z_1} &= \frac{\sqrt{2}}{4}\left(\cos\left(-\frac{3\pi}{4} - \left(-\frac{\pi}{3}\right)\right) + i\sin\left(-\frac{3\pi}{4} - \left(-\frac{\pi}{3}\right)\right)\right) \\
&= \frac{\sqrt{2}}{4}\left(\cos\left(-\frac{5\pi}{12}\right) + i\sin\left(-\frac{5\pi}{12}\right)\right) \\
&= \frac{\sqrt{2}}{4}\left(\frac{\sqrt{6} - \sqrt{2}}{4} + i\frac{-\sqrt{6} - \sqrt{2}}{4}\right) \\
&= \frac{\sqrt{2}(\sqrt{6} - \sqrt{2})}{16} + \frac{\sqrt{2}(-\sqrt{6} - \sqrt{2})}{16}i \\
&= \frac{\sqrt{3} - 1}{8} - \frac{\sqrt{3} + 1}{8}i.
\end{aligned}$$

$$\begin{aligned}
\frac{z_2}{z_1} &= \frac{-1 - i}{2 - 2\sqrt{3}i} \cdot \frac{2 + 2\sqrt{3}i}{2 + 2\sqrt{3}i} \\
&= \frac{(-1 - i)(2 + 2\sqrt{3}i)}{2^2 + (2\sqrt{3})^2} \\
&= \frac{(2\sqrt{3} - 2) - (2\sqrt{3} + 2)i}{16} \\
&= \frac{\sqrt{3} - 1}{8} - \frac{\sqrt{3} + 1}{8}i.
\end{aligned}$$

**3. Given that $z = -2\sqrt{3} - 2i$, find**

**(a)** $z^5$

**Solution.**
$$z = 4\left(\cos\left(-\frac{5\pi}{6}\right) + i\sin\left(-\frac{5\pi}{6}\right)\right).$$
$$\begin{aligned}
z^5 &= 4^5\left(\cos\left(5\left(-\frac{5\pi}{6}\right)\right) + i\sin\left(5\left(-\frac{5\pi}{6}\right)\right)\right) \\
&= 4^5\left(\cos\left(-\frac{25\pi}{6}\right) + i\sin\left(-\frac{25\pi}{6}\right)\right) \\
&= 1024\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right) \\
&= 1024\left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) \\
&= 512\sqrt{3} - 512i.
\end{aligned}$$
[DIAGRAM: Ex1_4_Q3_Spiral_a]

**(b)** $z^{-5}$

**Solution.**
$$z = 4\left(\cos\left(-\frac{5\pi}{6}\right) + i\sin\left(-\frac{5\pi}{6}\right)\right).$$
$$\begin{aligned}
z^{-5} &= 4^{-5}\left(\cos\left(-5\left(-\frac{5\pi}{6}\right)\right) + i\sin\left(-5\left(-\frac{5\pi}{6}\right)\right)\right) \\
&= 4^{-5}\left(\cos\frac{25\pi}{6} + i\sin\frac{25\pi}{6}\right) \\
&= \frac{1}{1024}\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) \\
&= \frac{1}{1024}\left(\frac{\sqrt{3}}{2} + \frac{1}{2}i\right) \\
&= \frac{\sqrt{3}}{2048} + \frac{1}{2048}i.
\end{aligned}$$
[DIAGRAM: Ex1_4_Q3_Spiral_b]

---

### 1.5 Roots of Complex Numbers

#### Roots of Complex Numbers
In the complex number system,
$$\begin{aligned}
x^2 &= 4 &&\implies& x &= 2,\ -2 && (\text{2 roots}), \\
x^3 &= 8 &&\implies& x &= 2,\ -1 + \sqrt{3}\,i,\ -1 - \sqrt{3}\,i && (\text{3 roots}).
\end{aligned}$$

In general, $z^n = c$ has $n$ distinct complex roots when $z \neq 0$.

An $n^{\text{th}}$ root of a complex number $z$ is a complex number $\omega$ that satisfies the equation
$$\omega^n = z.$$

Let $\omega^n = z$. Then
$$\omega = \sqrt[n]{z}.$$

Since
$$z = r(\cos\theta + i\sin\theta),$$
the principal $n^{\text{th}}$ root is
$$\begin{aligned}
\omega &= \sqrt[n]{z} \\
&= \sqrt[n]{r(\cos\theta + i\sin\theta)} \\
&= \sqrt[n]{r}(\cos\theta + i\sin\theta)^{1/n} \\
&= \sqrt[n]{r}\left(\cos\frac{\theta}{n} + i\sin\frac{\theta}{n}\right).
\end{aligned}$$

Here, $\theta$ represents the principal argument of $z$. To find all the $n^{\text{th}}$ roots of $z$, we use $\theta + 2k\pi$ instead of $\theta$.

$$\omega_k = \sqrt[n]{r}\left(\cos\frac{\theta + 2k\pi}{n} + i\sin\frac{\theta + 2k\pi}{n}\right), \qquad k = 0, 1, 2, \dots, n - 1.$$

#### Illustration
Find the cube roots of $z = -1$.

**Solution.**
$$\begin{aligned}
z &= -1 \\
&= (-1, 0) \\
&= \cos\pi + i\sin\pi.
\end{aligned}$$

**For $k = -2, -1, 0$:**
$$\begin{aligned}
\omega_{-2} &= \cos\frac{\pi + 2(-2)\pi}{3} + i\sin\frac{\pi + 2(-2)\pi}{3} \\
&= \cos\frac{\pi - 4\pi}{3} + i\sin\frac{\pi - 4\pi}{3} \\
&= \cos(-\pi) + i\sin(-\pi) \\
&= -1, \\[6pt]
\omega_{-1} &= \cos\frac{\pi + 2(-1)\pi}{3} + i\sin\frac{\pi + 2(-1)\pi}{3} \\
&= \cos\frac{\pi - 2\pi}{3} + i\sin\frac{\pi - 2\pi}{3} \\
&= \cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right) \\
&= \frac{1}{2} - \frac{\sqrt{3}}{2}i, \\[6pt]
\omega_0 &= \cos\frac{\pi + 2(0)\pi}{3} + i\sin\frac{\pi + 2(0)\pi}{3} \\
&= \cos\frac{\pi + 0}{3} + i\sin\frac{\pi + 0}{3} \\
&= \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} \\
&= \frac{1}{2} + \frac{\sqrt{3}}{2}i.
\end{aligned}$$

**For $k = -1, 0, 1$:**
$$\begin{aligned}
\omega_{-1} &= \cos\frac{\pi + 2(-1)\pi}{3} + i\sin\frac{\pi + 2(-1)\pi}{3} \\
&= \cos\frac{\pi - 2\pi}{3} + i\sin\frac{\pi - 2\pi}{3} \\
&= \cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right) \\
&= \frac{1}{2} - \frac{\sqrt{3}}{2}i, \\[6pt]
\omega_0 &= \cos\frac{\pi + 2(0)\pi}{3} + i\sin\frac{\pi + 2(0)\pi}{3} \\
&= \cos\frac{\pi + 0}{3} + i\sin\frac{\pi + 0}{3} \\
&= \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} \\
&= \frac{1}{2} + \frac{\sqrt{3}}{2}i, \\[6pt]
\omega_1 &= \cos\frac{\pi + 2(1)\pi}{3} + i\sin\frac{\pi + 2(1)\pi}{3} \\
&= \cos\frac{\pi + 2\pi}{3} + i\sin\frac{\pi + 2\pi}{3} \\
&= \cos\pi + i\sin\pi \\
&= -1.
\end{aligned}$$

**For $k = 0, 1, 2$:**
$$\begin{aligned}
\omega_0 &= \cos\frac{\pi + 2(0)\pi}{3} + i\sin\frac{\pi + 2(0)\pi}{3} \\
&= \cos\frac{\pi + 0}{3} + i\sin\frac{\pi + 0}{3} \\
&= \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} \\
&= \frac{1}{2} + \frac{\sqrt{3}}{2}i, \\[6pt]
\omega_1 &= \cos\frac{\pi + 2(1)\pi}{3} + i\sin\frac{\pi + 2(1)\pi}{3} \\
&= \cos\frac{\pi + 2\pi}{3} + i\sin\frac{\pi + 2\pi}{3} \\
&= \cos\pi + i\sin\pi \\
&= -1, \\[6pt]
\omega_2 &= \cos\frac{\pi + 2(2)\pi}{3} + i\sin\frac{\pi + 2(2)\pi}{3} \\
&= \cos\frac{\pi + 4\pi}{3} + i\sin\frac{\pi + 4\pi}{3} \\
&= \cos\frac{5\pi}{3} + i\sin\frac{5\pi}{3} \\
&= \frac{1}{2} - \frac{\sqrt{3}}{2}i.
\end{aligned}$$

**For $k = 1, 2, 3$:**
$$\begin{aligned}
\omega_1 &= \cos\frac{\pi + 2(1)\pi}{3} + i\sin\frac{\pi + 2(1)\pi}{3} \\
&= \cos\frac{\pi + 2\pi}{3} + i\sin\frac{\pi + 2\pi}{3} \\
&= \cos\pi + i\sin\pi \\
&= -1, \\[6pt]
\omega_2 &= \cos\frac{\pi + 2(2)\pi}{3} + i\sin\frac{\pi + 2(2)\pi}{3} \\
&= \cos\frac{\pi + 4\pi}{3} + i\sin\frac{\pi + 4\pi}{3} \\
&= \cos\frac{5\pi}{3} + i\sin\frac{5\pi}{3} \\
&= \frac{1}{2} - \frac{\sqrt{3}}{2}i, \\[6pt]
\omega_3 &= \cos\frac{\pi + 2(3)\pi}{3} + i\sin\frac{\pi + 2(3)\pi}{3} \\
&= \cos\frac{\pi + 6\pi}{3} + i\sin\frac{\pi + 6\pi}{3} \\
&= \cos\frac{7\pi}{3} + i\sin\frac{7\pi}{3} \\
&= \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} \\
&= \frac{1}{2} + \frac{\sqrt{3}}{2}i.
\end{aligned}$$

$$\omega_{-2} = \omega_1, \qquad \omega_{-1} = \omega_2, \qquad \omega_0 = \omega_3.$$

For
$$z = r(\cos\theta + i\sin\theta),$$
the $n^{\text{th}}$ roots are
$$\omega_k = \sqrt[n]{r}\left(\cos\frac{\theta + 2k\pi}{n} + i\sin\frac{\theta + 2k\pi}{n}\right), \qquad k = 0, 1, 2, \dots, n - 1.$$

Therefore,
$$\omega_k = \omega_{k+n}.$$

> **Note: Important facts about $n^{\text{th}}$ roots of complex number**
> 1. The difference between the arguments of two consecutive roots is $\dfrac{2\pi}{n}$.
> 2. The roots lie on a circle centred at the origin and form the vertices of a regular $n$-gon.
> 3. When $n > 1$, the sum of all the distinct roots is $\omega_0 + \omega_1 + \cdots + \omega_{n-1} = 0$.

**Example 10.** Find the cube roots of $z = -2 - 2i$.

**Solution.**
$$z = -2 - 2i = (-2, -2), \qquad r = \sqrt{(-2)^2 + (-2)^2} = 2\sqrt{2}$$
$$\cos\theta = -\frac{\sqrt{2}}{2} \quad \text{and} \quad \sin\theta = -\frac{\sqrt{2}}{2}$$
$$\theta = -\frac{3\pi}{4}$$
$$z = 2\sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right)$$

[DIAGRAM: ArgandExample10]

For cube roots,
$$\omega_k = \sqrt[3]{2\sqrt{2}}\left(\cos\frac{-\frac{3\pi}{4} + 2k\pi}{3} + i\sin\frac{-\frac{3\pi}{4} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$

Therefore, the cube roots are
$$\omega_0 = \sqrt{2}\left(\cos\left(-\frac{3\pi}{12}\right) + i\sin\left(-\frac{3\pi}{12}\right)\right) = \sqrt{2}\left(\frac{\sqrt{2}}{2} - i\frac{\sqrt{2}}{2}\right) = 1 - i$$
$$\omega_1 = \sqrt{2}\left(\cos\frac{5\pi}{12} + i\sin\frac{5\pi}{12}\right) = \sqrt{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} + i\frac{\sqrt{6} + \sqrt{2}}{4}\right) = \frac{-1 + \sqrt{3}}{2} + \frac{1 + \sqrt{3}}{2}i$$
$$\omega_2 = \sqrt{2}\left(\cos\frac{13\pi}{12} + i\sin\frac{13\pi}{12}\right) = \sqrt{2}\left(-\frac{\sqrt{6} + \sqrt{2}}{4} + i\frac{-\sqrt{6} + \sqrt{2}}{4}\right) = -\frac{1 + \sqrt{3}}{2} + \frac{1 - \sqrt{3}}{2}i$$

**Example 11.** Solve $z^6 = 1$.

**Solution.**
$$\begin{aligned}
z^6 &= 1 \\
1 &= (1, 0) \\
&= 1(\cos 0 + i\sin 0) \\
&= 1\bigl(\cos(0 + 2k\pi) + i\sin(0 + 2k\pi)\bigr).
\end{aligned}$$

$$\begin{aligned}
z^6 &= 1\bigl(\cos(0 + 2k\pi) + i\sin(0 + 2k\pi)\bigr) \\
z &= \bigl[1\bigl(\cos(0 + 2k\pi) + i\sin(0 + 2k\pi)\bigr)\bigr]^{\frac{1}{6}} \\
z &= \sqrt[6]{1}\left(\cos\frac{0 + 2k\pi}{6} + i\sin\frac{0 + 2k\pi}{6}\right), \qquad k = 0, 1, 2, \dots, 5.
\end{aligned}$$

$$\begin{aligned}
\text{When } k = 0, \quad z &= \cos 0 + i\sin 0 \\
&= 1, \\[4pt]
\text{When } k = 1, \quad z &= \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} \\
&= \frac{1}{2} + \frac{\sqrt{3}}{2}i, \\[4pt]
\text{When } k = 2, \quad z &= \cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3} \\
&= -\frac{1}{2} + \frac{\sqrt{3}}{2}i, \\[4pt]
\text{When } k = 3, \quad z &= \cos\pi + i\sin\pi \\
&= -1, \\[4pt]
\text{When } k = 4, \quad z &= \cos\frac{4\pi}{3} + i\sin\frac{4\pi}{3} \\
&= -\frac{1}{2} - \frac{\sqrt{3}}{2}i, \\[4pt]
\text{When } k = 5, \quad z &= \cos\frac{5\pi}{3} + i\sin\frac{5\pi}{3} \\
&= \frac{1}{2} - \frac{\sqrt{3}}{2}i.
\end{aligned}$$

[DIAGRAM: RootsUnity6]

---

### Exercise 1.5

**1. Find the square roots of the following complex numbers.**

**(a)** $1 + \sqrt{3}i$

**Solution.**
Let $z = 1 + \sqrt{3}i = (1, \sqrt{3})$.
$$\begin{aligned}
r &= \sqrt{1^2 + (\sqrt{3})^2} = 2 \\
\cos\theta &= \frac{1}{2}, \qquad \sin\theta = \frac{\sqrt{3}}{2} \\
\theta &= \frac{\pi}{3} \\
z &= 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1a]
For square roots,
$$\omega_k = \sqrt{2}\left(\cos\frac{\frac{\pi}{3} + 2k\pi}{2} + i\sin\frac{\frac{\pi}{3} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt{2}\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) \\
&= \sqrt{2}\left(\frac{\sqrt{3}}{2} + \frac{1}{2}i\right) \\
&= \frac{\sqrt{6}}{2} + \frac{\sqrt{2}}{2}i, \\[6pt]
\omega_1 &= \sqrt{2}\left(\cos\frac{7\pi}{6} + i\sin\frac{7\pi}{6}\right) \\
&= \sqrt{2}\left(-\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) \\
&= -\frac{\sqrt{6}}{2} - \frac{\sqrt{2}}{2}i.
\end{aligned}$$

**(b)** $i$

**Solution.**
Let $z = i = (0, 1)$.
$$\begin{aligned}
r &= \sqrt{0^2 + 1^2} = 1 \\
\cos\theta &= 0, \qquad \sin\theta = 1 \\
\theta &= \frac{\pi}{2} \\
z &= 1\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1b]
For square roots,
$$\omega_k = 1\left(\cos\frac{\frac{\pi}{2} + 2k\pi}{2} + i\sin\frac{\frac{\pi}{2} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= 1\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right) \\
&= \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i, \\[6pt]
\omega_1 &= 1\left(\cos\frac{5\pi}{4} + i\sin\frac{5\pi}{4}\right) \\
&= -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i.
\end{aligned}$$

**(c)** $-\sqrt{3} + i$

**Solution.**
Let $z = -\sqrt{3} + i = (-\sqrt{3}, 1)$.
$$\begin{aligned}
r &= \sqrt{(-\sqrt{3})^2 + 1^2} = 2 \\
\cos\theta &= -\frac{\sqrt{3}}{2}, \qquad \sin\theta = \frac{1}{2} \\
\theta &= \frac{5\pi}{6} \\
z &= 2\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1c]
For square roots,
$$\omega_k = \sqrt{2}\left(\cos\frac{\frac{5\pi}{6} + 2k\pi}{2} + i\sin\frac{\frac{5\pi}{6} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt{2}\left(\cos\frac{5\pi}{12} + i\sin\frac{5\pi}{12}\right) \\
&= \sqrt{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} + \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt{3} - 1}{2} + \frac{1 + \sqrt{3}}{2}i, \\[6pt]
\omega_1 &= \sqrt{2}\left(\cos\frac{17\pi}{12} + i\sin\frac{17\pi}{12}\right) \\
&= \sqrt{2}\left(-\frac{\sqrt{6} - \sqrt{2}}{4} - \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= -\frac{\sqrt{3} - 1}{2} - \frac{1 + \sqrt{3}}{2}i.
\end{aligned}$$

**(d)** $-1 - \sqrt{3}i$

**Solution.**
Let $z = -1 - \sqrt{3}i = (-1, -\sqrt{3})$.
$$\begin{aligned}
r &= \sqrt{(-1)^2 + (-\sqrt{3})^2} = 2, \qquad \theta = -\frac{2\pi}{3} \\
\cos\theta &= -\frac{1}{2}, \qquad \sin\theta = -\frac{\sqrt{3}}{2} \\
z &= 2\left(\cos\left(-\frac{2\pi}{3}\right) + i\sin\left(-\frac{2\pi}{3}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1d]
For square roots,
$$\omega_k = \sqrt{2}\left(\cos\frac{-\frac{2\pi}{3} + 2k\pi}{2} + i\sin\frac{-\frac{2\pi}{3} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt{2}\left(\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right) \\
&= \sqrt{2}\left(\frac{1}{2} - \frac{\sqrt{3}}{2}i\right) \\
&= \frac{\sqrt{2}}{2} - \frac{\sqrt{6}}{2}i, \\[6pt]
\omega_1 &= \sqrt{2}\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right) \\
&= \sqrt{2}\left(-\frac{1}{2} + \frac{\sqrt{3}}{2}i\right) \\
&= -\frac{\sqrt{2}}{2} + \frac{\sqrt{6}}{2}i.
\end{aligned}$$

**(e)** $-i$

**Solution.**
Let $z = -i = (0, -1)$.
$$\begin{aligned}
r &= \sqrt{0^2 + (-1)^2} = 1 \\
\cos\theta &= 0, \qquad \sin\theta = -1 \\
\theta &= -\frac{\pi}{2} \\
z &= 1\left(\cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1e]
For square roots,
$$\omega_k = 1\left(\cos\frac{-\frac{\pi}{2} + 2k\pi}{2} + i\sin\frac{-\frac{\pi}{2} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= 1\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right) \\
&= \frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i, \\[6pt]
\omega_1 &= 1\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right) \\
&= -\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i.
\end{aligned}$$

**(f)** $\sqrt{3} - i$

**Solution.**
Let $z = \sqrt{3} - i = (\sqrt{3}, -1)$.
$$\begin{aligned}
r &= \sqrt{(\sqrt{3})^2 + (-1)^2} = 2 \\
\cos\theta &= \frac{\sqrt{3}}{2}, \qquad \sin\theta = -\frac{1}{2} \\
\theta &= -\frac{\pi}{6} \\
z &= 2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right)
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1f]
For square roots,
$$\omega_k = \sqrt{2}\left(\cos\frac{-\frac{\pi}{6} + 2k\pi}{2} + i\sin\frac{-\frac{\pi}{6} + 2k\pi}{2}\right), \qquad k = 0, 1.$$
Therefore, the square roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt{2}\left(\cos\left(-\frac{\pi}{12}\right) + i\sin\left(-\frac{\pi}{12}\right)\right) \\
&= \sqrt{2}\left(\frac{\sqrt{6} + \sqrt{2}}{4} - \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= \frac{1 + \sqrt{3}}{2} - \frac{\sqrt{3} - 1}{2}i, \\[6pt]
\omega_1 &= \sqrt{2}\left(\cos\frac{11\pi}{12} + i\sin\frac{11\pi}{12}\right) \\
&= \sqrt{2}\left(-\frac{\sqrt{6} + \sqrt{2}}{4} + \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= -\frac{1 + \sqrt{3}}{2} + \frac{\sqrt{3} - 1}{2}i.
\end{aligned}$$

**2. Find the cube roots of the following complex numbers.**

**(a)** $1 + i$

**Solution.**
Let $z = 1 + i = (1, 1)$.
$$\begin{aligned}
r &= \sqrt{1^2 + 1^2} = \sqrt{2} \\
\cos\theta &= \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}, \qquad \sin\theta = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \\
\theta &= \frac{\pi}{4} \\
z &= \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_2a]
For cube roots,
$$\omega_k = \sqrt[6]{2}\left(\cos\frac{\frac{\pi}{4} + 2k\pi}{3} + i\sin\frac{\frac{\pi}{4} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt[6]{2}\left(\cos\frac{\pi}{12} + i\sin\frac{\pi}{12}\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{6} + \sqrt{2}}{4} + \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4} + \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4}i, \\[6pt]
\omega_1 &= \sqrt[6]{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right) \\
&= -\frac{\sqrt[3]{4}}{2} + \frac{\sqrt[3]{4}}{2}i, \\[6pt]
\omega_2 &= \sqrt[6]{2}\left(\cos\frac{17\pi}{12} + i\sin\frac{17\pi}{12}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{6} - \sqrt{2}}{4} - \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= -\frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4} - \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4}i.
\end{aligned}$$

**(b)** $i$

**Solution.**
Let $z = i = (0, 1)$.
$$\begin{aligned}
r &= \sqrt{0^2 + 1^2} = 1 \\
\cos\theta &= 0, \qquad \sin\theta = 1 \\
\theta &= \frac{\pi}{2} \\
z &= 1\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1b]
For cube roots,
$$\omega_k = 1\left(\cos\frac{\frac{\pi}{2} + 2k\pi}{3} + i\sin\frac{\frac{\pi}{2} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= 1\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) = \frac{\sqrt{3}}{2} + \frac{1}{2}i, \\
\omega_1 &= 1\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right) = -\frac{\sqrt{3}}{2} + \frac{1}{2}i, \\
\omega_2 &= 1\left(\cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2}\right) = -i.
\end{aligned}$$

**(c)** $-1 + i$

**Solution.**
Let $z = -1 + i = (-1, 1)$.
$$\begin{aligned}
r &= \sqrt{(-1)^2 + 1^2} = \sqrt{2} \\
\cos\theta &= -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2}, \qquad \sin\theta = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} \\
\theta &= \frac{3\pi}{4} \\
z &= \sqrt{2}\left(\cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4}\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_2c]
For cube roots,
$$\omega_k = \sqrt[6]{2}\left(\cos\frac{\frac{3\pi}{4} + 2k\pi}{3} + i\sin\frac{\frac{3\pi}{4} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt[6]{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i\right) \\
&= \frac{\sqrt[3]{4}}{2} + \frac{\sqrt[3]{4}}{2}i, \\[6pt]
\omega_1 &= \sqrt[6]{2}\left(\cos\frac{11\pi}{12} + i\sin\frac{11\pi}{12}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{6} + \sqrt{2}}{4} + \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= -\frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4} + \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4}i, \\[6pt]
\omega_2 &= \sqrt[6]{2}\left(\cos\frac{19\pi}{12} + i\sin\frac{19\pi}{12}\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} - \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4} - \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4}i.
\end{aligned}$$

**(d)** $-1 - i$

**Solution.**
Let $z = -1 - i = (-1, -1)$.
$$\begin{aligned}
r &= \sqrt{(-1)^2 + (-1)^2} = \sqrt{2} \\
\cos\theta &= -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2}, \qquad \sin\theta = -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2} \\
\theta &= -\frac{3\pi}{4} \\
z &= \sqrt{2}\left(\cos\left(-\frac{3\pi}{4}\right) + i\sin\left(-\frac{3\pi}{4}\right)\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_2d]
For cube roots,
$$\omega_k = \sqrt[6]{2}\left(\cos\frac{-\frac{3\pi}{4} + 2k\pi}{3} + i\sin\frac{-\frac{3\pi}{4} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt[6]{2}\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i\right) \\
&= \frac{\sqrt[3]{4}}{2} - \frac{\sqrt[3]{4}}{2}i, \\[6pt]
\omega_1 &= \sqrt[6]{2}\left(\cos\frac{5\pi}{12} + i\sin\frac{5\pi}{12}\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{6} - \sqrt{2}}{4} + \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4} + \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4}i, \\[6pt]
\omega_2 &= \sqrt[6]{2}\left(\cos\frac{13\pi}{12} + i\sin\frac{13\pi}{12}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{6} + \sqrt{2}}{4} - \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= -\frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4} - \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4}i.
\end{aligned}$$

**(e)** $-i$

**Solution.**
Let $z = -i = (0, -1)$.
$$\begin{aligned}
r &= \sqrt{0^2 + (-1)^2} = 1 \\
\cos\theta &= 0, \qquad \sin\theta = -1 \\
\theta &= -\frac{\pi}{2} \\
z &= 1\left(\cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_1e]
For cube roots,
$$\omega_k = 1\left(\cos\frac{-\frac{\pi}{2} + 2k\pi}{3} + i\sin\frac{-\frac{\pi}{2} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= 1\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right) = \frac{\sqrt{3}}{2} - \frac{1}{2}i, \\
\omega_1 &= 1\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right) = i, \\
\omega_2 &= 1\left(\cos\frac{7\pi}{6} + i\sin\frac{7\pi}{6}\right) = -\frac{\sqrt{3}}{2} - \frac{1}{2}i.
\end{aligned}$$

**(f)** $1 - i$

**Solution.**
Let $z = 1 - i = (1, -1)$.
$$\begin{aligned}
r &= \sqrt{1^2 + (-1)^2} = \sqrt{2} \\
\cos\theta &= \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}, \qquad \sin\theta = -\frac{1}{\sqrt{2}} = -\frac{\sqrt{2}}{2} \\
\theta &= -\frac{\pi}{4} \\
z &= \sqrt{2}\left(\cos\left(-\frac{\pi}{4}\right) + i\sin\left(-\frac{\pi}{4}\right)\right).
\end{aligned}$$
[DIAGRAM: ArgandEx1_5_2f]
For cube roots,
$$\omega_k = \sqrt[6]{2}\left(\cos\frac{-\frac{\pi}{4} + 2k\pi}{3} + i\sin\frac{-\frac{\pi}{4} + 2k\pi}{3}\right), \qquad k = 0, 1, 2.$$
Therefore, the cube roots of $z$ are
$$\begin{aligned}
\omega_0 &= \sqrt[6]{2}\left(\cos\left(-\frac{\pi}{12}\right) + i\sin\left(-\frac{\pi}{12}\right)\right) \\
&= \sqrt[6]{2}\left(\frac{\sqrt{6} + \sqrt{2}}{4} - \frac{\sqrt{6} - \sqrt{2}}{4}i\right) \\
&= \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4} - \frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4}i, \\[6pt]
\omega_1 &= \sqrt[6]{2}\left(\cos\frac{7\pi}{12} + i\sin\frac{7\pi}{12}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{6} - \sqrt{2}}{4} + \frac{\sqrt{6} + \sqrt{2}}{4}i\right) \\
&= -\frac{\sqrt[3]{4}(\sqrt{3} - 1)}{4} + \frac{\sqrt[3]{4}(\sqrt{3} + 1)}{4}i, \\[6pt]
\omega_2 &= \sqrt[6]{2}\left(\cos\frac{5\pi}{4} + i\sin\frac{5\pi}{4}\right) \\
&= \sqrt[6]{2}\left(-\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i\right) \\
&= -\frac{\sqrt[3]{4}}{2} - \frac{\sqrt[3]{4}}{2}i.
\end{aligned}$$

**3. Solve the following equations.**

**(a)** $z^4 = -i$

**Solution.**
$$\begin{aligned}
z^4 &= -i \\
-i &= (0, -1) \\
&= 1\left(\cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right)\right) \\
&= 1\left(\cos\left(-\frac{\pi}{2} + 2k\pi\right) + i\sin\left(-\frac{\pi}{2} + 2k\pi\right)\right) \\
z^4 &= 1\left(\cos\left(-\frac{\pi}{2} + 2k\pi\right) + i\sin\left(-\frac{\pi}{2} + 2k\pi\right)\right) \\
z &= \left[1\left(\cos\left(-\frac{\pi}{2} + 2k\pi\right) + i\sin\left(-\frac{\pi}{2} + 2k\pi\right)\right)\right]^{\frac{1}{4}} \\
z &= \sqrt[4]{1}\left(\cos\frac{-\frac{\pi}{2} + 2k\pi}{4} + i\sin\frac{-\frac{\pi}{2} + 2k\pi}{4}\right), \qquad k = 0, 1, 2, 3.
\end{aligned}$$

$$\begin{aligned}
\text{When } k = 0, \quad z &= \cos\left(-\frac{\pi}{8}\right) + i\sin\left(-\frac{\pi}{8}\right) \\
&= \cos\left(\frac{\frac{\pi}{4}}{2}\right) - \sin\left(\frac{\frac{\pi}{4}}{2}\right)i \\
&= \sqrt{\frac{1 + \cos\frac{\pi}{4}}{2}} - \sqrt{\frac{1 - \cos\frac{\pi}{4}}{2}}\,i \\
&= \sqrt{\frac{1 + \frac{\sqrt{2}}{2}}{2}} - \sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}}\,i \\
&= \frac{\sqrt{2 + \sqrt{2}}}{2} - \frac{\sqrt{2 - \sqrt{2}}}{2}i, \\[8pt]
\text{When } k = 1, \quad z &= \cos\frac{3\pi}{8} + i\sin\frac{3\pi}{8} \\
&= \cos\left(\frac{\frac{3\pi}{4}}{2}\right) + \sin\left(\frac{\frac{3\pi}{4}}{2}\right)i \\
&= \sqrt{\frac{1 + \cos\frac{3\pi}{4}}{2}} + \sqrt{\frac{1 - \cos\frac{3\pi}{4}}{2}}\,i \\
&= \sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}} + \sqrt{\frac{1 + \frac{\sqrt{2}}{2}}{2}}\,i \\
&= \frac{\sqrt{2 - \sqrt{2}}}{2} + \frac{\sqrt{2 + \sqrt{2}}}{2}i, \\[8pt]
\text{When } k = 2, \quad z &= \cos\frac{7\pi}{8} + i\sin\frac{7\pi}{8} \\
&= \cos\left(\frac{\frac{7\pi}{4}}{2}\right) + \sin\left(\frac{\frac{7\pi}{4}}{2}\right)i \\
&= -\sqrt{\frac{1 + \cos\frac{7\pi}{4}}{2}} + \sqrt{\frac{1 - \cos\frac{7\pi}{4}}{2}}\,i \\
&= -\sqrt{\frac{1 + \frac{\sqrt{2}}{2}}{2}} + \sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}}\,i \\
&= -\frac{\sqrt{2 + \sqrt{2}}}{2} + \frac{\sqrt{2 - \sqrt{2}}}{2}i, \\[8pt]
\text{When } k = 3, \quad z &= \cos\frac{11\pi}{8} + i\sin\frac{11\pi}{8} \\
&= \cos\left(\frac{\frac{11\pi}{4}}{2}\right) + \sin\left(\frac{\frac{11\pi}{4}}{2}\right)i \\
&= -\sqrt{\frac{1 + \cos\frac{11\pi}{4}}{2}} - \sqrt{\frac{1 - \cos\frac{11\pi}{4}}{2}}\,i \\
&= -\sqrt{\frac{1 + \cos\frac{3\pi}{4}}{2}} - \sqrt{\frac{1 - \cos\frac{3\pi}{4}}{2}}\,i \\
&= -\sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}} - \sqrt{\frac{1 + \frac{\sqrt{2}}{2}}{2}}\,i \\
&= -\frac{\sqrt{2 - \sqrt{2}}}{2} - \frac{\sqrt{2 + \sqrt{2}}}{2}i.
\end{aligned}$$

**(b)** $z^4 = -1$

**Solution.**
$$\begin{aligned}
z^4 &= -1 \\
-1 &= (-1, 0) \\
&= 1(\cos\pi + i\sin\pi) \\
&= 1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr) \\
z^4 &= 1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr) \\
z &= \bigl[1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr)\bigr]^{\frac{1}{4}} \\
z &= \sqrt[4]{1}\left(\cos\frac{\pi + 2k\pi}{4} + i\sin\frac{\pi + 2k\pi}{4}\right), \qquad k = 0, 1, 2, 3.
\end{aligned}$$

$$\begin{aligned}
\text{When } k = 0, \quad z &= \cos\frac{\pi}{4} + i\sin\frac{\pi}{4} \\
&= \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i, \\[6pt]
\text{When } k = 1, \quad z &= \cos\frac{3\pi}{4} + i\sin\frac{3\pi}{4} \\
&= -\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2}i, \\[6pt]
\text{When } k = 2, \quad z &= \cos\frac{5\pi}{4} + i\sin\frac{5\pi}{4} \\
&= -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i, \\[6pt]
\text{When } k = 3, \quad z &= \cos\frac{7\pi}{4} + i\sin\frac{7\pi}{4} \\
&= \frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}i.
\end{aligned}$$

**(c)** $z^4 = -8 - 8\sqrt{3}i$

**Solution.**
$$\begin{aligned}
z^4 &= -8 - 8\sqrt{3}i \\
-8 - 8\sqrt{3}i &= (-8, -8\sqrt{3}) \\
&= 16\left(\cos\left(-\frac{2\pi}{3}\right) + i\sin\left(-\frac{2\pi}{3}\right)\right) \\
&= 16\left(\cos\left(-\frac{2\pi}{3} + 2k\pi\right) + i\sin\left(-\frac{2\pi}{3} + 2k\pi\right)\right) \\
z^4 &= 16\left(\cos\left(-\frac{2\pi}{3} + 2k\pi\right) + i\sin\left(-\frac{2\pi}{3} + 2k\pi\right)\right) \\
z &= \left[16\left(\cos\left(-\frac{2\pi}{3} + 2k\pi\right) + i\sin\left(-\frac{2\pi}{3} + 2k\pi\right)\right)\right]^{\frac{1}{4}} \\
z &= \sqrt[4]{16}\left(\cos\frac{-\frac{2\pi}{3} + 2k\pi}{4} + i\sin\frac{-\frac{2\pi}{3} + 2k\pi}{4}\right), \qquad k = 0, 1, 2, 3.
\end{aligned}$$

$$\begin{aligned}
\text{When } k = 0, \quad z &= 2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right) \\
&= 2\left(\frac{\sqrt{3}}{2} - \frac{1}{2}i\right) \\
&= \sqrt{3} - i, \\[6pt]
\text{When } k = 1, \quad z &= 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right) \\
&= 2\left(\frac{1}{2} + \frac{\sqrt{3}}{2}i\right) \\
&= 1 + \sqrt{3}i, \\[6pt]
\text{When } k = 2, \quad z &= 2\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right) \\
&= 2\left(-\frac{\sqrt{3}}{2} + \frac{1}{2}i\right) \\
&= -\sqrt{3} + i, \\[6pt]
\text{When } k = 3, \quad z &= 2\left(\cos\frac{4\pi}{3} + i\sin\frac{4\pi}{3}\right) \\
&= 2\left(-\frac{1}{2} - \frac{\sqrt{3}}{2}i\right) \\
&= -1 - \sqrt{3}i.
\end{aligned}$$

**(d)** $z^6 = -1$

**Solution.**
$$\begin{aligned}
z^6 &= -1 \\
-1 &= (-1, 0) \\
&= 1(\cos\pi + i\sin\pi) \\
&= 1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr) \\
z^6 &= 1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr) \\
z &= \bigl[1\bigl(\cos(\pi + 2k\pi) + i\sin(\pi + 2k\pi)\bigr)\bigr]^{\frac{1}{6}} \\
z &= \sqrt[6]{1}\left(\cos\frac{\pi + 2k\pi}{6} + i\sin\frac{\pi + 2k\pi}{6}\right), \qquad k = 0, 1, 2, 3, 4, 5.
\end{aligned}$$

$$\begin{aligned}
\text{When } k = 0, \quad z &= \cos\frac{\pi}{6} + i\sin\frac{\pi}{6} \\
&= \frac{\sqrt{3}}{2} + \frac{1}{2}i, \\[6pt]
\text{When } k = 1, \quad z &= \cos\frac{\pi}{2} + i\sin\frac{\pi}{2} \\
&= i, \\[6pt]
\text{When } k = 2, \quad z &= \cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6} \\
&= -\frac{\sqrt{3}}{2} + \frac{1}{2}i, \\[6pt]
\text{When } k = 3, \quad z &= \cos\frac{7\pi}{6} + i\sin\frac{7\pi}{6} \\
&= -\frac{\sqrt{3}}{2} - \frac{1}{2}i, \\[6pt]
\text{When } k = 4, \quad z &= \cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2} \\
&= -i, \\[6pt]
\text{When } k = 5, \quad z &= \cos\frac{11\pi}{6} + i\sin\frac{11\pi}{6} \\
&= \frac{\sqrt{3}}{2} - \frac{1}{2}i.
\end{aligned}$$
`;
