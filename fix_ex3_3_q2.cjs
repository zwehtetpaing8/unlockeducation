const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('###### **Exercise 3.3 Q2**'));
const endIdx = lines.findIndex(l => l.includes('###### **Exercise 3.3 Q3**'));

const newContent = `###### **Exercise 3.3 Q2**
2. Determine whether the lines $PQ$ and $RS$ are parallel or skew or intersect. If $PQ$ and $RS$ intersect, are they perpendicular?
(a) $P(1, 2, 3)$, $Q(4, 5, 6)$, $R(-2, 3, 5)$, $S(4, 9, 11)$
(b) $P(3, -1, -3)$, $Q(2, -3, 1)$, $R(3, -2, 5)$, $S(-1, -2, 1)$
(c) $P(4, -2, 5)$, $Q(-2, 6, 1)$, $R(-1, 1, 4)$, $S(3, 3, 2)$
(d) $P(-3, -1, 6)$, $Q(-1, 3, 0)$, $R(0, 6, 7)$, $S(-4, -4, -1)$
**Solutions**
(a) $\\langle PQ \\rangle = \\langle 3, 3, 3 \\rangle$ and $\\langle RS \\rangle = \\langle 6, 6, 6 \\rangle$
$$\\langle PQ \\rangle = \\frac{1}{2} \\langle RS \\rangle$$
Therefore, the lines $PQ$ and $RS$ are **parallel**.

(b) $\\langle PQ \\rangle = \\langle -1, -2, 4 \\rangle$ and $\\langle RS \\rangle = \\langle -4, 0, -4 \\rangle$. Since these are not scalar multiples, the lines are not parallel.
Coordinates of the points on the lines are
$$PQ: (x, y, z) = (3 - s, \\, -1 - 2s, \\, -3 + 4s)$$
$$RS: (x, y, z) = (3 - 4t, \\, -2, \\, 5 - 4t)$$
If the two lines intersect, then their coordinates must be equal. So,
$$-1 - 2s = -2 \\implies s = \\frac{1}{2}$$
$$3 - s = 3 - 4t \\implies t = \\frac{1}{8}$$
$$-3 + 4s = 5 - 4t \\implies -1 \\neq \\frac{9}{2}$$
This is impossible. Therefore, the lines $PQ$ and $RS$ do not intersect.
Hence, they are **skew lines**.

(c) $\\langle PQ \\rangle = \\langle -6, 8, -4 \\rangle$ and $\\langle RS \\rangle = \\langle 4, 2, -2 \\rangle$. Since these are not scalar multiples, the lines are not parallel.
Coordinates of the points on the lines are
$$PQ: (x, y, z) = (4 - 6s, \\, -2 + 8s, \\, 5 - 4s)$$
$$RS: (x, y, z) = (-1 + 4t, \\, 1 + 2t, \\, 4 - 2t)$$
If the two lines intersect, then their coordinates must be equal. So,
$$4 - 6s = -1 + 4t \\implies 5 - 6s = 4t$$
$$-2 + 8s = 1 + 2t \\implies -3 + 8s = 2t$$
$$5 - 4s = 4 - 2t \\implies t = 2s - \\frac{1}{2}$$
Substituting $t = 2s - \\frac{1}{2}$ into $-3 + 8s = 2t$,
$$-3 + 8s = 2\\left(2s - \\frac{1}{2}\\right)$$
$$-3 + 8s = 4s - 1$$
$$4s = 2$$
$$s = \\frac{1}{2}, \\, t = \\frac{1}{2}$$
Therefore, the two lines intersect at the point $(x, y, z) = (1, 2, 3)$.
$$l_1l_2 + m_1m_2 + n_1n_2 = (-6)(4) + (8)(2) + (-4)(-2) = -24 + 16 + 8 = 0$$
Since the lines intersect and $l_1l_2 + m_1m_2 + n_1n_2 = 0$, the lines $PQ$ and $RS$ are **perpendicular**.

(d) $\\langle PQ \\rangle = \\langle 2, 4, -6 \\rangle$ and $\\langle RS \\rangle = \\langle -4, -10, -8 \\rangle$.
Since these are not scalar multiples, the lines are not parallel.
Coordinates of the points on the lines are
$$PQ: (x, y, z) = (-3 + 2s, \\, -1 + 4s, \\, 6 - 6s)$$
$$RS: (x, y, z) = (-4t, \\, 6 - 10t, \\, 7 - 8t)$$
If the two lines intersect, then their coordinates must be equal. So,
$$-3 + 2s = -4t \\implies t = \\frac{3 - 2s}{4}$$
$$-1 + 4s = 6 - 10t \\implies 4s + 10t = 7$$
$$6 - 6s = 7 - 8t$$
Substituting $t = \\frac{3 - 2s}{4}$ into $4s + 10t = 7$,
$$4s + 10\\left(\\frac{3 - 2s}{4}\\right) = 7$$
$$8s + 15 - 10s = 14$$
$$-2s = -1$$
$$s = \\frac{1}{2}, \\, t = \\frac{1}{2}$$
Therefore, the two lines intersect at the point $(x, y, z) = (-2, 1, 3)$.
$$l_1l_2 + m_1m_2 + n_1n_2 = (2)(-4) + (4)(-10) + (-6)(-8) = -8 - 40 + 48 = 0$$
Since the lines intersect and $l_1l_2 + m_1m_2 + n_1n_2 = 0$, the lines $PQ$ and $RS$ are **perpendicular**.`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
