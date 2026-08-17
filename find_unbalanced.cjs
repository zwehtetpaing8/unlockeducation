const fs = require('fs');
const lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');

let inBlock = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const count = (line.match(/\$\$/g) || []).length;
  
  if (count % 2 !== 0) {
    inBlock = !inBlock;
    console.log(`Line ${i + 1}: ${inBlock ? 'START' : 'END'} block. Content: ${line}`);
  }
}
