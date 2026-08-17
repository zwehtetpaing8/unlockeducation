const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const startIdx = content.indexOf('export function Chap4_4_4_LineEq_Diag1() {');
const endIdx = content.indexOf('export function Chap4_Fig5()');

const snippet = content.substring(startIdx, endIdx);
const lines = snippet.split('\n');

lines.forEach((line, i) => {
  if (line.includes('$\\vec{a}$')) {
    console.log("LINE:", i);
    console.log(lines[i-2]);
    console.log(lines[i-1]);
    console.log(line);
    console.log(lines[i+1]);
  }
});
