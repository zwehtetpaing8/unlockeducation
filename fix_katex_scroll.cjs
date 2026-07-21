const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('overflow-y: visible;', 'overflow-y: hidden;');

fs.writeFileSync('src/index.css', css);
