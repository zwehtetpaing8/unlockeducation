const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(/\\\\text\{\(a\)\}\s*\\\\quad\s*3\\\\vec\{a\}/g, "\\\\text{(a)} && 3\\\\vec{a}");
code = code.replace(/\\\\text\{\(b\)\}\s*\\\\quad\s*4\\\\vec\{b\}/g, "\\\\text{(b)} && 4\\\\vec{b}");
code = code.replace(/\\\\text\{\(c\)\}\s*\\\\quad\s*\\\\vec\{a\}\s*-\s*\\\\vec\{b\}/g, "\\\\text{(c)} && \\\\vec{a} - \\\\vec{b}");
code = code.replace(/\\\\text\{\(d\)\}\s*\\\\quad\s*\\\\vec\{b\}\s*\+\s*\\\\vec\{c\}/g, "\\\\text{(d)} && \\\\vec{b} + \\\\vec{c}");
code = code.replace(/\\\\text\{\(e\)\}\s*\\\\quad\s*2\\\\vec\{b\}\s*\+\s*\\\\vec\{c\}/g, "\\\\text{(e)} && 2\\\\vec{b} + \\\\vec{c}");
code = code.replace(/\\\\text\{\(f\)\}\s*\\\\quad\s*\\\\vec\{a\}\s*-\s*2\\\\vec\{b\}/g, "\\\\text{(f)} && \\\\vec{a} - 2\\\\vec{b}");
code = code.replace(/\\\\text\{\(g\)\}\s*\\\\quad\s*\\\\vec\{a\}\s*\+\s*\\\\vec\{b\}\s*-\s*2\\\\vec\{c\}/g, "\\\\text{(g)} && \\\\vec{a} + \\\\vec{b} - 2\\\\vec{c}");
code = code.replace(/\\\\text\{\(h\)\}\s*\\\\quad\s*3\\\\vec\{a\}\s*-\s*\\\\vec\{b\}\s*\+\s*\\\\vec\{c\}/g, "\\\\text{(h)} && 3\\\\vec{a} - \\\\vec{b} + \\\\vec{c}");

// Also change the aligned block for Question 1 to alignedat{2}
code = code.replace(/\\begin\{aligned\}\s*\\\\text\{\(a\)\}/g, "\\begin{alignedat}{2}\n\\\\text{(a)}");
code = code.replace(/12 \\\\\\\\ 7 \\\\\\\\ -14 \\\\end\{pmatrix\}\.\n\\\\end\{aligned\}/g, "12 \\\\\\\\ 7 \\\\\\\\ -14 \\\\end{pmatrix}.\n\\\\end{alignedat}");

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Restored && and changed to alignedat{2}");
