const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig6 = `export function Chap4_Fig6() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 100" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <line x1="20" y1="80" x2="160" y2="40" strokeDasharray="4,4" className="stroke-slate-300 dark:stroke-slate-700" />
          <line x1="40" y1="20" x2="180" y2="60" strokeDasharray="4,4" className="stroke-slate-300 dark:stroke-slate-700" />
          <line x1="20" y1="80" x2="40" y2="20" strokeDasharray="4,4" className="stroke-slate-300 dark:stroke-slate-700" />
          <line x1="160" y1="40" x2="180" y2="60" strokeDasharray="4,4" className="stroke-slate-300 dark:stroke-slate-700" />
          
          <line x1="40" y1="20" x2="160" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="160" y1="40" x2="20" y2="80" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="100" y="20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="90" y="75" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">-a</text>
          
          {/* Vector arrows for a and -a */}
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 98 12 L 102 12" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 100 10 L 102 12 L 100 14" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 88 67 L 92 67" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 90 65 L 92 67 L 90 69" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig6 + "\n\n" + latex.substring(index);
  
  // also add to switch
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig6':
          renderedElements.push(<Chap4_Fig6 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig6');
}
