const fs = require('fs');

const file = 'src/components/Latex.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /export function Chap4_4_4_Ex21_Diag\(\) \{[\s\S]*?\}\n          <line x1="260"[\s\S]*?<Latex text="\$\\vec{d}_1\$" \/><\/div>\n          <\/foreignObject>\n        <\/svg>\n      <\/div>\n    <\/div>\n  \);\n\}/;
content = content.replace(regex, '');

fs.writeFileSync(file, content);
