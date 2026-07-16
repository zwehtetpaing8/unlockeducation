const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

const startIdx = text.indexOf('###### **Exercise 3.5 Q1**');
const endIdx = text.indexOf('###### **Exercise 3.5 Q2**', startIdx);

const newQ1 = `###### **Exercise 3.5 Q1**
1. Find the equation of the sphere with center $C$ and radius $r$,
(a) $C(1, -2, 4)$, $r = 3$
(b) $C(2, 6, -3)$, $r = 2$
(c) $C(2, 3, 5)$, $r = 5$

**Solution**
**(a)** The equation of the sphere with center $C(1, -2, 4)$ and radius $3$ is
$$(x - 1)^2 + (y + 2)^2 + (z - 4)^2 = 9$$

**(b)** The equation of the sphere with center $C(2, 6, -3)$ and radius $2$ is
$$(x - 2)^2 + (y - 6)^2 + (z + 3)^2 = 4$$

**(c)** The equation of the sphere with center $C(2, 3, 5)$ and radius $5$ is
$$(x - 2)^2 + (y - 3)^2 + (z - 5)^2 = 25$$

`;

text = text.substring(0, startIdx) + newQ1 + text.substring(endIdx);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
