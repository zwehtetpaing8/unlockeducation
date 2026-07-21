const katex = require('katex');

const formula = `\\begin{aligned}(\\vec{a} + \\vec{b}) \\cdot (\\vec{b} - \\vec{a}) &= \\vec{a} \\cdot \\vec{b} - \\vec{a} \\cdot \\vec{a} + \\vec{b} \\cdot \\vec{b} - \\vec{b} \\cdot \\vec{a} \\\\&= |\\vec{b}|^2 - |\\vec{a}|^2.\\end{aligned}`;

const html = katex.renderToString(formula, { displayMode: true, throwOnError: false });
console.log(html);
