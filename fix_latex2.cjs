const fs = require('fs');

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace(/<Latex text="\$\\\\\\\\vec\{a\}\$" \/>/g, '<Latex text="$\\vec{a}$" />');
text = text.replace(/<Latex text="\$\\\\\\\\hat\{\\\\\\\\mathbf\{a\}\}\$" \/>/g, '<Latex text="$\\hat{\\mathbf{a}}$" />');
text = text.replace(/<Latex text="\$\\\\\\\\vec\{b\} = 5\\\\\\\\hat\{\\\\\\\\mathbf\{a\}\}\$" \/>/g, '<Latex text="$\\vec{b} = 5\\hat{\\mathbf{a}}$" />');
text = text.replace(/<Latex text="\$\\\\\\\\vec\{b\} = -5\\\\\\\\hat\{\\\\\\\\mathbf\{a\}\}\$" \/>/g, '<Latex text="$\\vec{b} = -5\\hat{\\mathbf{a}}$" />');
text = text.replace(/<Latex text="\$\\\\\\\\overrightarrow\{AB\}\$" \/>/g, '<Latex text="$\\overrightarrow{AB}$" />');
text = text.replace(/<Latex text="\$\\\\\\\\overrightarrow\{AC\}\$" \/>/g, '<Latex text="$\\overrightarrow{AC}$" />');

fs.writeFileSync('src/components/Latex.tsx', text);
