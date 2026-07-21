const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// The sed command changed every "**Solution**" to include the Given from question 1!
// Let's replace the WRONG ones back to just "**Solution**" where they already have a "Given" after it.

code = code.replace(/\*\*Solution\*\*\nGiven\n\$\$ \\vec\{a\} = \\begin\{pmatrix\} 5 \\\\ -2 \\\\ -4 \\end\{pmatrix\}, \\quad \\vec\{b\} = \\begin\{pmatrix\} 3 \\\\ -6 \\\\ 1 \\end\{pmatrix\}, \\quad \\vec\{c\} = \\begin\{pmatrix\} 0 \\\\ 7 \\\\ -1 \\end\{pmatrix}\. \$\$/g, "**Solution**");
fs.writeFileSync('src/data/chapter4_content.ts', code);
