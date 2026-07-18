const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig12 = `export function Chap4_Fig12() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-80 h-32">
        <svg viewBox="0 0 240 120" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <polygon points="40,80 80,40 160,40 120,80" fill="#fbbf24" fillOpacity="0.1" stroke="none" />
          
          <line x1="40" y1="80" x2="80" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="80" y1="40" x2="160" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="40" y1="80" x2="120" y2="80" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="120" y1="80" x2="160" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="35" y="85" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan>(-1, 1, 1)</text>
          <text x="80" y="35" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">B</tspan>(2, 0, -2)</text>
          <text x="165" y="35" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">C</tspan>(x, y, z)</text>
          <text x="120" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">D</tspan>(3, 1, 4)</text>
          
          <text x="50" y="55" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">AB</text>
          <text x="120" y="35" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">BC</text>
          <text x="80" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">AD</text>
          <text x="150" y="70" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">DC</text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 39 47 L 46 47" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 44 45 L 46 47 L 44 49" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 116 27 L 123 27" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 121 25 L 123 27 L 121 29" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 76 87 L 83 87" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 81 85 L 83 87 L 81 89" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 152 62 L 159 62" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 157 60 L 159 62 L 157 64" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig12 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig12':
          renderedElements.push(<Chap4_Fig12 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig12');
}
