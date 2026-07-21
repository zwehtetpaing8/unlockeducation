const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(/\$\$\n\\begin{aligned}/g, '$$ \\\\begin{aligned}');
code = code.replace(/\\end{aligned}\n\$\$/g, '\\\\end{aligned} $$');

code = code.replace(/\$\$\n\\begin{alignedat}/g, '$$ \\\\begin{alignedat}');
code = code.replace(/\\end{alignedat}\n\$\$/g, '\\\\end{alignedat} $$');

fs.writeFileSync('src/data/chapter4_content.ts', code);
