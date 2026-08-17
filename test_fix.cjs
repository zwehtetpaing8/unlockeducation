const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const tail = content.slice(content.indexOf('###### Example 18'));
const idx = tail.indexOf('\\n');
console.log(tail.slice(idx - 20, idx + 20));
