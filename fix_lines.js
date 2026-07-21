const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');

// 677 to 681
lines.splice(676, 5, '$$ 3(1-t) + t(-3) + (-2)(4) = 0 \\implies 3 - 6t - 8 = 0 \\implies 6t = -5 \\implies t = -\\frac{5}{6}. $$');

fs.writeFileSync('src/data/chapter4_content.ts', lines.join('\n'));
