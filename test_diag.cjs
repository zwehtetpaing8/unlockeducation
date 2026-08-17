const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const startIdx = content.indexOf('export function Chap4_4_4_LineEq_Diag1() {');
console.log(content.substring(startIdx, startIdx + 3000));
