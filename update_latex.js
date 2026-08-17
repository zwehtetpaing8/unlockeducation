const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

const newComponent = `
export function Chap4_4_4_Ex18_Diag() {
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 450 300" className="w-full h-full">
          <defs>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-amber-600 dark:fill-amber-400" />
            </marker>
            <marker id="arrow-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-slate-800 dark:fill-slate-100" />
            </marker>
          </defs>

          {/* Grid lines inside the parallelogram */}
          {/* M=(130,160), N=(300,160), P=(190,80), Q=(360,80) */}
          {/* d1 = (170, 0), d2 = (60, -80) */}
          {[1, 2, 3].map(i => {
            // Horizontal-ish lines parallel to MN
            const ratio = i / 4;
            const x1 = 130 + 60 * ratio;
            const y1 = 160 - 80 * ratio;
            const x2 = x1 + 170;
            const y2 = y1;
            return <line key={\`h-\${i}\`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" className="text-amber-200 dark:text-amber-900/50" />
          })}
          {[1, 2, 3].map(i => {
            // Diagonal lines parallel to MP
            const ratio = i / 4;
            const x1 = 130 + 170 * ratio;
            const y1 = 160;
            const x2 = x1 + 60;
            const y2 = y1 - 80;
            return <line key={\`v-\${i}\`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" className="text-amber-200 dark:text-amber-900/50" />
          })}

          {/* Parallelogram Boundary */}
          <polygon points="130,160 300,160 360,80 190,80" fill="transparent" stroke="#d97706" strokeWidth="2" className="stroke-amber-600 dark:stroke-amber-400" strokeLinejoin="round" />

          {/* Vector MP (d2) */}
          <line x1="130" y1="160" x2="185" y2="87" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber)" className="stroke-amber-600 dark:stroke-amber-400" />
          
          {/* Vector MN (d1) */}
          <line x1="130" y1="160" x2="295" y2="160" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow-amber)" className="stroke-amber-600 dark:stroke-amber-400" />

          {/* Vector OM (a) */}
          <line x1="80" y1="240" x2="127" y2="165" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#arrow-slate)" className="text-slate-800 dark:text-slate-100" />

          {/* Points */}
          <circle cx="80" cy="240" r="3" className="fill-slate-800 dark:fill-slate-100" />
          <circle cx="130" cy="160" r="3.5" className="fill-slate-800 dark:fill-slate-100" />
          <circle cx="190" cy="80" r="3.5" className="fill-amber-600 dark:fill-amber-400" />
          <circle cx="300" cy="160" r="3.5" className="fill-amber-600 dark:fill-amber-400" />

          {/* Labels */}
          <foreignObject x="50" y="240" width="30" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={String.raw\`$O$\`} /></div>
          </foreignObject>
          <foreignObject x="65" y="145" width="60" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text={String.raw\`$M(2,2,-2)$\`} /></div>
          </foreignObject>
          <foreignObject x="140" y="50" width="60" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text={String.raw\`$P(4,0,2)$\`} /></div>
          </foreignObject>
          <foreignObject x="305" y="150" width="70" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"><Latex text={String.raw\`$N(1,-1,3)$\`} /></div>
          </foreignObject>

          <foreignObject x="60" y="190" width="50" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text={String.raw\`$\\vec{a} = \\overrightarrow{OM}$\`} /></div>
          </foreignObject>
          
          <foreignObject x="195" y="165" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={String.raw\`$\\vec{d}_1 = \\overrightarrow{MN}$\`} /></div>
          </foreignObject>
          
          <foreignObject x="110" y="100" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={String.raw\`$\\vec{d}_2 = \\overrightarrow{MP}$\`} /></div>
          </foreignObject>

          <foreignObject x="310" y="60" width="50" height="30" overflow="visible">
             <div className="flex items-center justify-center w-full h-full text-sm italic text-blue-400 dark:text-blue-500/70"><Latex text={String.raw\`plane\`} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
`;

// Insert the new component just before the end
const updatedContent = content.replace(
  "export function Chap4_4_4_PlaneEq_Diag1() {",
  newComponent + "\nexport function Chap4_4_4_PlaneEq_Diag1() {"
);

fs.writeFileSync('src/components/Latex.tsx', updatedContent);
