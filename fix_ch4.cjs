const fs = require('fs');
const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const targetStr = '### Position Vectors in Three Dimensions';
const idx = content.indexOf(targetStr);

const restOfFile = content.substring(idx);

const beginning = `export const chapter4Content = \\\`### Introduction
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
$$ \\\\hat{\\\\mathbf{i}} = (1, 0, 0), \\\\quad \\\\hat{\\\\mathbf{j}} = (0, 1, 0), \\\\quad \\\\hat{\\\\mathbf{k}} = (0, 0, 1). $$
Here $\\\\hat{\\\\mathbf{i}}$ is directed along the positive $x$-axis, $\\\\hat{\\\\mathbf{j}}$ is directed along the positive $y$-axis, and $\\\\hat{\\\\mathbf{k}}$ is directed along the positive $z$-axis. Each of these vectors has magnitude $1$.

[DIAGRAM:Chap4_Fig4]

---

\\\`;`;

fs.writeFileSync('src/data/chapter4_content.ts', beginning.replace(/\\\`;$/, "") + restOfFile); 

