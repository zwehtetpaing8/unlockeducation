const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');
text = text.replace('  height: unset !important;\n  max-width: unset !important;\n', '');
text = text.replace('  display: inline !important;\n  vertical-align: baseline !important;\n', '  display: inline-block !important;\n');
fs.writeFileSync('src/index.css', text);
