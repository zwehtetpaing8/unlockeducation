const fs = require('fs');
let text = fs.readFileSync('src/data/chapters.ts', 'utf8');

text = text.replace(/\\\\\\frac/g, '\\\\frac');
text = text.replace(/\\\\\\quad/g, '\\\\quad');
text = text.replace(/\\\\\\langle/g, '\\\\langle');
text = text.replace(/\\\\\\rangle/g, '\\\\rangle');
text = text.replace(/\\\\\\,/g, '\\\\,');
text = text.replace(/\\\\\\sqrt/g, '\\\\sqrt');
text = text.replace(/\\\\\\left/g, '\\\\left');
text = text.replace(/\\\\\\right/g, '\\\\right');

fs.writeFileSync('src/data/chapters.ts', text, 'utf8');
