const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Replace $$`, with $$\n`,
content = content.replace(/\$\$\`\,/g, '$$\n`,');

fs.writeFileSync('src/data/chapters.ts', content);
