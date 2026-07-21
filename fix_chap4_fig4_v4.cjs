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
      <div className="relative w-80 h-80">
        <svg viewBox="-80 -80 280 280" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          
          {/* Axes */}
          <line x1="50" y1="100" x2="-57.3" y2="153.7" stroke="#ca8a04" />
          ${getArrowPolygon(-57.3, 153.7, -107.3, 53.7, "#ca8a04")}
          
          <line x1="50" y1="100" x2="170" y2="100" stroke="#ca8a04" />
          ${getArrowPolygon(170, 100, 120, 0, "#ca8a04")}
          
          <line x1="50" y1="100" x2="50" y2="-50" stroke="#ca8a04" />
          ${getArrowPolygon(50, -50, 0, -150, "#ca8a04")}
          
          <text x="-65" y="160" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="175" y="105" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="50" y="-60" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>
          
          <text x="55" y="115" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          {/* Dashed Box */}
          <line x1="5.3" y1="122.4" x2="80.3" y2="122.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Px to Pxy */}
          <line x1="125" y1="100" x2="80.3" y2="122.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Py to Pxy */}
          <line x1="5.3" y1="122.4" x2="5.3" y2="22.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Px to Pxz */}
          <line x1="50" y1="0" x2="5.3" y2="22.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pz to Pxz */}
          <line x1="50" y1="0" x2="125" y2="0" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pz to Pyz */}
          <line x1="125" y1="100" x2="125" y2="0" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Py to Pyz */}
          <line x1="5.3" y1="22.4" x2="80.3" y2="22.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pxz to P */}
          <line x1="125" y1="0" x2="80.3" y2="22.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pyz to P */}
          <line x1="80.3" y1="122.4" x2="80.3" y2="22.4" strokeDasharray="4,4" stroke="#ca8a04" /> {/* Pxy to P */}
          
          {/* Ticks and values */}
          <line x1="5.3" y1="120.4" x2="5.3" y2="124.4" stroke="#ca8a04" />
          <text x="-2" y="130" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">2</text>

          <line x1="125" y1="98" x2="125" y2="102" stroke="#ca8a04" />
          <text x="130" y="112" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">3</text>

          <line x1="48" y1="0" x2="52" y2="0" stroke="#ca8a04" />
          <text x="45" y="5" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-mono">4</text>
          
          {/* Unit vectors (i, j, k) */}
          <line x1="50" y1="100" x2="27.6" y2="111.2" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(27.6, 111.2, -22.4, 11.2, "#ca8a04")}
          <text x="25" y="103" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">î</text>

          <line x1="50" y1="100" x2="75" y2="100" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(75, 100, 25, 0, "#ca8a04")}
          <text x="70" y="112" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">ĵ</text>

          <line x1="50" y1="100" x2="50" y2="75" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(50, 75, 0, -25, "#ca8a04")}
          <text x="45" y="75" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-[10px] font-bold font-serif">k̂</text>
          
          {/* Vector OP */}
          <line x1="50" y1="100" x2="78.5" y2="27" stroke="currentColor" strokeWidth="1.5" className="stroke-slate-900 dark:stroke-slate-100" />
          <polygon points="80.3,22.4 73.1,26.7 76.1,33.5" className="fill-slate-900 dark:fill-slate-100" />
          
          {/* Point P */}
          <circle cx="80.3" cy="22.4" r="2.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="88" y="20" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-xs font-serif italic">A(2, 3, 4)</text>
          
          <g className="fill-slate-800 dark:fill-slate-200 text-xs font-mono">
            <text x="60" y="60" textAnchor="end">O&#x20D7;A&#x20D7;</text>
          </g>

        </svg>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Updated Chap4_Fig4 with larger scales");
