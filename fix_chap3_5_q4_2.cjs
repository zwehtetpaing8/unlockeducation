const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q4**');
const endIdx = text.indexOf('###### **Example 12**', startIdx);

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
$$5x + y + z = 15$$

`;

text = text.substring(0, startIdx) + newQ4 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
