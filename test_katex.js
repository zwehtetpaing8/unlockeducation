const katex = require('katex');

const equations = [
    "\\\\vec{q} \\\\cdot \\\\vec{p}",
    "\\\\vec{a} \\\\cdot \\\\vec{b} + \\\\vec{a} \\\\cdot \\\\vec{c}",
    "\\\\hat{\\\\mathbf{i}} \\\\cdot \\\\hat{\\\\mathbf{i}}"
];

for (const eq of equations) {
    try {
        katex.renderToString(eq, { throwOnError: true });
        console.log("Success:", eq);
    } catch (e) {
        console.error("Error on:", eq, e.message);
    }
}
