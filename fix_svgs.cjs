const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const m1 = content.indexOf('<div class="flex justify-center my-6">');
const end1 = content.indexOf('**Example 1**', m1);
const svg1 = content.substring(m1, end1).trim();

const m2 = content.indexOf('<div class="flex flex-col md:flex-row justify-center gap-8 my-6">');
const end2 = content.indexOf('---', m2);
const svg2 = content.substring(m2, end2).trim();

const m3 = content.indexOf('<div class="flex justify-center my-6">', end2);
const end3 = content.indexOf('If $P(x, y, z)$', m3);
const svg3 = content.substring(m3, end3).trim();

console.log("SVG 1 length:", svg1.length);
console.log("SVG 2 length:", svg2.length);
console.log("SVG 3 length:", svg3.length);

content = content.replace(svg1, '[DIAGRAM:Chap4_Fig1]');
content = content.replace(svg2, '[DIAGRAM:Chap4_Fig2]');
content = content.replace(svg3, '[DIAGRAM:Chap4_Fig3]');

fs.writeFileSync('src/data/chapter4_content.ts', content);

let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// I need to convert `class=` to `className=` and `stroke-width` to `strokeWidth`
// etc
function reactify(html) {
   let str = html;
   str = str.replace(/class=/g, 'className=');
   str = str.replace(/stroke-width=/g, 'strokeWidth=');
   str = str.replace(/stroke-dasharray=/g, 'strokeDasharray=');
   str = str.replace(/marker-end=/g, 'markerEnd=');
   return str;
}

const comps = `
export function Chap4_Fig1() {
  return (
${reactify(svg1)}
  );
}

export function Chap4_Fig2() {
  return (
${reactify(svg2)}
  );
}

export function Chap4_Fig3() {
  return (
${reactify(svg3)}
  );
}
`;

const exportMatch = 'export function ArgandExample5a() {';
latex = latex.replace(exportMatch, comps + '\n' + exportMatch);

const switchMatch = '        case \'ArgandExample5a\':';
const switchCases = `        case 'Chap4_Fig1':
          renderedElements.push(<Chap4_Fig1 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_Fig2':
          renderedElements.push(<Chap4_Fig2 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_Fig3':
          renderedElements.push(<Chap4_Fig3 key={\`diag-\${i}\`} />);
          break;
`;

latex = latex.replace(switchMatch, switchCases + switchMatch);

fs.writeFileSync('src/components/Latex.tsx', latex);

