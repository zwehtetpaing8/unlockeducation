import { chapters } from './src/data/chapters';
import katex from 'katex';

for (const chapter of chapters) {
  const text = chapter.content;
  const lines = text.split('\n');

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
      i = j;

      const formula = mathBlock.replace(/^\$\$/, '').replace(/\$\$$/, '').trim();
      try {
        katex.renderToString(formula, { displayMode: true, throwOnError: true });
      } catch (e) {
        console.log('BLOCK ERROR (Chap ' + chapter.id + '):', formula);
        console.log(e.message);
      }
    }
  }

  const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const isBlock = match[1] !== undefined;
    const formula = isBlock ? match[2] : match[4];
    try {
      katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
    } catch (e) {
      console.log('INLINE ERROR (Chap ' + chapter.id + '):', formula);
      console.log(e.message);
    }
  }
}
