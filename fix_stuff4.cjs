const fs = require('fs');
let code = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

code = code.replace(
  "-2 &= m \\\\implies m = -2. \\\\\\\\\np &= 2m = 2(-2) = -4, \\\\\\\\\nq &= 7m = 7(-2) = -14.",
  "m &= -2, \\\\\\\\\np &= 2m = 2(-2) = -4, \\\\\\\\\nq &= 7m = 7(-2) = -14."
);

fs.writeFileSync('src/data/chapter4_content.ts', code);
console.log("Fixed 2a");
