const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newDiagramCode = `
export function Chap4_AngleBetweenVectors() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm my-6">
      <svg width="320" height="260" viewBox="-20 -20 300 240" className="drop-shadow-sm overflow-visible">
        {/* Axes */}
        <line x1="20" y1="200" x2="258" y2="200" stroke="#ca8a04" strokeWidth="1.5" />
        <polygon points="260,200 252,196 252,204" fill="#ca8a04" />
        
        <line x1="20" y1="200" x2="20" y2="22" stroke="#ca8a04" strokeWidth="1.5" />
        <polygon points="20,20 16,28 24,28" fill="#ca8a04" />
        
        {/* Axis Labels */}
        <text x="265" y="205" fontSize="14" fill="#ca8a04" fontFamily="serif" fontStyle="italic">x</text>
        <text x="5" y="30" fontSize="14" fill="#ca8a04" fontFamily="serif" fontStyle="italic">y</text>

        {/* Origin */}
        <text x="0" y="215" fontSize="14" fill="#ca8a04" className="font-serif font-italic">O</text>

        {/* Angle arc */}
        <path d="M 60 192 A 40 40 0 0 0 45 152" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
        <polygon points="45,152 48,158 52,154" fill="#ca8a04" />
        <text x="65" y="175" fontSize="14" fill="#ca8a04" className="font-serif font-italic">θ</text>

        {/* Vectors */}
        {/* Vector a: O to A (220, 160) */}
        <line x1="20" y1="200" x2="218" y2="160.4" stroke="#eab308" strokeWidth="2" />
        <polygon points="220,160 212.9,165.5 211.4,157.6" fill="#eab308" />
        
        {/* Vector b: O to B (120, 60) */}
        <line x1="20" y1="200" x2="118.8" y2="61.7" stroke="#eab308" strokeWidth="2" />
        <polygon points="120,60 118.6,68.8 112.1,64.2" fill="#eab308" />
        
        {/* Vector b-a: A to B */}
        <line x1="220" y1="160" x2="121.4" y2="61.4" stroke="#eab308" strokeWidth="2" />
        <polygon points="120,60 122.8,68.5 128.5,62.8" fill="#eab308" />

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
