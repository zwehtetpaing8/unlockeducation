const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  /case 'Chap4_Fig4':\n          renderedElements.push\(<Chap4_Fig4 key=\{`diag-\$\{i\}`\} \/>\);\n          break;/g,
  "case 'Chap4_Fig4':\n          renderedElements.push(<Chap4_Fig4 key={`diag-${i}`} />);\n          break;\n        case 'Chap4_Fig5':\n          renderedElements.push(<Chap4_Fig5 key={`diag-${i}`} />);\n          break;"
);

fs.writeFileSync('src/components/Latex.tsx', latex);
