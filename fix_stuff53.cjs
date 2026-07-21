const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// A single backslash followed by 'f', which isn't preceded by another backslash
let matches = code.match(/(?<!\\)\\frac/g);
console.log("Single backslash frac:", matches ? matches.length : 0);

let impliesMatches = code.match(/(?<!\\)\\implies/g);
console.log("Single backslash implies:", impliesMatches ? impliesMatches.length : 0);
