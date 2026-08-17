const fs = require('fs');
const file = 'src/data/chapter4_content.ts';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

fs.writeFileSync(file, content);
