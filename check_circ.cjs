const fs = require('fs');
const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const text = eval(content.replace('export const chapter4Content = ', ''));
const match = text.match(/circ/g);
console.log(text.substring(text.indexOf('circ') - 5, text.indexOf('circ') + 5));
