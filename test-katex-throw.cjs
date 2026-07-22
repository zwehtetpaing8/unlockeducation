const katex = require('katex');

try {
  katex.renderToString("\\begin{aligned} a &= b \\\\ c &= d", { throwOnError: false, displayMode: true });
  console.log("No throw");
} catch(e) {
  console.log("Threw error:", e.message);
}
