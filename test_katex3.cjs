const katex = require('katex');
const formula = ` \\begin{aligned} \\overrightarrow{OD} &= \\overrightarrow{OA} + \\overrightarrow{OC} - \\overrightarrow{OB} \\\\ &= \\begin{pmatrix} 3 \\\\ 1 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 7 \\\\ 2 \\\\ 3 \\end{pmatrix} - \\begin{pmatrix} -1 \\\\ 1 \\\\ 5 \\end{pmatrix} \\\\ &= \\begin{pmatrix} 11 \\\\ 2 \\\\ 0 \\end{pmatrix}. \\end{aligned} `;
try {
  katex.renderToString(formula, { displayMode: false, throwOnError: true });
  console.log("Success with false");
} catch(e) {
  console.log("Error false:", e.message);
}
try {
  katex.renderToString(formula, { displayMode: true, throwOnError: true });
  console.log("Success with true");
} catch(e) {
  console.log("Error true:", e.message);
}
