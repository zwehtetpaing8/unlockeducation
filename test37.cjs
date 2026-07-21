const katex = require('katex');
const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const code = fs.readFileSync('dist/assets/' + files[0], 'utf8');

const regex = /`([^`]*?collinear if the vectors[^`]*?)`/;
const match = code.match(regex);
if (match) {
  const evaluated = eval("`" + match[1] + "`");
  const extracted = evaluated.match(/\$\\overrightarrow\{AB\}\$/);
  if (extracted) {
    console.log("Extracted:", extracted[0]);
    // The regex in Latex.tsx strips the $
    const formula = extracted[0].substring(1, extracted[0].length - 1);
    console.log("Formula:", formula);
    try {
      console.log(katex.renderToString(formula));
    } catch(e) {
      console.log("ERROR:", e.message);
    }
  } else {
    // try to match with single backslash since `evaluated` has single backslash
    const extracted2 = evaluated.match(/\$\overrightarrow\{AB\}\$/);
    if (extracted2) {
      console.log("Extracted with single slash:", extracted2[0]);
      const formula = extracted2[0].substring(1, extracted2[0].length - 1);
      console.log("Formula:", formula);
      try {
        console.log(katex.renderToString(formula));
      } catch(e) {
        console.log("ERROR:", e.message);
      }
    }
  }
}
