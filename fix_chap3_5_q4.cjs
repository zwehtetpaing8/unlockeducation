const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const oldQ4 = `###### **Exercise 3.5 Q4**
Find the equation of the plane tangent to the sphere $(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 27$ at the point $P(3, 2, -2)$.

**Solution:**
1.  **Find the center $C$ of the sphere**:
    Comparing with the standard form $(x - x_1)^2 + (y - y_1)^2 + (z - z_1)^2 = r^2$, the center is:
    $$C(-2, 1, -3)$$

2.  **Find the direction ratios of the normal vector to the tangent plane**:
    The normal vector is the radius vector $CP$ joining the center $C(-2, 1, -3)$ to the point of tangency $P(3, 2, -2)$:
    $$\\vec{CP} = \\langle 3 - (-2), \\, 2 - 1, \\, -2 - (-3) \\rangle = \\langle 5, \\, 1, \\, 1 \\rangle$$
    Thus, the direction ratios of the normal vector are $a = 5, \\, b = 1, \\, c = 1$.

3.  **Find the equation of the plane**:
    The equation of a plane through $(x_0, y_0, z_0) = (3, 2, -2)$ with normal direction ratios $\\langle a, b, c \\rangle = \\langle 5, 1, 1 \\rangle$ is:
    $$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$
    $$5(x - 3) + 1(y - 2) + 1(z - (-2)) = 0$$
    $$5x - 15 + y - 2 + z + 2 = 0$$
    **$$5x + y + z = 15$$**

[DIAGRAM:Chap3_5_Q4_Sphere]`;

const newQ4 = `###### **Exercise 3.5 Q4**
Find the equation of the plane tangent to the sphere $(x + 2)^2 + (y - 1)^2 + (z + 3)^2 = 27$ at the point $(3, 2, -2)$.

**Solution**
The center of the sphere is $C(-2, 1, -3)$.
Directed values of the line joining the center $(-2, 1, -3)$ of the sphere and the given point $(3, 2, -2)$ are $\\langle 5, 1, 1 \\rangle$.
This line is perpendicular to the tangent plane.
Therefore, the equation of the tangent plane is
$$5x + y + z = d$$

[DIAGRAM:Chap3_5_Q4_Sphere]

Since the point $(3, 2, -2)$ is on the tangent plane,
$$d = 5(3) + 2 + (-2) = 15$$

Therefore, the equation of the tangent plane is
$$5x + y + z = 15$$`;

text = text.replace(oldQ4, newQ4);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
