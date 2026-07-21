const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// Fix 2(a)
code = code.replace(
  /\\begin\{aligned\}\n-2 &= m \\implies m = -2\. \\\\\np &= 2m = 2\(-2\) = -4, \\\\\nq &= 7m = 7\(-2\) = -14\.\n\\end\{aligned\}/,
  `\\begin{aligned}
m &= -2, \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\\end{aligned}`
);

// Fix the aligned blocks in the file
const regex = /\\begin\{pmatrix\}\s*\\begin\{aligned\}\s*([\s\S]*?)\s*\\end\{aligned\}\s*\\end\{pmatrix\}/g;

code = code.replace(regex, (match, inner) => {
  let newInner = inner.replace(/&/g, '');
  return `\\begin{pmatrix} ${newInner} \\end{pmatrix}`;
});

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed stuff");
