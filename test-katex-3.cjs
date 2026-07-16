const katex = require('katex');
const html = katex.renderToString(`\\begin{aligned}
  i^1 &= i & i^5 &= i^4i = i \\
  i^2 &= -1 & i^6 &= i^4i^2 = -1
\\end{aligned}`, {displayMode: true, throwOnError: false});
console.log(html);
