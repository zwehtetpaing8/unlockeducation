const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const i = content.indexOf('Example 3');
console.log(JSON.stringify(content.substring(i - 40, i + 20)));

const j = content.indexOf('Parallel Vectors');
console.log(JSON.stringify(content.substring(j - 40, j + 20)));

const k = content.indexOf('Example 6');
console.log(JSON.stringify(content.substring(k - 40, k + 20)));
