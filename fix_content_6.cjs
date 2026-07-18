const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const oldStr = 'ka_3 \\end{pmatrix}. $$\n\n**Example 3**';
const newStr = 'ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**';

if (content.includes(oldStr)) {
  console.log("Found direct string");
  content = content.replace(oldStr, newStr);
} else {
  console.log("Direct string not found. Trying regex...");
  const match = content.match(/ka_3 \\end\{pmatrix\}\. \$\$\r?\n\r?\n\*\*Example 3\*\*/);
  if (match) {
      console.log("Regex found!");
      content = content.replace(/ka_3 \\end\{pmatrix\}\. \$\$\r?\n\r?\n\*\*Example 3\*\*/, 'ka_3 \\end{pmatrix}. $$\n\n[DIAGRAM:Chap4_Fig9]\n\n**Example 3**');
  }
}

fs.writeFileSync('src/data/chapter4_content.ts', content);
