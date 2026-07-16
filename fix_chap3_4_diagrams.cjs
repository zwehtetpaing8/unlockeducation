const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const updatedCode = `
export function Chap3_4_PlaneABC() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 350 200" className="w-full max-w-[350px] h-auto overflow-visible font-serif">
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>
        <polygon points="50,150 250,150 300,50 100,50" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Points & Lines */}
        <circle cx="90" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="75" y="125" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">A</text>
        <text x="50" y="145" fontSize="12" className="fill-slate-900 dark:fill-slate-400 font-sans">(x₁, y₁, z₁)</text>

        <circle cx="180" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="185" y="60" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">B</text>

        <circle cx="260" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="265" y="135" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">C</text>

        {/* Vectors */}
        <line x1="90" y1="130" x2="175" y2="68" stroke="currentColor" className="text-slate-900 dark:text-slate-300" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="110" y="90" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-sans">⟨l₁, m₁, n₁⟩</text>

        <line x1="90" y1="130" x2="255" y2="130" stroke="currentColor" className="text-slate-900 dark:text-slate-300" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="150" y="145" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-sans">⟨l₂, m₂, n₂⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 220" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        <polygon points="60,170 230,170 250,90 80,90" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="140" y="140" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - z = 3</text>
        
        {/* Line */}
        <line x1="120" y1="30" x2="120" y2="145" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <line x1="120" y1="145" x2="120" y2="180" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Point P */}
        <circle cx="120" cy="145" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="150" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">P</text>
        
        {/* Top point */}
        <circle cx="120" cy="45" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="50" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>

        {/* Direction vector bracket */}
        <path d="M 110 70 L 100 70 L 100 120 L 110 120" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="85" y="95" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 85 95)">⟨3, -2, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 220" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        <polygon points="60,170 230,170 250,90 80,90" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="135" y="140" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="120" y1="30" x2="120" y2="145" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <line x1="120" y1="145" x2="120" y2="180" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" strokeDasharray="4 3" />
        
        {/* Point P */}
        <circle cx="120" cy="145" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="150" fontSize="14" className="fill-slate-900 dark:fill-slate-300 italic">P</text>
        
        {/* Top point */}
        <circle cx="120" cy="45" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="50" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(3, -2, -2)</text>

        {/* Direction vector bracket */}
        <path d="M 110 70 L 105 70 L 105 120 L 110 120" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="90" y="95" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 90 95)">⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>
        <text x="80" y="70" fontSize="16" className="fill-slate-900 dark:fill-slate-300 font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="120" y1="65" x2="120" y2="150" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(-1, 3, 2)</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="120" y1="10" x2="120" y2="210" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 240" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        {/* Top Plane */}
        <polygon points="50,90 190,90 220,30 80,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="65" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="70" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(2, 3, -1)</text>
        <text x="80" y="70" fontSize="16" className="fill-slate-900 dark:fill-slate-300 font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,180 190,180 220,120 80,120" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="95" y="160" fontSize="14" className="fill-slate-900 dark:fill-slate-300 font-mono">-2x + y + 3z = 6</text>
        
        {/* Line */}
        <line x1="120" y1="10" x2="120" y2="210" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Bracket */}
        <path d="M 115 85 L 110 85 L 110 135 L 115 135" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        <text x="95" y="110" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans" textAnchor="middle" transform="rotate(-90 95 110)">⟨-2, 1, 3⟩</text>
      </svg>
    </div>
  );
}
`;

const startIndex = content.indexOf('export function Chap3_4_PlaneABC() {');
const endIndex = content.indexOf('export function Chap3_4_Q3_Sol() {');
const nextFuncIndex = content.indexOf('export function', endIndex + 10);

const finalContent = content.substring(0, startIndex) + updatedCode + content.substring(nextFuncIndex);

fs.writeFileSync('src/components/Latex.tsx', finalContent, 'utf8');
