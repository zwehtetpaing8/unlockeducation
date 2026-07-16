const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(
  `###### **Example 11**
Find the equation of the plane tangent to the sphere $(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 14$ at the point $(3, 4, 1)$.

**Solution:**
Center of the sphere is $C(2, 1, -1)$.
Directed values of radius $CP$ are: $\\langle 3 - 2, \\, 4 - 1, \\, 1 - (-1) \\rangle = \\langle 1, 3, 2 \\rangle$.
This is the normal vector to the tangent plane.
Equation: $x + 3y + 2z = d$
Using point $P(3, 4, 1)$:
$$d = 3 + 3(4) + 2(1) = 17$$
Equation: **$x + 3y + 2z = 17$**

[DIAGRAM:Chap3_5_Ex11_Sphere]`,
  `###### **Example 11**
Find the equation of the plane tangent to the sphere $(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 14$ at the point $(3, 4, 1)$.

**Solution**
The center of the sphere is $C(2, 1, -1)$.
Directed values of the line joining the center $(2, 1, -1)$ of the sphere and the given point $(3, 4, 1)$ are $\\langle 1, 3, 2 \\rangle$.
This line is perpendicular to the tangent plane.
Therefore, the equation of the tangent plane is
$$x + 3y + 2z = d$$

[DIAGRAM:Chap3_5_Ex11_Sphere]

Since the point $(3, 4, 1)$ is on the tangent plane,
$$d = 3(3) + 3(4) + 2(1) = 17$$

Therefore, the equation of the tangent plane is
$$x + 3y + 2z = 17$$`
);

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
