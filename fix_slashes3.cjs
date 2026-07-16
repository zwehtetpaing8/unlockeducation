const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');
text = text.replace(/\\\\\\frac/g, '\\\\frac');
text = text.replace(/\\\\\\langle/g, '\\\\langle');
text = text.replace(/\\\\\\rangle/g, '\\\\rangle');
text = text.replace(/\\\\\\sqrt/g, '\\\\sqrt');
text = text.replace(/\\\\\\quad/g, '\\\\quad');
text = text.replace(/\\\\\\,/g, '\\\\,');

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
