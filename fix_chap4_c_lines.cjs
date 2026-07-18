const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const missingLine = '<line x1="30" y1="40" x2="50" y2="30" strokeDasharray="4,4" />\n          <text x="35" y="80"';

latex = latex.replace('<text x="35" y="80"', missingLine);

fs.writeFileSync('src/components/Latex.tsx', latex);
