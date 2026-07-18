const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newFig1 = `export function Chap4_Fig1() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-30 -10 180 180" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" /></marker></defs>
          
          {/* Axes */}
          <line x1="50" y1="100" x2="-10" y2="140" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="140" y2="100" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="10" markerEnd="url(#arrow)" />
          
          {/* Axis Labels */}
          <text x="-15" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x</text>
          <text x="145" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">y</text>
          <text x="45" y="5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">z</text>
          <text x="40" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">O</text>
          
          {/* Box edges (dashed) */}
          <line x1="20" y1="120" x2="80" y2="120" strokeDasharray="4,4" /> {/* X to XY */}
          <line x1="110" y1="100" x2="80" y2="120" strokeDasharray="4,4" /> {/* Y to XY */}
          <line x1="80" y1="120" x2="80" y2="50" strokeDasharray="4,4" /> {/* XY to XYZ */}
          <line x1="20" y1="120" x2="20" y2="50" strokeDasharray="4,4" /> {/* X to XZ */}
          <line x1="50" y1="30" x2="20" y2="50" strokeDasharray="4,4" /> {/* Z to XZ */}
          <line x1="20" y1="50" x2="80" y2="50" strokeDasharray="4,4" /> {/* XZ to XYZ */}
          <line x1="50" y1="30" x2="110" y2="30" strokeDasharray="4,4" /> {/* Z to YZ */}
          <line x1="110" y1="100" x2="110" y2="30" strokeDasharray="4,4" /> {/* Y to YZ */}
          <line x1="110" y1="30" x2="80" y2="50" strokeDasharray="4,4" /> {/* YZ to XYZ */}
          
          {/* Points */}
          <circle cx="80" cy="50" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="85" y="45" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">P(x, y, z)</text>
          
          {/* Coordinate Labels */}
          <text x="10" y="135" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(x, 0, 0)</text>
          <text x="110" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, y, 0)</text>
          <text x="15" y="25" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, z)</text>
          
        </svg>
      </div>
    </div>
  );
}`;

const start = latex.indexOf('export function Chap4_Fig1() {');
const end = latex.indexOf('export function Chap4_Fig2() {');

latex = latex.substring(0, start) + newFig1 + '\n\n' + latex.substring(end);

fs.writeFileSync('src/components/Latex.tsx', latex);
