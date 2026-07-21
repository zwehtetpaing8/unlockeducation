const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');
text = text.replace(/\.katex svg \{[\s\S]*?\}/g, '');
text += `
.katex svg {
  display: inline !important;
  vertical-align: baseline !important;
  max-width: none !important;
  height: inherit !important;
  width: inherit !important;
}
`;
fs.writeFileSync('src/index.css', text);
