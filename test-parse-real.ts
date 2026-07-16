import { chapters } from './src/data/chapters';
import katex from 'katex';

let hasError = false;
for (const chapter of chapters) {
  const lines = chapter.content.split('\n');
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
      try {
        katex.renderToString(formula, { displayMode: true, throwOnError: true });
      } catch(e) {
        console.error("ERROR in chapter", chapter.id, ":", e.message);
        hasError = true;
      }
    }
  }
}
if (!hasError) console.log("ALL SUCCESS!");
