const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig8 = `export function Chap4_Fig8() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-48">
        <svg viewBox="0 0 200 160" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          {/* Parallelogram lines */}
          <line x1="50" y1="100" x2="100" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="150" y1="100" x2="100" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          {/* Main vectors */}
          <line x1="100" y1="60" x2="50" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="60" x2="150" y2="100" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="60" x2="100" y2="140" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="60" x2="50" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          {/* Vector labels */}
          <text x="65" y="80" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="75" y="40" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">b</text>
          <text x="135" y="85" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">-b</text>
          <text x="105" y="110" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a - b</text>
          
          {/* Top arrow markers */}
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 57 72 L 61 72" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 59 70 L 61 72 L 59 74" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 82 35 L 86 35" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 84 33 L 86 35 L 84 37" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 143 80 L 147 80" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 145 78 L 147 80 L 145 82" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 115 105 L 128 105" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 126 103 L 128 105 L 126 107" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig8 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig8':
          renderedElements.push(<Chap4_Fig8 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig8');
}
