const katex = require('katex');
const fs = require('fs');

const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// The React component parsing logic uses this regex:
const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  
  try {
    katex.renderToString(formula.trim(), {
      displayMode: isBlock,
      throwOnError: true, // We want to catch errors
    });
  } catch (e) {
    console.log("Error in formula:", formula);
    console.log(e.message);
    console.log("---");
  }
}
