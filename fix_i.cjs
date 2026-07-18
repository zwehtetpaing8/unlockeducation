const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.split('{"$\\\\hat{\\\\mathbf{i}}$"}').join('{"î"}');
latex = latex.split('{"$\\\\hat{\\\\mathbf{j}}$"}').join('{"ĵ"}');
latex = latex.split('{"$\\\\hat{\\\\mathbf{k}}$"}').join('{"k̂"}');

fs.writeFileSync('src/components/Latex.tsx', latex);
