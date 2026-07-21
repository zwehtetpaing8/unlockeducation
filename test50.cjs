const fs = require('fs');
let code = fs.readFileSync('src/data/chapters.ts', 'utf8');
// let's just log it in node
console.log(code.includes('overrightarrow'));
