const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newDiagramCode = `
export function Chap4_AngleBetweenVectors() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="320" height="260" viewBox="-20 -20 300 240" className="drop-shadow-sm overflow-visible">
        <defs>
          <marker id="arrow-vec-chap4-angle" viewBox="0 0 10 10" markerWidth="6" markerHeight="6" refX="8" refY="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 Z" fill="#eab308" />
          </marker>
          <marker id="arrow-axis-chap4-angle" viewBox="0 0 10 10" markerWidth="6" markerHeight="6" refX="8" refY="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 Z" fill="#ca8a04" />
          </marker>
          <marker id="arrow-arc-chap4-angle" viewBox="0 0 10 10" markerWidth="6" markerHeight="6" refX="8" refY="5" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 Z" fill="#ca8a04" />
          </marker>
        </defs>

        {/* Axes */}
        <line x1="20" y1="200" x2="260" y2="200" stroke="#ca8a04" strokeWidth="1.5" markerEnd="url(#arrow-axis-chap4-angle)" />
        <line x1="20" y1="200" x2="20" y2="20" stroke="#ca8a04" strokeWidth="1.5" markerEnd="url(#arrow-axis-chap4-angle)" />
        
        {/* Axis Labels */}
        <text x="265" y="205" fontSize="14" fill="#ca8a04" fontFamily="serif" fontStyle="italic">x</text>
        <text x="5" y="30" fontSize="14" fill="#ca8a04" fontFamily="serif" fontStyle="italic">y</text>

        {/* Origin */}
        <text x="0" y="215" fontSize="14" fill="#ca8a04" className="font-serif font-italic">O</text>

        {/* Angle arc */}
        <path d="M 60 192 A 40 40 0 0 0 45 152" fill="none" stroke="#ca8a04" strokeWidth="1.5" markerEnd="url(#arrow-arc-chap4-angle)" />
        <text x="65" y="175" fontSize="14" fill="#ca8a04" className="font-serif font-italic">θ</text>

        {/* Vectors */}
        {/* Vector a: O to A (220, 160) */}
        <line x1="20" y1="200" x2="220" y2="160" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec-chap4-angle)" />
        
        {/* Vector b: O to B (120, 60) */}
        <line x1="20" y1="200" x2="120" y2="60" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec-chap4-angle)" />
        
        {/* Vector b-a: A to B */}
        <line x1="220" y1="160" x2="120" y2="60" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrow-vec-chap4-angle)" />

        {/* Labels */}
        <text x="225" y="160" fontSize="12" fill="#ca8a04" className="font-serif">A(x₁, y₁)</text>
        <text x="125" y="55" fontSize="12" fill="#ca8a04" className="font-serif">B(x₂, y₂)</text>

        {/* Vector names */}
        {/* Vector a */}
        <g transform="translate(130, 195)">
          <text x="0" y="0" fontSize="14" fill="#ca8a04" className="font-serif italic">a</text>
          <path d="M 0 -12 L 6 -12 L 4 -14 M 6 -12 L 4 -10" stroke="#ca8a04" strokeWidth="1" fill="none" />
        </g>

        {/* Vector b */}
        <g transform="translate(60, 130)">
          <text x="0" y="0" fontSize="14" fill="#ca8a04" className="font-serif italic">b</text>
          <path d="M 0 -12 L 6 -12 L 4 -14 M 6 -12 L 4 -10" stroke="#ca8a04" strokeWidth="1" fill="none" />
        </g>

        {/* Vector b - a */}
        <g transform="translate(180, 100)">
          <text x="0" y="0" fontSize="14" fill="#ca8a04" className="font-serif italic">b - a</text>
          <path d="M 0 -12 L 6 -12 L 4 -14 M 6 -12 L 4 -10" stroke="#ca8a04" strokeWidth="1" fill="none" />
          <path d="M 23 -12 L 29 -12 L 27 -14 M 29 -12 L 27 -10" stroke="#ca8a04" strokeWidth="1" fill="none" />
        </g>

      </svg>
    </div>
  );
}
`;

content = content.replace(/export function Chap4_AngleBetweenVectors\(\) \{[\s\S]*?\n\}\n/g, '');
content = content.replace("export function Chap4_Ex9()", newDiagramCode + "\nexport function Chap4_Ex9()");

fs.writeFileSync('src/components/Latex.tsx', content);
