const katex = require('katex');
const formula = "\\begin{aligned}   \\text{L.H.S.} &= 1 + 3 + 3^2 + \\dots + 3^{k-1} + 3^k \\\\   &= \\frac{3^k - 1}{2} + 3^k \\quad [\\text{by Inductive Hypothesis}] \\\\   &= \\frac{3^k - 1 + 2 \\cdot 3^k}{2} \\\\   &= \\frac{3^k(1 + 2) - 1}{2} \\\\   &= \\frac{3 \\cdot 3^k - 1}{2} \\\\   &= \\frac{3^{k+1} - 1}{2} \\\\   &= \\text{R.H.S.}   \\end{aligned}";
try {
katex.renderToString(formula, { displayMode: true, throwOnError: true });
console.log("SUCCESS");
} catch(e) { console.log(e.message); }
