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

let newContent = content.substring(0, content.indexOf('export function Chap4_Fig4'));
let after = content.substring(content.indexOf('export function Chap4_Fig4'));
let funcContent = after.substring(0, after.indexOf('export function Chap4_Fig5'));
let rest = after.substring(after.indexOf('export function Chap4_Fig5'));

funcContent = `export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-72 h-72">
        <svg viewBox="-80 -40 280 220" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          {/* Axes */}
          <line x1="50" y1="100" x2="-40" y2="145" stroke="#64748b" />
          ${getArrowPolygon(-40, 145, -90, 45, "#64748b")}
          <line x1="50" y1="100" x2="180" y2="100" stroke="#64748b" />
          ${getArrowPolygon(180, 100, 130, 0, "#64748b")}
          <line x1="50" y1="100" x2="50" y2="-10" stroke="#64748b" />
          ${getArrowPolygon(50, -10, 0, -110, "#64748b")}
          
          <text x="-50" y="155" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="190" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          <text x="55" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          {/* Dashed Box */}
          <line x1="-10" y1="130" x2="90" y2="130" strokeDasharray="4,4" /> {/* X to XY */}
          <line x1="150" y1="100" x2="90" y2="130" strokeDasharray="4,4" /> {/* Y to XY */}
          <line x1="-10" y1="130" x2="-10" y2="50" strokeDasharray="4,4" /> {/* X to XZ */}
          <line x1="50" y1="20" x2="-10" y2="50" strokeDasharray="4,4" /> {/* Z to XZ */}
          <line x1="50" y1="20" x2="150" y2="20" strokeDasharray="4,4" /> {/* Z to YZ */}
          <line x1="150" y1="100" x2="150" y2="20" strokeDasharray="4,4" /> {/* Y to YZ */}
          <line x1="-10" y1="50" x2="90" y2="50" strokeDasharray="4,4" /> {/* XZ to P */}
          <line x1="150" y1="20" x2="90" y2="50" strokeDasharray="4,4" /> {/* YZ to P */}
          <line x1="90" y1="130" x2="90" y2="50" strokeDasharray="4,4" /> {/* XY to P */}
          
          {/* Vector OP */}
          <line x1="50" y1="100" x2="87" y2="53.5" stroke="#6366f1" strokeWidth="2" />
          ${getArrowPolygon(90, 50, 40, -50, "#6366f1")}
          
          {/* Points */}
          <circle cx="90" cy="50" r="2.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="98" y="45" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">P(x, y, z)</text>
          
          <text x="75" y="80" textAnchor="end" className="fill-indigo-600 dark:fill-indigo-400 stroke-none text-sm font-mono font-bold italic">r⃗</text>

        </svg>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Fixed getArrowPolygon issue");
