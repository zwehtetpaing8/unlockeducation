const fs = require('fs');
const p = 'src/components/Latex.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(
  /const regex = \/\(\\\$\\\$\(\.\*\?\)\\\$\\\$\)\|\(\\\$\(\.\*\?\)\\\$\)\/g;/,
  'const regex = /(\\$\\$([\\s\\S]*?)\\$\\$)|(\\$(.*?)\\$)/g;'
);
fs.writeFileSync(p, c);
