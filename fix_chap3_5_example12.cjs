const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Example 12**');
const endIdx = text.indexOf('###### **Exercise 3.5 Q5**', startIdx);

const newEx12 = `###### **Example 12**
Find the equation of the sphere with center $(0, 1, 0)$ and touching the plane $x - 2y + 2z + 5 = 0$.

**Solution**
Directed values of the line (radius) joining the center $(0, 1, 0)$ of the sphere and perpendicular to the plane $x - 2y + 2z + 5 = 0$ are $\\langle 1, -2, 2 \\rangle$.
Coordinates of the point on this line (radius) are
$$(x, y, z) = (k, 1 - 2k, 2k) \\quad \\text{for some real number } k$$

If one of these points $(x, y, z)$ is on the plane, then
$$k - 2(1 - 2k) + 2(2k) + 5 = 0 \\implies 9k + 3 = 0 \\implies k = -\\frac{1}{3}$$

Therefore, the touching point is
$$\\left(-\\frac{1}{3}, 1 - 2\\left(-\\frac{1}{3}\\right), 2\\left(-\\frac{1}{3}\\right)\\right) = \\left(-\\frac{1}{3}, \\frac{5}{3}, -\\frac{2}{3}\\right)$$

Hence the radius is
$$r = \\sqrt{\\left(-\\frac{1}{3}\\right)^2 + \\left(\\frac{5}{3} - 1\\right)^2 + \\left(-\\frac{2}{3}\\right)^2} = 1$$

Therefore, the equation of the sphere is
$$x^2 + (y - 1)^2 + z^2 = 1$$

`;

text = text.substring(0, startIdx) + newEx12 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
