const fs = require('fs');
console.log(fs.readFileSync('src/data/chapter4_content.ts', 'utf8').slice(-100));
