const katex = require('katex');

const eq = "\\\\overrightarrow{OP} = \\\\vec{p} = \\\\begin{pmatrix} a \\\\\\\\ b \\\\\\\\ c \\\\end{pmatrix}";
try {
    katex.renderToString(eq, { throwOnError: true });
    console.log("Success:", eq);
} catch (e) {
    console.error("Error on:", eq, e.message);
}
