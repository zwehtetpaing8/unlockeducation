const fs = require('fs');
let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace(
  /<foreignObject x="160" y="45" width="30" height="30" overflow="visible">/g,
  '<foreignObject x="160" y="25" width="30" height="30" overflow="visible">'
);

fs.writeFileSync('src/components/Latex.tsx', text);
console.log('Done');
