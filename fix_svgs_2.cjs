const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const m1 = content.indexOf('<div class="flex justify-center my-6">');
const end1 = content.indexOf('**Position Vectors', m1);
const svg1 = content.substring(m1, end1).trim();

console.log("SVG length:", svg1.length);

content = content.replace(svg1, '[DIAGRAM:Chap4_Fig4]');

fs.writeFileSync('src/data/chapter4_content.ts', content);

let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function reactify(html) {
   let str = html;
   str = str.replace(/class=/g, 'className=');
   str = str.replace(/stroke-width=/g, 'strokeWidth=');
   str = str.replace(/stroke-dasharray=/g, 'strokeDasharray=');
   str = str.replace(/marker-end=/g, 'markerEnd=');
   return str;
}

const comps = `
export function Chap4_Fig4() {
  return (
${reactify(svg1)}
  );
}
`;

const exportMatch = 'export function Chap4_Fig1() {';
latex = latex.replace(exportMatch, comps + '\n' + exportMatch);

const switchMatch = '        case \'Chap4_Fig1\':';
const switchCases = `        case 'Chap4_Fig4':
          renderedElements.push(<Chap4_Fig4 key={\`diag-\${i}\`} />);
          break;
`;

latex = latex.replace(switchMatch, switchCases + switchMatch);

fs.writeFileSync('src/components/Latex.tsx', latex);

