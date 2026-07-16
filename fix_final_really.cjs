const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Fix \begin{aligned} to have double backslash
content = content.replace(/\\?begin\{aligned\}/g, '\\\\begin{aligned}');

// Fix \end{aligned} to have double backslash
content = content.replace(/\\?end\{aligned\}/g, '\\\\end{aligned}');

fs.writeFileSync('src/data/chapters.ts', content);
