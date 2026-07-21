const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');

const regex = /`([^`]*?collinear if the vectors[^`]*?)`/;
const match = code.match(regex);
if (match) {
  const evaluated = eval("`" + match[1] + "`");
  const idx = evaluated.indexOf('collinear if the vectors');
  const substr = evaluated.substring(idx + 25, idx + 45);
  console.log(substr);
  console.log("Chars:", Array.from(substr).map(c => c === '\\' ? 'SLASH' : c).join(' '));
}
