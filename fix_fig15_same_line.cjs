const fs = require('fs');

function arrow(x1, y1, x2, y2, colorClass, width, text, textX, textY, textColorClass) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const len = Math.sqrt(dx*dx + dy*dy);
  
  const headLen = 10;
  const headAngle = Math.PI / 6;
  
  const px1 = x2 - headLen * Math.cos(angle - headAngle);
  const py1 = y2 - headLen * Math.sin(angle - headAngle);
  const px2 = x2 - headLen * Math.cos(angle + headAngle);
  const py2 = y2 - headLen * Math.sin(angle + headAngle);

  // We slightly shorten the line so it doesn't poke out of the polygon
  const lineX2 = x2 - 2 * Math.cos(angle);
  const lineY2 = y2 - 2 * Math.sin(angle);

  const fillClass = colorClass.includes('stroke-slate-900') 
    ? 'fill-slate-900 dark:fill-slate-100' 
    : colorClass.replace('stroke-', 'fill-');

  return `          <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${lineX2.toFixed(1)}" y2="${lineY2.toFixed(1)}" className="${colorClass}" strokeWidth="${width}" />
          <polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${px1.toFixed(1)},${py1.toFixed(1)} ${px2.toFixed(1)},${py2.toFixed(1)}" className="${fillClass} stroke-none" />
          <foreignObject x="${textX}" y="${textY}" width="60" height="30" overflow="visible">
            <div className="flex items-center justify-center w-full h-full ${textColorClass}">
              <Latex text="${text}" />
            </div>
          </foreignObject>`;
}

const fig15 = `export function Chap4_Fig15() {
  return (
    <div className="flex flex-col items-center my-6">
      <div className="relative w-full max-w-[320px] aspect-[320/120]">
        <svg viewBox="0 0 320 120" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          <line x1="40" y1="90" x2="280" y2="30" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />
          
${arrow(60, 85, 260, 35, 'stroke-slate-900 dark:stroke-slate-100', 2, '$\\\\overrightarrow{AC}$', 180, 15, 'text-slate-900 dark:text-slate-100')}
${arrow(60, 85, 140, 65, 'stroke-[#ca8a04]', 2, '$\\\\overrightarrow{AB}$', 80, 75, 'text-[#ca8a04]')}
          
          <circle cx="60" cy="85" r="3" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          <circle cx="140" cy="65" r="3" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          <circle cx="260" cy="35" r="3" className="fill-slate-800 dark:fill-slate-200 stroke-none" />
          
          <text x="50" y="105" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">A</text>
          <text x="135" y="85" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">B</text>
          <text x="265" y="55" className="fill-slate-800 dark:fill-slate-200 text-[12px] font-serif italic stroke-none">C</text>
        </svg>
      </div>
    </div>
  );
}`;

let text = fs.readFileSync('src/components/Latex.tsx', 'utf8');
text = text.replace(/export function Chap4_Fig15\(\) \{[\s\S]*?\}\s*\}/, fig15);
fs.writeFileSync('src/components/Latex.tsx', text);
