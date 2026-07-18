const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(/>"\(0, 0, z\)"</g, '>(0, 0, z)<');
latex = latex.replace(/>"\(0, y, 0\)"</g, '>(0, y, 0)<');
latex = latex.replace(/>"\(x, 0, 0\)"</g, '>(x, 0, 0)<');

fs.writeFileSync('src/components/Latex.tsx', latex);
