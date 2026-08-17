const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newDiag = `export function Chap4_4_4_Ex21_Diag() {
  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative w-full max-w-[480px] aspect-[480/320] bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <svg viewBox="0 0 480 320" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <defs>
            <marker id="arrow-amber-ex21" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-amber-600 dark:fill-amber-400 stroke-none" />
            </marker>
            <marker id="arrow-slate-ex21" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-slate-800 dark:fill-slate-100 stroke-none" />
            </marker>
          </defs>

          {/* Plane representation */}
          <polygon points="120,200 420,180 380,80 80,100" className="fill-amber-500/5 stroke-amber-500/40 dark:fill-amber-500/10 dark:stroke-amber-400/30" strokeWidth="1.5" />
          <text x="350" y="95" className="fill-amber-700 dark:fill-amber-300 stroke-none text-sm italic tracking-wider font-semibold">plane</text>

          {/* Line l */}
          <line x1="200" y1="180" x2="400" y2="130" stroke="#d97706" strokeWidth="1.5" className="stroke-amber-600 dark:stroke-amber-400" />
          <text x="395" y="150" className="fill-amber-600 dark:fill-amber-400 stroke-none text-sm italic font-serif">l</text>

          {/* Vector d1 on line l */}
          <line x1="260" y1="165" x2="330" y2="147.5" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex21)" className="stroke-amber-600 dark:stroke-amber-400" />
          
          {/* Vector d2 = AB */}
          <line x1="150" y1="110" x2="255" y2="162" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber-ex21)" className="stroke-amber-600 dark:stroke-amber-400" />

          {/* Vector a = OA */}
          <line x1="130" y1="280" x2="148" y2="117" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#arrow-slate-ex21)" strokeDasharray="5 4" className="text-slate-800 dark:text-slate-100" />

          {/* Points */}
          <circle cx="130" cy="280" r="3" className="fill-slate-800 dark:fill-slate-100" />
          <circle cx="150" cy="110" r="3" className="fill-slate-800 dark:fill-slate-100" />
          <circle cx="260" cy="165" r="3" className="fill-slate-800 dark:fill-slate-100" />

          {/* Labels */}
          <foreignObject x="110" y="280" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$$O$$" /></div>
          </foreignObject>
          <foreignObject x="100" y="80" width="120" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text="$$A \\text{ (fixed point)}$$" /></div>
          </foreignObject>
          <foreignObject x="245" y="170" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$$B$$" /></div>
          </foreignObject>

          <foreignObject x="80" y="200" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={"$$\\\\vec{a} = \\\\overrightarrow{OA}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="210" y="110" width="90" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_2 = \\\\overrightarrow{AB}$$"} /></div>
          </foreignObject>
          
          <foreignObject x="270" y="165" width="40" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$$\\\\vec{d}_1$$"} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
`;

content += '\n' + newDiag;
fs.writeFileSync('src/components/Latex.tsx', content);
console.log('Appended diag21 to Latex.tsx');
