const fs = require('fs');

let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Strip trailing backtick and semicolon
content = content.replace(/`;\s*$/, '');

const section4_2 = `

## 4.2 Angle between Two Vectors and Scalar Product

First we consider the angle between two vectors $\\vec{a}$ and $\\vec{b}$ in two dimensions. Let
$$ \\overrightarrow{OA} = \\vec{a} = \\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\vec{b} = \\begin{pmatrix} x_2 \\\\ y_2 \\end{pmatrix}, $$
and let $\\theta$ be the angle between them.

**Diagram**
![Angle between vectors](https://storage.googleapis.com/hsa-data/placeholder.png)

In triangle $OAB$,
$$ OA = |\\vec{a}|, \\quad OB = |\\vec{b}|, \\quad AB = |\\vec{b} - \\vec{a}|. $$
By the cosine rule,
$$ |AB|^2 = |OA|^2 + |OB|^2 - 2|OA||OB|\\cos\\theta. $$
Therefore,
$$ |\\vec{b} - \\vec{a}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 - 2|\\vec{a}||\\vec{b}|\\cos\\theta. \\quad (1) $$
Now,
$$ \\vec{b} - \\vec{a} = \\begin{pmatrix} x_2 \\\\ y_2 \\end{pmatrix} - \\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix} = \\begin{pmatrix} x_2 - x_1 \\\\ y_2 - y_1 \\end{pmatrix}. $$
Hence
$$ |\\vec{b} - \\vec{a}|^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 $$
$$ = x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) $$
$$ = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) $$
Comparing (1) and (2), the left sides are the same. Hence the right sides are equal:
$$ |\\vec{a}|^2 + |\\vec{b}|^2 - 2|\\vec{a}||\\vec{b}|\\cos\\theta = |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). $$
Subtracting $|\\vec{a}|^2 + |\\vec{b}|^2$ from both sides,
$$ -2|\\vec{a}||\\vec{b}|\\cos\\theta = -2(x_1x_2 + y_1y_2). $$
Dividing both sides by $-2|\\vec{a}||\\vec{b}|$, we get
$$ \\cos\\theta = \\frac{x_1x_2 + y_1y_2}{|\\vec{a}||\\vec{b}|}. $$

For two-dimensional vectors, the dot product of $\\vec{a}$ and $\\vec{b}$ is
$$ \\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2. $$

Similarly, for three-dimensional vectors, let
$$ \\vec{a} = \\begin{pmatrix} x_1 \\\\ y_1 \\\\ z_1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} x_2 \\\\ y_2 \\\\ z_2 \\end{pmatrix}. $$
Then the dot product of $\\vec{a}$ and $\\vec{b}$ is
$$ \\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2. $$

Also,
**Definition**
$$ \\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta $$
Hence
**Definition**
$$ \\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} $$

### Example 8
Find the angle between the two vectors $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ and $\\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix}$.

**Solution**
Let
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix}. $$
$$ \\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} $$
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} $$
$$ = (3)(5) + (4)(-12) $$
$$ = 15 - 48 $$
$$ = -33. $$
$$ |\\vec{a}| = \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13. $$
$$ \\cos\\theta = \\frac{-33}{(5)(13)} = -\\frac{33}{65}. $$
$$ \\theta = \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ. $$
$$ 120.5^\\circ $$

### Example 9
Given points $P(1, 0, -1)$, $Q(2, 4, 1)$, and $R(3, 5, 6)$, find $\\angle QPR$.

**Solution**
$\\angle QPR$ is the angle between $\\overrightarrow{PQ}$ and $\\overrightarrow{PR}$.
$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} \\quad \\quad \\overrightarrow{PR} = \\overrightarrow{OR} - \\overrightarrow{OP} $$
$$ = \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} $$
$$ = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\quad \\quad = \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$

$$ \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} $$
$$ = (1)(2) + (4)(5) + (2)(7) $$
$$ = 2 + 20 + 14 $$
$$ = 36. $$

$$ |\\overrightarrow{PQ}| = \\sqrt{1^2 + 4^2 + 2^2} \\quad \\quad |\\overrightarrow{PR}| = \\sqrt{2^2 + 5^2 + 7^2} $$
$$ = \\sqrt{1 + 16 + 4} \\quad \\quad = \\sqrt{4 + 25 + 49} $$
$$ = \\sqrt{21} \\quad \\quad = \\sqrt{78}. $$

