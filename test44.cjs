const katex = require('katex');
const html = katex.renderToString("\\\\overrightarrow{AC}");
console.log(html.includes("newline"));
console.log(html);
