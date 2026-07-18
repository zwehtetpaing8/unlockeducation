const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  /export function Chap4_Fig3\(\) \{\n  return null;\n\}\n\nexport function Chap4_Fig4\(\) \{/g,
  'export function Chap4_Fig3() {'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