$$ \\cos\\theta = \\frac{\\overrightarrow{PQ} \\cdot \\overrightarrow{PR}}{|\\overrightarrow{PQ}||\\overrightarrow{PR}|} = \\frac{36}{\\sqrt{21}\\sqrt{78}}. $$
$$ \\theta = \\cos^{-1}\\left(\\frac{36}{\\sqrt{21}\\sqrt{78}}\\right) \\approx 27.2^\\circ. $$

Therefore,
$$ \\angle QPR \\approx 27.2^\\circ $$

**Algebraic Properties of the Scalar Product**

Let $\\vec{a}$, $\\vec{b}$, and $\\vec{c}$ be vectors, and let $k$ be a scalar. The scalar product has the following algebraic properties.

**General Rule: Properties of the Scalar Product**
(1) Commutative property: $$ \\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}. $$
(2) Distributive property: $$ \\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}. $$
(3) Scalar multiplication: $$ (k\\vec{a}) \\cdot \\vec{b} = k(\\vec{a} \\cdot \\vec{b}) = \\vec{a} \\cdot (k\\vec{b}). $$
(4) Multiplication by a negative scalar: $$ (-\\vec{a}) \\cdot \\vec{b} = -(\\vec{a} \\cdot \\vec{b}) = \\vec{a} \\cdot (-\\vec{b}). $$
(5) Product of a vector with itself: $$ \\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2. $$
(6) Zero vector property: $$ \\vec{a} \\cdot \\vec{0} = 0. $$

These properties help us simplify expressions involving scalar products in the same way that algebraic rules help us simplify ordinary products.

**Geometric Properties of the Scalar Product**

The scalar product helps us decide whether two non-zero vectors are perpendicular or parallel.

**General Rule: Geometric Properties of the Scalar Product**
Let $\\theta$ be the angle between non-zero vectors $\\vec{a}$ and $\\vec{b}$.
$$ \\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta. $$
In particular, when $\\vec{b} = \\vec{a}$, the angle is $0^\\circ$. Therefore,
$$ \\vec{a} \\cdot \\vec{a} = |\\vec{a}||\\vec{a}|\\cos 0^\\circ = |\\vec{a}|^2. $$
(1) Perpendicular vectors: $$ \\vec{a} \\cdot \\vec{b} = 0 \\iff \\theta = 90^\\circ. $$
(2) Parallel in the same direction: $$ \\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}| \\iff \\theta = 0^\\circ. $$
(3) Parallel in the opposite direction: $$ \\vec{a} \\cdot \\vec{b} = -|\\vec{a}||\\vec{b}| \\iff \\theta = 180^\\circ. $$

Thus, if the scalar product is zero, the vectors are perpendicular. If the scalar product is equal to the product of their magnitudes, the vectors are parallel in the same direction. If it is the negative of the product of their magnitudes, the vectors are parallel in the opposite direction.

### Example 10
Given that vectors $\\vec{a}$ and $\\vec{b}$ are perpendicular such that $|\\vec{a}| = 3$ and $|\\vec{b}| = 1$, evaluate
$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}). $$

**Solution**
Since $\\vec{a}$ and $\\vec{b}$ are perpendicular,
$$ \\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a} = 0. $$
Now,
$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) = \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} $$
$$ = |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 $$
$$ = 3^2 - 5(1^2) $$
$$ = 9 - 5 $$
$$ = 4. $$

### Example 11
Points $A, B$, and $C$ have position vectors
$$ \\vec{a} = k\\begin{pmatrix} 2 \\\\ -1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 4 \\end{pmatrix}. $$
(a) Find $\\overrightarrow{BC}$.
(b) Find $\\overrightarrow{AB}$ in terms of $k$.
(c) Find the value of $k$ for which $\\overrightarrow{AB}$ is perpendicular to $\\overrightarrow{BC}$.

**Solution**
(a)
$$ \\overrightarrow{BC} = \\vec{c} - \\vec{b} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$
(b)
$$ \\overrightarrow{AB} = \\vec{b} - \\vec{a} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix} - k\\begin{pmatrix} 2 \\\\ -1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix}. $$
(c) Since $\\overrightarrow{AB}$ is perpendicular to $\\overrightarrow{BC}$,
$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = 0. $$
Therefore,
$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} $$
$$ = (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) $$
$$ = -20 - 3k. $$
So,
$$ -20 - 3k = 0. $$
Hence,
$$ k = -\\frac{20}{3}. $$

### Exercise 4.2

