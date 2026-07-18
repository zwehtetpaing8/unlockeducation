const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const fig11 = `export function Chap4_Fig11() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-72 h-32">
        <svg viewBox="0 0 220 120" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <polygon points="40,80 120,50 180,50 100,80" fill="#fbbf24" fillOpacity="0.1" stroke="none" />
          
          <line x1="40" y1="80" x2="120" y2="50" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="120" y1="50" x2="180" y2="50" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="40" y1="80" x2="100" y2="80" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="100" y1="80" x2="180" y2="50" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="35" y="90" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan></text>
          <text x="120" y="45" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">B</tspan></text>
          <text x="185" y="45" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">C</tspan></text>
          <text x="95" y="90" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">D</tspan></text>
          
          <text x="75" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">a</text>
          <text x="150" y="45" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">c</text>
          <text x="70" y="88" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">d</text>
          <text x="145" y="70" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">b</text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 69 52 L 73 52" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 71 50 L 73 52 L 71 54" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 148 37 L 152 37" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 150 35 L 152 37 L 150 39" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 68 80 L 72 80" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 70 78 L 72 80 L 70 82" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 147 62 L 151 62" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 149 60 L 151 62 L 149 64" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          
          <text x="110" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">
            <tspan className="italic font-serif">AB</tspan> || <tspan className="italic font-serif">DC</tspan>, <tspan className="italic font-serif">AD</tspan> || <tspan className="italic font-serif">BC</tspan>
          </text>
          
          <g className="fill-slate-800 dark:fill-slate-200">
            <path d="M 83 107 L 90 107" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 88 105 L 90 107 L 88 109" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 103 107 L 110 107" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 108 105 L 110 107 L 108 109" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 120 107 L 127 107" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 125 105 L 127 107 L 125 109" stroke="currentColor" fill="none" strokeWidth="0.8" />
            
            <path d="M 140 107 L 147 107" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 145 105 L 147 107 L 145 109" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}`;

const index = latex.indexOf('export function Chap4_Fig5() {');
if (index !== -1) {
  latex = latex.substring(0, index) + fig11 + "\n\n" + latex.substring(index);
  
  const switchIndex = latex.indexOf("case 'Chap4_Fig5':");
  if (switchIndex !== -1) {
    const caseStatement = `        case 'Chap4_Fig11':
          renderedElements.push(<Chap4_Fig11 key={\`diag-\${i}\`} />);
          break;\n`;
    latex = latex.substring(0, switchIndex) + caseStatement + latex.substring(switchIndex);
  }
  
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Added Chap4_Fig11');
}
