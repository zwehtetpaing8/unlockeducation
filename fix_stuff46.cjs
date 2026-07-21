const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Use regex to normalize any form of aligned starts and ends
code = code.replace(/\$\$\s*\\begin{aligned}/g, '$$ \\\\begin{aligned}');
code = code.replace(/\\begin{aligned}\s*\$\$/g, '\\\\begin{aligned} $$');

code = code.replace(/\$\$\s*\\begin{alignedat}/g, '$$ \\\\begin{alignedat}');
code = code.replace(/\\begin{alignedat}\s*\$\$/g, '\\\\begin{alignedat} $$');

code = code.replace(/\\\\\end{aligned}\s*\$/g, '\\\\end{aligned} $$');
code = code.replace(/\\\\\end{alignedat}\s*\$/g, '\\\\end{alignedat} $$');

code = code.replace(/\$\s*\\begin{aligned}/g, '$$ \\\\begin{aligned}');
code = code.replace(/\\end{aligned}\s*\$/g, '\\\\end{aligned} $$');

code = code.replace(/\$\s*\\begin{alignedat}/g, '$$ \\\\begin{alignedat}');
code = code.replace(/\\end{alignedat}\s*\$/g, '\\\\end{alignedat} $$');

// Clean up triple or quadruple slashes before end if any
code = code.replace(/\\\\\\end{aligned} \$\$/g, '\\\\end{aligned} $$');
code = code.replace(/\\\\\\end{alignedat} \$\$/g, '\\\\end{alignedat} $$');

fs.writeFileSync('src/data/chapter4_content.ts', code);
