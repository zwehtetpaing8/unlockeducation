const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
let start = content.indexOf('export function Chap4_Fig4');
let end = content.indexOf('export function Chap4_Fig5');
console.log(content.substring(start, end));
