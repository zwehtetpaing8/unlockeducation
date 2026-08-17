const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Update vector r
content = content.replace(
  '<foreignObject x="270" y="215" width="80" height="40" overflow="visible">',
  '<foreignObject x="295" y="215" width="80" height="40" overflow="visible">'
);

// Update AR vector label
content = content.replace(
  '<foreignObject x="300" y="125" width="120" height="40" overflow="visible">',
  '<foreignObject x="300" y="95" width="120" height="40" overflow="visible">'
);

fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
