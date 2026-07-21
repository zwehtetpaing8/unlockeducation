const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('parallel');
if (idx !== -1) {
  const substr = code.substring(idx - 25, idx + 25);
  console.log(substr);
  console.log("Raw:", Array.from(substr).map(c => c === '\\' ? 'SLASH' : c).join(''));
}
