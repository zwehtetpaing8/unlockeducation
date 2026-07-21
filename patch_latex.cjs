const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const switchCase = `
        case 'Chap4_AngleBetweenVectors':
          renderedElements.push(<Chap4_AngleBetweenVectors key={\`diag-\${i}\`} />);
          break;
`;
content = content.replace("case 'Chap4_Fig1':", switchCase + "        case 'Chap4_Fig1':");

const componentCode = `
export function Chap4_AngleBetweenVectors() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="240" height="200" viewBox="-20 -20 220 180" className="drop-shadow-sm">
        <defs>
          <marker id="arrow-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10b981" />
          </marker>
          <marker id="arrow-ba" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#f43f5e" />
          </marker>
        </defs>

        {/* Angle arc */}
        <path d="M 35 150 A 35 35 0 0 0 45 125" fill="none" stroke="#64748b" strokeWidth="2" />
        <text x="50" y="145" fontSize="16" fill="#64748b" fontFamily="serif" fontStyle="italic">θ</text>

        {/* Vectors */}
        <line x1="10" y1="150" x2="160" y2="150" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrow-a)" />
        <line x1="10" y1="150" x2="80" y2="50" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-b)" />
        <line x1="160" y1="150" x2="80" y2="50" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-ba)" strokeDasharray="4 2" />

        {/* Labels */}
        <text x="170" y="155" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">A(x₁, y₁)</text>
        <text x="60" y="40" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">B(x₂, y₂)</text>
        <text x="-5" y="165" fontSize="14" fill="#334155" className="dark:fill-slate-300 font-bold font-serif">O</text>

        {/* Vector names */}
        <text x="90" y="170" fontSize="16" fill="#3b82f6" className="font-bold font-serif font-italic">a</text>
        <text x="25" y="90" fontSize="16" fill="#10b981" className="font-bold font-serif font-italic">b</text>
        <text x="125" y="95" fontSize="16" fill="#f43f5e" className="font-bold font-serif font-italic">b - a</text>
      </svg>
      <div className="text-xs text-slate-500 font-medium mt-3">Angle between two vectors</div>
    </div>
  );
}
`;

content = content.replace("export function Chap4_Fig1()", componentCode + "\nexport function Chap4_Fig1()");

fs.writeFileSync('src/components/Latex.tsx', content);
