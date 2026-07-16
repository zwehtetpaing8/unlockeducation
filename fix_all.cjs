const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

// Replace any $\`, with $$\n`,
// And any $$\`, with $$\n`,
content = content.replace(/\$+\`\,/g, '$$\n`,');

fs.writeFileSync('src/data/chapters.ts', content);
