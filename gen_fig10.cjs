function arrowLine(x1, y1, x2, y2, color, size = 10, isDashed = false) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  
  const lineEndX = x2 - size * 0.8 * Math.cos(angle);
  const lineEndY = y2 - size * 0.8 * Math.sin(angle);
  
  const angle1 = angle + Math.PI * 0.85;
  const angle2 = angle - Math.PI * 0.85;
  
  const p1x = x2 + size * Math.cos(angle1);
  const p1y = y2 + size * Math.sin(angle1);
  
  const p2x = x2 + size * Math.cos(angle2);
  const p2y = y2 + size * Math.sin(angle2);
  
  let fillClass = color === 'black' ? 'fill-slate-900 dark:fill-slate-100' : color === 'light' ? 'fill-[#fcd34d] dark:fill-[#fbbf24]' : 'fill-[#ca8a04]';
  let strokeClass = color === 'black' ? 'stroke-slate-900 dark:stroke-slate-100' : color === 'light' ? 'stroke-[#fcd34d] dark:stroke-[#fbbf24]' : 'stroke-[#ca8a04]';
  let dash = isDashed ? ' strokeDasharray="5,5"' : '';
  
  return `<line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" className="${strokeClass}" strokeWidth="2"${dash} />
<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" className="${fillClass} stroke-none" />`;
}

function labelWithArrow(x, y, text, color, arrowWidth = 10) {
  let fillClass = color === 'black' ? 'fill-slate-900 dark:fill-slate-100' : color === 'light' ? 'fill-[#fcd34d] dark:fill-[#fbbf24]' : 'fill-[#ca8a04]';
  let strokeClass = color === 'black' ? 'stroke-slate-900 dark:stroke-slate-100' : color === 'light' ? 'stroke-[#fcd34d] dark:stroke-[#fbbf24]' : 'stroke-[#ca8a04]';
  
  let lineY = y - 12;
  let lineX1 = x - arrowWidth/2 + 2;
  let lineX2 = x + arrowWidth/2 - 2;
  
  return `<g className="${fillClass} ${strokeClass}">
  <text x="${x}" y="${y}" textAnchor="middle" className="stroke-none font-serif italic text-sm">${text}</text>
  <line x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" strokeWidth="1" />
  <polygon points="${lineX2 + 2},${lineY} ${lineX2-2},${lineY-2} ${lineX2-2},${lineY+2}" className="stroke-none" />
</g>`;
}

const O = { x: 150, y: 80 };
const A = { x: 210, y: 60 };
const A2 = { x: 270, y: 40 };
const A_minus = { x: 90, y: 100 };

const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />`;

console.log('--- FIG 10 ---');
console.log(`<line x1="60" y1="110" x2="300" y2="30" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />`);

console.log(arrowLine(O.x, O.y, A2.x, A2.y, 'black', 12));
console.log(labelWithArrow(240, 40, '2a', 'black', 16));

console.log(arrowLine(O.x, O.y, A.x, A.y, 'yellow', 12));
console.log(labelWithArrow(180, 60, 'a', 'yellow', 10));

console.log(arrowLine(O.x, O.y, A_minus.x, A_minus.y, 'light', 12));
console.log(labelWithArrow(120, 115, '-a', 'light', 14));

console.log(dot(O.x, O.y));
console.log(dot(A.x, A.y));
console.log(dot(A2.x, A2.y));
console.log(dot(A_minus.x, A_minus.y));

