const katex = require('katex');
try {
  katex.renderToString('\\begin{aligned} x &= 1 \\end{aligned}', { displayMode: true, throwOnError: true });
  console.log("SUCCESS");
} catch(e) {
  console.log("ERROR:", e.message);
}
