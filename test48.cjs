const katex = require('katex');
try {
  console.log(katex.renderToString("\\overrightarrow{AC}", { throwOnError: true }));
} catch(e) {
  console.log("ERROR!", e.message);
}
