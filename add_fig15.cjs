const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig15 = `export function Chap4_Fig15() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-72 h-32">
        <svg viewBox="0 0 240 100" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <line x1="20" y1="80" x2="220" y2="20" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4,4" />
          
          <line x1="40" y1="74" x2="100" y2="56" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="40" y1="74" x2="200" y2="26" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <circle cx="40" cy="74" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <circle cx="100" cy="56" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <circle cx="200" cy="26" r="2" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="35" y="85" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan></text>
          <text x="100" y="70" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">B</tspan></text>
          <text x="200" y="20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">C</tspan></text>
          
          <text x="70" y="75" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">AB</text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 66 67 L 74 67" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 72 65 L 74 67 L 72 69" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          
          <text x="120" y="45" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">AC</text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 116 37 L 124 37" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 122 35 L 124 37 L 122 39" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          
          <text x="120" y="90" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">
            <tspan className="italic font-serif">AB</tspan> || <tspan className="italic font-serif">AC</tspan>
          </text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 103 82 L 110 82" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 108 80 L 110 82 L 108 84" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 130 82 L 137 82" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 135 80 L 137 82 L 135 84" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig15 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig15':
          renderedElements.push(<Chap4_Fig15 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig15');
}
