const fs = require('fs');
const content = fs.readFileSync('/tmp/test.tsx', 'utf8');
let open = 0;
let noStrings = content.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '""');
noStrings = noStrings.replace(/\/\/.*/g, '');
for (let j = 0; j < noStrings.length; j++) {
  if (noStrings[j] === '{') open++;
  if (noStrings[j] === '}') open--;
}
console.log('Open braces in block 2:', open);
