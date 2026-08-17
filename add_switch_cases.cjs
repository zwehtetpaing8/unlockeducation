const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const target = "switch (diagName) {";
const replacement = `switch (diagName) {
        case 'Chap4_4_4_PlaneEq_Diag1':
          renderedElements.push(<Chap4_4_4_PlaneEq_Diag1 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_4_4_PlaneEq_Diag2':
          renderedElements.push(<Chap4_4_4_PlaneEq_Diag2 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_4_4_PlaneEq_Diag3':
          renderedElements.push(<Chap4_4_4_PlaneEq_Diag3 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_4_4_PlaneEq_Diag4':
          renderedElements.push(<Chap4_4_4_PlaneEq_Diag4 key={\`diag-\${i}\`} />);
          break;`;

if (content.includes(target) && !content.includes("Chap4_4_4_PlaneEq_Diag1")) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
}
