const fs = require('fs');
const lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');
let inBlock = false;
for(let i=0; i<lines.length; i++) {
  const c = (lines[i].match(/\$\$/g) || []).length;
  if (c % 2 !== 0) {
    inBlock = !inBlock;
  }
}
console.log('In block at end:', inBlock);
