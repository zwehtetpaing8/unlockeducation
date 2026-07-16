const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Use replacer function so `$$` is not unescaped
content = content.replace(/\$*\\*\$*\\begin\{aligned\}/g, () => '$$\\begin{aligned}');

// Use replacer function
content = content.replace(/\\end\{aligned\}\\*\$+/g, () => '\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
