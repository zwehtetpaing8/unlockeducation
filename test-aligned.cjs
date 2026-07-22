const katex = require('katex');
try {
  katex.renderToString("\\begin{aligned} a &= b \\end{aligned}", { displayMode: true });
  console.log("Success aligned");
} catch (e) {
  console.log("Error aligned:", e.message);
}

try {
  katex.renderToString("\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}", { displayMode: true });
  console.log("Success aligned multi");
} catch (e) {
  console.log("Error aligned multi:", e.message);
}
