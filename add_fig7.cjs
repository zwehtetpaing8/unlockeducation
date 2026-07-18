const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig7 = `export function Chap4_Fig7() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 100" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <line x1="20" y1="80" x2="100" y2="60" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="60" x2="160" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="20" y1="80" x2="160" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="65" y="85" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a</text>
          <text x="135" y="55" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">b</text>
          <text x="85" y="40" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold italic">a + b</text>
          
          {/* Vector arrows for a, b, a+b */}
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 63 77 L 67 77" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 65 75 L 67 77 L 65 79" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 133 47 L 137 47" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 135 45 L 137 47 L 135 49" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 80 32 L 90 32" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 88 30 L 90 32 L 88 34" stroke="currentColor" fill="none" strokeWidth="0.8" />
            <path d="M 90 30 L 92 30" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 90 30 L 92 32 L 90 34" stroke="currentColor" fill="none" strokeWidth="0.8" /> {/* Wait, two vectors addition */}
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig7 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig7':
          renderedElements.push(<Chap4_Fig7 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig7');
}
