const katex = require('katex');

const formula1 = `
\\begin{pmatrix} \\begin{aligned} 3 &- 2k \\\\\\\\ 2 &+ k \\\\\\\\ -2 &- k \\end{aligned} \\end{pmatrix}
`;

try {
  katex.renderToString(formula1, { displayMode: true, throwOnError: true });
  console.log("Formula 1 passed");
} catch (e) {
  console.error("Formula 1 failed", e.message);
}

const formula2 = `
\\begin{pmatrix} \\begin{aligned} 3 &- 2k \\\\ 2 &+ k \\\\ -2 &- k \\end{aligned} \\end{pmatrix}
`;

try {
  katex.renderToString(formula2, { displayMode: true, throwOnError: true });
  console.log("Formula 2 passed");
} catch (e) {
  console.error("Formula 2 failed", e.message);
}

