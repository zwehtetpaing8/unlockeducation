const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

const regex = /\/\/\s*Chapter 3\.4 Diagrams[\s\S]*?(?=\/\/\s*Chapter 3\.5 Diagrams|\/\/\s*======================================================|export default function Latex)/;

const newCode = `// Chapter 3.4 Diagrams
// -----------------------------------------------------------------
export function Chap3_4_PlaneABC() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="200" viewBox="0 0 300 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        {/* Plane A B C */}
        <polygon points="50,150 250,150 280,50 80,50" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Points */}
        <circle cx="100" cy="120" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="80" y="115" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">A</text>
        <text x="60" y="135" fontSize="10" fill="#64748b"> (x₁, y₁, z₁) </text>

        <circle cx="180" cy="60" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="185" y="55" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">B</text>

        <circle cx="230" cy="120" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="235" y="125" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">C</text>

        {/* Vectors */}
        <line x1="100" y1="120" x2="175" y2="64" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="110" y="85" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">⟨l₁, m₁, n₁⟩</text>

        <line x1="100" y1="120" x2="225" y2="120" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="145" y="135" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">⟨l₂, m₂, n₂⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto">
        {/* Plane - Sloping downwards to right */}
        {/* 130,50 to 230,70 for top edge. 130,120 to 230,140 for bottom edge */}
        <polygon points="130,50 230,70 230,140 130,120" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="155" y="105" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono">3x - 2y - z = 3</text>
        
        {/* Line */}
        {/* Intersection at x=145. Bottom edge y = 120 + 20/100 * 15 = 123 */}
        <line x1="145" y1="30" x2="145" y2="123" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="145" y1="123" x2="145" y2="170" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Right angle symbol on the left */}
        {/* Edge slope = +0.2. Parallel segment from (145, 113) to left (135). dx = -10, dy = -2. So (135, 111). Then down dx=0, dy=10 => (135, 121). */}
        <path d="M 145 113 L 135 111 L 135 121" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="145" cy="123" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="150" y="135" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="145" cy="40" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="155" y="45" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>

        {/* Bracket and Vector */}
        <path d="M 140 60 L 135 60 L 135 105 L 140 105" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <text x="125" y="82.5" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 125 82.5)" textAnchor="middle">⟨3, -2, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto">
        {/* Plane - Sloping downwards to right */}
        <polygon points="130,50 230,70 230,140 130,120" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="145" y="105" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="145" y1="30" x2="145" y2="123" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="145" y1="123" x2="145" y2="170" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Right angle symbol on the left */}
        <path d="M 145 113 L 135 111 L 135 121" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="145" cy="123" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="150" y="135" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="145" cy="40" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="155" y="45" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(3, -2, -2)</text>

        {/* Bracket and Vector */}
        <path d="M 140 60 L 135 60 L 135 105 L 140 105" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <text x="125" y="82.5" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 125 82.5)" textAnchor="middle">⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="120,40 220,60 220,120 120,100" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="100" y="70" fontSize="14" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">Π</text>
        
        <circle cx="150" cy="75" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="160" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>

        {/* Bottom Plane */}
        <polygon points="120,140 220,160 220,220 120,200" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="140" y="200" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        {/* Intersection at x=135. Top bottom edge = 100 + 20/100 * 15 = 103. Bottom bottom edge = 200 + 3 = 203 */}
        <line x1="135" y1="20" x2="135" y2="240" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane intersection y = 103 */}
        <path d="M 135 93 L 125 91 L 125 101" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane intersection y = 203 */}
        <path d="M 135 193 L 125 191 L 125 201" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />

        {/* Bracket and Vector */}
        <path d="M 130 115 L 125 115 L 125 175 L 130 175" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <text x="115" y="145" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 115 145)" textAnchor="middle">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="120,40 220,60 220,120 120,100" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="100" y="70" fontSize="14" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">Π</text>
        
        <circle cx="150" cy="75" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="160" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(2, 3, -1)</text>

        {/* Bottom Plane */}
        <polygon points="120,140 220,160 220,220 120,200" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="135" y="200" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono">-2x + y + 3z = 6</text>
        
        {/* Line */}
        <line x1="135" y1="20" x2="135" y2="240" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane intersection y = 103 */}
        <path d="M 135 93 L 125 91 L 125 101" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane intersection y = 203 */}
        <path d="M 135 193 L 125 191 L 125 201" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />

        {/* Bracket and Vector */}
        <path d="M 130 115 L 125 115 L 125 175 L 130 175" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <text x="115" y="145" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" transform="rotate(-90 115 145)" textAnchor="middle">⟨-2, 1, 3⟩</text>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', code.replace(regex, newCode));
