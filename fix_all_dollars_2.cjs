const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Replace everything that looks like $..$\begin{aligned} with EXACTLY $$\begin{aligned}
content = content.replace(/[$]*\\begin\{aligned\}/g, '$$$$\\begin{aligned}');

// Replace everything that looks like \end{aligned}$..$ with EXACTLY \end{aligned}$$
content = content.replace(/\\end\{aligned\}[$]*/g, '\\end{aligned}$$$$');

fs.writeFileSync('src/data/chapters.ts', content);
