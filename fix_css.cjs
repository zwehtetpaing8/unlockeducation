const fs = require('fs');

let text = fs.readFileSync('src/index.css', 'utf8');
text = text.replace('svg {\n  max-width: 100%;\n  height: auto;\n}', 'svg:not(.katex svg) {\n  max-width: 100%;\n  height: auto;\n}');
fs.writeFileSync('src/index.css', text);
