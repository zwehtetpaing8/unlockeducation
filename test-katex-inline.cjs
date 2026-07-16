const katex = require('katex');
try {
  katex.renderToString(`\\begin{aligned} x^2 - 2x &= -4 \\end{aligned}`, {displayMode: false});
  console.log("Inline OK");
} catch(e) {
  console.error("Inline ERROR:", e.message);
}
