const fs = require('fs');
let content = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');
content = content.replace(/#### Useful Facts about Factorials\n#### Useful Facts about Factorials/g, '#### Useful Facts about Factorials');
fs.writeFileSync('src/data/chapter5_content.ts', content);
