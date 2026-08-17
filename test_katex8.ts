import { chapter5Content } from './src/data/chapter5_content.ts';
import katex from 'katex';

const regex = /(\$\$([\s\S]*?)\$\$)|(\$(.*?)\$)/g;
let match;
let hasError = false;
while ((match = regex.exec(chapter5Content)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  try {
    katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
  } catch(e) {
    hasError = true;
    console.log("Error rendering:", formula.substring(0, 50));
    console.log("Error message:", e.message);
  }
}
if (!hasError) console.log("All formulas successfully rendered in Ch5!");
