const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newDiagramCode = `
export function Chap4_AngleBetweenVectors() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="320" height="240" viewBox="-20 -20 300 220" className="drop-shadow-sm">
        <defs>
          <marker id="arrow-axis" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#d4d4d8" />
          </marker>
          <marker id="arrow-vec" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#eab308" />
          </marker>
        </defs>

        {/* Axes */}
        <line x1="20" y1="180" x2="260" y2="180" stroke="#d4d4d8" strokeWidth="1.5" markerEnd="url(#arrow-axis)" />
        <line x1="20" y1="180" x2="20" y2="20" stroke="#d4d4d8" strokeWidth="1.5" markerEnd="url(#arrow-axis)" />
        <text x="265" y="185" fontSize="14" fill="#a1a1aa" fontFamily="serif" fontStyle="italic">x</text>
        <text x="5" y="25" fontSize="14" fill="#a1a1aa" fontFamily="serif" fontStyle="italic">y</text>

        {/* Origin */}
        <text x="0" y="195" fontSize="14" fill="#a1a1aa" className="font-serif font-italic">O</text>

        {/* Angle arc */}
        <path d="M 60 170 A 40 40 0 0 0 45 130" fill="none" stroke="#52525b" strokeWidth="1.5" />
        <text x="65" y="150" fontSize="14" fill="#52525b" className="dark:fill-slate-400" fontFamily="serif" fontStyle="italic">θ</text>

        {/* Vectors */}
        {/* Vector a: O to A (200, 135) */}
        <line x1="20" y1="180" x2="200" y2="135" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec)" />
        
        {/* Vector b: O to B (100, 50) */}
        <line x1="20" y1="180" x2="100" y2="50" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec)" />
        
        {/* Vector b-a: A to B */}
        <line x1="200" y1="135" x2="100" y2="50" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec)" />

        {/* Labels */}
        <text x="210" y="135" fontSize="12" fill="#ca8a04" className="font-serif font-semibold">A(x₁, y₁)</text>
        <text x="110" y="45" fontSize="12" fill="#ca8a04" className="font-serif font-semibold">B(x₂, y₂)</text>

        {/* Vector names */}
        <text x="120" y="170" fontSize="14" fill="#ca8a04" className="font-serif italic">
          a
        </text>
        <text x="120" y="166" fontSize="14" fill="#ca8a04">→</text>

        <text x="45" y="110" fontSize="14" fill="#ca8a04" className="font-serif italic">
          b
        </text>
        <text x="45" y="106" fontSize="14" fill="#ca8a04">→</text>

        <text x="155" y="85" fontSize="14" fill="#ca8a04" className="font-serif italic">
          b - a
        </text>
        <text x="155" y="81" fontSize="14" fill="#ca8a04">→</text>
        <text x="175" y="81" fontSize="14" fill="#ca8a04">→</text>

      </svg>
    </div>
  );
}
`;

content = content.replace(/export function Chap4_AngleBetweenVectors\(\) \{[\s\S]*?\n\}\n/g, '');
content = content.replace("export function Chap4_Ex9()", newDiagramCode + "\nexport function Chap4_Ex9()");

fs.writeFileSync('src/components/Latex.tsx', content);

let contentData = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');
contentData = contentData.replace(
  "$$ |AB|^2 = |OA|^2 + |OB|^2 - 2|OA||OB|\\cos\\theta. $$",
  "$$ |\\overrightarrow{AB}|^2 = |\\overrightarrow{OA}|^2 + |\\overrightarrow{OB}|^2 - 2|\\overrightarrow{OA}||\\overrightarrow{OB}|\\cos\\theta. $$"
);
fs.writeFileSync('src/data/chapter4_content.ts', contentData);
