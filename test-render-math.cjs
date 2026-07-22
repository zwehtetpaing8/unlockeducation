const katex = require('katex');

const text = "$$ \\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = \\begin{pmatrix} 7 \\\\ 7 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ -5 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 12 \\\\ 1 \\end{pmatrix}, $$";

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
let match;

while ((match = regex.exec(text)) !== null) {
  const isBlock = match[1] !== undefined;
  const formula = isBlock ? match[2] : match[4];
  
  try {
    const html = katex.renderToString(formula, {
      displayMode: isBlock,
      throwOnError: false,
    });
    console.log("Success");
  } catch (e) {
    console.log("Error:", e);
  }
}
