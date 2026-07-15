const fs = require('fs');
const katex = require('katex');

const chapter5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

const lines = chapter5.split('\n');
let errors = 0;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (line.startsWith('$$')) {
    let mathBlock = line;
    let j = i + 1;
    while (j < lines.length) {
      const nextLine = lines[j];
      mathBlock += '\n' + nextLine;
      if (nextLine.trim().endsWith('$$')) {
        break;
      }
      j++;
    }
    i = j; // skip forward
    const formula = mathBlock.replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
    try {
      katex.renderToString(formula, {
        displayMode: true,
        throwOnError: false,
      });
    } catch (e) {
      console.log(`Block throw at line ${i}:`, e.message);
      errors++;
    }
    continue;
  }

  const regex = /(?<!\$)\$([^$\n]+?)\$(?!\$)|(?<!\$)\$\$([^$\n]+?)\$\$(?!\$)/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    const isBlock = match[1] === undefined;
    const formula = isBlock ? match[2] : match[1];
    try {
      katex.renderToString(formula, {
        displayMode: isBlock,
        throwOnError: false,
      });
    } catch (e) {
      console.log(`Inline throw at line ${i}:`, e.message);
      errors++;
    }
  }
}
console.log('Total throws:', errors);
