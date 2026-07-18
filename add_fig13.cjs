const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig13 = `export function Chap4_Fig13() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 100" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <line x1="40" y1="80" x2="160" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <circle cx="40" cy="80" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="35" y="85" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <circle cx="80" cy="66.66" r="2" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="100" y="55" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="65" y="80" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">â</text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 96 47 L 100 47" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 98 45 L 100 47 L 98 49" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          
          <text x="100" y="100" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">
            |â| = 1 and â has the same direction as a
          </text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 52 103 L 56 103" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 54 101 L 56 103 L 54 105" stroke="currentColor" fill="none" strokeWidth="0.8" />
            <path d="M 183 103 L 187 103" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 185 101 L 187 103 L 185 105" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig13 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig13':
          renderedElements.push(<Chap4_Fig13 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig13');
}
