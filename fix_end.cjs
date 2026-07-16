const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// There are a bunch of \end{aligned}$ where they should be \end{aligned}$$
// And maybe some $$\begin{aligned} issues
content = content.replace(/\\end\{aligned\}\$(?!\$)/g, '\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
