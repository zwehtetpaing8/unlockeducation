const katex = require('katex');
try {
  let html = katex.renderToString(`
\\begin{aligned}
\\text{(a)} && 3\\vec{a} &= 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix} \\\\
\\text{(h)} && 3\\vec{a} - \\vec{b} + \\vec{c} &= 3\\begin{pmatrix} 5 \\\\ -2 \\\\ -4 \\end{pmatrix}
\\end{aligned}
  `);
  console.log("Success with &&");
} catch(e) {
  console.log(e);
}
