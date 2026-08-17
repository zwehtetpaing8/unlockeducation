const fs = require('fs');
const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const idx = content.indexOf('Planes in Three Dimensions');
console.log('Index:', idx);
if (idx !== -1) {
  console.log('Context:\n', content.substring(Math.max(0, idx - 200), idx + 200));
}
