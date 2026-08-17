const katex = require('katex');
const fs = require('fs');

const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const regex = /(\$\$([\s\S]*?)\$\$)|(\$(.*?)\$)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  try {
    katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
  } catch(e) {
    console.log("Error rendering:", formula.substring(0, 50));
    console.log("Error message:", e.message);
  }
}
