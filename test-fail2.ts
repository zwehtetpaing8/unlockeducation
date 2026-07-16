import { chapters } from './src/data/chapters';
import katex from 'katex';

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
        console.error("FAILED BLOCK:");
        console.error(mathBlock);
        console.error("ERROR:", e.message);
      }
    }
  }
}
