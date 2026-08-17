const katex = require('katex');
const formulas = [
  "\\vec{a} = \\overrightarrow{OA}",
  "\\vec{r} = \\overrightarrow{OR}",
  "\\overrightarrow{AR} = t\\vec{b}",
  "\\vec{b}"
];
formulas.forEach(f => {
  try {
    katex.renderToString(f, { displayMode: false, throwOnError: true });
    console.log("Success:", f);
  } catch(e) {
    console.log("Error for", f, ":", e.message);
  }
});
