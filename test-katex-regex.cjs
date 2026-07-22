const katex = require('katex');
const fs = require('fs');

const text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match;
while ((match = regex.exec(text)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  
  try {
    katex.renderToString(formula, {
      displayMode: isBlock,
      throwOnError: true,
    });
  } catch (e) {
    console.log("Error in:", formula);
    console.log(e.message);
  }
}
