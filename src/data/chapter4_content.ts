export const chapter4Content = `### Introduction
In this chapter, we study vectors and vector algebra. A vector is a quantity that has both magnitude and direction; for example, displacement, velocity, acceleration, and force are naturally described by vectors. Vector algebra is the set of rules and methods used to represent vectors, combine them, compare them, and use them in calculations. We will learn how to write vectors in component form, add and subtract vectors, multiply vectors by scalars, and interpret these operations geometrically. These ideas are useful in mathematics, physics, engineering, navigation, computer graphics, and many real-life situations where both size and direction matter. We will also use position vectors to describe points in three-dimensional space and use vector methods to solve problems involving distance, direction, parallel lines, collinear points, and parallelograms. Later, the scalar product and vector product will help us find angles, projections, areas, and directions in two-dimensional and three-dimensional geometry.

---

### 4.1 Vectors in Three Dimensions
In the plane, each point is associated with an ordered pair of real numbers. In space, each point is associated with an ordered triple of real numbers.

Through a fixed point, called the origin $O$, draw three mutually perpendicular lines: the $x$-axis, the $y$-axis, and the $z$-axis. A point $P$ in space is determined by an ordered triple $(x, y, z)$ of real numbers, as shown in the diagram. These numbers $x, y$, and $z$ are called the coordinates of $P$.

[DIAGRAM:Chap4_Fig1]

**Example 1**
Illustrate the following points in three-dimensional space:
(a) $A(0, 3, 0)$  (b) $B(4, 0, 2)$  (c) $C(-1, 2, 2)$.

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
(a) $\\overrightarrow{OP}$   (b) $\\overrightarrow{PQ}$   (c) $|\\overrightarrow{PQ}|$   (d) $\\overrightarrow{QP}$   (e) $|\\overrightarrow{QP}|$

**Solution**
(a)
$$ \\overrightarrow{OP} = \\begin{pmatrix} -3 \\\\ 1 \\\\ 2 \\end{pmatrix} = -3\\hat{\\mathbf{i}} + \\hat{\\mathbf{j}} + 2\\hat{\\mathbf{k}}. $$
(b)
$$ \\overrightarrow{PQ} = \\overrightarrow{OQ} - \\overrightarrow{OP} = \\begin{pmatrix} 1 - (-3) \\\\ -1 - 1 \\\\ 3 - 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ -2 \\\\ 1 \\end{pmatrix} = 4\\hat{\\mathbf{i}} - 2\\hat{\\mathbf{j}} + \\hat{\\mathbf{k}}. $$
(c)
$$ |\\overrightarrow{PQ}| = \\sqrt{4^2 + (-2)^2 + 1^2} = \\sqrt{21}. $$
(d)
$$ \\overrightarrow{QP} = \\overrightarrow{OP} - \\overrightarrow{OQ} = \\begin{pmatrix} -3 - 1 \\\\ 1 - (-1) \\\\ 2 - 3 \\end{pmatrix} = \\begin{pmatrix} -4 \\\\ 2 \\\\ -1 \\end{pmatrix} = -4\\hat{\\mathbf{i}} + 2\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}}. $$
(e)
$$ |\\overrightarrow{QP}| = \\sqrt{(-4)^2 + 2^2 + (-1)^2} = \\sqrt{21}. $$

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
(a) $\\vec{p} + \\vec{q}$   (b) $\\vec{p} - \\frac{1}{2}\\vec{q}$   (c) $\\frac{3}{2}\\vec{q} - \\vec{p}$

**Solution**
(a)
$$ \\vec{p} + \\vec{q} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$
(b)
$$ \\frac{1}{2}\\vec{q} = \\frac{1}{2}\\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix}. $$
Therefore,
$$ \\vec{p} - \\frac{1}{2}\\vec{q} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -1 \\\\ 3 \\end{pmatrix}. $$
(c)
$$ \\frac{3}{2}\\vec{q} = \\frac{3}{2}\\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ 0 \\\\ 3 \\end{pmatrix}. $$
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
Hence,
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
If
$$ \\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}, $$
then
$$ |\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2} $$
and
$$ \\hat{\\mathbf{a}} = \\frac{1}{\\sqrt{a_1^2 + a_2^2 + a_3^2}}\\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}. $$

[DIAGRAM:Chap4_Fig13]

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
Hence,
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

**Example 7**
Prove that $A(8, 2, 2)$, $C(20, 5, 5)$, and $B(12, 3, 3)$ are collinear.

**Solution**
Find two vectors starting from $A$:
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\\\ 1 \\end{pmatrix}. $$
Also,
$$ \\overrightarrow{AC} = \\overrightarrow{OC} - \\overrightarrow{OA} = \\begin{pmatrix} 20 \\\\ 5 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} 8 \\\\ 2 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 3 \\\\ 3 \\end{pmatrix}. $$
Now
$$ \\overrightarrow{AC} = 3\\overrightarrow{AB}. $$
Therefore, $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel. Also, $A$ is common to both $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$. Hence, the points $A, B$, and $C$ are collinear.

---

### Exercise 4.1
**1. Question**
Let
$$ \\vec{a} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix}, \\quad \\text{and} \\quad \\vec{c} = \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix}. $$
Find the following vectors.
**(a)** $3\\vec{a}$
**(b)** $4\\vec{b}$
**(c)** $\\vec{a} - \\vec{b}$
**(d)** $\\vec{b} + \\vec{c}$
**(e)** $2\\vec{b} + \\vec{c}$
**(f)** $\\vec{a} - 2\\vec{b}$
**(g)** $\\vec{a} + \\vec{b} - 2\\vec{c}$
**(h)** $3\\vec{a} - \\vec{b} + \\vec{c}$

**Solution**
(a) $3\\vec{a} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 15 \\\\ -6 \\\\ -12 \\end{pmatrix}.$
(b) $4\\vec{b} = 4\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ -24 \\\\ 4 \\end{pmatrix}.$
(c) $\\vec{a} - \\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -5 \\end{pmatrix}.$
(d) $\\vec{b} + \\vec{c} = \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\\\ 0 \\end{pmatrix}.$
(e) $2\\vec{b} + \\vec{c} = 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ -5 \\\\ 1 \\end{pmatrix}.$
(f) $\\vec{a} - 2\\vec{b} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - 2\\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 10 \\\\ -6 \\end{pmatrix}.$
(g) $\\vec{a} + \\vec{b} - 2\\vec{c} = \\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} - 2\\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -22 \\\\ -1 \\end{pmatrix}.$
(h) $3\\vec{a} - \\vec{b} + \\vec{c} = 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -6 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 7 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 7 \\\\ -14 \\end{pmatrix}.$

**2. Question**
Given vectors
$$ \\vec{a} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix}, \\quad \\vec{b} = \\begin{pmatrix} -3 \\\\ 4 \\\\ 2 \\end{pmatrix}, \\quad \\vec{c} = \\begin{pmatrix} -2 \\\\ p \\\\ q \\end{pmatrix}. $$
(a) Find the values of $p$ and $q$ such that $\\vec{c}$ is parallel to $\\vec{a}$.
(b) Find the value of scalar $k$ such that $\\vec{a} + k\\vec{b}$ is parallel to vector $\\begin{pmatrix} 0 \\\\ 10 \\\\ 23 \\end{pmatrix}$.

**Solution**
(a) Since $\\vec{c}$ is parallel to $\\vec{a}$, let $\\vec{c} = m\\vec{a}$.
$$ \\begin{pmatrix} -2 \\\\ p \\\\ q \\end{pmatrix} = m\\begin{pmatrix} 1 \\\\ 2 \\\\ 7 \\end{pmatrix} = \\begin{pmatrix} m \\\\ 2m \\\\ 7m \\end{pmatrix}. $$
Comparing corresponding components,
$$ -2 = m \\implies m = -2. $$
$$ p = 2m = 2(-2) = -4, $$
$$ q = 7m = 7(-2) = -14. $$

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
(a) Point $E$ is the midpoint of $BC$.
$$ \\overrightarrow{OE} = \\frac{1}{2}(\\overrightarrow{OB} + \\overrightarrow{OC}) $$
$$ = \\frac{1}{2}\\left[ \\begin{pmatrix} 5 \\\\ 0 \\\\ 3 \\end{pmatrix} + \\begin{pmatrix} 7 \\\\ 8 \\\\ -3 \\end{pmatrix} \\right] = \\frac{1}{2}\\begin{pmatrix} 12 \\\\ 8 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ 4 \\\\ 0 \\end{pmatrix}. $$
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
Since $ABCD$ is a parallelogram, opposite sides are equal and parallel.
$$ \\overrightarrow{AB} = \\overrightarrow{DC}. $$
$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} \\quad \\text{and} \\quad \\overrightarrow{DC} = \\overrightarrow{OC} - \\overrightarrow{OD}. $$
Since $\\overrightarrow{AB} = \\overrightarrow{DC}$,
$$ \\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{OC} - \\overrightarrow{OD}. $$
$$ \\overrightarrow{OD} = \\overrightarrow{OC} - \\overrightarrow{OB} + \\overrightarrow{OA} $$
$$ = \\begin{pmatrix} 3 \\\\ 1 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 5 \\\\ 1 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 0 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 2 \\\\ -1 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ -1 \\\\ 6 \\end{pmatrix}. $$
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


`;
