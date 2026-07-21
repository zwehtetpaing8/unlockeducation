const katex = require('katex');
try {
  console.log(katex.renderToString("overrightarrow{AB} \\parallel overrightarrow{AC}", { throwOnError: false }));
} catch(e) {
  console.log("ERROR", e.message);
}
