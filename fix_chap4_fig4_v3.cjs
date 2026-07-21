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

// X direction: dx = -2, dy = 1
// Y direction: dx = 1, dy = 0
// Z direction: dx = 0, dy = -1

funcContent = `export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-80 h-80">
        <svg viewBox="-80 -60 280 250" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          
          {/* Axes */}
          {/* X axis (yellowish) */}
          <line x1="50" y1="100" x2="-57.3" y2="153.7" stroke="#ca8a04" />
          ${getArrowPolygon(-57.3, 153.7, -107.3, 53.7, "#ca8a04")}
          
          {/* Y axis (yellowish) */}
          <line x1="50" y1="100" x2="170" y2="100" stroke="#ca8a04" />
          ${getArrowPolygon(170, 100, 120, 0, "#ca8a04")}
          
          {/* Z axis (yellowish) */}
          <line x1="50" y1="100" x2="50" y2="-20" stroke="#ca8a04" />
          ${getArrowPolygon(50, -20, 0, -120, "#ca8a04")}
          
          <text x="-65" y="160" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="175" y="105" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-30" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          
          <text x="55" y="115" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          {/* Dashed Box */}
          <line x1="14.2" y1="117.9" x2="94.2" y2="117.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Px to Pxy */}
          <line x1="130" y1="100" x2="94.2" y2="117.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Py to Pxy */}
          <line x1="14.2" y1="117.9" x2="14.2" y2="67.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Px to Pxz */}
          <line x1="50" y1="50" x2="14.2" y2="67.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pz to Pxz */}
          <line x1="50" y1="50" x2="130" y2="50" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pz to Pyz */}
          <line x1="130" y1="100" x2="130" y2="50" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Py to Pyz */}
          <line x1="14.2" y1="67.9" x2="94.2" y2="67.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pxz to P */}
          <line x1="130" y1="50" x2="94.2" y2="67.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pyz to P */}
          <line x1="94.2" y1="117.9" x2="94.2" y2="67.9" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pxy to P */}
          
          {/* Ticks and values */}
          <line x1="14.2" y1="115.9" x2="14.2" y2="119.9" stroke="#ca8a04" />
          <text x="7" y="125" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">2</text>

          <line x1="130" y1="98" x2="130" y2="102" stroke="#ca8a04" />
          <text x="135" y="112" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">3</text>

          <line x1="48" y1="50" x2="52" y2="50" stroke="#ca8a04" />
          <text x="45" y="53" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">4</text>
          
          {/* Unit vectors (i, j, k) */}
          <line x1="50" y1="100" x2="35.7" y2="107.1" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(32.1, 108.9, -17.9, 8.9, "#ca8a04")}
          <text x="32" y="98" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">î</text>

          <line x1="50" y1="100" x2="75" y2="100" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(80, 100, 30, 0, "#ca8a04")}
          <text x="75" y="112" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">ĵ</text>

          <line x1="50" y1="100" x2="50" y2="75" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(50, 70, 0, -30, "#ca8a04")}
          <text x="45" y="75" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">k̂</text>
          
          {/* Vector OP */}
          <line x1="50" y1="100" x2="92" y2="69.5" stroke="currentColor" strokeWidth="1.5" className="stroke-slate-900 dark:stroke-slate-100" />
          ${getArrowPolygon(94.2, 67.9, 44.2, -32.1, "currentColor")}
          
          {/* Point P */}
          <circle cx="94.2" cy="67.9" r="2.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="102" y="63" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-serif italic">A(2, 3, 4)</text>
          
          <g className="fill-slate-800 dark:fill-slate-200 text-xs font-mono">
            <text x="65" y="90" textAnchor="end">O&#x20D7;A&#x20D7;</text>
          </g>

        </svg>
      </div>
    </div>
  );
}
`;

// wait, the polygon macro using "currentColor" will result in a literal "currentColor" string, but stroke-slate-900 dark:stroke-slate-100 logic won't affect it properly if the polygon doesn't have those classes. It's better to just use className="fill-slate-900 dark:fill-slate-100"
funcContent = funcContent.replace('${getArrowPolygon(94.2, 67.9, 44.2, -32.1, "currentColor")}', `<polygon points="94.2,67.9 85.4,69.4 90.1,75.8" className="fill-slate-900 dark:fill-slate-100" />`);

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Updated Chap4_Fig4");
