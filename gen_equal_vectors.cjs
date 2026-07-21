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
  
  let fillClass = color === 'black' ? 'fill-slate-900 dark:fill-slate-100' : 'fill-[#ca8a04]';
  let strokeClass = color === 'black' ? 'stroke-slate-900 dark:stroke-slate-100' : 'stroke-[#ca8a04]';
  let dash = isDashed ? ' strokeDasharray="5,5"' : '';
  
  return `<line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" className="${strokeClass}" strokeWidth="2"${dash} />
<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" className="${fillClass} stroke-none" />`;
}

function labelWithArrow(x, y, text, color, arrowWidth = 10) {
  let fillClass = color === 'black' ? 'fill-slate-900 dark:fill-slate-100' : 'fill-[#ca8a04]';
  let strokeClass = color === 'black' ? 'stroke-slate-900 dark:stroke-slate-100' : 'stroke-[#ca8a04]';
  
  let lineY = y - 12;
  let lineX1 = x - arrowWidth/2 + 2;
  let lineX2 = x + arrowWidth/2 - 2;
  
  return `<g className="${fillClass} ${strokeClass}">
  <text x="${x}" y="${y}" textAnchor="middle" className="stroke-none font-serif italic text-sm">${text}</text>
  <line x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" strokeWidth="1" />
  <polygon points="${lineX2 + 2},${lineY} ${lineX2-2},${lineY-2} ${lineX2-2},${lineY+2}" className="stroke-none" />
</g>`;
}

// Equal vectors
const v1_start = { x: 50, y: 100 };
const v1_end = { x: 130, y: 50 };

const v2_start = { x: 130, y: 110 };
const v2_end = { x: 210, y: 60 };

const v3_start = { x: 210, y: 120 };
const v3_end = { x: 290, y: 70 };

console.log(arrowLine(v1_start.x, v1_start.y, v1_end.x, v1_end.y, 'yellow', 12));
console.log(labelWithArrow((v1_start.x + v1_end.x)/2 - 15, (v1_start.y + v1_end.y)/2 - 5, 'a', 'yellow', 10));

console.log(arrowLine(v2_start.x, v2_start.y, v2_end.x, v2_end.y, 'yellow', 12));
console.log(labelWithArrow((v2_start.x + v2_end.x)/2 - 15, (v2_start.y + v2_end.y)/2 - 5, 'a', 'yellow', 10));

console.log(arrowLine(v3_start.x, v3_start.y, v3_end.x, v3_end.y, 'yellow', 12));
console.log(labelWithArrow((v3_start.x + v3_end.x)/2 - 15, (v3_start.y + v3_end.y)/2 - 5, 'a', 'yellow', 10));

