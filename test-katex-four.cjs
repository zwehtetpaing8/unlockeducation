const katex = require('katex');

const formula = "\\begin{aligned} a &= b \\\\\\\\ c &= d \\end{aligned}";
try {
  katex.renderToString(formula, { displayMode: true, throwOnError: true });
  console.log("Success!");
} catch (e) {
  console.log("Error:", e.message);
}
