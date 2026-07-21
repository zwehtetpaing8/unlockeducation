const fs = require('fs');
let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');

text = text.replace('<Latex text="$\\\\overrightarrow{AC}$" />', '<Latex text="$\\overrightarrow{AC}$" />');
text = text.replace('<Latex text="$\\\\overrightarrow{AB}$" />', '<Latex text="$\\overrightarrow{AB}$" />');

fs.writeFileSync('src/components/Latex.tsx', text);
