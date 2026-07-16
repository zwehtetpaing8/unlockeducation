const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('###### **Example 5**'));
const endIdx = lines.findIndex(l => l.includes('###### **Example 6**'));

const newContent = `###### **Example 5**
Given $P(2, 1, 3)$, $Q(6, -5, 4)$, $R(2, 3, 4)$ and $S(-1, 5, 1)$, determine whether the lines $PQ$ and $RS$ are parallel or skew or intersect.
**Solution**
$$\\langle PQ \\rangle = \\langle 6-2, \\, -5-1, \\, 4-3 \\rangle = \\langle 4, -6, 1 \\rangle$$
$$\\langle RS \\rangle = \\langle -1-2, \\, 5-3, \\, 1-4 \\rangle = \\langle -3, 2, -3 \\rangle$$
Since $\\langle PQ \\rangle$ is not a scalar multiple of $\\langle RS \\rangle$, the lines $PQ$ and $RS$ are not parallel.
Coordinates of the points on the lines are
$$PQ: (x, y, z) = (2 + 4s, \\, 1 - 6s, \\, 3 + s)$$
$$RS: (x, y, z) = (2 - 3t, \\, 3 + 2t, \\, 4 - 3t)$$
If the two lines intersect, then they have a common point. So,
$$2 + 4s = 2 - 3t \\implies 4s = -3t$$
$$1 - 6s = 3 + 2t \\implies -6s - 2 = 2t$$
$$3 + s = 4 - 3t \\implies s + 3t = 1$$
From $4s = -3t$, we get $t = -\\frac{4s}{3}$. Substituting into $s + 3t = 1$,
$$s + 3\\left(-\\frac{4s}{3}\\right) = 1$$
$$-3s = 1$$
$$s = -\\frac{1}{3}, \\, t = \\frac{4}{9}$$
Substituting these values into $-6s - 2 = 2t$, we get $0 \\neq \\frac{8}{9}$.
This is impossible. Therefore, the lines $PQ$ and $RS$ do not intersect.
Hence, the lines $PQ$ and $RS$ are **skew lines**.`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
