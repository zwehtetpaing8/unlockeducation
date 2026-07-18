const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig10 = `export function Chap4_Fig10() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 120" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <line x1="40" y1="40" x2="80" y2="80" strokeDasharray="4,4" className="stroke-slate-400 dark:stroke-slate-600" />
          <line x1="120" y1="70" x2="160" y2="110" strokeDasharray="4,4" className="stroke-slate-400 dark:stroke-slate-600" />
          
          <line x1="40" y1="40" x2="120" y2="70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="80" y1="80" x2="160" y2="110" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="80" y="45" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="135" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">b</text>
          
          <text x="100" y="125" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a = b</text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 74 37 L 78 37" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 76 35 L 78 37 L 76 39" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 137 97 L 141 97" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 139 95 L 141 97 L 139 99" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 87 117 L 91 117" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 89 115 L 91 117 L 89 119" stroke="currentColor" fill="none" strokeWidth="0.8" />
            <path d="M 108 117 L 112 117" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 110 115 L 112 117 L 110 119" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig10 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig10':
          renderedElements.push(<Chap4_Fig10 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig10');
}
