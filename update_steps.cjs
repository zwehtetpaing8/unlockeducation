const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(
  /Substituting \$t = 2s - \\\\frac\{1\}\{2\}\$ into \$-3 \+ 8s = 2t\$, we get \$s = \\\\frac\{1\}\{2\}\$, \$t = \\\\frac\{1\}\{2\}\$\./,
  'Substituting $t = 2s - \\\\frac{1}{2}$ into $-3 + 8s = 2t$,\\n    $$-3 + 8s = 2\\left(2s - \\\\frac{1}{2}\\right)$$\\n    $$-3 + 8s = 4s - 1$$\\n    $$4s = 2$$\\n    $$s = \\\\frac{1}{2}, \\\\, t = \\\\frac{1}{2}$$'
);

text = text.replace(
  /Substituting \$t = \\\\frac\{3 - 2s\}\{4\}\$ into \$4s \+ 10t = 7\$, we get \$s = \\\\frac\{1\}\{2\}\$, \$t = \\\\frac\{1\}\{2\}\$\./,
  'Substituting $t = \\\\frac{3 - 2s}{4}$ into $4s + 10t = 7$,\\n    $$4s + 10\\left(\\frac{3 - 2s}{4}\\right) = 7$$\\n    $$8s + 15 - 10s = 14$$\\n    $$-2s = -1$$\\n    $$s = \\\\frac{1}{2}, \\\\, t = \\\\frac{1}{2}$$'
);

text = text.replace(
  /\$\$14 \+ 4k - 24 \+ 9k - 4 \+ k = 0 \\\\implies 14k - 14 = 0 \\\\implies k = 1\$\$/,
  '$$14 + 4k - 24 + 9k - 4 + k = 0$$\\n$$-14k = -14$$\\n$$k = 1$$' // wait, the screenshot has 14k = 14
);

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
