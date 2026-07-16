const katex = require('katex');
try {
  katex.renderToString('\\begin{aligned} x=1 \\end{aligned}$', { displayMode: true, throwOnError: true });
  console.log("No error");
} catch(e) {
  console.log("Error:", e.message);
}
