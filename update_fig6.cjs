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
          {/* Parallelogram outline */}
          <line x1="40" y1="20" x2="20" y2="70" strokeDasharray="4,4" className="stroke-slate-400 dark:stroke-slate-600" />
          <line x1="160" y1="40" x2="140" y2="90" strokeDasharray="4,4" className="stroke-slate-400 dark:stroke-slate-600" />
          
          <line x1="40" y1="20" x2="160" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="140" y1="90" x2="20" y2="70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="100" y="25" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="80" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">-a</text>
          
          {/* Vector arrows for a and -a */}
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 98 17 L 102 17" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 100 15 L 102 17 L 100 19" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 76 87 L 84 87" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 78 85 L 76 87 L 78 89" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const startIndex = latex.indexOf('export function Chap4_Fig6() {');
const endIndex = latex.indexOf('export function Chap4_Fig5() {');
if (startIndex !== -1 && endIndex !== -1) {
  latex = latex.substring(0, startIndex) + fig6 + "\n\n" + latex.substring(endIndex);
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Updated Chap4_Fig6');
}
