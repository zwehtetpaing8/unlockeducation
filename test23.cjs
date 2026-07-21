const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('overrightarrow{AC}');
console.log(code.substring(idx - 10, idx + 20));
