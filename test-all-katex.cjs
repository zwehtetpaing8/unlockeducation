const katex = require('katex');
const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Simulate runtime backslash evaluation:
content = content.replace(/\\\\/g, '\\');

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match;
let errors = 0;
while ((match = regex.exec(content)) !== null) {
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
    errors++;
  }
}
console.log("Total errors:", errors);
