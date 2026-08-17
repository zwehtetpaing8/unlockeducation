const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const startIdx = content.indexOf('export function Chap4_4_4_LineEq_Diag1() {');
// The function ends with a closing brace. We can find the end of the return statement
const endIdx = content.indexOf('export function Chap4', startIdx + 10);
const snippet = content.substring(startIdx, endIdx);
console.log(snippet);

