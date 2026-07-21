const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Replace 8 backslashes with 4 backslashes
code = code.replace(/\\\\\\\\\\\\\\\\/g, "\\\\\\\\");

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Replaced 8 backslashes with 4 backslashes");
