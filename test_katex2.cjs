const katex = require('katex');

const formula1 = `\\begin{pmatrix} \\begin{aligned} 3 &- 2k \\\\\\\\ 2 &+ k \\\\\\\\ -2 &- k \\end{aligned} \\end{pmatrix}`;

const html = katex.renderToString(formula1, { displayMode: true, throwOnError: false });
console.log(html);
