const katex = require('katex');
const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('$$') && (!line.endsWith('$$') || line === '$$')) {
      let mathBlock = line;
      let j = i + 1;
      while (j < lines.length) {
        mathBlock += '\n' + lines[j];
        if (lines[j].trim().endsWith('$$')) break;
        j++;
      }
      i = j;
      const formula = mathBlock.replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
      if (formula.includes('Inductive Hypothesis')) {
         console.log("TESTING FORMULA:");
         console.log(JSON.stringify(formula));
         try {
           katex.renderToString(formula, { displayMode: true, throwOnError: true });
           console.log("SUCCESS");
         } catch(e) {
           console.log("ERROR:", e.message);
         }
         break;
      }
  }
}
