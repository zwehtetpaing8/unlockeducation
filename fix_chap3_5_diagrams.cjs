const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const newDiagrams = `
export function Chap3_5_Intro_Sphere() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 250 250" className="w-full max-w-[250px] h-auto overflow-visible font-serif">
        <circle cx="125" cy="125" r="90" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="125" cy="125" rx="90" ry="25" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Center Point */}
        <circle cx="125" cy="125" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="130" y="140" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(x₁, y₁, z₁)</text>
        
        {/* Surface Point */}
        <circle cx="185" cy="58" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="195" y="55" fontSize="13" className="fill-slate-900 dark:fill-slate-300 font-sans">(x, y, z)</text>
        
        {/* Radius line */}
        <line x1="125" y1="125" x2="185" y2="58" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.2" />
        <text x="145" y="85" fontSize="16" className="fill-slate-900 dark:fill-slate-300 font-serif italic">r</text>
      </svg>
    </div>
  );
}

export function Chap3_5_Ex11_Sphere() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 280 220" className="w-full max-w-[280px] h-auto overflow-visible font-serif">
        <circle cx="110" cy="130" r="70" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="110" cy="130" rx="70" ry="20" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Center Point */}
        <circle cx="110" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="75" y="145" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans">C(2, 1, -1)</text>
        
        {/* Surface Point P */}
        <circle cx="160" cy="80" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="175" y="75" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans">P(3, 4, 1)</text>
        
        {/* Radius line */}
        <line x1="110" y1="130" x2="160" y2="80" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Tangent Plane */}
        <polygon points="120,40 210,20 260,80 170,100" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <path d="M 152 88 L 145 81 L 151 75" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function Chap3_5_Q4_Sphere() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
      <svg viewBox="0 0 280 220" className="w-full max-w-[280px] h-auto overflow-visible font-serif">
        <circle cx="110" cy="130" r="70" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx="110" cy="130" rx="70" ry="20" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Center Point */}
        <circle cx="110" cy="130" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="65" y="145" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans">C(-2, 1, -3)</text>
        
        {/* Surface Point P */}
        <circle cx="160" cy="80" r="3" className="fill-slate-900 dark:fill-slate-300" />
        <text x="175" y="75" fontSize="12" className="fill-slate-900 dark:fill-slate-300 font-sans">P(3, 2, -2)</text>
        
        {/* Radius line */}
        <line x1="110" y1="130" x2="160" y2="80" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
        
        {/* Tangent Plane */}
        <polygon points="120,40 210,20 260,80 170,100" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1.5" />
        <path d="M 152 88 L 145 81 L 151 75" fill="none" className="stroke-slate-900 dark:stroke-slate-300" strokeWidth="1" />
      </svg>
    </div>
  );
}

`;

const markerStr = 'function SpherePlaneTangentDiagram() {';
const startIndex = content.indexOf(markerStr);
const nextFunc = content.indexOf('function ', startIndex + 10);

if (startIndex > -1) {
  content = content.substring(0, startIndex) + newDiagrams + (nextFunc > -1 ? content.substring(nextFunc) : '');
}

fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
