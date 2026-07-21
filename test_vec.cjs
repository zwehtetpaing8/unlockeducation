const katex = require('katex');
try {
  console.log(katex.renderToString("\\vec{a}", { throwOnError: false }));
} catch(e) {
  console.log("error", e.message);
}
