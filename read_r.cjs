const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
const startIdx = content.indexOf('export function Chap4_4_4_LineEq_Diag1() {');
const endIdx = content.indexOf('</svg>', startIdx);
const snippet = content.substring(startIdx, endIdx);
const lines = snippet.split('\n');
lines.forEach(line => {
  if (line.includes('\\vec{r}')) {
    console.log(line);
  } else if (line.includes('x="295"')) {
    console.log(line);
  }
});
