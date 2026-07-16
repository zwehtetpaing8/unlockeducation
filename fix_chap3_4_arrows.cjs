const fs = require('fs');
let lines = fs.readFileSync('src/components/Latex.tsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export function Chap3_4_PlaneABC() {')) {
    // Add defs to the SVG
    let svgLineIndex = i;
    while (!lines[svgLineIndex].includes('<svg')) {
      svgLineIndex++;
    }
    
    const defs = `        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="#0f172a" className="dark:fill-white" />
          </marker>
        </defs>`;
        
    if (!lines[svgLineIndex + 1].includes('<defs>')) {
        lines.splice(svgLineIndex + 1, 0, ...defs.split('\n'));
    }
    break;
  }
}

fs.writeFileSync('src/components/Latex.tsx', lines.join('\n'), 'utf8');
