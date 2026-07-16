const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  if (formula.includes("i^1 &= i & i^5")) {
    console.log("MATCH FOUND! isBlock:", isBlock, "formula:", formula);
  }
}