**1. Question**
For
$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix}, \\quad \\vec{r} = \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}, $$
find:
$$ \\text{(a)} \\quad \\vec{q} \\cdot \\vec{p} $$
$$ \\text{(b)} \\quad \\vec{q} \\cdot \\vec{r} $$
$$ \\text{(c)} \\quad \\vec{q} \\cdot (\\vec{p} + \\vec{r}) $$
$$ \\text{(d)} \\quad \\hat{\\mathbf{i}} \\cdot \\vec{p} $$
$$ \\text{(e)} \\quad \\vec{q} \\cdot \\hat{\\mathbf{j}} $$
$$ \\text{(f)} \\quad \\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}} $$

**Solution**
Given
$$ \\hat{\\mathbf{i}} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\quad \\hat{\\mathbf{j}} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}. $$
(a)
$$ \\vec{q} \\cdot \\vec{p} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = (-1)(3) + (5)(2) = 7. $$
(b)
$$ \\vec{q} \\cdot \\vec{r} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} = (-1)(-2) + (5)(4) = 22. $$
(c)
$$ \\vec{q} \\cdot (\\vec{p} + \\vec{r}) = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) $$
$$ = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} $$
$$ = (-1)(1) + (5)(6) = 29. $$
(d)
$$ \\hat{\\mathbf{i}} \\cdot \\vec{p} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = 3. $$
(e)
$$ \\vec{q} \\cdot \\hat{\\mathbf{j}} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = 5. $$
(f)
$$ \\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = 1. $$

**2. Question**
For
$$ \\vec{a} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix}, $$
find:
$$ \\text{(a)} \\quad \\vec{a} \\cdot \\vec{b} $$
$$ \\text{(b)} \\quad \\vec{b} \\cdot \\vec{a} $$
$$ \\text{(c)} \\quad |\\vec{a}|^2 $$
$$ \\text{(d)} \\quad \\vec{a} \\cdot \\vec{a} $$
$$ \\text{(e)} \\quad \\vec{a} \\cdot (\\vec{b} + \\vec{c}) $$
$$ \\text{(f)} \\quad \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} $$

**Solution**
(a)
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} = -2 + 1 + 3 = 2. $$
(b)
$$ \\vec{b} \\cdot \\vec{a} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} = -2 + 1 + 3 = 2. $$
(c)
$$ |\\vec{a}|^2 = 2^2 + 1^2 + 3^2 = 14. $$
(d)
$$ \\vec{a} \\cdot \\vec{a} = 2^2 + 1^2 + 3^2 = 14. $$
(e)
$$ \\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) $$
$$ = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} $$
$$ = -2 + 0 + 6 = 4. $$
(f)
$$ \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} = 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) = 2 + (0 - 1 + 3) = 4. $$

**3. Question**
Find the angle between $\\vec{m}$ and $\\vec{n}$ if:
(a) $\\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}$ and $\\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}$.
(b) $\\vec{m} = 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}$ and $\\vec{n} = \\hat{\\mathbf{i}} + 2\\hat{\\mathbf{k}}$.

**Solution**
(a)
$$ \\vec{m} \\cdot \\vec{n} = -7, \\quad |\\vec{m}| = \\sqrt{6}, \\quad |\\vec{n}| = \\sqrt{14}. $$
Thus,
$$ \\cos\\theta = \\frac{-7}{\\sqrt{6}\\sqrt{14}}, \\quad \\theta = \\cos^{-1}\\left(\\frac{-7}{\\sqrt{6}\\sqrt{14}}\\right) \\approx 139.8^\\circ. $$

(b)
$$ \\vec{m} = \\begin{pmatrix} 0 \\\\ 2 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}. $$
So,
$$ \\vec{m} \\cdot \\vec{n} = -2, \\quad |\\vec{m}| = |\\vec{n}| = \\sqrt{5}. $$
Thus,
$$ \\cos\\theta = -\\frac{2}{5}, \\quad \\theta = \\cos^{-1}\\left(-\\frac{2}{5}\\right) \\approx 113.6^\\circ. $$

**4. Question**
Find $t$ if the given pair of vectors are:
(i) perpendicular
(ii) parallel.
(a) $\\vec{p} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix}$ and $\\vec{q} = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}$.
(b) $\\vec{r} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix}$ and $\\vec{s} = \\begin{pmatrix} t \\\\ -4 \\end{pmatrix}$.
(c) $\\vec{a} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix}$ and $\\vec{b} = \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix}$.

