const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');
// replace form feed character followed by 'rac' with '\\frac'
text = text.replace(/\x0Crac/g, '\\frac');
fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
