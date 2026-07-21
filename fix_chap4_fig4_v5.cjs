const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function getArrowPolygon(x, y, dx, dy, color) {
    const L = 12; // larger arrows for better visibility
    const W = 5;
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

const opArrow = getArrowPolygon(175, 110, 55, -110, "currentColor").replace('fill="currentColor"', 'className="fill-slate-900 dark:fill-slate-100"');

funcContent = `export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-8">
      <div className="relative w-full max-w-lg aspect-square">
        <svg viewBox="0 0 320 300" overflow="visible" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1.5">
          
          {/* Axes */}
          <line x1="120" y1="220" x2="45" y2="265" stroke="#ca8a04" />
          ${getArrowPolygon(45, 265, -75, 45, "#ca8a04")}
          
          <line x1="120" y1="220" x2="277.5" y2="220" stroke="#ca8a04" />
          ${getArrowPolygon(277.5, 220, 157.5, 0, "#ca8a04")}
          
          <line x1="120" y1="220" x2="120" y2="45" stroke="#ca8a04" />
          ${getArrowPolygon(120, 45, 0, -175, "#ca8a04")}
          
          <text x="35" y="275" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-mono"><tspan className="italic font-serif">x</tspan></text>
          <text x="285" y="225" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-mono"><tspan className="italic font-serif">y</tspan></text>
          <text x="120" y="35" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-mono"><tspan className="italic font-serif">z</tspan></text>
          
          <text x="125" y="235" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-mono"><tspan className="italic font-serif">O</tspan></text>
          
          {/* Dashed Box */}
          <line x1="70" y1="250" x2="175" y2="250" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="225" y1="220" x2="175" y2="250" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="70" y1="250" x2="70" y2="110" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="120" y1="80" x2="70" y2="110" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="120" y1="80" x2="225" y2="80" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="225" y1="220" x2="225" y2="80" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="70" y1="110" x2="175" y2="110" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="225" y1="80" x2="175" y2="110" strokeDasharray="5,5" stroke="#ca8a04" />
          <line x1="175" y1="250" x2="175" y2="110" strokeDasharray="5,5" stroke="#ca8a04" />
          
          {/* Ticks and values */}
          <line x1="67" y1="245" x2="73" y2="255" stroke="#ca8a04" strokeWidth="2" />
          <text x="60" y="265" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-sm font-mono">2</text>

          <line x1="225" y1="216" x2="225" y2="224" stroke="#ca8a04" strokeWidth="2" />
          <text x="228" y="235" textAnchor="start" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-sm font-mono">3</text>

          <line x1="116" y1="80" x2="124" y2="80" stroke="#ca8a04" strokeWidth="2" />
          <text x="112" y="85" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-sm font-mono">4</text>
          
          {/* Unit vectors (i, j, k) */}
          <line x1="120" y1="220" x2="98" y2="233.2" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(95, 235, -25, 15, "#ca8a04")}
          <text x="88" y="225" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-bold font-serif">î</text>

          <line x1="120" y1="220" x2="152" y2="220" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(155, 220, 35, 0, "#ca8a04")}
          <text x="145" y="210" textAnchor="middle" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-bold font-serif">ĵ</text>

          <line x1="120" y1="220" x2="120" y2="188" stroke="#ca8a04" strokeWidth="2" />
          ${getArrowPolygon(120, 185, 0, -35, "#ca8a04")}
          <text x="112" y="195" textAnchor="end" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-bold font-serif">k̂</text>
          
          {/* Vector OP */}
          <line x1="120" y1="220" x2="171" y2="118" stroke="currentColor" strokeWidth="2" className="stroke-slate-900 dark:stroke-slate-100" />
          ${` + opArrow + `}
          
          {/* Point P */}
          <circle cx="175" cy="110" r="3.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="185" y="105" className="fill-yellow-600 dark:fill-yellow-500 stroke-none text-base font-serif italic">A(2, 3, 4)</text>
          
          <g className="fill-slate-800 dark:fill-slate-200 text-base font-mono">
            <text x="135" y="160" textAnchor="end">O&#x20D7;A&#x20D7;</text>
          </g>

        </svg>
      </div>
    </div>
  );
}
`

fs.writeFileSync('src/components/Latex.tsx', newContent + funcContent + rest);
console.log("Updated Chap4_Fig4 with larger scales and optimized box");
