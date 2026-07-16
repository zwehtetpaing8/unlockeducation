const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Fix start
content = content.replace(/\$*\\begin\{aligned\}/g, '$$\\begin{aligned}');

// Fix end
content = content.replace(/\\end\{aligned\}\$*/g, '\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
