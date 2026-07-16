const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
lines[2610] = '    $$4 - 6s = -1 + 4t \\\\implies 5 - 6s = 4t$$';
lines[2611] = '    $$-2 + 8s = 1 + 2t \\\\implies -3 + 8s = 2t$$';
lines.splice(2612, 0, '    $$5 - 4s = 4 - 2t \\\\implies t = 2s - \\\\frac{1}{2}$$');
lines[2613] = '    Substituting $t = 2s - \\\\frac{1}{2}$ into $-3 + 8s = 2t$, we get $s = \\\\frac{1}{2}$, $t = \\\\frac{1}{2}$.';
lines[2614] = '    Therefore, the two lines intersect at the point $(1, 2, 3)$.';
lines[2615] = '    $$l_1l_2 + m_1m_2 + n_1n_2 = (-6)(4) + (8)(2) + (-4)(-2) = -24 + 16 + 8 = 0$$';
lines[2616] = '    Since the lines intersect and the dot product is $0$, they are **perpendicular**.';

// For (d):
// P(-3, -1, 6), Q(-1, 3, 0), R(0, 6, 7), S(-4, -4, -1)
// <PQ> = <2, 4, -6>, <RS> = <-4, -10, -8>
// PQ: (x,y,z) = (-3+2s, -1+4s, 6-6s)
// RS: (x,y,z) = (-4t, 6-10t, 7-8t)
// -3 + 2s = -4t => 3 - 2s = 4t => t = (3 - 2s) / 4
// -1 + 4s = 6 - 10t => 4s + 10t = 7
// 6 - 6s = 7 - 8t => ...
lines[2618] = '    $$PQ: (x, y, z) = (-3+2s, \\\\, -1+4s, \\\\, 6-6s)$$';
lines[2619] = '    $$RS: (x, y, z) = (-4t, \\\\, 6-10t, \\\\, 7-8t)$$';
lines.splice(2620, 0, '    $$-3 + 2s = -4t \\\\implies t = \\\\frac{3 - 2s}{4}$$');
lines.splice(2621, 0, '    $$-1 + 4s = 6 - 10t \\\\implies 4s + 10t = 7$$');
lines.splice(2622, 0, '    $$6 - 6s = 7 - 8t$$');
lines[2623] = '    Substituting $t = \\\\frac{3 - 2s}{4}$ into $4s + 10t = 7$, we get $s = \\\\frac{1}{2}$, $t = \\\\frac{1}{2}$.';
lines[2624] = '    Therefore, the two lines intersect at the point $(-2, 1, 3)$.';
lines[2625] = '    $$l_1l_2 + m_1m_2 + n_1n_2 = (2)(-4) + (4)(-10) + (-6)(-8) = -8 - 40 + 48 = 0$$';
lines[2626] = '    Since the lines intersect and the dot product is $0$, they are **perpendicular**.';

fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
