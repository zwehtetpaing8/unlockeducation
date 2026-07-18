const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig14 = `export function Chap4_Fig14() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-full max-w-lg h-32">
        <svg viewBox="0 0 300 100" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          {/* Group 1: a and a_hat */}
          <line x1="20" y1="50" x2="80" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="20" y1="70" x2="50" y2="55" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="45" y="25" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">a</text>
          <text x="35" y="55" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">â</text>
          <text x="35" y="80" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">1</text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 43 17 L 47 17" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 45 15 L 47 17 L 45 19" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          <line x1="20" y1="75" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="60" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Group 2: b and a_hat (same direction) */}
          <line x1="120" y1="50" x2="180" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="120" y1="70" x2="150" y2="55" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="145" y="25" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">b</text>
          <text x="135" y="55" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">â</text>
          <text x="135" y="80" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">1</text>
          <text x="150" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">same direction: <tspan className="font-bold italic">b̂</tspan> = <tspan className="font-bold italic">â</tspan></text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 143 17 L 147 17" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 145 15 L 147 17 L 145 19" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          <line x1="120" y1="75" x2="120" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="150" y1="60" x2="150" y2="80" stroke="currentColor" strokeWidth="0.5" />
          
          {/* Group 3: b and -a_hat (opposite direction) */}
          <line x1="220" y1="50" x2="280" y2="20" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="250" y1="55" x2="220" y2="70" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="245" y="25" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">b</text>
          <text x="235" y="55" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">-â</text>
          <text x="235" y="80" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">1</text>
          <text x="250" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">opposite direction: <tspan className="font-bold italic">b̂</tspan> = -<tspan className="font-bold italic">â</tspan></text>
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 243 17 L 247 17" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 245 15 L 247 17 L 245 19" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          <line x1="220" y1="75" x2="220" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="250" y1="60" x2="250" y2="80" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig14 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig14':
          renderedElements.push(<Chap4_Fig14 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig14');
}
