const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('{text:"$\\');
console.log(idx !== -1 ? "FOUND DOUBLE BACKSLASH" : "NOT FOUND");
const idx2 = code.indexOf('{text:"$\\overrightarrow');
console.log(idx2 !== -1 ? "FOUND DOUBLE BACKSLASH WITH OVERRIGHTARROW" : "NOT FOUND");
const idx3 = code.indexOf('{text:"$\overrightarrow');
console.log(idx3 !== -1 ? "FOUND SINGLE BACKSLASH WITH OVERRIGHTARROW" : "NOT FOUND");
