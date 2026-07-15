const fs = require('fs');
const katex = require('katex');

const chapter5 = fs.readFileSync('src/data/chapter5_content.ts', 'utf8');

const mathBlocks = [];
let currentIndex = 0;

// extract all block math $$ ... $$
const blockRegex = /\$\$([\s\S]*?)\$\$/g;
let match;
while ((match = blockRegex.exec(chapter5)) !== null) {
  mathBlocks.push(match[1].trim());
}

// extract all inline math $ ... $
const inlineRegex = /(?<!\$)\$([^$\n]+?)\$(?!\$)/g;
while ((match = inlineRegex.exec(chapter5)) !== null) {
  mathBlocks.push(match[1].trim());
}

console.log(`Found ${mathBlocks.length} math blocks.`);

let errors = 0;
for (const formula of mathBlocks) {
  try {
    katex.renderToString(formula, { throwOnError: true });
  } catch (e) {
    console.log('Error rendering:');
    console.log(formula);
    console.log(e.message);
    errors++;
  }
}
console.log(`Finished with ${errors} errors.`);
