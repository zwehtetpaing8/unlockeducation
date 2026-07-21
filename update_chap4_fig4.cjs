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

// Use Chap4_Fig3 axes exactly.
// O is at 50, 100
// P(x, y, z) is at say (120, 30)
// Then we draw dashed lines to the axes to form a box.

funcContent = `export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-72 h-72">
        <svg viewBox="-80 -60 280 250" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          
          {/* Axes */}
          <line x1="50" y1="100" x2="-57.3" y2="153.7" stroke="#64748b" />
          ${getArrowPolygon(-57.3, 153.7, -107.3, 53.7, "#64748b")}
          <line x1="50" y1="100" x2="170" y2="100" stroke="#64748b" />
          ${getArrowPolygon(170, 100, 120, 0, "#64748b")}
          <line x1="50" y1="100" x2="50" y2="-20" stroke="#64748b" />
          ${getArrowPolygon(50, -20, 0, -120, "#64748b")}
          
          <text x="-65" y="160" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="175" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-30" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          
          <text x="55" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          {/* Dashed Box */}
          {/* O = 50, 100 */}
          {/* X axis direction: (-2, 1) */}
          {/* Y axis direction: (1, 0) */}
          {/* Z axis direction: (0, -1) */}
          
          {/* Let's define lengths: Px on x-axis, Py on y-axis, Pz on z-axis */}
          {/* x_len = 40, y_len = 80, z_len = 50 */}
          {/* Px = O + x_len*(-0.894, 0.447) = 50-35.8, 100+17.9 = 14.2, 117.9 */}
          {/* Py = O + y_len*(1, 0) = 130, 100 */}
          {/* Pz = O + z_len*(0, -1) = 50, 50 */}
          
          {/* Pxy = Px + Py - O = 14.2 + 130 - 50, 117.9 + 100 - 100 = 94.2, 117.9 */}
          {/* Pxz = Px + Pz - O = 14.2 + 50 - 50, 117.9 + 50 - 100 = 14.2, 67.9 */}
          {/* Pyz = Py + Pz - O = 130 + 50 - 50, 100 + 50 - 100 = 130, 50 */}
          {/* P = Px + Py + Pz - 2*O = 94.2, 67.9 */}
          
          <line x1="14.2" y1="117.9" x2="94.2" y2="117.9" strokeDasharray="4,4" /> {/* Px to Pxy */}
          <line x1="130" y1="100" x2="94.2" y2="117.9" strokeDasharray="4,4" /> {/* Py to Pxy */}
          <line x1="14.2" y1="117.9" x2="14.2" y2="67.9" strokeDasharray="4,4" /> {/* Px to Pxz */}
          <line x1="50" y1="50" x2="14.2" y2="67.9" strokeDasharray="4,4" /> {/* Pz to Pxz */}
          <line x1="50" y1="50" x2="130" y2="50" strokeDasharray="4,4" /> {/* Pz to Pyz */}
          <line x1="130" y1="100" x2="130" y2="50" strokeDasharray="4,4" /> {/* Py to Pyz */}
          <line x1="14.2" y1="67.9" x2="94.2" y2="67.9" strokeDasharray="4,4" /> {/* Pxz to P */}
          <line x1="130" y1="50" x2="94.2" y2="67.9" strokeDasharray="4,4" /> {/* Pyz to P */}
          <line x1="94.2" y1="117.9" x2="94.2" y2="67.9" strokeDasharray="4,4" /> {/* Pxy to P */}
          
          {/* Vector OP */}
          <line x1="50" y1="100" x2="92" y2="69.5" stroke="#6366f1" strokeWidth="2" />
          ${getArrowPolygon(94.2, 67.9, 44.2, -32.1, "#6366f1")}
          
          {/* Point P */}
          <circle cx="94.2" cy="67.9" r="2.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="102" y="63" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">P(x, y, z)</text>
          
          <text x="75" y="95" textAnchor="end" className="fill-indigo-600 dark:fill-indigo-400 stroke-none text-sm font-mono font-bold italic">r⃗</text>

        </svg>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Fixed Chap4_Fig4 lengths and axes to match Fig3");
