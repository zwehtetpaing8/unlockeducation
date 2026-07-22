const katex = require('katex');

try {
  katex.renderToString("\\vec{a}\\", { displayMode: false, throwOnError: true });
} catch(e) {
  console.log("Error:", e.message);
}
