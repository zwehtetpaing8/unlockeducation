const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
const startIdx = content.indexOf('export function Chap4_4_4_LineEq_Diag1() {');
const endIdx = content.indexOf('</svg>', startIdx);
console.log(content.substring(startIdx, endIdx + 6));
