const fs = require('fs');
const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const text = eval(content.replace('export const chapter4Content = ', ''));
console.log(text.match(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/)[0]);
