const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('###### **Example 6**'));
const endIdx = lines.findIndex(l => l.includes('###### **Example 7**'));

const newContent = `###### **Example 6**
Given $P(0, 0, 1)$, $Q(3, 6, 4)$, $R(0, 3, 1)$ and $S(3, 0, 4)$, show that the lines $PQ$ and $RS$ are perpendicular.
**Solution**
$$\\langle PQ \\rangle = \\langle 3 - 0, \\, 6 - 0, \\, 4 - 1 \\rangle = \\langle 3, 6, 3 \\rangle$$
$$\\langle RS \\rangle = \\langle 3 - 0, \\, 0 - 3, \\, 4 - 1 \\rangle = \\langle 3, -3, 3 \\rangle$$
Coordinates of the points on the lines are
$$PQ: (x, y, z) = (3s, \\, 6s, \\, 1 + 3s)$$
$$RS: (x, y, z) = (3t, \\, 3 - 3t, \\, 1 + 3t)$$
If the two lines intersect, then their coordinates must be equal. So,
$$3s = 3t \\implies s = t$$
$$6s = 3 - 3t \\implies 2s + t = 1$$
$$1 + 3s = 1 + 3t \\implies s = t$$
Substituting $t = s$ into $2s + t = 1$,
$$2s + s = 1$$
$$3s = 1$$
$$s = \\frac{1}{3}, \\, t = \\frac{1}{3}$$
Therefore, the two lines intersect at the point $(x, y, z) = (1, 2, 2)$.
$$l_1 l_2 + m_1 m_2 + n_1 n_2 = (3)(3) + (6)(-3) + (3)(3) = 9 - 18 + 9 = 0$$
Since the lines $PQ$ and $RS$ intersect and $l_1 l_2 + m_1 m_2 + n_1 n_2 = 0$, the lines $PQ$ and $RS$ are **perpendicular**.`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
