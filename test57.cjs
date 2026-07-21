const katex = require('katex');
try {
  let html = katex.renderToString(`
\\begin{aligned}
-2 &= m \\implies m = -2. \\\\\\\\
p &= 2m = 2(-2) = -4, \\\\\\\\
q &= 7m = 7(-2) = -14.
\\end{aligned}
  `);
  console.log("Success test57");
} catch(e) {
  console.log(e);
}
