const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replaceAll("\\text{(a)} && 3\\vec{a} &=", "\\text{(a)} \\quad 3\\vec{a} &=");
code = code.replaceAll("\\text{(b)} && 4\\vec{b} &=", "\\text{(b)} \\quad 4\\vec{b} &=");
code = code.replaceAll("\\text{(c)} && \\vec{a} - \\vec{b} &=", "\\text{(c)} \\quad \\vec{a} - \\vec{b} &=");
code = code.replaceAll("\\text{(d)} && \\vec{b} + \\vec{c} &=", "\\text{(d)} \\quad \\vec{b} + \\vec{c} &=");
code = code.replaceAll("\\text{(e)} && 2\\vec{b} + \\vec{c} &=", "\\text{(e)} \\quad 2\\vec{b} + \\vec{c} &=");
code = code.replaceAll("\\text{(f)} && \\vec{a} - 2\\vec{b} &=", "\\text{(f)} \\quad \\vec{a} - 2\\vec{b} &=");
code = code.replaceAll("\\text{(g)} && \\vec{a} + \\vec{b} - 2\\vec{c} &=", "\\text{(g)} \\quad \\vec{a} + \\vec{b} - 2\\vec{c} &=");
code = code.replaceAll("\\text{(h)} && 3\\vec{a} - \\vec{b} + \\vec{c} &=", "\\text{(h)} \\quad 3\\vec{a} - \\vec{b} + \\vec{c} &=");

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed question 1 spacing with plain replaceAll");
