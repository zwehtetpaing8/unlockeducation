const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// We will replace Chap4_Fig3, Chap4_Fig4, Chap4_Fig5
const newFigs = `
export function Chap4_Fig3() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-50 -50 200 200" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <line x1="50" y1="100" x2="-20" y2="135" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="130" y2="100" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="0" markerEnd="url(#arrow)" />
          
          <text x="-25" y="140" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="135" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-10" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          <text x="55" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <line x1="50" y1="100" x2="10" y2="120" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="60" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="25" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">î</text>
          <text x="70" y="95" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">ĵ</text>
          <text x="45" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">k̂</text>
          
          <text x="-5" y="125" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>
          <text x="85" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>
          <text x="55" y="60" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>
        </svg>
      </div>
    </div>
  );
}

export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-40 -20 180 180" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <line x1="30" y1="90" x2="-20" y2="115" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="130" y2="90" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="-10" markerEnd="url(#arrow)" />
          
          <text x="-25" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="135" y="95" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="30" y="-20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          <text x="25" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <line x1="10" y1="100" x2="70" y2="100" strokeDasharray="4,4" />
          <line x1="90" y1="90" x2="70" y2="100" strokeDasharray="4,4" />
          <line x1="10" y1="100" x2="10" y2="40" strokeDasharray="4,4" />
          <line x1="30" y1="30" x2="10" y2="40" strokeDasharray="4,4" />
          <line x1="30" y1="30" x2="90" y2="30" strokeDasharray="4,4" />
          <line x1="90" y1="90" x2="90" y2="30" strokeDasharray="4,4" />
          <line x1="10" y1="40" x2="70" y2="40" strokeDasharray="4,4" />
          <line x1="90" y1="30" x2="70" y2="40" strokeDasharray="4,4" />
          <line x1="70" y1="100" x2="70" y2="40" strokeDasharray="4,4" />
          
          <line x1="30" y1="90" x2="70" y2="40" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <line x1="30" y1="90" x2="15" y2="97.5" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="55" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="65" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="18" y="93" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">î</text>
          <text x="45" y="85" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">ĵ</text>
          <text x="25" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">k̂</text>

          <text x="45" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">OA</text>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan>(2, 3, 4)</text>
          
          <text x="8" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>
          <text x="95" y="85" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">3</text>
          <text x="35" y="30" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">4</text>
        </svg>
      </div>
    </div>
  );
}

export function Chap4_Fig5() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-40 -20 180 180" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          <line x1="30" y1="90" x2="-20" y2="115" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="130" y2="90" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="-10" markerEnd="url(#arrow)" />
          
          <text x="-25" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="135" y="95" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="30" y="-20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          <text x="25" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <line x1="10" y1="100" x2="70" y2="100" strokeDasharray="4,4" />
          <line x1="90" y1="90" x2="70" y2="100" strokeDasharray="4,4" />
          <line x1="10" y1="100" x2="10" y2="40" strokeDasharray="4,4" />
          <line x1="30" y1="30" x2="10" y2="40" strokeDasharray="4,4" />
          <line x1="30" y1="30" x2="90" y2="30" strokeDasharray="4,4" />
          <line x1="90" y1="90" x2="90" y2="30" strokeDasharray="4,4" />
          <line x1="10" y1="40" x2="70" y2="40" strokeDasharray="4,4" />
          <line x1="90" y1="30" x2="70" y2="40" strokeDasharray="4,4" />
          <line x1="70" y1="100" x2="70" y2="40" strokeDasharray="4,4" />
          
          <line x1="30" y1="90" x2="70" y2="40" strokeWidth="1.5" markerEnd="url(#arrow)" />
          
          <line x1="30" y1="90" x2="15" y2="97.5" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="55" y2="90" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="65" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="18" y="93" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">î</text>
          <text x="45" y="85" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">ĵ</text>
          <text x="25" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">k̂</text>

          <text x="45" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">p</text>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">P</tspan>(a, b, c)</text>
        </svg>
      </div>
    </div>
  );
}
`

const startIndex = latex.indexOf('export function Chap4_Fig3() {');
const endIndex = latex.indexOf('export default function Latex');

if (startIndex !== -1 && endIndex !== -1) {
  latex = latex.substring(0, startIndex) + newFigs + "\n" + latex.substring(endIndex);
  fs.writeFileSync('src/components/Latex.tsx', latex);
} else {
  console.log("Could not find replacement bounds");
}
