const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');
const splitted = latex.split('{"$x$"}');
console.log(splitted.length);
