const katex = require('katex');
const formula = ` \\begin{aligned} x &= a_1 + tb_1, \\\\ y &= a_2 + tb_2, \\quad t \\in \\mathbb{R}. \\\\ z &= a_3 + tb_3, \\end{aligned} `;
try {
  katex.renderToString(formula, { displayMode: true, throwOnError: true });
  console.log("Success");
} catch(e) {
  console.log("Error:", e.message);
}
