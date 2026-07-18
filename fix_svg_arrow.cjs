const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const defs = `<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" /></marker></defs>`;

function addDefs(funcName) {
  const matchStr = `export function ${funcName}() {\n  return (\n    <div`;
  const nextLineIdx = latex.indexOf('<svg', latex.indexOf(matchStr));
  if (nextLineIdx !== -1) {
    const endSvgIdx = latex.indexOf('>', nextLineIdx);
    latex = latex.slice(0, endSvgIdx + 1) + defs + latex.slice(endSvgIdx + 1);
  }
}

addDefs('Chap4_Fig1');
// Chap4_Fig2 has 3 SVGs
let idx = latex.indexOf('export function Chap4_Fig2');
for(let i=0; i<3; i++) {
  let svgIdx = latex.indexOf('<svg', idx);
  if (svgIdx !== -1) {
    let endSvgIdx = latex.indexOf('>', svgIdx);
    latex = latex.slice(0, endSvgIdx + 1) + defs + latex.slice(endSvgIdx + 1);
    idx = endSvgIdx + 1;
  }
}

addDefs('Chap4_Fig4');

fs.writeFileSync('src/components/Latex.tsx', latex);
