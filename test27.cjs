const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('{text:"$\\');
console.log("Found at", idx);
if (idx !== -1) {
  const substr = code.substring(idx, idx + 20);
  console.log("Raw chars:", Array.from(substr).map(c => c === '\\' ? 'SLASH' : c));
}
