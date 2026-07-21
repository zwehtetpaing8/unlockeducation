const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('{text:"$\\');
console.log(code.substring(idx, idx + 30));
