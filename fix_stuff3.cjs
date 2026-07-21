const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

// For 2(a)
const target2a = String.raw`\begin{aligned}
-2 &= m \\implies m = -2. \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\end{aligned}`.replace(/\\/g, '\\\\');

const replacement2a = String.raw`\begin{aligned}
m &= -2, \\\\
p &= 2m = 2(-2) = -4, \\\\
q &= 7m = 7(-2) = -14.
\end{aligned}`.replace(/\\/g, '\\\\');

if (code.includes(target2a)) {
  code = code.replace(target2a, replacement2a);
  console.log("Fixed 2a");
} else {
  console.log("Could not find 2a");
  // Let's print a substring to debug
  const idx = code.indexOf('Comparing corresponding components');
  if (idx !== -1) {
    console.log(code.substring(idx, idx + 200));
  }
}

// For pmatrix aligned
const regex = /\\\\begin\{pmatrix\}\s*\\\\begin\{aligned\}\s*([\s\S]*?)\s*\\\\end\{aligned\}\s*\\\\end\{pmatrix\}/g;

let count = 0;
code = code.replace(regex, (match, inner) => {
  count++;
  let newInner = inner.replace(/&/g, '');
  return `\\\\begin{pmatrix} ${newInner} \\\\end{pmatrix}`;
});

console.log("Replaced pmatrix:", count);

fs.writeFileSync('src/data/chapter4_content.ts', code);
