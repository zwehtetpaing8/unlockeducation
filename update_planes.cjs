const fs = require('fs');
const content = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

const regex = /export function Chap3_4_Ex9\(\) \{[\s\S]*?(?=export default function Latex)/;

const newBlock = `export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto">
        {/* Plane - Sloping downwards to right */}
        <polygon points="100,60 260,80 260,150 100,130" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="210" y="140" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">3x - 2y - z = 3</text>
        
        {/* Line */}
        <line x1="180" y1="30" x2="180" y2="111" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="111" x2="180" y2="146" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="146" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbol on the left */}
        <path d="M 180 96 L 165 94 L 165 109" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="180" cy="111" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="115" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="180" cy="50" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="54" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto">
        {/* Plane - Sloping downwards to right */}
        <polygon points="100,60 260,80 260,150 100,130" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="210" y="140" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="180" y1="30" x2="180" y2="111" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="111" x2="180" y2="146" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="146" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbol on the left */}
        <path d="M 180 96 L 165 94 L 165 109" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="180" cy="111" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="115" fontSize="12" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="180" cy="50" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="54" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(3, -2, -2)</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="100,40 260,60 260,100 100,80" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        <circle cx="180" cy="70" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="74" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>

        {/* Bottom Plane */}
        <polygon points="100,150 260,170 260,210 100,190" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="210" y="200" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="180" y1="20" x2="180" y2="70" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="70" x2="180" y2="90" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="90" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="180" x2="180" y2="200" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="200" x2="180" y2="240" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane */}
        <path d="M 180 55 L 165 53 L 165 68" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane */}
        <path d="M 180 165 L 165 163 L 165 178" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="100,40 260,60 260,100 100,80" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        <circle cx="180" cy="70" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="74" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(2, 3, -1)</text>

        {/* Bottom Plane */}
        <polygon points="100,150 260,170 260,210 100,190" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="210" y="200" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">-2x + y + 3z = 6</text>
        
        {/* Line */}
        <line x1="180" y1="20" x2="180" y2="70" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="70" x2="180" y2="90" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="90" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <line x1="180" y1="180" x2="180" y2="200" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="180" y1="200" x2="180" y2="240" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane */}
        <path d="M 180 55 L 165 53 L 165 68" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane */}
        <path d="M 180 165 L 165 163 L 165 178" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
      </svg>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', content.replace(regex, newBlock));
