const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// I want to just replace all variations of $$..$\begin with exactly $$\begin
content = content.replace(/\$*\\*\$*\\begin\{aligned\}/g, '$$\\begin{aligned}');

// I want to replace all variations of \end{aligned}$$...$ with exactly \end{aligned}$$
content = content.replace(/\\end\{aligned\}\\*\$+/g, '\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
