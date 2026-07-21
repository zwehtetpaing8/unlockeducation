const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const switchCase = `
        case 'Chap4_Ex9':
          renderedElements.push(<Chap4_Ex9 key={\`diag-\${i}\`} />);
          break;
        case 'Chap4_Ex4_2_Q6':
          renderedElements.push(<Chap4_Ex4_2_Q6 key={\`diag-\${i}\`} />);
          break;
`;
content = content.replace("case 'Chap4_AngleBetweenVectors':", switchCase + "        case 'Chap4_AngleBetweenVectors':");

const componentCode = `
export function Chap4_Ex9() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="240" height="200" viewBox="0 0 240 200" className="drop-shadow-sm">
        <defs>
          <marker id="arrow-pq" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-pr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
          </marker>
        </defs>

        {/* Triangle sides */}
        <line x1="40" y1="160" x2="200" y2="160" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-pq)" />
        <line x1="40" y1="160" x2="120" y2="40" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-pr)" />
        <line x1="200" y1="160" x2="120" y2="40" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

        {/* Points */}
        <circle cx="40" cy="160" r="4" fill="#334155" className="dark:fill-slate-300" />
        <circle cx="200" cy="160" r="4" fill="#334155" className="dark:fill-slate-300" />
        <circle cx="120" cy="40" r="4" fill="#334155" className="dark:fill-slate-300" />

        {/* Angle arc */}
        <path d="M 65 160 A 25 25 0 0 0 55 138" fill="none" stroke="#64748b" strokeWidth="2" />

        {/* Labels */}
        <text x="25" y="175" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">P</text>
        <text x="205" y="175" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">Q</text>
        <text x="115" y="30" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">R</text>

        {/* Vector names */}
        <text x="110" y="180" fontSize="16" fill="#3b82f6" className="font-bold font-serif font-italic">PQ</text>
        <text x="50" y="90" fontSize="16" fill="#10b981" className="font-bold font-serif font-italic">PR</text>
      </svg>
      <div className="text-xs text-slate-500 font-medium mt-3">Triangle PQR</div>
    </div>
  );
}

export function Chap4_Ex4_2_Q6() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="260" height="200" viewBox="0 0 260 200" className="drop-shadow-sm">
        <defs>
          <marker id="arrow-ab" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-ad" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
          </marker>
          <marker id="arrow-dc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-bc" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
          </marker>
        </defs>

        {/* Parallelogram sides */}
        <line x1="40" y1="160" x2="160" y2="160" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-ab)" />
        <line x1="40" y1="160" x2="100" y2="40" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-ad)" />
        <line x1="100" y1="40" x2="220" y2="40" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-dc)" />
        <line x1="160" y1="160" x2="220" y2="40" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-bc)" />

        {/* Diagonals */}
        <line x1="40" y1="160" x2="220" y2="40" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="160" y1="160" x2="100" y2="40" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Points */}
        <circle cx="40" cy="160" r="4" fill="#334155" className="dark:fill-slate-300" />
        <circle cx="160" cy="160" r="4" fill="#334155" className="dark:fill-slate-300" />
        <circle cx="220" cy="40" r="4" fill="#334155" className="dark:fill-slate-300" />
        <circle cx="100" cy="40" r="4" fill="#334155" className="dark:fill-slate-300" />

        {/* Labels */}
        <text x="25" y="175" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">A</text>
        <text x="165" y="175" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">B</text>
        <text x="230" y="45" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">C</text>
        <text x="85" y="45" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">D</text>

        {/* Vector names */}
        <text x="90" y="180" fontSize="16" fill="#3b82f6" className="font-bold font-serif font-italic">a</text>
        <text x="50" y="100" fontSize="16" fill="#10b981" className="font-bold font-serif font-italic">b</text>
      </svg>
      <div className="text-xs text-slate-500 font-medium mt-3">Parallelogram ABCD</div>
    </div>
  );
}
`;

content = content.replace("export function Chap4_Fig1()", componentCode + "\nexport function Chap4_Fig1()");

fs.writeFileSync('src/components/Latex.tsx', content);
