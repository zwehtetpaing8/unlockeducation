const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q5**');
const endIdx = text.indexOf('###### **Exercise 3.5 Q3**', startIdx);

const newQ5 = `###### **Exercise 3.5 Q5**
Find the equation of the sphere with center $(6, -7, -3)$ and touching the plane $4x - 2y - z = 17$.

**Solution**
Directed values of the line (radius) joining the center $(6, -7, -3)$ of the sphere and perpendicular to the touching plane $4x - 2y - z = 17$ are $\\langle 4, -2, -1 \\rangle$.
Coordinates of the point on this line (radius) are
$$(x, y, z) = (6 + 4k, -7 - 2k, -3 - k) \\quad \\text{for some real number } k$$

If one of these points $(x, y, z)$ is on the plane, then
$$4(6 + 4k) - 2(-7 - 2k) - (-3 - k) = 17 \\implies 41 + 21k = 17 \\implies k = -\\frac{8}{7}$$

Therefore, the touching point is
$$\\left(6 + 4\\left(-\\frac{8}{7}\\right), -7 - 2\\left(-\\frac{8}{7}\\right), -3 - \\left(-\\frac{8}{7}\\right)\\right) = \\left(\\frac{10}{7}, -\\frac{33}{7}, -\\frac{13}{7}\\right)$$

Hence the radius is
$$r = \\sqrt{\\left(\\frac{10}{7} - 6\\right)^2 + \\left(-\\frac{33}{7} + 7\\right)^2 + \\left(-\\frac{13}{7} + 3\\right)^2} = \\sqrt{\\frac{64}{21}}$$

Therefore, the equation of the sphere is
$$(x - 6)^2 + (y + 7)^2 + (z + 3)^2 = \\frac{64}{21}$$

`;

text = text.substring(0, startIdx) + newQ5 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
