const katex = require('katex');
const fs = require('fs');

const { chapter4Content } = require('./dist/server.cjs'); 
// wait, dist/server.cjs is compiled, maybe it doesn't export chapter4Content.
// I'll just regex extract $$...$$ and $...$ from chapter4_content.ts

const text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/gs;
let match;
while ((match = regex.exec(text)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  try {
    katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
  } catch (e) {
    console.log("Failed formula:");
    console.log(isBlock ? `$$${formula}$$` : `$${formula}$`);
    console.log("Error:", e.message);
  }
}
console.log("Done checking formulas.");
