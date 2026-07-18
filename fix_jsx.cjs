const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(/>\$\\\\hat{\\\\mathbf{i}}\$<\/text>/g, '>{"$\\\\hat{\\\\mathbf{i}}$"}</text>');
latex = latex.replace(/>\$\\\\hat{\\\\mathbf{j}}\$<\/text>/g, '>{"$\\\\hat{\\\\mathbf{j}}$"}</text>');
latex = latex.replace(/>\$\\\\hat{\\\\mathbf{k}}\$<\/text>/g, '>{"$\\\\hat{\\\\mathbf{k}}$"}</text>');

fs.writeFileSync('src/components/Latex.tsx', latex);
