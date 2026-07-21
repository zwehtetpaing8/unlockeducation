const katex = require('katex');
try {
  let html = katex.renderToString(`
\\begin{pmatrix} \\begin{aligned} 1 &- 3k \\\\\\\\ 2 &+ 4k \\\\\\\\ 7 &+ 2k \\end{aligned} \\end{pmatrix}
  `);
  console.log("Rendered with aligned");
} catch(e) {
  console.log(e);
}
