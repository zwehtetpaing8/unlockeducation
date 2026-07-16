const katex = require('katex');
const ts = require('typescript');
const fs = require('fs');

const code = fs.readFileSync('./src/data/chapters.ts', 'utf8');
const result = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
eval(result.outputText); // gets chapters

const chapter = chapters[2]; // Chapter 3
const text = chapter.content;

// 2. Format custom content line-by-line to preserve structure and style headings/cards
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
      console.log('BLOCK ERROR:', formula);
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
    console.log('INLINE ERROR:', formula);
    console.log(e.message);
  }
}
