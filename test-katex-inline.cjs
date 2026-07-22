const katex = require('katex');
const formula = "\\begin{aligned} \\vec{r} &= \\frac{m\\vec{b} + n\\vec{a}}{m + n} \\\\ \\vec{r} &= \\frac{2(-\\hat{\\mathbf{i}} + 2\\hat{\\mathbf{j}} + 4\\hat{\\mathbf{k}}) + 1(2\\hat{\\mathbf{i}} + 3\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}})}{2 + 1} \\\\ &= \\frac{(-2\\hat{\\mathbf{i}} + 4\\hat{\\mathbf{j}} + 8\\hat{\\mathbf{k}}) + (2\\hat{\\mathbf{i}} + 3\\hat{\\mathbf{j}} - \\hat{\\mathbf{k}})}{3} \\\\ &= \\frac{0\\hat{\\mathbf{i}} + 7\\hat{\\mathbf{j}} + 7\\hat{\\mathbf{k}}}{3} \\\\ &= \\frac{7}{3}\\hat{\\mathbf{j}} + \\frac{7}{3}\\hat{\\mathbf{k}}. \\end{aligned}";

try {
  katex.renderToString(formula, { displayMode: true, throwOnError: true });
  console.log("Success with displayMode: true");
} catch(e) {
  console.log("Error displayMode: true ->", e.message);
}

try {
  katex.renderToString(formula, { displayMode: false, throwOnError: true });
  console.log("Success with displayMode: false");
} catch(e) {
  console.log("Error displayMode: false ->", e.message);
}
