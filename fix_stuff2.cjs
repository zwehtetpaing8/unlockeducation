const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const targetStr = `\\begin{aligned}
-2 &= m \\implies m = -2. \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\\end{aligned}`;

const newStr = `\\begin{aligned}
m &= -2, \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\\end{aligned}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, newStr);
  console.log("Fixed 2(a)");
} else {
  console.log("Could not find 2(a) target string");
}

const regex = /\\begin\{pmatrix\}\s*\\begin\{aligned\}\s*([\s\S]*?)\s*\\end\{aligned\}\s*\\end\{pmatrix\}/g;

let count = 0;
code = code.replace(regex, (match, inner) => {
  count++;
  let newInner = inner.replace(/&/g, '');
  return `\\begin{pmatrix} ${newInner} \\end{pmatrix}`;
});

console.log("Replaced pmatrix occurrences:", count);

fs.writeFileSync('src/data/chapter4_content.ts', code);
