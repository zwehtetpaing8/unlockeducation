const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newFig3 = `export function Chap4_Fig3() {
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
          
          <text x="55" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <line x1="50" y1="100" x2="10" y2="120" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="60" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="25" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">î</text>
          <text x="75" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">ĵ</text>
          <text x="42" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">k̂</text>
          
          <text x="0" y="130" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>
          <text x="90" y="88" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>
          <text x="55" y="60" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>
        </svg>
      </div>
    </div>
  );
}`;

const startIndex = latex.indexOf('export function Chap4_Fig3() {');
const endIndex = latex.indexOf('export function Chap4_Fig4() {');

if (startIndex !== -1 && endIndex !== -1) {
  latex = latex.substring(0, startIndex) + newFig3 + "\n\n" + latex.substring(endIndex);
  fs.writeFileSync('src/components/Latex.tsx', latex);
} else {
  console.log("Could not find replacement bounds");
}
