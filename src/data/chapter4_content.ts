export const chapter4Content = `### Introduction
In this chapter, we study vectors and vector algebra. A vector is a quantity that has both magnitude and direction; for example, displacement, velocity, acceleration, and force are naturally described by vectors. Vector algebra is the set of rules and methods used to represent vectors, combine them, compare them, and use them in calculations. We will learn how to write vectors in component form, add and subtract vectors, multiply vectors by scalars, and interpret these operations geometrically. These ideas are useful in mathematics, physics, engineering, navigation, computer graphics, and many real-life situations where both size and direction matter. We will also use position vectors to describe points in three-dimensional space and use vector methods to solve problems involving distance, direction, parallel lines, collinear points, and parallelograms. Later, the scalar product and vector product will help us find angles, projections, areas, and directions in two-dimensional and three-dimensional geometry.

---

## 4.1 Vectors in Three Dimensions
In the plane, each point is associated with an ordered pair of real numbers. In space, each point is associated with an ordered triple of real numbers.

Through a fixed point, called the origin $O$, draw three mutually perpendicular lines: the $x$-axis, the $y$-axis, and the $z$-axis. A point $P$ in space is determined by an ordered triple $(x, y, z)$ of real numbers, as shown in the diagram. These numbers $x, y$, and $z$ are called the coordinates of $P$.

[DIAGRAM:Chap4_Fig1]

**Example 1**
Illustrate the following points in three-dimensional space:
(a) $A(0, 3, 0)$
(b) $B(4, 0, 2)$
(c) $C(-1, 2, 2)$.

**Solution**
အမှတ်တစ်ခု၏ ကိုဩဒိနိတ် $(x, y, z)$ တွင် $x$ သည် $x$ ဝင်ရိုးတစ်လျှောက် ရွေ့ရသော တန်ဖိုး၊ $y$ သည် $y$ ဝင်ရိုးတစ်လျှောက် ရွေ့ရသော တန်ဖိုး၊ $z$ သည် $z$ ဝင်ရိုးတစ်လျှောက် အပေါ်သို့ ရွေ့ရသော တန်ဖိုး ဖြစ်သည်။

[DIAGRAM:Chap4_Fig2]

---

### Standard Unit Vectors
The standard unit vectors in three-dimensional space are denoted by
$$ \\hat{\\mathbf{i}} = (1, 0, 0), \\quad \\hat{\\mathbf{j}} = (0, 1, 0), \\quad \\hat{\\mathbf{k}} = (0, 0, 1). $$
Here $\\hat{\\mathbf{i}}$ is directed along the positive $x$-axis, $\\hat{\\mathbf{j}}$ is directed along the positive $y$-axis, and $\\hat{\\mathbf{k}}$ is directed along the positive $z$-axis. Each of these vectors has magnitude $1$.

[DIAGRAM:Chap4_Fig3]

---

### Position Vectors in Three Dimensions
If $\\overrightarrow{OA}$ is a vector with initial point at the origin $O$ and terminal point at $A(2, 3, 4)$, then we can represent $\\overrightarrow{OA}$ in terms of the unit vectors $\\hat{\\mathbf{i}}, \\hat{\\mathbf{j}}$, and $\\hat{\\mathbf{k}}$ as
$$ \\overrightarrow{OA} = 2\\hat{\\mathbf{i}} + 3\\hat{\\mathbf{j}} + 4\\hat{\\mathbf{k}}. $$

We can also represent vectors in three dimensions using column vectors, just as we do in two dimensions. Thus,
$$ \\overrightarrow{OA} = \\begin{pmatrix} 2 \\\\ 3 \\\\ 4 \\end{pmatrix}. $$
The numbers in the column vector are called the components of the vector.

[DIAGRAM:Chap4_Fig4]

---

A vector whose initial point is at the origin is called a position vector. For example, the position of the point $P(a, b, c)$ can be represented by its position vector $\\overrightarrow{OP}$.
So,
$$ \\vec{p} = \\overrightarrow{OP} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} = a\\hat{\\mathbf{i}} + b\\hat{\\mathbf{j}} + c\\hat{\\mathbf{k}} $$
is the position vector of the point $P$.

[DIAGRAM:Chap4_Fig5]

---

If $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$, then the position vector of $\\overrightarrow{AB}$ is
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} x_2 - x_1 \\\\ y_2 - y_1 \\\\ z_2 - z_1 \\end{pmatrix} = (x_2 - x_1)\\hat{\\mathbf{i}} + (y_2 - y_1)\\hat{\\mathbf{j}} + (z_2 - z_1)\\hat{\\mathbf{k}}. $$

---

### Magnitude of a Vector
The magnitude of a vector $\\overrightarrow{OP} = \\vec{p} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix}$ is
$$ |\\overrightarrow{OP}| = |\\vec{p}| = \\sqrt{a^2 + b^2 + c^2}. $$

**Example 2**
If $P(-3, 1, 2)$ and $Q(1, -1, 3)$, find:
(a) $\\overrightarrow{OP}$
(b) $\\overrightarrow{PQ}$
(c) $|\\overrightarrow{PQ}|$
(d) $\\overrightarrow{QP}$
(e) $|\\overrightarrow{QP}|$

**Solution**
(a)
$$ \\overrightarrow{OP} = \\begin{pmatrix} -3 \\\\ 1 \\\\ 2 \\end{pmatrix} = -3\\hat{\\mathbf{i}} + \\hat{\\mathbf{j}} + 2\\hat{\\mathbf{k}}. $$
(b) $$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} = \\begin{pmatrix} 1 - (-3) \\\\ -1 - 1 \\\\ 3 - 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ -2 \\\\ 1 \\end{pmatrix} = 4\\hat{\\mathbf{i}} - 2\\hat{\\mathbf{j}} + \\hat{\\mathbf{k}}. $$
(c) $$ |\\overrightarrow{PQ}| = \\sqrt{4^2 + (-2)^2 + 1^2} = \\sqrt{21}. $$
(d) $$ \\overrightarrow{QP} = \\overrightarrow{OP} - \\overrightarrow{OQ} = \\begin{pmatrix} -3 - 1 \\\\ 1 - (-1) \\\\ 2 - 3 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 2 \\\\ -1 \\end{pmatrix} = -4\\hat{\\mathbf{i}} + 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}. $$
(e) $$ |\\overrightarrow{QP}| = \\sqrt{(-4)^2 + 2^2 + (-1)^2} = \\sqrt{21}. $$

---

### Algebraic Operations with Vectors

#### Negative Vector
For any vector $\\vec{a}$, the negative vector $-\\vec{a}$ has the same magnitude as $\\vec{a}$ but the opposite direction.

[DIAGRAM:Chap4_Fig6]

If
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}, $$
then
$$ -\\vec{a} = \\begin{pmatrix} -a_1 \\\\ -a_2 \\\\ -a_3 \\end{pmatrix}. $$

#### Zero Vector
A vector whose magnitude is $0$ is called the zero vector. It is denoted by $\\vec{0}$.
In three dimensions,
$$ \\vec{0} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 0 \\end{pmatrix} = 0\\hat{\\mathbf{i}} + 0\\hat{\\mathbf{j}} + 0\\hat{\\mathbf{k}}. $$
The zero vector has no definite direction.

#### Addition of Two Vectors
If
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{pmatrix}, $$
then
$$ \\vec{a} + \\vec{b} = \\begin{pmatrix} a_1 + b_1 \\\\ a_2 + b_2 \\\\ a_3 + b_3 \\end{pmatrix}. $$

[DIAGRAM:Chap4_Fig7]

#### Subtraction of Two Vectors
The subtraction of two vectors is the addition of the negative vector:
$$ \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b}). $$

[DIAGRAM:Chap4_Fig8]

If
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{pmatrix}, $$
then
$$ \\vec{a} - \\vec{b} = \\begin{pmatrix} a_1 - b_1 \\\\ a_2 - b_2 \\\\ a_3 - b_3 \\end{pmatrix}. $$

#### Scalar Multiplication of a Vector
If $k$ is a scalar and
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}, $$
then
$$ k\\vec{a} = \\begin{pmatrix} ka_1 \\\\ ka_2 \\\\ ka_3 \\end{pmatrix}. $$

[DIAGRAM:Chap4_Fig9]

**Example 3**
If $\\vec{p} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix}$ and $\\vec{q} = \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix}$, find:
(a) $\\vec{p} + \\vec{q}$
(b) $\\vec{p} - \\frac{1}{2}\\vec{q}$
(c) $\\frac{3}{2}\\vec{q} - \\vec{p}$

**Solution**
(a)
$$ \\vec{p} + \\vec{q} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$
(b) $$ \\frac{1}{2}\\vec{q} = \\frac{1}{2}\\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix}. $$
Therefore,
$$ \\vec{p} - \\frac{1}{2}\\vec{q} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix}. $$
(c) $$ \\frac{3}{2}\\vec{q} = \\frac{3}{2}\\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ 0 \\\\ 3 \\end{pmatrix}. $$
Therefore,
$$ \\frac{3}{2}\\vec{q} - \\vec{p} = \\begin{pmatrix} -3 \\\\ 0 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 1 \\\\ -1 \\end{pmatrix}. $$

---

### Equal Vectors
Two vectors are equal if they have the same magnitude and the same direction.
If
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{pmatrix}, $$
then
$$ \\vec{a} = \\vec{b} \\iff a_1 = b_1, \\, a_2 = b_2, \\, a_3 = b_3. $$

[DIAGRAM:Chap4_Fig10]

### Parallel Vectors
Two non-zero vectors are parallel if one vector is a scalar multiple of the other.
If $\\vec{a}$ and $\\vec{b}$ are non-zero vectors, then
$$ \\vec{a} \\parallel \\vec{b} \\iff \\vec{a} = k\\vec{b} $$
for some non-zero scalar $k$.
If $k > 0$, the vectors have the same direction. If $k < 0$, the vectors have opposite directions.

[DIAGRAM:Chap4_Fig11]

**Example 4**
Find $u$ and $v$ given that
$$ \\vec{a} = \\begin{pmatrix} -1 \\\\ -1 \\\\ u \\end{pmatrix} \\quad \\text{is parallel to} \\quad \\vec{b} = \\begin{pmatrix} v \\\\ 2 \\\\ -2 \\end{pmatrix}. $$

**Solution**
Since $\\vec{a}$ is parallel to $\\vec{b}$, one vector is a scalar multiple of the other. Let
$$ \\vec{a} = k\\vec{b}. $$
Then
$$ \\begin{pmatrix} -1 \\\\ -1 \\\\ u \\end{pmatrix} = k\\begin{pmatrix} v \\\\ 2 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} kv \\\\ 2k \\\\ -2k \\end{pmatrix}. $$
Comparing corresponding components,
$$ -1 = kv, \\quad -1 = 2k, \\quad u = -2k. $$
From $-1 = 2k$,
$$ k = -\\frac{1}{2}. $$
Therefore,
$$ -1 = -\\frac{1}{2}v \\implies v = 2, $$
and
$$ u = -2\\left(-\\frac{1}{2}\\right) = 1. $$
$$ u = 1, \\quad v = 2. $$

**Example 5**
$ABCD$ is a parallelogram. If $A(-1, 1, 1)$, $B(2, 0, -2)$, and $D(3, 1, 4)$, find the coordinates of $C$.

[DIAGRAM:Chap4_Fig12]

**Solution**
In a parallelogram,
$$ \\overrightarrow{AB} = \\overrightarrow{DC}. $$
Now
$$ \\overrightarrow{OA} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\quad \\text{and} \\quad \\overrightarrow{OB} = \\begin{pmatrix} 2 \\\\ 0 \\\\ -2 \\end{pmatrix}. $$
Therefore,
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 2 \\\\ 0 \\\\ -2 \\end{pmatrix} - \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ -1 \\\\ -3 \\end{pmatrix}. $$
Let $C(x, y, z)$. Then
$$ \\overrightarrow{OC} = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\quad \\text{and} \\quad \\overrightarrow{OD} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix}. $$
Therefore,
$$ \\overrightarrow{DC} = \\overrightarrow{OC} - \\overrightarrow{OD} = \\begin{pmatrix} x - 3 \\\\ y - 1 \\\\ z - 4 \\end{pmatrix}. $$
Since $\\overrightarrow{AB} = \\overrightarrow{DC}$,
$$ \\begin{pmatrix} x - 3 \\\\ y - 1 \\\\ z - 4 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ -1 \\\\ -3 \\end{pmatrix}. $$
Therefore,
$$ x - 3 = 3 \\implies x = 6, $$
$$ y - 1 = -1 \\implies y = 0, $$
$$ z - 4 = -3 \\implies z = 1. $$
Thus the coordinates of $C$ are
$$ C(6, 0, 1). $$

---

### Unit Vector
A vector whose magnitude is $1$ is called a unit vector.
If $\\vec{a}$ is a non-zero vector, then the unit vector in the direction of $\\vec{a}$ is
$$ \\hat{\\mathbf{a}} = \\frac{\\vec{a}}{|\\vec{a}|}. $$
If $\\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}$, then $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$ and
$$ \\hat{\\mathbf{a}} = \\frac{1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}\\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}. $$

[DIAGRAM:Chap4_Fig13]
$|\\hat{\\mathbf{a}}| = 1$ and $\\hat{\\mathbf{a}}$ has the same direction as $\\vec{a}$.


**Example 6**
Let $\\vec{a} = \\begin{pmatrix} 2 \\\\ -2 \\\\ 1 \\end{pmatrix}$.
(a) Find the unit vector in the same direction as $\\vec{a}$.
(b) Find a vector of magnitude $5$ that is parallel to $\\vec{a}$.

**Solution**
First find the magnitude of $\\vec{a}$:
$$ |\\vec{a}| = \\sqrt{2^2 + (-2)^2 + 1^2} = \\sqrt{4 + 4 + 1} = 3. $$
(a) The unit vector in the same direction as $\\vec{a}$ is
$$ \\hat{\\mathbf{a}} = \\frac{\\vec{a}}{|\\vec{a}|} = \\frac{1}{3}\\begin{pmatrix} 2 \\\\ -2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} \\frac{2}{3} \\\\ -\\frac{2}{3} \\\\ \\frac{1}{3} \\end{pmatrix}. $$
(b) Let a vector of magnitude $5$ that is parallel to $\\vec{a}$ be $\\vec{b}$. Therefore,
$$ |\\vec{b}| = 5. $$
Since $\\vec{b}$ is parallel to $\\vec{a}$, $\\vec{b}$ may have the same direction as $\\vec{a}$ or the opposite direction to $\\vec{a}$.

[DIAGRAM:Chap4_Fig14]

If $\\vec{b}$ has the same direction as $\\vec{a}$, then $\\hat{\\mathbf{b}} = \\hat{\\mathbf{a}}$. So
$$ \\hat{\\mathbf{b}} = \\frac{\\vec{b}}{|\\vec{b}|} $$
$$ \\vec{b} = |\\vec{b}|\\hat{\\mathbf{b}} = 5\\hat{\\mathbf{a}} = 5\\begin{pmatrix} \\frac{2}{3} \\\\ -\\frac{2}{3} \\\\ \\frac{1}{3} \\end{pmatrix} = \\begin{pmatrix} \\frac{10}{3} \\\\ -\\frac{10}{3} \\\\ \\frac{5}{3} \\end{pmatrix}. $$

If $\\vec{b}$ has the opposite direction to $\\vec{a}$, then $\\hat{\\mathbf{b}} = -\\hat{\\mathbf{a}}$. Therefore,
$$ \\vec{b} = |\\vec{b}|\\hat{\\mathbf{b}} = 5(-\\hat{\\mathbf{a}}) = -5\\begin{pmatrix} \\frac{2}{3} \\\\ -\\frac{2}{3} \\\\ \\frac{1}{3} \\end{pmatrix} = \\begin{pmatrix} -\\frac{10}{3} \\\\ \\frac{10}{3} \\\\ -\\frac{5}{3} \\end{pmatrix}. $$

Thus the possible vectors are
$$ \\vec{b} = \\begin{pmatrix} \\frac{10}{3} \\\\ -\\frac{10}{3} \\\\ \\frac{5}{3} \\end{pmatrix} \\quad \\text{or} \\quad \\vec{b} = \\begin{pmatrix} -\\frac{10}{3} \\\\ \\frac{10}{3} \\\\ -\\frac{5}{3} \\end{pmatrix}. $$

---

### Collinear Points
Three or more points are collinear if they lie on the same straight line.
Let $A, B$, and $C$ be three points in space. Then $A, B$, and $C$ are collinear if the vectors $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel. That is,
$$ A, B, C \\text{ are collinear} \\iff \\overrightarrow{AB} = k\\overrightarrow{AC} $$
for some non-zero scalar $k$.

[DIAGRAM:Chap4_Fig15]
$\\overrightarrow{AB} \\parallel \\overrightarrow{AC}$

**Example 7**
Prove that $A(8, 2, 2)$, $C(20, 5, 5)$, and $B(12, 3, 3)$ are collinear.

**Solution**
Find two vectors starting from $A$:
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\\\ 1 \\end{pmatrix}. $$
Also,
$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} 20 \\\\ 5 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix}. $$
Now
$$ \\overrightarrow{AC} = 3\\overrightarrow{AB}. $$
Therefore, $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel. Also, $A$ is common to both $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$. Hence, the points $A, B$ and $C$ are collinear.

---

## Exercise 4.1
**1. Question**
Let
$$ \\vec{a} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix}, \\quad \\text{and} \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix}. $$
Find the following vectors.
(a) $3\\vec{a}$
(b) $4\\vec{b}$
(c) $\\vec{a} - \\vec{b}$
(d) $\\vec{b} + \\vec{c}$
(e) $2\\vec{b} + \\vec{c}$
(f) $\\vec{a} - 2\\vec{b}$
(g) $\\vec{a} + \\vec{b} - 2\\vec{c}$
(h) $3\\vec{a} - \\vec{b} + \\vec{c}$

**Solution**
Given
$$ \\vec{a} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix}. $$
$$ \\begin{alignedat}{2}
\\text{(a)} && 3\\vec{a} &= 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix}. \\\\
\\text{(b)} && 4\\vec{b} &= 4\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ -24 \\\\ 4 \\end{pmatrix}. \\\\
\\text{(c)} && \\vec{a} - \\vec{b} &= \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -5 \\end{pmatrix}. \\\\
\\text{(d)} && \\vec{b} + \\vec{c} &= \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 0 \\end{pmatrix}. \\\\
\\text{(e)} && 2\\vec{b} + \\vec{c} &= 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -5 \\\\ 1 \\end{pmatrix}. \\\\
\\text{(f)} && \\vec{a} - 2\\vec{b} &= \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 10 \\\\ -6 \\end{pmatrix}. \\\\
\\text{(g)} && \\vec{a} + \\vec{b} - 2\\vec{c} &= \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -22 \\\\ -1 \\end{pmatrix}. \\\\
\\text{(h)} && 3\\vec{a} - \\vec{b} + \\vec{c} &= 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 7 \\\\ -14 \\end{pmatrix}.
\\end{alignedat} $$

**2. Question**
Given vectors
$$ \\vec{a} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -3 \\\\ 4 \\\\ 2 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} -2 \\\\ p \\\\ q \\end{pmatrix}. $$
(a) Find the values of $p$ and $q$ such that $\\vec{c}$ is parallel to $\\vec{a}$.
(b) Find the value of scalar $k$ such that $\\vec{a} + k\\vec{b}$ is parallel to vector $\\begin{pmatrix} 0 \\\\ 10 \\\\ 23 \\end{pmatrix}$.

**Solution**
Given
$$ \\vec{a} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -3 \\\\ 4 \\\\ 2 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} -2 \\\\ p \\\\ q \\end{pmatrix}. $$
(a) Since $\\vec{c}$ is parallel to $\\vec{a}$, let $\\vec{c} = m\\vec{a}$.
$$ \\begin{pmatrix} -2 \\\\ p \\\\ q \\end{pmatrix} = m\\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix} = \\begin{pmatrix} m \\\\ 2m \\\\ 7m \\end{pmatrix}. $$
Comparing corresponding components,
$$ \\begin{aligned}
m &= -2, \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\\end{aligned} $$
(b) First find $\\vec{a} + k\\vec{b}$:
$$ \\vec{a} + k\\vec{b} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix} + k\\begin{pmatrix} -3 \\\\ 4 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 1 - 3k \\\\ 2 + 4k \\\\ 7 + 2k \\end{pmatrix}. $$
Since this vector is parallel to $\\begin{pmatrix} 0 \\\\ 10 \\\\ 23 \\end{pmatrix}$, let
$$ \\begin{pmatrix} 1 - 3k \\\\ 2 + 4k \\\\ 7 + 2k \\end{pmatrix} = \\lambda\\begin{pmatrix} 0 \\\\ 10 \\\\ 23 \\end{pmatrix}. $$
Comparing the first components,
$$ 1 - 3k = 0 \\implies 3k = 1 \\implies k = \\frac{1}{3}. $$
Check by substitution:
$$ \\vec{a} + \\frac{1}{3}\\vec{b} = \\begin{pmatrix} 1 - 3(\\frac{1}{3}) \\\\ 2 + 4(\\frac{1}{3}) \\\\ 7 + 2(\\frac{1}{3}) \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ \\frac{10}{3} \\\\ \\frac{23}{3} \\end{pmatrix} = \\frac{1}{3}\\begin{pmatrix} 0 \\\\ 10 \\\\ 23 \\end{pmatrix}. $$
The required value is $k = \\frac{1}{3}$.

**3. Question**
Points $A, B, C$, and $D$ have position vectors
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 7 \\\\ 8 \\\\ -3 \\end{pmatrix}, \\quad \\text{and} \\quad \\vec{d} = \\begin{pmatrix} 4 \\\\ 3 \\\\ -2 \\end{pmatrix}, $$
respectively. Point $E$ is the midpoint of $BC$.
(a) Find the position vector of $E$.
(b) Show that $ABED$ is a parallelogram.

**Solution**
Given
$$ \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix}, \\quad \\overrightarrow{OC} = \\begin{pmatrix} 7 \\\\ 8 \\\\ -3 \\end{pmatrix}, \\quad \\overrightarrow{OD} = \\begin{pmatrix} 4 \\\\ 3 \\\\ -2 \\end{pmatrix}. $$
(a) Point $E$ is the midpoint of $BC$.
$$ \\begin{aligned} \\overrightarrow{OE} &= \\frac{1}{2}(\\overrightarrow{OB} + \\overrightarrow{OC}) \\\\ &= \\frac{1}{2}\\left[ \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix} + \\begin{pmatrix} 7 \\\\ 8 \\\\ -3 \\end{pmatrix} \\right] \\\\ &= \\frac{1}{2}\\begin{pmatrix} 12 \\\\ 8 \\\\ 0 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix}. \\end{aligned} $$
The position vector of $E$ is $\\overrightarrow{OE} = \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix}.$
(b) 
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 2 \\end{pmatrix}. $$
$$ \\overrightarrow{DE} = \\overrightarrow{OE} - \\overrightarrow{OD} = \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix} - \\begin{pmatrix} 4 \\\\ 3 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 2 \\end{pmatrix}. $$
Since $\\overrightarrow{AB} = \\overrightarrow{DE}$ and also:
$$ \\overrightarrow{AD} = \\overrightarrow{OD} - \\overrightarrow{OA} = \\begin{pmatrix} 4 \\\\ 3 \\\\ -2 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ -3 \\end{pmatrix}. $$
$$ \\overrightarrow{BE} = \\overrightarrow{OE} - \\overrightarrow{OB} = \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix} - \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ -3 \\end{pmatrix}. $$
$\\overrightarrow{AD} = \\overrightarrow{BE}$. Therefore, $ABED$ is a parallelogram.

**4. Question**
Points $A, B$, and $C$ have position vectors
$$ \\vec{a} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\quad \\text{and} \\quad \\vec{c} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix}, $$
respectively. Find the position vector of point $D$ such that $ABCD$ is a parallelogram.

**Solution**
Given
$$ \\overrightarrow{OA} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\begin{pmatrix} 5 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\quad \\overrightarrow{OC} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix}. $$
Since $ABCD$ is a parallelogram, opposite sides are equal and parallel.
$$ \\overrightarrow{AB} = \\overrightarrow{DC}. $$
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\quad \\text{and} \\quad \\overrightarrow{DC} = \\overrightarrow{OC} - \\overrightarrow{OD}. $$
Since $\\overrightarrow{AB} = \\overrightarrow{DC}$,
$$ \\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{OC} - \\overrightarrow{OD}. $$
$$ \\begin{aligned} \\overrightarrow{OD} &= \\overrightarrow{OC} - \\overrightarrow{OB} + \\overrightarrow{OA} \\\\ &= \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 5 \\\\ 1 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix} \\\\ &= \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 0 \\\\ -1 \\\\ 6 \\end{pmatrix}. \\end{aligned} $$
The position vector of $D$ is $\\overrightarrow{OD} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 6 \\end{pmatrix}.$

**5. Question**
$K(1, -1, 0)$, $L(4, -3, 7)$, and $M(a, 2, b)$ are collinear. Find $a$ and $b$.

**Solution**
Given
$$ \\overrightarrow{OK} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix}, \\quad \\overrightarrow{OL} = \\begin{pmatrix} 4 \\\\ -3 \\\\ 7 \\end{pmatrix}, \\quad \\overrightarrow{OM} = \\begin{pmatrix} a \\\\ 2 \\\\ b \\end{pmatrix}. $$
Since $K, L$, and $M$ are collinear, $\\overrightarrow{KM}$ is parallel to $\\overrightarrow{KL}$.
$$ \\overrightarrow{KL} = \\overrightarrow{OL} - \\overrightarrow{OK} = \\begin{pmatrix} 4 \\\\ -3 \\\\ 7 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ -2 \\\\ 7 \\end{pmatrix}. $$
$$ \\overrightarrow{KM} = \\overrightarrow{OM} - \\overrightarrow{OK} = \\begin{pmatrix} a \\\\ 2 \\\\ b \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} a - 1 \\\\ 3 \\\\ b \\end{pmatrix}. $$
Let $\\overrightarrow{KM} = t\\overrightarrow{KL}$. Then
$$ \\begin{pmatrix} a - 1 \\\\ 3 \\\\ b \\end{pmatrix} = t\\begin{pmatrix} 3 \\\\ -2 \\\\ 7 \\end{pmatrix}. $$
From $3 = -2t$, we get $t = -\\frac{3}{2}$.
$$ a - 1 = 3\\left(-\\frac{3}{2}\\right) = -\\frac{9}{2} \\implies a = -\\frac{7}{2}. $$
$$ b = 7\\left(-\\frac{3}{2}\\right) = -\\frac{21}{2}. $$




## 4.2 Angle between Two Vectors and Scalar Product

First we consider the angle between two vectors $\\vec{a}$ and $\\vec{b}$ in two dimensions. Let
$$ \\overrightarrow{OA} = \\vec{a} = \\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\vec{b} = \\begin{pmatrix} x_2 \\\\ y_2 \\end{pmatrix}, $$
and let $\\theta$ be the angle between them.

**Diagram**
[DIAGRAM:Chap4_AngleBetweenVectors]

In triangle $OAB$,
$$ OA = |\\vec{a}|, \\quad OB = |\\vec{b}|, \\quad AB = |\\vec{b} - \\vec{a}|. $$
By the cosine rule,
$$ |AB|^2 = |OA|^2 + |OB|^2 - 2|OA||OB|\\cos\\theta. $$
Therefore,
$$ |\\vec{b} - \\vec{a}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 - 2|\\vec{a}||\\vec{b}|\\cos\\theta. \\quad (1) $$
Now,
$$ \\vec{b} - \\vec{a} = \\begin{pmatrix} x_2 \\\\ y_2 \\end{pmatrix} - \\begin{pmatrix} x_1 \\\\ y_1 \\end{pmatrix} = \\begin{pmatrix} x_2 - x_1 \\\\ y_2 - y_1 \\end{pmatrix}. $$
Hence
$$ \\begin{aligned} |\\vec{b} - \\vec{a}|^2 &= (x_2 - x_1)^2 + (y_2 - y_1)^2 \\\\ &= x_1^2 + y_1^2 + x_2^2 + y_2^2 - 2(x_1x_2 + y_1y_2) \\\\ &= |\\vec{a}|^2 + |\\vec{b}|^2 - 2(x_1x_2 + y_1y_2). \\quad (2) \\end{aligned} $$
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

**Example 8**
Find the angle between the two vectors $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ and $\\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix}$.

**Solution**
Let
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix}. $$
$$ \\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} $$
$$ \\begin{aligned} \\vec{a} \\cdot \\vec{b} &= \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 \\\\ -12 \\end{pmatrix} \\\\ &= (3)(5) + (4)(-12) \\\\ &= 15 - 48 \\\\ &= -33. \\end{aligned} $$
$$ |\\vec{a}| = \\sqrt{3^2 + 4^2} = 5, \\quad |\\vec{b}| = \\sqrt{5^2 + (-12)^2} = 13. $$
$$ \\cos\\theta = \\frac{-33}{(5)(13)} = -\\frac{33}{65}. $$
$$ \\theta = \\cos^{-1}\\left(-\\frac{33}{65}\\right) \\approx 120.5^\\circ. $$
$$ 120.5^\\circ $$

**Example 9**
Given points $P(1, 0, -1)$, $Q(2, 4, 1)$, and $R(3, 5, 6)$, find $\\angle QPR$.

**Solution**
[DIAGRAM:Chap4_Ex9]

$\\angle QPR$ is the angle between $\\overrightarrow{PQ}$ and $\\overrightarrow{PR}$.
$$ \\begin{aligned} \\overrightarrow{PQ} &= \\overrightarrow{OQ} - \\overrightarrow{OP} & \\overrightarrow{PR} &= \\overrightarrow{OR} - \\overrightarrow{OP} \\\\ &= \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} & &= \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} & &= \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} \\end{aligned} $$

$$ \\begin{aligned} \\overrightarrow{PQ} \\cdot \\overrightarrow{PR} &= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix} \\\\ &= (1)(2) + (4)(5) + (2)(7) \\\\ &= 2 + 20 + 14 \\\\ &= 36. \\end{aligned} $$

$$ \\begin{aligned} |\\overrightarrow{PQ}| &= \\sqrt{1^2 + 4^2 + 2^2} & |\\overrightarrow{PR}| &= \\sqrt{2^2 + 5^2 + 7^2} \\\\ &= \\sqrt{1 + 16 + 4} & &= \\sqrt{4 + 25 + 49} \\\\ &= \\sqrt{21} & &= \\sqrt{78}. \\end{aligned} $$

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

**Example 10**
Given that vectors $\\vec{a}$ and $\\vec{b}$ are perpendicular such that $|\\vec{a}| = 3$ and $|\\vec{b}| = 1$, evaluate
$$ (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}). $$

**Solution**
Since $\\vec{a}$ and $\\vec{b}$ are perpendicular,
$$ \\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a} = 0. $$
Now,
$$ \\begin{aligned} (\\vec{a} - \\vec{b}) \\cdot (\\vec{a} + 5\\vec{b}) &= \\vec{a} \\cdot \\vec{a} + 5\\vec{a} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} - 5\\vec{b} \\cdot \\vec{b} \\\\ &= |\\vec{a}|^2 + 5(0) - 0 - 5|\\vec{b}|^2 \\\\ &= 3^2 - 5(1^2) \\\\ &= 9 - 5 \\\\ &= 4. \\end{aligned} $$

**Example 11**
Points $A, B$, and $C$ have position vectors
$$ \\vec{a} = k\\begin{pmatrix} 2 \\\\ -1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 4 \\end{pmatrix}. $$
(a) Find $\\overrightarrow{BC}$.
(b) Find $\\overrightarrow{AB}$ in terms of $k$.
(c) Find the value of $k$ for which $\\overrightarrow{AB}$ is perpendicular to $\\overrightarrow{BC}$.

**Solution**
(a)
$$ \\overrightarrow{BC} = \\vec{c} - \\vec{b} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$
(b) $$ \\overrightarrow{AB} = \\vec{b} - \\vec{a} = \\begin{pmatrix} 3 \\\\ 2 \\\\ -2 \\end{pmatrix} - k\\begin{pmatrix} 2 \\\\ -1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix}. $$
(c) Since $\\overrightarrow{AB}$ is perpendicular to $\\overrightarrow{BC}$,
$$ \\overrightarrow{AB} \\cdot \\overrightarrow{BC} = 0. $$
Therefore,
$$ \\begin{aligned}
\\overrightarrow{AB} \\cdot \\overrightarrow{BC} &= \\begin{pmatrix} 3 - 2k \\\\ 2 + k \\\\ -2 - k \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ -1 \\\\ 6 \\end{pmatrix} \\\\
&= (3 - 2k)(-2) + (2 + k)(-1) + (-2 - k)(6) \\\\
&= -20 - 3k.
\\end{aligned} $$
So,
$$ -20 - 3k = 0. $$
$$ k = -\\frac{20}{3}. $$

## Exercise 4.2

**1. Question**
For
$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix}, \\quad \\vec{r} = \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}, $$
find:
(a) $\\vec{q} \\cdot \\vec{p}$
(b) $\\vec{q} \\cdot \\vec{r}$
(c) $\\vec{q} \\cdot (\\vec{p} + \\vec{r})$
(d) $\\hat{\\mathbf{i}} \\cdot \\vec{p}$
(e) $\\vec{q} \\cdot \\hat{\\mathbf{j}}$
(f) $\\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}}$

**Solution**
Given
$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix}, \\quad \\vec{r} = \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}. $$
And
$$ \\hat{\\mathbf{i}} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\quad \\hat{\\mathbf{j}} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}. $$
(a)
$$ \\vec{q} \\cdot \\vec{p} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = (-1)(3) + (5)(2) = 7. $$
(b) $$ \\vec{q} \\cdot \\vec{r} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} = (-1)(-2) + (5)(4) = 22. $$
(c) $$ \\begin{aligned}
\\vec{q} \\cdot (\\vec{p} + \\vec{r}) &= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 6 \\end{pmatrix} \\\\
&= (-1)(1) + (5)(6) = 29.
\\end{aligned} $$
(d) $$ \\hat{\\mathbf{i}} \\cdot \\vec{p} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\cdot \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = 3. $$
(e) $$ \\vec{q} \\cdot \\hat{\\mathbf{j}} = \\begin{pmatrix} -1 \\\\ 5 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = 5. $$
(f)
$$ \\hat{\\mathbf{i}} \\cdot \\hat{\\mathbf{i}} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = 1. $$

**2. Question**
For
$$ \\vec{a} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix}, $$
find:
(a) $\\vec{a} \\cdot \\vec{b}$
(b) $\\vec{b} \\cdot \\vec{a}$
(c) $|\\vec{a}|^2$
(d) $\\vec{a} \\cdot \\vec{a}$
(e) $\\vec{a} \\cdot (\\vec{b} + \\vec{c})$
(f) $\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}$

**Solution**
Given
$$ \\vec{a} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix}. $$
(a)
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} = -2 + 1 + 3 = 2. $$
(b) $$ \\vec{b} \\cdot \\vec{a} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} = -2 + 1 + 3 = 2. $$
(c) $$ |\\vec{a}|^2 = 2^2 + 1^2 + 3^2 = 14. $$
(d) $$ \\vec{a} \\cdot \\vec{a} = 2^2 + 1^2 + 3^2 = 14. $$
(e) $$ \\begin{aligned}
\\vec{a} \\cdot (\\vec{b} + \\vec{c}) &= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\left( \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} -1 \\\\ 0 \\\\ 2 \\end{pmatrix} \\\\
&= -2 + 0 + 6 = 4.
\\end{aligned} $$
(f)
$$ \\begin{aligned}
\\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c} &= 2 + \\left( \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix} \\cdot \\begin{pmatrix} 0 \\\\ -1 \\\\ 1 \\end{pmatrix} \\right) \\\\
&= 2 + (0 - 1 + 3) = 4.
\\end{aligned} $$

**3. Question**
Find the angle between $\\vec{m}$ and $\\vec{n}$ if:
(a) $\\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}$ and $\\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}$.
(b) $\\vec{m} = 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}$ and $\\vec{n} = \\hat{\\mathbf{i}} + 2\\hat{\\mathbf{k}}$.

**Solution**
(a)
Given
$$ \\vec{m} = \\begin{pmatrix} 2 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\quad \\vec{n} = \\begin{pmatrix} -1 \\\\ 3 \\\\ 2 \\end{pmatrix}. $$
$$ \\vec{m} \\cdot \\vec{n} = -7, \\quad |\\vec{m}| = \\sqrt{6}, \\quad |\\vec{n}| = \\sqrt{14}. $$
Thus,
$$ \\cos\\theta = \\frac{-7}{\\sqrt{6}\\sqrt{14}}, \\quad \\theta = \\cos^{-1}\\left(\\frac{-7}{\\sqrt{6}\\sqrt{14}}\\right) \\approx 139.8^\\circ. $$
(b) Given
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
(a) Given
$$ \\vec{p} = \\begin{pmatrix} 3 \\\\ t \\end{pmatrix}, \\quad \\vec{q} = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}. $$
For perpendicular vectors,
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
(b) Given
$$ \\vec{r} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix}, \\quad \\vec{s} = \\begin{pmatrix} t \\\\ -4 \\end{pmatrix}. $$
For perpendicular vectors,
$$ \\vec{r} \\cdot \\vec{s} = 0. $$
Thus,
$$ \\vec{r} \\cdot \\vec{s} = \\begin{pmatrix} t \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} t \\\\ -4 \\end{pmatrix} = t^2 + (t+2)(-4). $$
So,
$$ t^2 - 4t - 8 = 0. $$
$$ t = 2 \\pm 2\\sqrt{3}. $$

For parallel vectors,
$$ t(-4) - t(t+2) = 0. $$
So,
$$ -t(t+6) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -6. $$
Therefore,
$$ \\text{(i)} \\ t = 2 \\pm 2\\sqrt{3}, \\quad \\text{(ii)} \\ t = 0 \\ \\text{or} \\ t = -6. $$
(c) Given
$$ \\vec{a} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix}. $$
For perpendicular vectors,
$$ \\vec{a} \\cdot \\vec{b} = 0. $$
Thus,
$$ \\vec{a} \\cdot \\vec{b} = \\begin{pmatrix} 0 \\\\ t+2 \\end{pmatrix} \\cdot \\begin{pmatrix} 2-3t \\\\ t \\end{pmatrix} = 0(2-3t) + (t+2)t. $$
So,
$$ t(t+2) = 0. $$
$$ t = 0 \\quad \\text{or} \\quad t = -2. $$

For parallel vectors,
$$ 0(t) - (t+2)(2-3t) = 0. $$
So,
$$ (t+2)(2-3t) = 0. $$
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
$$ 3(1-t) + t(-3) + (-2)(4) = 0 \\implies 3 - 6t - 8 = 0 \\implies 6t = -5 \\implies t = -\\frac{5}{6}. $$

**6. Question**
$ABCD$ is a parallelogram with $AB$ parallel to $DC$. Let $\\overrightarrow{AB} = \\vec{a}$ and $\\overrightarrow{AD} = \\vec{b}$.
[DIAGRAM:Chap4_Ex4_2_Q6]

(a) Express $\\overrightarrow{AC}$ and $\\overrightarrow{BD}$ in terms of $\\vec{a}$ and $\\vec{b}$.
(b) Simplify $(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a})$.
(c) Hence show that if $ABCD$ is a rhombus then its diagonals are perpendicular.

**Solution**
(a) In a parallelogram, opposite sides are parallel and equal. Therefore,
$$ \\overrightarrow{AB} = \\overrightarrow{DC} = \\vec{a}, \\quad \\overrightarrow{AD} = \\overrightarrow{BC} = \\vec{b}. $$
$$ \\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\vec{a} + \\vec{b}. $$
Also,
$$ \\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD} = -\\vec{a} + \\vec{b} = \\vec{b} - \\vec{a}. $$
(b) $$ \\begin{aligned}
(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) &= \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} \\\\
&= |\\vec{b}|^2 - |\\vec{a}|^2.
\\end{aligned} $$
(c) If $ABCD$ is a rhombus, then $|\\vec{a}| = |\\vec{b}|$. Therefore,
$$ (\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) = |\\vec{b}|^2 - |\\vec{a}|^2 = 0. $$
That is,
$$ \\overrightarrow{AC} \\cdot \\overrightarrow{BD} = 0. $$

## 4.3 Area of a Parallelogram and Vector Product

### Cross Product

Let
$$ \\vec{a} = \\begin{pmatrix} x_1 \\\\ y_1 \\\\ z_1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} x_2 \\\\ y_2 \\\\ z_2 \\end{pmatrix}. $$

Their cross product is
$$ \\vec{a} \\times \\vec{b} = \\begin{pmatrix} x_1 \\\\ y_1 \\\\ z_1 \\end{pmatrix} \\times \\begin{pmatrix} x_2 \\\\ y_2 \\\\ z_2 \\end{pmatrix} = \\begin{pmatrix} y_1 z_2 - z_1 y_2 \\\\ z_1 x_2 - x_1 z_2 \\\\ x_1 y_2 - y_1 x_2 \\end{pmatrix}. $$

### Down Product – Up Product Method

To find a particular component, leave out that component and use the other two components:
- For the $x$-component, leave out $x$ and use $y, z$.
- For the $y$-component, leave out $y$ and use $z, x$.
- For the $z$-component, leave out $z$ and use $x, y$.

Write the components cyclically, repeating the first two columns:
$$ \\begin{array}{ccccc} x_1 & y_1 & z_1 & x_1 & y_1 \\\\ x_2 & y_2 & z_2 & x_2 & y_2 \\end{array} $$

For each component, multiply downward and subtract the upward product.

$$ \\text{First component} = \\underbrace{y_1 z_2}_{\\text{down product}} - \\underbrace{z_1 y_2}_{\\text{up product}}, $$

$$ \\text{Second component} = \\underbrace{z_1 x_2}_{\\text{down product}} - \\underbrace{x_1 z_2}_{\\text{up product}}, $$

$$ \\text{Third component} = \\underbrace{x_1 y_2}_{\\text{down product}} - \\underbrace{y_1 x_2}_{\\text{up product}}. $$

Hence,
$$ \\boxed{\\vec{a} \\times \\vec{b} = \\begin{pmatrix} y_1 z_2 - z_1 y_2 \\\\ z_1 x_2 - x_1 z_2 \\\\ x_1 y_2 - y_1 x_2 \\end{pmatrix}} $$

### The Direction of $\\vec{a} \\times \\vec{b}$

The vectors $\\vec{a}$ and $\\vec{b}$ determine a plane. The new vector $\\vec{a} \\times \\vec{b}$ is perpendicular to both $\\vec{a}$ and $\\vec{b}$. Therefore, it is perpendicular to the plane containing them.

[DIAGRAM:Chap4_CrossProductDirection]

### Proof Using Dot Products

Let
$$ \\vec{c} = \\vec{a} \\times \\vec{b} = \\begin{pmatrix} y_1 z_2 - z_1 y_2 \\\\ z_1 x_2 - x_1 z_2 \\\\ x_1 y_2 - y_1 x_2 \\end{pmatrix}. $$

First, calculate the dot product with $\\vec{a}$:
$$ \\begin{aligned}
\\vec{c} \\cdot \\vec{a} &= x_1 (y_1 z_2 - z_1 y_2) + y_1 (z_1 x_2 - x_1 z_2) + z_1 (x_1 y_2 - y_1 x_2) \\\\
&= x_1 y_1 z_2 - x_1 z_1 y_2 + y_1 z_1 x_2 - x_1 y_1 z_2 + x_1 z_1 y_2 - y_1 z_1 x_2 \\\\
&= 0.
\\end{aligned} $$

Hence,
$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\cdot \\vec{a} = 0}, $$

so $\\vec{a} \\times \\vec{b}$ is perpendicular to $\\vec{a}$.

Next, calculate the dot product with $\\vec{b}$:
$$ \\begin{aligned}
\\vec{c} \\cdot \\vec{b} &= x_2 (y_1 z_2 - z_1 y_2) + y_2 (z_1 x_2 - x_1 z_2) + z_2 (x_1 y_2 - y_1 x_2) \\\\
&= x_2 y_1 z_2 - x_2 z_1 y_2 + y_2 z_1 x_2 - x_1 y_2 z_2 + x_1 y_2 z_2 - y_1 x_2 z_2 \\\\
&= 0.
\\end{aligned} $$

Hence,
$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\cdot \\vec{b} = 0}, $$

so $\\vec{a} \\times \\vec{b}$ is perpendicular to $\\vec{b}$.

Since $\\vec{a}$ and $\\vec{b}$ are two non-parallel vectors in the same plane, a vector perpendicular to both of them is perpendicular to that plane. Therefore, $\\vec{a} \\times \\vec{b}$ is a normal vector to the plane containing $\\vec{a}$ and $\\vec{b}$.

### Area of a Parallelogram

Let $\\vec{a}$ and $\\vec{b}$ be two adjacent sides of a parallelogram, and let $\\theta$ be the angle between them.

[DIAGRAM:Chap4_AreaParallelogramDiag]

#### Deriving the Area Formula

Take $|\\vec{a}|$ as the base. The perpendicular height is the component of $\\vec{b}$ perpendicular to $\\vec{a}$, so
$$ h = |\\vec{b}| \\sin \\theta. $$

Therefore,
$$ \\begin{aligned}
\\text{Area of parallelogram} &= \\text{base} \\times \\text{height} \\\\
&= |\\vec{a}| h \\\\
&= |\\vec{a}| |\\vec{b}| \\sin \\theta.
\\end{aligned} $$

Since the magnitude of the cross product is
$$ |\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}| \\sin \\theta, $$

we obtain
$$ \\boxed{\\text{Area of parallelogram} = |\\vec{a} \\times \\vec{b}|}. $$

### Area of a Triangle

The diagonal of a parallelogram divides it into two triangles of equal area.

[DIAGRAM:Chap4_AreaTriangleDiag]

$$ \\boxed{\\text{Area of triangle} = \\frac{1}{2} (\\text{Area of parallelogram}) = \\frac{1}{2} |\\vec{a} \\times \\vec{b}|}. $$

---

#### Example 12
Find the area of the parallelogram determined by the vectors
$$ \\vec{a} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 1 \\\\ 4 \\\\ -1 \\end{pmatrix}. $$

**Solution.**
The area of the parallelogram is $|\\vec{a} \\times \\vec{b}|$. Using the Down Product – Up Product method,

$$ \\begin{aligned} \\vec{a} \\times \\vec{b} &= \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} \\times \\begin{pmatrix} 1 \\\\ 4 \\\\ -1 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 2(-1) - 3(4) \\\\ 3(1) - 1(-1) \\\\ 1(4) - 2(1) \\end{pmatrix} \\\\ &= \\begin{pmatrix} -14 \\\\ 4 \\\\ 2 \\end{pmatrix}. \\end{aligned} $$

Therefore,
$$ \\begin{aligned} |\\vec{a} \\times \\vec{b}| &= \\sqrt{(-14)^2 + 4^2 + 2^2} \\\\ &= \\sqrt{196 + 16 + 4} \\\\ &= \\sqrt{216} \\\\ &= 6\\sqrt{6}. \\end{aligned} $$

Hence,
Area of the parallelogram $= 6\\sqrt{6}$ square units.

---

#### Example 13
Find the area of triangle $ABC$ with vertices
$$ A(1, -1, 3), \\quad B(0, 4, 1), \\quad C(2, 7, 2). $$

**Solution.**
Two sides of the triangle starting from $A$ are
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 0 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 5 \\\\ -2 \\end{pmatrix}, $$
$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} 2 \\\\ 7 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 8 \\\\ -1 \\end{pmatrix}. $$

Using the Down Product – Up Product method,
$$ \\begin{aligned} \\overrightarrow{AB} \\times \\overrightarrow{AC} &= \\begin{pmatrix} -1 \\\\ 5 \\\\ -2 \\end{pmatrix} \\times \\begin{pmatrix} 1 \\\\ 8 \\\\ -1 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 5(-1) - (-2)(8) \\\\ (-2)(1) - (-1)(-1) \\\\ (-1)(8) - 5(1) \\end{pmatrix} \\\\ &= \\begin{pmatrix} 11 \\\\ -3 \\\\ -13 \\end{pmatrix}. \\end{aligned} $$

Therefore,
$$ \\begin{aligned} |\\overrightarrow{AB} \\times \\overrightarrow{AC}| &= \\sqrt{11^2 + (-3)^2 + (-13)^2} \\\\ &= \\sqrt{121 + 9 + 169} \\\\ &= \\sqrt{299}. \\end{aligned} $$

Hence,
Area of triangle $ABC = \\frac{\\sqrt{299}}{2}$ square units.

---

### Algebraic Properties of the Vector Product

Let $\\vec{a}, \\vec{b}$ and $\\vec{c}$ be vectors in three-dimensional space, and let $k$ be a scalar.

1. Anti-commutative property
$$ \\boxed{\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})}. $$
Interchanging the order of the vectors reverses the direction of the vector product.

2. Distributive property
$$ \\boxed{\\vec{a} \\times (\\vec{b} + \\vec{c}) = \\vec{a} \\times \\vec{b} + \\vec{a} \\times \\vec{c}}, $$
and
$$ \\boxed{(\\vec{a} + \\vec{b}) \\times \\vec{c} = \\vec{a} \\times \\vec{c} + \\vec{b} \\times \\vec{c}}. $$
The same property applies to subtraction.

3. Scalar multiplication property
$$ \\boxed{(k\\vec{a}) \\times \\vec{b} = k(\\vec{a} \\times \\vec{b}) = \\vec{a} \\times (k\\vec{b})}. $$

4. Vector product with the zero vector
$$ \\boxed{\\vec{a} \\times \\vec{0} = \\vec{0} \\times \\vec{a} = \\vec{0}}. $$

5. The vector product is not associative
$$ \\boxed{(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})} $$
in general.

---

### Vector Products of Unit Vectors

The vectors
$$ \\hat{\\mathbf{i}} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad \\hat{\\mathbf{j}} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\quad \\hat{\\mathbf{k}} = \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} $$
are unit vectors along the positive $x, y$ and $z$-axes respectively. They are mutually perpendicular and each has magnitude $1$.

When two different unit vectors are multiplied, the result is the remaining unit vector. Its sign is determined by the order of multiplication.

[DIAGRAM:Chap4_UnitVectorCyclicDiag]

The positive cyclic products are
$$ \\boxed{\\hat{\\mathbf{i}} \\times \\hat{\\mathbf{j}} = \\hat{\\mathbf{k}}, \\quad \\hat{\\mathbf{j}} \\times \\hat{\\mathbf{k}} = \\hat{\\mathbf{i}}, \\quad \\hat{\\mathbf{k}} \\times \\hat{\\mathbf{i}} = \\hat{\\mathbf{j}}}. $$

For example, rotating from $\\hat{\\mathbf{i}}$ towards $\\hat{\\mathbf{j}}$ and applying the right-hand rule gives the direction $\\hat{\\mathbf{k}}$. Thus, $\\hat{\\mathbf{i}} \\times \\hat{\\mathbf{j}} = \\hat{\\mathbf{k}}$.

Reversing the order changes the sign:
$$ \\hat{\\mathbf{j}} \\times \\hat{\\mathbf{i}} = -\\hat{\\mathbf{k}}, \\quad \\hat{\\mathbf{k}} \\times \\hat{\\mathbf{j}} = -\\hat{\\mathbf{i}}, \\quad \\hat{\\mathbf{i}} \\times \\hat{\\mathbf{k}} = -\\hat{\\mathbf{j}}. $$

For example,
$$ \\hat{\\mathbf{j}} \\times \\hat{\\mathbf{i}} = -(\\hat{\\mathbf{i}} \\times \\hat{\\mathbf{j}}) = -\\hat{\\mathbf{k}}. $$

Also,
$$ \\hat{\\mathbf{i}} \\times \\hat{\\mathbf{i}} = \\hat{\\mathbf{j}} \\times \\hat{\\mathbf{j}} = \\hat{\\mathbf{k}} \\times \\hat{\\mathbf{k}} = \\vec{0}. $$

This is because the angle between a vector and itself is $0^\\circ$, and hence $\\sin 0^\\circ = 0$.


---

### Geometric Properties of the Vector Product

Let $\\theta$ be the angle between two non-zero vectors $\\vec{a}$ and $\\vec{b}$, where $0^\\circ \\le \\theta \\le 180^\\circ$.

1. **Magnitude**
$$ \\boxed{|\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}| \\sin \\theta}. $$
Thus, the magnitude depends on the lengths of the two vectors and the angle between them.

2. **Perpendicular direction**
The vector $\\vec{a} \\times \\vec{b}$ is perpendicular to both $\\vec{a}$ and $\\vec{b}$. Therefore, it is normal to the plane containing the two vectors.
$$ (\\vec{a} \\times \\vec{b}) \\cdot \\vec{a} = 0, \\quad (\\vec{a} \\times \\vec{b}) \\cdot \\vec{b} = 0. $$

3. **Right-hand rule**
Curl the fingers of the right hand from $\\vec{a}$ towards $\\vec{b}$ through the smaller angle. The thumb points in the direction of $\\vec{a} \\times \\vec{b}$.

4. **Parallel vectors**
If $\\vec{a}$ and $\\vec{b}$ are parallel, then $\\theta = 0^\\circ$ or $180^\\circ$. Since $\\sin 0^\\circ = \\sin 180^\\circ = 0$,
$$ \\boxed{\\vec{a} \\times \\vec{b} = \\vec{0}}. $$

5. **Perpendicular vectors**
If $\\vec{a} \\perp \\vec{b}$, then $\\theta = 90^\\circ$ and $\\sin 90^\\circ = 1$. Hence,
$$ \\boxed{|\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}|}. $$
For fixed magnitudes, the vector product has its greatest magnitude when the two vectors are perpendicular.

6. **Area interpretation**
$$ \\boxed{\\text{Area of parallelogram} = |\\vec{a} \\times \\vec{b}|}, $$
and
$$ \\boxed{\\text{Area of triangle} = \\frac{1}{2} |\\vec{a} \\times \\vec{b}|}. $$

---

#### Example 14

(a) Calculate $\\vec{a} \\times \\vec{b}$ when
$$ \\vec{a} = 3\\hat{\\mathbf{i}} + 2\\hat{\\mathbf{j}} + 5\\hat{\\mathbf{k}} \\quad \\text{and} \\quad \\vec{b} = \\hat{\\mathbf{i}} - 4\\hat{\\mathbf{j}} + 2\\hat{\\mathbf{k}}. $$

(b) Find a unit vector $\\hat{n}$ that is perpendicular to both $\\vec{a}$ and $\\vec{b}$.

**Solution.**
In component form,
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ 2 \\\\ 5 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 1 \\\\ -4 \\\\ 2 \\end{pmatrix}. $$

(a) Using the Down Product – Up Product method,
$$ \\begin{aligned}
\\vec{a} \\times \\vec{b} &= \\begin{pmatrix} 3 \\\\ 2 \\\\ 5 \\end{pmatrix} \\times \\begin{pmatrix} 1 \\\\ -4 \\\\ 2 \\end{pmatrix} \\\\
&= \\begin{pmatrix} 2(2) - 5(-4) \\\\ 5(1) - 3(2) \\\\ 3(-4) - 2(1) \\end{pmatrix} \\\\
&= \\begin{pmatrix} 24 \\\\ -1 \\\\ -14 \\end{pmatrix}.
\\end{aligned} $$

Therefore,
$$ \\vec{a} \\times \\vec{b} = 24\\hat{\\mathbf{i}} - \\hat{\\mathbf{j}} - 14\\hat{\\mathbf{k}}. $$

(b) Let $\\vec{n}$ be a vector perpendicular to both $\\vec{a}$ and $\\vec{b}$. Then
$$ \\vec{n} = \\vec{a} \\times \\vec{b} = \\begin{pmatrix} 24 \\\\ -1 \\\\ -14 \\end{pmatrix}. $$

The unit vector of $\\vec{n}$ is
$$ \\begin{aligned}
\\hat{n} &= \\frac{\\vec{n}}{|\\vec{n}|} \\\\
&= \\frac{1}{\\sqrt{24^2 + (-1)^2 + (-14)^2}} \\begin{pmatrix} 24 \\\\ -1 \\\\ -14 \\end{pmatrix} \\\\
&= \\frac{1}{\\sqrt{773}} \\begin{pmatrix} 24 \\\\ -1 \\\\ -14 \\end{pmatrix}.
\\end{aligned} $$

Therefore,
$$ \\hat{n} = \\frac{1}{\\sqrt{773}} \\begin{pmatrix} 24 \\\\ -1 \\\\ -14 \\end{pmatrix}. $$

> **Note.** For two non-parallel vectors $\\vec{a}$ and $\\vec{b}$, a vector perpendicular to both may be taken as
> $$ \\boxed{\\vec{n} = \\vec{a} \\times \\vec{b}}. $$


---

#### Example 15
Given that $|\\vec{a}| = 4$, $|\\vec{b}| = 5$, and that $\\vec{a}$ and $\\vec{b}$ are perpendicular, evaluate
$$ |(2\\vec{a} - \\vec{b}) \\times (\\vec{a} + 3\\vec{b})|. $$

**Solution.**
Using the distributive property,
$$ \\begin{aligned} (2\\vec{a} - \\vec{b}) \\times (\\vec{a} + 3\\vec{b}) &= 2(\\vec{a} \\times \\vec{a}) + 6(\\vec{a} \\times \\vec{b}) - (\\vec{b} \\times \\vec{a}) - 3(\\vec{b} \\times \\vec{b}) \\\\ &= 6(\\vec{a} \\times \\vec{b}) - (\\vec{b} \\times \\vec{a}). \\end{aligned} $$

Since
$$ \\vec{b} \\times \\vec{a} = -(\\vec{a} \\times \\vec{b}), $$

we get
$$ \\begin{aligned} (2\\vec{a} - \\vec{b}) \\times (\\vec{a} + 3\\vec{b}) &= 6(\\vec{a} \\times \\vec{b}) + (\\vec{a} \\times \\vec{b}) \\\\ &= 7(\\vec{a} \\times \\vec{b}). \\end{aligned} $$

Therefore,
$$ \\begin{aligned} |(2\\vec{a} - \\vec{b}) \\times (\\vec{a} + 3\\vec{b})| &= 7|\\vec{a} \\times \\vec{b}| \\\\ &= 7|\\vec{a}| |\\vec{b}| \\sin 90^\\circ \\\\ &= 7(4)(5)(1) \\\\ &= 140. \\end{aligned} $$

Hence,
$$ |(2\\vec{a} - \\vec{b}) \\times (\\vec{a} + 3\\vec{b})| = 140. $$

---

## Exercise 4.3

**1.** Find a vector perpendicular to the following pair of vectors:

(a)
$$ \\begin{pmatrix} 3 \\\\ 1 \\\\ 1 \\end{pmatrix} \\quad \\text{and} \\quad \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}. $$

(b)
$$ \\begin{pmatrix} 3 \\\\ -1 \\\\ 4 \\end{pmatrix} \\quad \\text{and} \\quad \\begin{pmatrix} -1 \\\\ 1 \\\\ 5 \\end{pmatrix}. $$

**Solution.**
A vector perpendicular to both vectors is their vector product.

(a) Let
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}. $$

Then
$$ \\vec{a} \\times \\vec{b} = \\begin{pmatrix} 1(3) - 1(2) \\\\ 1(1) - 3(3) \\\\ 3(2) - 1(1) \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ -8 \\\\ 5 \\end{pmatrix}. $$

(b) Let
$$ \\vec{a} = \\begin{pmatrix} 3 \\\\ -1 \\\\ 4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 5 \\end{pmatrix}. $$

Then
$$ \\vec{a} \\times \\vec{b} = \\begin{pmatrix} (-1)(5) - 4(1) \\\\ 4(-1) - 3(5) \\\\ 3(1) - (-1)(-1) \\end{pmatrix} = \\begin{pmatrix} -9 \\\\ -19 \\\\ 2 \\end{pmatrix}. $$

**2.** Consider
$$ \\vec{a} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix} \\quad \\text{and} \\quad \\vec{b} = \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix}. $$

(a) Find $\\vec{a} \\times \\vec{b}$.

(b) Find $\\sin \\theta$ using
$$ |\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}| \\sin \\theta. $$

**Solution.**
(a)
$$ \\vec{a} \\times \\vec{b} = \\begin{pmatrix} (-1)(-1) - 3(0) \\\\ 3(1) - 2(-1) \\\\ 2(0) - (-1)(1) \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 5 \\\\ 1 \\end{pmatrix}. $$

(b)
$$ |\\vec{a} \\times \\vec{b}| = \\sqrt{1^2 + 5^2 + 1^2} = \\sqrt{27} = 3\\sqrt{3}. $$

Also,
$$ |\\vec{a}| = \\sqrt{2^2 + (-1)^2 + 3^2} = \\sqrt{14}, \\quad |\\vec{b}| = \\sqrt{1^2 + 0^2 + (-1)^2} = \\sqrt{2}. $$

Hence,
$$ \\sin \\theta = \\frac{|\\vec{a} \\times \\vec{b}|}{|\\vec{a}| |\\vec{b}|} = \\frac{3\\sqrt{3}}{\\sqrt{14}\\sqrt{2}} = \\frac{3\\sqrt{3}}{2\\sqrt{7}} \\times \\frac{\\sqrt{7}}{\\sqrt{7}} = \\frac{3\\sqrt{21}}{14}. $$

**3.** Prove that for any two vectors $\\vec{a}$ and $\\vec{b}$,
$$ |\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2 |\\vec{b}|^2. $$

**Solution.**
Let $\\theta$ be the angle between $\\vec{a}$ and $\\vec{b}$. Then
$$ |\\vec{a} \\times \\vec{b}| = |\\vec{a}| |\\vec{b}| \\sin \\theta $$

and
$$ \\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos \\theta. $$

Therefore,
$$ \\begin{aligned} |\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 &= |\\vec{a}|^2 |\\vec{b}|^2 \\sin^2 \\theta + |\\vec{a}|^2 |\\vec{b}|^2 \\cos^2 \\theta \\\\ &= |\\vec{a}|^2 |\\vec{b}|^2 (\\sin^2 \\theta + \\cos^2 \\theta) \\\\ &= |\\vec{a}|^2 |\\vec{b}|^2. \\end{aligned} $$

Hence proved.

Another method. Starting with
$$ \\sin^2 \\theta + \\cos^2 \\theta = 1, $$

and using
$$ \\sin \\theta = \\frac{|\\vec{a} \\times \\vec{b}|}{|\\vec{a}| |\\vec{b}|}, \\quad \\cos \\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| |\\vec{b}|}, $$

we get
$$ \\frac{|\\vec{a} \\times \\vec{b}|^2}{|\\vec{a}|^2 |\\vec{b}|^2} + \\frac{(\\vec{a} \\cdot \\vec{b})^2}{|\\vec{a}|^2 |\\vec{b}|^2} = 1. $$

Multiplying throughout by $|\\vec{a}|^2 |\\vec{b}|^2$ gives
$$ |\\vec{a} \\times \\vec{b}|^2 + (\\vec{a} \\cdot \\vec{b})^2 = |\\vec{a}|^2 |\\vec{b}|^2. $$

**4.** Given points $A, B$ and $C$ with coordinates $(3, -5, 1)$, $(7, 7, 2)$ and $(-1, 1, 3)$.

(a) Calculate
$$ \\vec{p} = \\overrightarrow{AB} \\times \\overrightarrow{AC} \\quad \\text{and} \\quad \\vec{q} = \\overrightarrow{BA} \\times \\overrightarrow{BC}. $$

(b) What can you say about vectors $\\vec{p}$ and $\\vec{q}$?

**Solution.**
$$ \\overrightarrow{OA} = \\begin{pmatrix} 3 \\\\ -5 \\\\ 1 \\end{pmatrix}, \\quad \\overrightarrow{OB} = \\begin{pmatrix} 7 \\\\ 7 \\\\ 2 \\end{pmatrix}, \\quad \\overrightarrow{OC} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 3 \\end{pmatrix}. $$

Therefore,
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 7 \\\\ 7 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -5 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 12 \\\\ 1 \\end{pmatrix}, $$

$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -5 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 6 \\\\ 2 \\end{pmatrix}. $$

Also,
$$ \\overrightarrow{BA} = \\overrightarrow{OA} - \\overrightarrow{OB} = \\begin{pmatrix} -4 \\\\ -12 \\\\ -1 \\end{pmatrix}, \\quad \\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 7 \\\\ 7 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -8 \\\\ -6 \\\\ 1 \\end{pmatrix}. $$

(a)
$$ \\vec{p} = \\begin{pmatrix} 4 \\\\ 12 \\\\ 1 \\end{pmatrix} \\times \\begin{pmatrix} -4 \\\\ 6 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 18 \\\\ -12 \\\\ 72 \\end{pmatrix}, $$

$$ \\vec{q} = \\begin{pmatrix} -4 \\\\ -12 \\\\ -1 \\end{pmatrix} \\times \\begin{pmatrix} -8 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -18 \\ 12 \\ -72 \\end{pmatrix}. $$

(b) Since
$$ \\vec{q} = -\\vec{p}, $$

the vectors $\\vec{p}$ and $\\vec{q}$ have equal magnitudes but opposite directions.

**5.** The points $A(3, 1, 2)$, $B(-1, 1, 5)$ and $C(7, 2, 3)$ are vertices of a parallelogram $ABCD$.

(a) Find the coordinates of $D$.

(b) Calculate the area of the parallelogram.

[DIAGRAM:Chap4_Ex4_3_Q5]

**Solution.**
(a) For parallelogram $ABCD$,
$$ \\overrightarrow{AD} = \\overrightarrow{BC}, $$
$$ \\overrightarrow{OD} - \\overrightarrow{OA} = \\overrightarrow{OC} - \\overrightarrow{OB}. $$

Therefore,
$$ \\begin{aligned} \\overrightarrow{OD} &= \\overrightarrow{OA} + \\overrightarrow{OC} - \\overrightarrow{OB} \\\\ &= \\begin{pmatrix} 3 \\\\ 1 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 7 \\\\ 2 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} -1 \\\\ 1 \\\\ 5 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 11 \\\\ 2 \\\\ 0 \\end{pmatrix}. \\end{aligned} $$

Therefore, the coordinates of $D$ are $(11, 2, 0)$.

(b) Adjacent sides from $A$ are
$$ \\overrightarrow{AB} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 0 \\\\ 3 \\end{pmatrix} $$

and
$$ \\overrightarrow{AD} = \\begin{pmatrix} 8 \\\\ 1 \\\\ -2 \\end{pmatrix}. $$

Thus,
$$ \\overrightarrow{AB} \\times \\overrightarrow{AD} = \\begin{pmatrix} -4 \\\\ 0 \\\\ 3 \\end{pmatrix} \\times \\begin{pmatrix} 8 \\\\ 1 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ 16 \\\\ -4 \\end{pmatrix}. $$

Therefore,
$$ \\begin{aligned} \\text{Area of parallelogram} &= |\\overrightarrow{AB} \\times \\overrightarrow{AD}| \\\\ &= \\sqrt{(-3)^2 + 16^2 + (-4)^2} \\\\ &= \\sqrt{281}. \\end{aligned} $$

Hence,
$$ \\text{Area of parallelogram} = \\sqrt{281} \\text{ square units.} $$

`;
