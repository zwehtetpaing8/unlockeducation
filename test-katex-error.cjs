const katex = require('katex');
try {
  katex.renderToString("\\begin{pmatrix} x \\\\", { throwOnError: false });
} catch (e) {
  console.log("Error:", e.message);
}
