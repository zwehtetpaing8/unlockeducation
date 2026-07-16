const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(
  '$$\\langle (3+2k) - (-4), \\, (-1+3k) - 7, \\, (1-k) - (-3) \\rangle = \\langle 7+2k, \\, -8+3k, \\, 4-k \\rangle$$\nSince they are perpendicular:\n$$2(7 + 2k) + 3(-8 + 3k) + (-1)(4 - k) = 0$$\n$$14 + 4k - 24 + 9k - 4 + k = 0$$\n$$-14k = -14$$\n$$k = 1$$',
  '$$\\langle -4 - (3+2k), \\, 7 - (-1+3k), \\, -3 - (1-k) \\rangle = \\langle -7-2k, \\, 8-3k, \\, -4+k \\rangle$$\nfor some real number $k$.\nIf two lines are perpendicular, then\n$$2(-7 - 2k) + 3(8 - 3k) + (-1)(-4 + k) = 0$$\n$$-14 - 4k + 24 - 9k + 4 - k = 0$$\n$$14k = 14$$\n$$k = 1$$'
);
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
