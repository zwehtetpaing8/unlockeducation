const katex = require('katex');
const str = `\\begin{aligned}
\\overrightarrow{PQ} &= \\overrightarrow{OQ} - \\overrightarrow{OP} & \\overrightarrow{PR} &= \\overrightarrow{OR} - \\overrightarrow{OP} \\\\
&= \\begin{pmatrix} 2 \\\\ 4 \\\\ 1 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} & &= \\begin{pmatrix} 3 \\\\ 5 \\\\ 6 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} \\\\
&= \\begin{pmatrix} 1 \\\\ 4 \\\\ 2 \\end{pmatrix} & &= \\begin{pmatrix} 2 \\\\ 5 \\\\ 7 \\end{pmatrix}
\\end{aligned}`;

try {
  katex.renderToString(str, { displayMode: true, throwOnError: true });
  console.log("OK");
} catch(e) {
  console.log("ERROR", e.message);
}
