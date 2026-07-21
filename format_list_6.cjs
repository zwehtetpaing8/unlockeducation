const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter4_content.ts', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Find the following vectors')) {
        if (lines[i+1] && lines[i+1].includes('**')) {
            lines[i+1] = '(a) $3\\vec{a}$ &nbsp;&nbsp;&nbsp; (b) $4\\vec{b}$ &nbsp;&nbsp;&nbsp; (c) $\\vec{a} - \\vec{b}$ &nbsp;&nbsp;&nbsp; (d) $\\vec{b} + \\vec{c}$ &nbsp;&nbsp;&nbsp; (e) $2\\vec{b} + \\vec{c}$ &nbsp;&nbsp;&nbsp; (f) $\\vec{a} - 2\\vec{b}$ &nbsp;&nbsp;&nbsp; (g) $\\vec{a} + \\vec{b} - 2\\vec{c}$ &nbsp;&nbsp;&nbsp; (h) $3\\vec{a} - \\vec{b} + \\vec{c}$';
            lines.splice(i+2, 7);
        }
    }
}

fs.writeFileSync('src/data/chapter4_content.ts', lines.join('\n'));
