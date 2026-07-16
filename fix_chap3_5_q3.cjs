const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q3**');
const endIdx = text.indexOf('###### **Exercise 3.5 Q4**', startIdx);

const newQ3 = `###### **Exercise 3.5 Q3**
Find the equation of the sphere on the join of $(1, -1, 1)$ and $(-3, 4, 5)$ as diameter.

**Solution**
Let $A(1, -1, 1)$ and $B(-3, 4, 5)$.
The center of the sphere is the midpoint of the ends of the diameter. Therefore,
$$C = \\left(\\frac{1 + (-3)}{2}, \\frac{-1 + 4}{2}, \\frac{1 + 5}{2}\\right) = \\left(-1, \\frac{3}{2}, 3\\right)$$

Directed values of the diameter joining $(1, -1, 1)$ and $(-3, 4, 5)$ are $\\langle -4, 5, 4 \\rangle$. Hence,
$$AB = \\sqrt{(-4)^2 + 5^2 + 4^2} = \\sqrt{57}$$

Therefore, the radius is
$$r = \\frac{\\sqrt{57}}{2}$$

So, the equation of the sphere is
$$(x + 1)^2 + \\left(y - \\frac{3}{2}\\right)^2 + (z - 3)^2 = \\frac{57}{4}$$

`;

text = text.substring(0, startIdx) + newQ3 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
