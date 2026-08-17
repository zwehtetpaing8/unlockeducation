const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const regex = /export function Chap4_4_4_LineEq_Diag1\(\) \{[\s\S]*?\}\);?\n\}/;

const newComponent = `export function Chap4_4_4_LineEq_Diag1() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[500px] aspect-[500/280]">
        <svg viewBox="0 0 500 280" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <defs>
            <marker id="arrow-head-slate" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
            </marker>
            <marker id="arrow-head-yellow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse">
              <path d="M 0 0 L 8 4 L 0 8 z" fill="#d97706" />
            </marker>
          </defs>
          
          {/* Line l */}
          <line x1="120" y1="210" x2="460" y2="40" stroke="#d97706" strokeWidth="1.5" />
          <text x="470" y="45" fill="#d97706" fontSize="16" className="font-serif italic">l</text>

          {/* Vector b */}
          <line x1="320" y1="60" x2="380" y2="30" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow)" />
          <foreignObject x="310" y="5" width="60" height="45" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full text-sm text-amber-600">
              <Latex text={String.raw\`$\\vec{b}$\`} />
            </div>
          </foreignObject>

          {/* Arrow on AR */}
          <line x1="200" y1="170" x2="280" y2="130" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-head-yellow)" />

          {/* Vectors OA and OR */}
          <line x1="100" y1="220" x2="195" y2="172.5" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate)" />
          
          <line x1="100" y1="220" x2="355" y2="92.5" stroke="currentColor" strokeWidth="1.5" className="text-slate-900 dark:text-white" markerEnd="url(#arrow-head-slate)" />

          {/* Vector AR = tb label */}
          <foreignObject x="270" y="145" width="120" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-start justify-start w-full h-full text-sm text-amber-600">
              <Latex text={String.raw\`$\\overrightarrow{AR} = t\\vec{b}$\`} />
            </div>
          </foreignObject>

          {/* OA label */}
          <foreignObject x="10" y="150" width="120" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-end justify-end w-full h-full text-sm text-slate-900 dark:text-white">
              <Latex text={String.raw\`$\\vec{a} = \\overrightarrow{OA}$\`} />
            </div>
          </foreignObject>
          
          {/* OR label */}
          <foreignObject x="230" y="185" width="120" height="40" overflow="visible">
            <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-start justify-start w-full h-full text-sm text-slate-900 dark:text-white">
              <Latex text={String.raw\`$\\vec{r} = \\overrightarrow{OR}$\`} />
            </div>
          </foreignObject>

          {/* Points: Origin O */}
          <circle cx="100" cy="220" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="85" y="235" fill="currentColor" fontSize="16" className="text-slate-900 dark:text-white font-serif italic">O</text>

          {/* Point A */}
          <circle cx="200" cy="170" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="180" y="160" fill="currentColor" fontSize="16" className="text-slate-900 dark:text-white font-serif italic">A</text>
          
          {/* Point R */}
          <circle cx="360" cy="90" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
          <text x="365" y="105" fill="currentColor" fontSize="16" className="text-slate-900 dark:text-white font-serif italic">R</text>

        </svg>
      </div>
    </div>
  );
}`;

content = content.replace(regex, newComponent);
fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
console.log("Restored the good diagram version");
