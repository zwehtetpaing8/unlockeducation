const katex = require('katex');
// simulating runtime by eval-ing the file
const fs = require('fs');
const code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
const text = code.replace(/export const chapter4Content = `/, '').replace(/`;$/, '');
const evaluated = eval('`' + text + '`');

const regex = /(\$\$([\s\S]*?)\$\$)|(\$(.*?)\$)/g;
let match;
while ((match = regex.exec(evaluated)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  try {
    katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
  } catch(e) {
    console.log("Runtime Error rendering:", formula.substring(0, 50));
    console.log("Error message:", e.message);
  }
}
console.log("Done checking runtime KaTeX.");
