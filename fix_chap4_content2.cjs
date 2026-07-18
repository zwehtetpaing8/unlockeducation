const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Replace the first occurrence of Chap4_Fig4 with Chap4_Fig3
content = content.replace('[DIAGRAM:Chap4_Fig4]', '[DIAGRAM:Chap4_Fig3]');

fs.writeFileSync('src/data/chapter4_content.ts', content);
