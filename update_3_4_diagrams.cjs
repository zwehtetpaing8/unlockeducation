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
      <svg width="250" height="200" viewBox="0 0 250 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-ex9" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <polygon points="60,160 220,160 240,80 80,80" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="140" y="130" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-mono">3x - 2y - z = 3</text>
        
        {/* Line */}
        <line x1="100" y1="30" x2="100" y2="135" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="100" y2="170" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Right angle symbol */}
        <path d="M 100 125 L 108 123 L 108 133" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="100" cy="135" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="110" y="145" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="100" cy="40" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="110" y="45" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>

        {/* Direction vector */}
        <line x1="140" y1="60" x2="140" y2="100" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-ex9)" />
        <text x="150" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">d</text>
        <text x="150" y="90" fontSize="10" fill="#64748b">= ⟨3, -2, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="250" height="200" viewBox="0 0 250 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-q2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        <polygon points="60,160 220,160 240,80 80,80" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="130" y="130" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-mono">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="100" y1="30" x2="100" y2="135" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="100" y2="170" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Right angle symbol */}
        <path d="M 100 125 L 108 123 L 108 133" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="100" cy="135" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="110" y="145" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="100" cy="40" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="110" y="45" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(3, -2, -2)</text>

        {/* Direction vector */}
        <line x1="140" y1="60" x2="140" y2="100" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-q2)" />
        <text x="150" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">d</text>
        <text x="150" y="90" fontSize="10" fill="#64748b">= ⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="250" height="200" viewBox="0 0 250 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-ex10-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="130" y="60" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>
        <text x="80" y="60" fontSize="14" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">Π</text>
        
        {/* Normal Vector 1 (Top Plane) */}
        <line x1="140" y1="65" x2="140" y2="20" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-ex10-1)" />
        <text x="150" y="30" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">n</text>
        <text x="150" y="45" fontSize="10" fill="#64748b">= ⟨3, -2, -3⟩</text>
        <path d="M 140 55 L 148 53 L 148 63" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <circle cx="140" cy="65" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />

        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-mono">3x - 2y - 3z = 2</text>
        
        {/* Normal Vector 2 (Bottom Plane) */}
        <line x1="140" y1="135" x2="140" y2="90" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-ex10-1)" />
        <text x="150" y="100" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">n</text>
        <text x="150" y="115" fontSize="10" fill="#64748b">= ⟨3, -2, -3⟩</text>
        <path d="M 140 125 L 148 123 L 148 133" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <circle cx="140" cy="135" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="250" height="200" viewBox="0 0 250 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-ex10-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="130" y="60" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>
        <text x="80" y="60" fontSize="14" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line perpendicular to both planes */}
        <line x1="120" y1="20" x2="120" y2="55" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="120" y1="55" x2="120" y2="125" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="120" y1="125" x2="120" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angles */}
        <path d="M 120 45 L 128 43 L 128 53" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <path d="M 120 115 L 128 113 L 128 123" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        <circle cx="120" cy="125" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        
        {/* Direction vector arrow */}
        <line x1="175" y1="60" x2="175" y2="100" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-ex10-2)" />
        <text x="185" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">d</text>
        <text x="185" y="90" fontSize="10" fill="#64748b">= ⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="250" height="200" viewBox="0 0 250 200" className="max-w-full h-auto">
        <defs>
          <marker id="arrow-q3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" className="text-slate-900 dark:text-white" />
          </marker>
        </defs>
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="130" y="60" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(2, 3, -1)</text>
        <text x="80" y="60" fontSize="14" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-mono">-2x + y + 3z = 6</text>
        
        {/* Line perpendicular to both planes */}
        <line x1="120" y1="20" x2="120" y2="55" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="120" y1="55" x2="120" y2="125" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="120" y1="125" x2="120" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angles */}
        <path d="M 120 45 L 128 43 L 128 53" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        <path d="M 120 115 L 128 113 L 128 123" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        <circle cx="120" cy="125" r="3" fill="currentColor" className="text-slate-900 dark:text-white" />
        
        {/* Direction vector arrow */}
        <line x1="175" y1="60" x2="175" y2="100" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" markerEnd="url(#arrow-q3)" />
        <text x="185" y="75" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">d</text>
        <text x="185" y="90" fontSize="10" fill="#64748b">= ⟨-2, 1, 3⟩</text>
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', code.replace(regex, newCode));
