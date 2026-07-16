const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
content = content.replace(/\$\$\./g, '$$');
fs.writeFileSync('src/data/chapters.ts', content);
