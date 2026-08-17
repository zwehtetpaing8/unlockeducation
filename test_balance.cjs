const fs = require('fs');
const lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');
let sum = 0;
for(let line of lines) {
  const c = (line.match(/\$\$/g) || []).length;
  sum += c;
  if (c % 2 !== 0) console.log(line);
}
console.log('Total $$ count:', sum);
