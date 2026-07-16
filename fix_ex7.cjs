const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('###### **Example 7**'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('###### **Exercise 3.3 Q1**'));

const newContent = `###### **Example 7**
Find the equation of the line passing through the point $(-4, 7, -3)$ and perpendicular to the line $(x,y,z) = (3+2k, \\, -1+3k, \\, 1-k)$. Find also the point of intersection of the two lines.
**Solution**
Directed values of the given line are $\\langle 2, 3, -1 \\rangle$.
Directed values of the required line are
$$\\langle -4 - (3+2k), \\, 7 - (-1+3k), \\, -3 - (1-k) \\rangle = \\langle -7-2k, \\, 8-3k, \\, -4+k \\rangle$$
for some real number $k$.
If two lines are perpendicular, then
$$2(-7 - 2k) + 3(8 - 3k) + (-1)(-4 + k) = 0$$
$$-14 - 4k + 24 - 9k + 4 - k = 0$$
$$14k = 14$$
$$k = 1$$
So directed values of the required line are $\\langle -9, 5, -3 \\rangle$ and the equation of the line is
$$(x, y, z) = (-4 - 9t, \\, 7 + 5t, \\, -3 - 3t)$$
The point of intersection is
$$(x, y, z) = (5, 2, 0).$$`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
