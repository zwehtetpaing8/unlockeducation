const katex = require('katex');
try {
  const html = katex.renderToString("\\vec{a} \\cdot \\vec{b}", { throwOnError: false });
  console.log("Success:", html.slice(0, 50));
} catch (e) {
  console.error("Error:", e);
}
