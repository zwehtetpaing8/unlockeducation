const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// How many literal backslashes followed by frac?
let matches = code.match(/\\\\frac/g);
console.log("Double backslash frac:", matches ? matches.length : 0);

let matches2 = code.match(/[^\\]\\frac/g);
console.log("Single backslash frac:", matches2 ? matches2.length : 0);
