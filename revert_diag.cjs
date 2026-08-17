const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const regex = /export function Chap4_4_4_LineEq_Diag1\(\) \{[\s\S]*?\}\);?\n\}/;

const newComponent = `export function Chap4_4_4_LineEq_Diag1() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[400px] aspect-[400/200]">
        <svg viewBox="0 0 400 200" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <defs>
            <marker id="arrow-head-slate" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
            </marker>
            <marker id="arrow-head-yellow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#d97706" />
            </marker>
          </defs>
          
          {/* Line l */}
          <line x1="80" y1="170" x2="350" y2="40" stroke="#d97706" strokeWidth="1.5" />
          
          {/* Arrow on AR */}
          <line x1="163" y1="130" x2="225" y2="100" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrow-head-yellow)" />
          
          <text x="360" y="45" fill="#d97706" fontSize="14" className="font-serif italic">l</text>
          
          {/* Points */}
          <circle cx="100" cy="180" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="90" y="195" fill="currentColor" fontSize="14" className="text-slate-900 dark:text-white font-serif italic">O</text>
          
          <circle cx="163" cy="130" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="145" y="125" fill="currentColor" fontSize="14" className="text-slate-900 dark:text-white font-serif italic">A</text>
          
          <circle cx="288" cy="70" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="295" y="85" fill="currentColor" fontSize="14" className="text-slate-900 dark:text-white font-serif italic">R</text>
          
          {/* Vectors OA and OR */}
          <line x1="100" y1="180" x2="161" y2="132" stroke="currentColor" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate)" />
          
          <foreignObject x="90" y="145" width="80" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white">
              <Latex text={String.raw\`$\\vec{a} = \\overrightarrow{OA}$\`} />
            </div>
          </foreignObject>
          
          <line x1="100" y1="180" x2="285" y2="72" stroke="currentColor" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate)" />
          
          <foreignObject x="210" y="130" width="80" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-slate-900 dark:text-white">
              <Latex text={String.raw\`$\\vec{r} = \\overrightarrow{OR}$\`} />
            </div>
          </foreignObject>
          
          {/* Vector AR */}
          <foreignObject x="210" y="65" width="80" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600">
              <Latex text={String.raw\`$\\overrightarrow{AR} = t\\vec{b}$\`} />
            </div>
          </foreignObject>
          
          {/* Vector b */}
          <line x1="220" y1="35" x2="270" y2="11" stroke="#d97706" markerEnd="url(#arrow-head-yellow)" />
          
          <foreignObject x="245" y="-10" width="40" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600">
              <Latex text={String.raw\`$\\vec{b}$\`} />
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}`;

content = content.replace(regex, newComponent);
fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
console.log("Reverted to original Chap4_4_4_LineEq_Diag1");
