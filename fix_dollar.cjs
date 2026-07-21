const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Replace isolated $ \begin{aligned} ... \end{aligned} $ with $$
content = content.replace(/\n\$\n\\begin\{aligned\}/g, '\n$$\n\\begin{aligned}');
content = content.replace(/\\end\{aligned\}\n\$/g, '\\end{aligned}\n$$');

fs.writeFileSync('src/data/chapter4_content.ts', content);
