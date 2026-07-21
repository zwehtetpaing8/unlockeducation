const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');
const idx = code.indexOf('text:"$\\overrightarrow{AC}$"');
if (idx !== -1) {
  console.log("Found!");
  const substr = code.substring(idx, idx + 30);
  console.log("Raw chars:", Array.from(substr).map(c => c.charCodeAt(0)));
  console.log("String:", substr);
} else {
  console.log("Not found with double backslash");
  const idx2 = code.indexOf('text:"$\overrightarrow{AC}$"');
  if (idx2 !== -1) {
    console.log("Found with single backslash!");
    const substr = code.substring(idx2, idx2 + 30);
    console.log("Raw chars:", Array.from(substr).map(c => c.charCodeAt(0)));
    console.log("String:", substr);
  }
}
