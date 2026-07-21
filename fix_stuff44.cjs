const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(/\$\$\n\\begin{alignedat}{2}/g, '$$ \\\\begin{alignedat}{2}');
code = code.replace(/\\\\\end{alignedat} \$/g, '\\\\end{alignedat} $$');
code = code.replace(/\\\\\end{aligned} \$/g, '\\\\end{aligned} $$');
code = code.replace(/\$\$\n\\begin{aligned}/g, '$$ \\\\begin{aligned}');
code = code.replace(/\\\end{alignedat} \$/g, '\\\\end{alignedat} $$');
code = code.replace(/\\\end{aligned} \$/g, '\\\\end{aligned} $$');

fs.writeFileSync('src/data/chapter4_content.ts', code);