**Solution**
(a) For perpendicular vectors,
$$ \\vec{p} \\cdot \\vec{q} = 0. $$
Thus,
$$ \\vec{p} \\cdot \\vec{q} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix} = 3(-2) + t(1). $$
So,
$$ -6 + t = 0, \\quad t = 6. $$
For parallel vectors,
$$ \\begin{pmatrix} 3 \\\\ t \\end{pmatrix} = k\\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
From the first component,
$$ 3 = -2k, \\quad k = -\\frac{3}{2}, $$
so
$$ t = -\\frac{3}{2}. $$
Therefore,
$$ \\text{(i)} \\ t = 6, \\quad \\text{(ii)} \\ t = -\\frac{3}{2}. $$

(b) For perpendicular vectors,
$$ \\vec{r} \\cdot \\vec{s} = 0. $$
Thus,
$$ \\vec{r} \\cdot \\vec{s} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} t \\\\ -4 \\end{pmatrix} = t^2 + (t+2)(-4). $$
So,
$$ t^2 - 4t - 8 = 0. $$
Hence,
$$ t = 2 \\pm 2\\sqrt{3}. $$

For parallel vectors,
$$ t(-4) - t(t+2) = 0. $$
So,
$$ -t(t+6) = 0. $$
Hence,
$$ t = 0 \\quad \\text{or} \\quad t = -6. $$
Therefore,
$$ \\text{(i)} \\ t = 2 \\pm 2\\sqrt{3}, \\quad \\text{(ii)} \\ t = 0 \\ \\text{or} \\ t = -6. $$

(c) For perpendicular vectors,
$$ \\vec{a} \\cdot \\vec{b} = 0. $$
Thus,
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix} = 0(2-3t) + (t+2)t. $$
So,
$$ t(t+2) = 0. $$
Hence,
$$ t = 0 \\quad \\text{or} \\quad t = -2. $$

For parallel vectors,
$$ 0(t) - (t+2)(2-3t) = 0. $$
So,
$$ (t+2)(2-3t) = 0. $$
Hence,
$$ t = -2 \\quad \\text{or} \\quad t = \\frac{2}{3}. $$
Therefore,
$$ \\text{(i)} \\ t = 0 \\ \\text{or} \\ t = -2, \\quad \\text{(ii)} \\ t = -2 \\ \\text{or} \\ t = \\frac{2}{3}. $$

**5. Question**
Find $t$ if
$$ \\begin{pmatrix} 3 \\\\ t \\\\ -2 \\end{pmatrix} \\quad \\text{is perpendicular to} \\quad \\begin{pmatrix} 1-t \\\\ -3 \\\\ 4 \\end{pmatrix}. $$

**Solution**
Let
$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ t \\\\ -2 \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} 1-t \\\\ -3 \\\\ 4 \\end{pmatrix}. $$
Since the two vectors are perpendicular,
$$ \\vec{p} \\cdot \\vec{q} = 0. $$
Thus,
$$ 3(1-t) + t(-3) + (-2)(4) = 0 $$
$$ 3 - 3t - 3t - 8 = 0 $$
$$ -5 - 6t = 0 $$
$$ -6t = 5 $$
$$ t = -\\frac{5}{6}. $$

**6. Question**
$ABCD$ is a parallelogram with $AB$ parallel to $DC$. Let $\\overrightarrow{AB} = \\vec{a}$ and $\\overrightarrow{AD} = \\vec{b}$.
(a) Express $\\overrightarrow{AC}$ and $\\overrightarrow{BD}$ in terms of $\\vec{a}$ and $\\vec{b}$.
(b) Simplify $(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a})$.
(c) Hence show that if $ABCD$ is a rhombus then its diagonals are perpendicular.

**Solution**
(a) In a parallelogram, opposite sides are parallel and equal. Therefore,
$$ \\overrightarrow{AB} = \\overrightarrow{DC} = \\vec{a}, \\quad \\overrightarrow{AD} = \\overrightarrow{BC} = \\vec{b}. $$
Hence,
$$ \\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\vec{a} + \\vec{b}. $$
Also,
$$ \\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD} = -\\vec{a} + \\vec{b} = \\vec{b} - \\vec{a}. $$
(b)
$$ (\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) = \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} $$
$$ = |\\vec{b}|^2 - |\\vec{a}|^2. $$
(c) If $ABCD$ is a rhombus, then $|\\vec{a}| = |\\vec{b}|$. Therefore,
$$ (\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) = |\\vec{b}|^2 - |\\vec{a}|^2 = 0. $$
That is,
$$ \\overrightarrow{AC} \\cdot \\overrightarrow{BD} = 0. $$
Hence, the diagonals of a rhombus are perpendicular.

\`;
`;

fs.writeFileSync('src/data/chapter4_content.ts', content + section4_2);
