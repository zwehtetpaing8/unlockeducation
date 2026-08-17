const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
content = content.replace('\n`;export const chapter4_examples = `', '\n');
fs.writeFileSync('src/data/chapter4_content.ts', content);
