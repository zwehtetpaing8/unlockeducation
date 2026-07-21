const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');
text = text.replace(/\.katex svg \{[\s\S]*?\}/g, '');
text += `
.katex svg {
  height: auto !important;
  width: auto !important;
  max-width: none !important;
  display: inline !important;
  vertical-align: baseline !important;
}
`;
fs.writeFileSync('src/index.css', text);
