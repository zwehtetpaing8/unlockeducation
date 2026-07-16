const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const startIdx = lines.findIndex(l => l.includes('#### 1. Parallel Lines'));
const endIdx = lines.findIndex(l => l.includes('##### Examples & Exercise 3.3'));

const newContent = `#### Parallel Lines
$$\\langle PQ \\rangle = \\langle OA \\rangle \\iff PQ \\parallel OA \\text{ and } PQ = OA$$
$$\\langle PQ \\rangle = k \\langle OA \\rangle \\iff PQ \\parallel OA$$
#### Skew Lines
In space, there are pairs of lines that are neither parallel nor intersect. These pairs of lines are called **skew lines**.
[DIAGRAM:SkewLinesDiagram]
#### Finding the Angle Between Two Lines
$$\\cos \\angle PAQ = \\frac{l_1 l_2 + m_1 m_2 + n_1 n_2}{\\sqrt{l_1^2 + m_1^2 + n_1^2} \\cdot \\sqrt{l_2^2 + m_2^2 + n_2^2}}$$
$$l_1 l_2 + m_1 m_2 + n_1 n_2 = 0 \\implies \\cos \\angle PAQ = 0 \\implies \\angle PAQ = 90^{\\circ}$$
#### Perpendicular Lines
Two lines are perpendicular if and only if they intersect and $l_1 l_2 + m_1 m_2 + n_1 n_2 = 0$ for any directed values $\\langle l_1, m_1, n_1 \\rangle$ and $\\langle l_2, m_2, n_2 \\rangle$ of the lines.
---`;

lines.splice(startIdx, endIdx - startIdx, ...newContent.split('\n'));
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
