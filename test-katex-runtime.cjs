const katex = require('katex');

// Simulate how it works in the browser
const chapter4Content = `$$ \\begin{aligned} \\vec{r} &= \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\\\ \\vec{r} &= \\frac{2(-\\hat{\\mathbf{i}} + 2\\hat{\\mathbf{j}} + 4\\hat{\\mathbf{k}}) + 1(2\\hat{\\mathbf{i}} + 3\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}})}{2 + 1} \\\\ &= \\frac{(-2\\hat{\\mathbf{i}} + 4\\hat{\\mathbf{j}} + 8\\hat{\\mathbf{k}}) + (2\\hat{\\mathbf{i}} + 3\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}})}{3} \\\\ &= \\frac{0\\hat{\\mathbf{i}} + 7\\hat{\\mathbf{j}} + 7\\hat{\\mathbf{k}}}{3} \\\\ &= \\frac{7}{3}\\hat{\\mathbf{j}} + \\frac{7}{3}\\hat{\\mathbf{k}}. \\end{aligned} $$`;

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match;
while ((match = regex.exec(chapter4Content)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  
  try {
    katex.renderToString(formula, {
      displayMode: isBlock,
      throwOnError: true,
    });
    console.log("Success!");
  } catch (e) {
    console.log("Error:", e.message);
  }
}
