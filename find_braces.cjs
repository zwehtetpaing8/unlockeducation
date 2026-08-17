const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
let open = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // skip string literals naively? No, that's the problem! 
  // Braces inside strings are counted!
  // Let's strip strings!
  let noStrings = line.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '""');
  // wait, also remove comments
  noStrings = noStrings.replace(/\/\/.*/, '');
  
  for (let j = 0; j < noStrings.length; j++) {
    if (noStrings[j] === '{') open++;
    if (noStrings[j] === '}') open--;
  }
  if (line.startsWith('function ') || line.startsWith('export function ')) {
    if (open !== 0) console.log(`Unbalanced before line ${i+1}: depth ${open}`);
  }
}
