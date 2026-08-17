const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
let open = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '{') open++;
    if (line[j] === '}') open--;
  }
}
console.log('Open braces remaining:', open);
