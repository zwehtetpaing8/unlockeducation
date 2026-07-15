const fs = require('fs');
let content = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');
content = content.replace(/implies 0! = 1\$\)\.#### Useful Facts about Factorials#### Useful Facts about Factorials/g, 'implies 0! = 1$).\n\n#### Useful Facts about Factorials');
fs.writeFileSync('src/data/chapter5_content.ts', content);
