const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');

// Strip out any of my previous .katex svg rules to clean it up
text = text.replace(/\.katex svg \{[\s\S]*?\}/g, '');
text = text.replace(/svg:not\(\.katex svg\) \{[\s\S]*?\}/g, '');

text += `
.katex-html {
  overflow: visible !important;
}
.katex-inline {
  overflow: visible !important;
  display: inline-block;
}
/* Revert Tailwind reset for KaTeX SVGs */
.katex svg {
  height: unset !important;
  width: unset !important;
  max-width: none !important;
  display: inline !important;
  vertical-align: baseline !important;
}
`;
fs.writeFileSync('src/index.css', text);
