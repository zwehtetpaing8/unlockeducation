const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const regex = /\\begin\{pmatrix\}\s*\\begin\{aligned\}\s*([\s\S]*?)\s*\\end\{aligned\}\s*\\end\{pmatrix\}/g;

code = code.replace(regex, (match, inner) => {
  let newInner = inner.replace(/&/g, '');
  return `\\begin{pmatrix} ${newInner} \\end{pmatrix}`;
});

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed aligned inside pmatrix");
