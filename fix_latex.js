const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
content = content.replace('$$\\begin{aligned}\ni^1 &= i & i^5 &= i^4i = i \\\\\ni^2 &= -1 & i^6 &= i^4i^2 = -1 \\\\\ni^3 &= i^2i = -i & i^7 &= i^4i^3 = -i \\\\\ni^4 &= i^2i^2 = 1 & i^8 &= i^4i^4 = 1\n\\end{aligned}$$', '$$\\\\begin{aligned}\ni^1 &= i & i^5 &= i^4i = i \\\\\\\\\ni^2 &= -1 & i^6 &= i^4i^2 = -1 \\\\\\\\\ni^3 &= i^2i = -i & i^7 &= i^4i^3 = -i \\\\\\\\\ni^4 &= i^2i^2 = 1 & i^8 &= i^4i^4 = 1\n\\\\end{aligned}$$');

// For the previous sum consecutive powers as well!
content = content.replace('$$\\begin{aligned}\ni^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\\\\ni^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\\\\ni^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.\n\\end{aligned}$$', '$$\\\\begin{aligned}\ni^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\\\\\\\\ni^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\\\\\\\\ni^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.\n\\\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
