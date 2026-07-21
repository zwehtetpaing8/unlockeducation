const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace(/text="\$\\\\vec\{a\}\$"/g, 'text="$\\vec{a}$"');
text = text.replace(/text="\$\\\\hat\{\\\\mathbf\{a\}\}\$"/g, 'text="$\\hat{\\mathbf{a}}$"');
text = text.replace(/text="\$\\\\vec\{b\} = 5\\\\hat\{\\\\mathbf\{a\}\}\$"/g, 'text="$\\vec{b} = 5\\hat{\\mathbf{a}}$"');
text = text.replace(/text="\$\\\\vec\{b\} = -5\\\\hat\{\\\\mathbf\{a\}\}\$"/g, 'text="$\\vec{b} = -5\\hat{\\mathbf{a}}$"');
text = text.replace(/text="\$\\\\\\\\overrightarrow\{AB\}\$"/g, 'text="$\\overrightarrow{AB}$"');
text = text.replace(/text="\$\\\\\\\\overrightarrow\{AC\}\$"/g, 'text="$\\overrightarrow{AC}$"');

fs.writeFileSync('src/components/Latex.tsx', text);
