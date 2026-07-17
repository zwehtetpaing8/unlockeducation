const fs = require('fs');

let code = fs.readFileSync('src/components/Latex.tsx', 'utf-8');

const regex = /export function Chap3_4_Ex9\(\) \{[\s\S]*?(?=export default function Latex)/;

const newBlock = `export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="220" viewBox="0 0 300 220" className="max-w-full h-auto">
        {/* Plane - Sloping downwards to right */}
        <polygon points="100,60 260,80 260,150 100,130" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="250" y="135" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">3x - 2y - z = 3</text>
        
        {/* Main Vertical Line */}
        <line x1="180" y1="45" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbol on the left */}
        <path d="M 180 95 L 170 93.75 L 170 103.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="180" cy="105" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="110" fontSize="13" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="180" cy="45" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="49" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>
        
        {/* Vector Text */}
        <text x="155" y="75" transform="rotate(-90 155 75)" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="middle">⟨3, -2, -1⟩</text>
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
        <text x="250" y="135" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">-2x + 3y - z = 4</text>
        
        {/* Main Vertical Line */}
        <line x1="180" y1="45" x2="180" y2="180" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbol on the left */}
        <path d="M 180 95 L 170 93.75 L 170 103.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Point P */}
        <circle cx="180" cy="105" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="110" fontSize="13" fill="currentColor" className="text-slate-900 dark:text-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="180" cy="45" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="49" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(3, -2, -2)</text>
        
        {/* Vector Text */}
        <text x="155" y="75" transform="rotate(-90 155 75)" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="middle">⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="100,40 260,60 260,110 100,90" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        <circle cx="180" cy="75" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="79" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(-1, 3, 2)</text>

        {/* Bottom Plane */}
        <polygon points="100,160 260,180 260,230 100,210" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="250" y="215" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">3x - 2y - 3z = 2</text>
        
        {/* Main Vertical Line */}
        <line x1="180" y1="20" x2="180" y2="245" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane */}
        <path d="M 180 65 L 170 63.75 L 170 73.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane */}
        <path d="M 180 185 L 170 183.75 L 170 193.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Vector Text */}
        <text x="155" y="135" transform="rotate(-90 155 135)" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="middle">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
      <svg width="300" height="260" viewBox="0 0 300 260" className="max-w-full h-auto">
        {/* Top Plane */}
        <polygon points="100,40 260,60 260,110 100,90" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        <circle cx="180" cy="75" r="2" fill="currentColor" className="text-slate-900 dark:text-white" />
        <text x="188" y="79" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white">(2, 3, -1)</text>

        {/* Bottom Plane */}
        <polygon points="100,160 260,180 260,230 100,210" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        <text x="250" y="215" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="end">-2x + y + 3z = 6</text>
        
        {/* Main Vertical Line */}
        <line x1="180" y1="20" x2="180" y2="245" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1.5" />
        
        {/* Right angle symbols (on the left) */}
        {/* Top plane */}
        <path d="M 180 65 L 170 63.75 L 170 73.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        {/* Bottom plane */}
        <path d="M 180 185 L 170 183.75 L 170 193.75" fill="none" stroke="currentColor" className="text-slate-900 dark:text-white" strokeWidth="1" />
        
        {/* Vector Text */}
        <text x="155" y="135" transform="rotate(-90 155 135)" fontSize="11" fill="currentColor" className="text-slate-900 dark:text-white font-mono" textAnchor="middle">⟨-2, 1, 3⟩</text>
      </svg>
    </div>
  );
}
\`;

fs.writeFileSync('src/components/Latex.tsx', code.replace(regex, newBlock));
