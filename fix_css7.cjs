const fs = require('fs');
let text = fs.readFileSync('src/index.css', 'utf8');

text = text.replace(/\.katex-html \{[\s\S]*?\}/g, '');
text = text.replace(/\.katex-inline \{[\s\S]*?\}/g, '');
text = text.replace(/\/\* Revert Tailwind reset for KaTeX SVGs \*\/[\s\S]*?\.katex svg \{[\s\S]*?\}/g, '');
text = text.replace(/\/\* Fix KaTeX display mode overflow clipping on mobile \*\/[\s\S]*?\.katex-display > \.katex \{[\s\S]*?\}/g, '');
text += `
/* Fix KaTeX display mode overflow clipping on mobile */
.katex-block, .katex-display {
  overflow-x: auto;
  overflow-y: visible;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  max-width: 100%;
}
.katex-display > .katex {
  display: inline-block;
  text-align: center;
  min-width: 100%;
}
.katex-inline {
  padding-top: 0.3em;
  padding-bottom: 0.2em;
}
`;
fs.writeFileSync('src/index.css', text);
