const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');

text = text.replace(/\.katex svg \{[\s\S]*?\}/g, '');

text += `
.katex svg {
  height: revert !important;
  width: revert !important;
  max-width: none !important;
  display: inline-block !important;
  vertical-align: baseline !important;
}
`;
fs.writeFileSync('src/index.css', text);
