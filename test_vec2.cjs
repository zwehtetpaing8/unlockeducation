const katex = require('katex');

const eq = "\\vec{p}";
try {
    const html = katex.renderToString(eq, { throwOnError: true });
    console.log("Success:", html);
} catch (e) {
    console.error("Error on:", eq, e.message);
}
