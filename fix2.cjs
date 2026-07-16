const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
lines[2605] = '    $$5-4t = 5-4(\\\\frac{1}{8}) = \\\\frac{9}{2}$$';
lines[2606] = '    Since $-1 \\\\neq \\\\frac{9}{2}$, the lines are **skew**.';
lines[2607] = '*   **(c)** $\\\\langle PQ \\\\rangle = \\\\langle -6, 8, -4 \\\\rangle, \\\\, \\\\langle RS \\\\rangle = \\\\langle 4, 2, -2 \\\\rangle$. Not parallel.';
lines[2608] = '    $$PQ: (4-6s, -2+8s, 5-4s)$$';
lines[2609] = '    $$RS: (-1+4t, 1+2t, 4-2t)$$';
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
