const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');

const regex = /`([^`]*?collinear if the vectors[^`]*?)`/;
const match = code.match(regex);
if (match) {
  const evaluated = eval("`" + match[1] + "`");
  const idx = evaluated.indexOf('collinear if the vectors');
  console.log(evaluated.substring(idx, idx + 200));
}
