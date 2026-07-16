const fs = require('fs');
let lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');

const fixC = `$$l_1l_2 + m_1m_2 + n_1n_2 = (-6)(4) + (8)(2) + (-4)(-2)$$
$$= -24 + 16 + 8$$
$$= 0$$`;

const fixD = `$$l_1l_2 + m_1m_2 + n_1n_2 = (2)(-4) + (4)(-10) + (-6)(-8)$$
$$= -8 - 40 + 48$$
$$= 0$$`;

for (let i = 2580; i < 2650; i++) {
  if (lines[i].includes('(-6)(4) + (8)(2) + (-4)(-2) = -24 + 16 + 8 = 0')) {
    lines[i] = fixC;
  }
  if (lines[i].includes('(2)(-4) + (4)(-10) + (-6)(-8) = -8 - 40 + 48 = 0')) {
    lines[i] = fixD;
  }
}
fs.writeFileSync('src/data/chapters.ts', lines.join('\n'), 'utf8');
