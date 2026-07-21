const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function getArrowPolygon(x, y, dx, dy, color) {
    const L = 8;
    const W = 4;
    const angleRad = Math.atan2(dy, dx);
    const p1x = x - L * Math.cos(angleRad) + W * Math.sin(angleRad);
    const p1y = y - L * Math.sin(angleRad) - W * Math.cos(angleRad);
    const p2x = x - L * Math.cos(angleRad) - W * Math.sin(angleRad);
    const p2y = y - L * Math.sin(angleRad) + W * Math.cos(angleRad);
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" />`;
}

// Chap4_Fig3 replacement

let newContent = content.substring(0, content.indexOf('export function Chap4_Fig3'));
let after = content.substring(content.indexOf('export function Chap4_Fig3'));
let funcContent = after.substring(0, after.indexOf('export function Chap4_Fig4'));
let rest = after.substring(after.indexOf('export function Chap4_Fig4'));

funcContent = `export function Chap4_Fig3() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-72 h-72">
        <svg viewBox="-60 -60 250 250" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <defs>
            <marker id="arrow-Chap4_Fig3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto" overflow="visible">
              <path d="M 0 2 L 10 5 L 0 8 z" fill="currentColor" />
            </marker>
          </defs>
          
          <line x1="50" y1="100" x2="-38.2" y2="144.1" stroke="#64748b" />
          <polygon points="-40.0,145.0 -31.1,145.0 -34.6,137.8" fill="#64748b" />
          <line x1="50" y1="100" x2="168.0" y2="100.0" stroke="#64748b" />
          <polygon points="170.0,100.0 162.0,96.0 162.0,104.0" fill="#64748b" />
          <line x1="50" y1="100" x2="50.0" y2="-18.0" stroke="#64748b" />
          <polygon points="50.0,-20.0 46.0,-12.0 54.0,-12.0" fill="#64748b" />
          
          <text x="-45" y="150" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="175" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-30" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          
          <text x="55" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          <line x1="50" y1="100" x2="-28.2" y2="139.1" stroke="#6366f1" strokeWidth="2" />
          ${getArrowPolygon(-30, 140, -80, 40, "#6366f1")}
          
          <line x1="50" y1="100" x2="148" y2="100" stroke="#6366f1" strokeWidth="2" />
          ${getArrowPolygon(150, 100, 100, 0, "#6366f1")}
          
          <line x1="50" y1="100" x2="50" y2="2" stroke="#6366f1" strokeWidth="2" />
          ${getArrowPolygon(50, 0, 0, -100, "#6366f1")}
          
          <text x="-15" y="125" textAnchor="end" className="fill-indigo-600 dark:fill-indigo-400 stroke-none text-sm font-mono font-bold italic">î</text>
          <text x="130" y="90" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 stroke-none text-sm font-mono font-bold italic">ĵ</text>
          <text x="40" y="30" textAnchor="end" className="fill-indigo-600 dark:fill-indigo-400 stroke-none text-sm font-mono font-bold italic">k̂</text>
          
          <text x="-35" y="155" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[11px] font-mono">(1, 0, 0)</text>
          <text x="150" y="120" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[11px] font-mono">(0, 1, 0)</text>
          <text x="65" y="10" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[11px] font-mono">(0, 0, 1)</text>
        </svg>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Fixed Chap4_Fig3 with much longer unit vectors");
