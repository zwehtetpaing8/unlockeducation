const fs = require('fs');
let content = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');
const search = 'implies 0! = 1$).';
const idx = content.indexOf(search);
if (idx !== -1) {
  const nextText = content.substring(idx, idx + 150);
  console.log("Found text:");
  console.log(nextText);
  // Just use regex to replace everything from "implies 0! = 1" up to "1. **Recursive form:**"
  content = content.replace(/implies 0! = 1\$\)[\s\S]*?1\. \*\*Recursive form:\*\*/, 'implies 0! = 1$).\n\n#### Useful Facts about Factorials\n\n1. **Recursive form:**');
  fs.writeFileSync('src/data/chapter5_content.ts', content);
  console.log("Replaced!");
}
