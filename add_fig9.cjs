const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig9 = `export function Chap4_Fig9() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 120" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          {/* a */}
          <line x1="80" y1="50" x2="120" y2="35" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="95" y="35" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          
          {/* -a */}
          <line x1="60" y1="80" x2="20" y2="95" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="45" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">-a</text>
          
          {/* 2a */}
          <line x1="90" y1="95" x2="170" y2="65" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="135" y="70" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">2a</text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            {/* arrow over a */}
            <path d="M 90 27 L 94 27" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 92 25 L 94 27 L 92 29" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            {/* arrow over -a */}
            <path d="M 52 100 L 56 100" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 54 98 L 56 100 L 54 102" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            {/* arrow over 2a */}
            <path d="M 132 62 L 136 62" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 134 60 L 136 62 L 134 64" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig9 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig9':
          renderedElements.push(<Chap4_Fig9 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig9');
}
