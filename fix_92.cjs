const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
content = content.replace(/\\frac\{9\}\{2\}\$/g, '\\frac{9}{2}$$');
fs.writeFileSync('src/data/chapters.ts', content);
