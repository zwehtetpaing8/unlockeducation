const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q2**');
const endIdx = text.indexOf('###### **Exercise 3.5 Q6**', startIdx);

const newQ2 = `###### **Exercise 3.5 Q2**
2. Check whether the given point $P$ lies inside, outside or on a sphere.
(a) $C(0, 0, 0)$, $r = 3$ and $P(1, 1, 1)$
(b) $C(0, 0, 0)$, $r = 3$ and $P(2, 1, 2)$
(c) $C(0, 0, 0)$, $r = 3$ and $P(10, 10, 10)$

**Solution**
**(a)** $CP = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}$. Since $CP < r$, the point $P(1, 1, 1)$ lies inside the sphere.
**(b)** $CP = \\sqrt{2^2 + 1^2 + 2^2} = \\sqrt{9} = 3$. Since $CP = r$, the point $P(2, 1, 2)$ lies on the sphere.
**(c)** $CP = \\sqrt{10^2 + 10^2 + 10^2} = \\sqrt{300} = 10\\sqrt{3}$. Since $CP > r$, the point $P(10, 10, 10)$ lies outside the sphere.

`;

text = text.substring(0, startIdx) + newQ2 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
