const fs = require('fs');
const katex = require('katex');

let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('$$') && (!line.endsWith('$$') || line === '$$')) {
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
        const html = katex.renderToString(formula, {
          displayMode: true,
          throwOnError: true, // throw to catch
        });
        console.log("OK mathBlock: ", formula.substring(0, 30));
      } catch (e) {
        console.error("ERROR in mathBlock:", formula);
        console.error(e.message);
      }
  }
}
