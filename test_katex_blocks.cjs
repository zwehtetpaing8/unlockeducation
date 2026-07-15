const fs = require('fs');
const katex = require('katex');

const chapter5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

const lines = chapter5.split('\n');
let i = 0;
while (i < lines.length) {
  let line = lines[i].trim();
  if (line.startsWith('$$')) {
    let mathBlock = line;
    let singleLine = line.endsWith('$$') && line.length > 2;
    if (!singleLine) {
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        mathBlock += '\n' + nextLine;
        if (nextLine.trim().endsWith('$$')) {
          break;
        }
        j++;
      }
      i = j;
    }
    const formula = mathBlock.replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
    try {
      katex.renderToString(formula, { displayMode: true, throwOnError: false });
    } catch (e) {
      console.log(`Error on block math at line ${i}:`, formula);
    }
  }
  i++;
}
console.log('Done checking blocks.');
