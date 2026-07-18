const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');
const idx = latex.indexOf('{"$x$"}');
console.log(idx);
