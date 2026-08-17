const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf-8');
const lines = content.split('\n');
console.log(lines[lines.length - 2]);
console.log(lines[lines.length - 1]);
