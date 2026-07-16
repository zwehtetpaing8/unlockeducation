const fs = require('fs');
const lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
lines[2606] = '    $$5-4t = 5-4(\\\\frac{1}{8}) = \\\\frac{9}{2}$$';
lines[2607] = '    Since $-1 \\\\neq \\\\frac{9}{2}$, the lines are **skew**.';
// also fix if they got shifted
for (let i = 2603; i <= 2610; i++) {
  console.log(i, lines[i]);
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
