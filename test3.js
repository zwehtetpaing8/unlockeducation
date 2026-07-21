const fs = require('fs');
let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');
const lines = text.split('\n');
console.log(lines[6300]);
console.log(lines[6307]);
