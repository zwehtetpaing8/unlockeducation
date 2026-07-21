const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
let idx = 0;
while (true) {
  idx = code.indexOf('overrightarrow{AC}', idx + 1);
  if (idx === -1) break;
  console.log(code.substring(idx - 10, idx + 20));
}
