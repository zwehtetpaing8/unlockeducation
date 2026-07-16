const katex = require('katex');
try {
  katex.renderToString(`\\begin{aligned}
  i^0 + i^1 + i^2 + i^3 &= 1 + i - 1 - i = 0, \\\\
  i^1 + i^2 + i^3 + i^4 &= i - 1 - i + 1 = 0, \\\\
  i^2 + i^3 + i^4 + i^5 &= -1 - i + 1 + i = 0.
\\end{aligned}`, {displayMode: true});
  console.log("Block 1 OK");
} catch(e) { console.error(e); }

try {
  katex.renderToString(`\\begin{aligned}
  i^1 &= i & i^5 &= i^4i = i \\\\
  i^2 &= -1 & i^6 &= i^4i^2 = -1 \\\\
  i^3 &= i^2i = -i & i^7 &= i^4i^3 = -i \\\\
  i^4 &= i^2i^2 = 1 & i^8 &= i^4i^4 = 1
\\end{aligned}`, {displayMode: true});
  console.log("Block 2 OK");
} catch(e) { console.error(e); }
