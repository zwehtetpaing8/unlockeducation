const katex = require('katex');

try {
  katex.renderToString("\\invalidCommand", { throwOnError: false, displayMode: true });
  console.log("No throw");
} catch(e) {
  console.log("Threw error:", e.message);
}
