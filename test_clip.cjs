const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.katex-inline')) {
  css += '\n.katex-inline { padding-top: 0.3em; padding-bottom: 0.2em; }\n';
  fs.writeFileSync('src/index.css', css);
}
console.log("Added inline padding to css");
