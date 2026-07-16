const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('###### **Exercise 3.3 Q3**'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('### 3.4 Planes'));

const newContent = `###### **Exercise 3.3 Q3**
3. Find the equation of the line passing through the point $(8, -1, -10)$ and perpendicular to the line $(x,y,z) = (1+2k, \\, 2-k, \\, 3-7k)$. Find also the point of intersection of the two lines.
**Solution**
Directed values of the given line are $\\langle 2, -1, -7 \\rangle$.
Directed values of the required line are
$$\\langle 8 - (1+2k), \\, -1 - (2-k), \\, -10 - (3-7k) \\rangle = \\langle 7-2k, \\, -3+k, \\, -13+7k \\rangle$$
for some real number $k$.
If two lines are perpendicular, then
$$2(7 - 2k) + (-1)(-3 + k) + (-7)(-13 + 7k) = 0$$
$$14 - 4k + 3 - k + 91 - 49k = 0$$
$$108 - 54k = 0$$
$$k = 2$$
So directed values of the required line are $\\langle 3, -1, 1 \\rangle$ and the equation of the line is
$$(x, y, z) = (8 + 3t, \\, -1 - t, \\, -10 + t)$$
The point of intersection is
$$(x, y, z) = (5, 0, -11).$$
---`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
