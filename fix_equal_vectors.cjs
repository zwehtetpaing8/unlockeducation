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
  
  let fillClass = color === 'blue' ? 'fill-blue-600 dark:fill-blue-400' : 'fill-[#ca8a04]';
  let strokeClass = color === 'blue' ? 'stroke-blue-600 dark:stroke-blue-400' : 'stroke-[#ca8a04]';
  let dash = isDashed ? ' strokeDasharray="5,5"' : '';
  
  if (isDashed) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" className="${strokeClass} opacity-60" strokeWidth="1.5"${dash} />`;
  }
  
  return `<line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" className="${strokeClass}" strokeWidth="2"${dash} />
<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" className="${fillClass} stroke-none" />`;
}

function labelWithArrow(x, y, text, color, arrowWidth = 10) {
  let fillClass = color === 'blue' ? 'fill-blue-600 dark:fill-blue-400' : 'fill-[#ca8a04]';
  let strokeClass = color === 'blue' ? 'stroke-blue-600 dark:stroke-blue-400' : 'stroke-[#ca8a04]';
  
  let lineY = y - 12;
  let lineX1 = x - arrowWidth/2 + 2;
  let lineX2 = x + arrowWidth/2 - 2;
  
  return `<g className="${fillClass} ${strokeClass}">
  <text x="${x}" y="${y}" textAnchor="middle" className="stroke-none font-serif italic text-sm">${text}</text>
  <line x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" strokeWidth="1" />
  <polygon points="${lineX2 + 2},${lineY} ${lineX2-2},${lineY-2} ${lineX2-2},${lineY+2}" className="stroke-none" />
</g>`;
}

const a_start = { x: 80, y: 50 };
const a_end = { x: 200, y: 20 };

const b_start = { x: 80 + 30, y: 50 + 40 }; // 110, 90
const b_end = { x: 200 + 30, y: 20 + 40 }; // 230, 60

console.log(arrowLine(a_start.x, a_start.y, b_start.x, b_start.y, 'yellow', 10, true));
console.log(arrowLine(a_end.x, a_end.y, b_end.x, b_end.y, 'yellow', 10, true));

console.log(arrowLine(a_start.x, a_start.y, a_end.x, a_end.y, 'yellow', 12));
console.log(labelWithArrow((a_start.x + a_end.x)/2 - 5, (a_start.y + a_end.y)/2 - 10, 'a', 'yellow', 10));

console.log(arrowLine(b_start.x, b_start.y, b_end.x, b_end.y, 'yellow', 12));
console.log(labelWithArrow((b_start.x + b_end.x)/2 + 10, (b_start.y + b_end.y)/2 + 25, 'b', 'yellow', 10));

const labelAEqualsB = `<g className="fill-slate-800 dark:fill-slate-200 stroke-slate-800 dark:stroke-slate-200">
  <text x="155" y="125" textAnchor="middle" className="stroke-none font-serif italic text-sm">a = b</text>
  <line x1="145" y1="113" x2="151" y2="113" strokeWidth="1" />
  <polygon points="153,113 149,111 149,115" className="stroke-none" />
  <line x1="159" y1="113" x2="165" y2="113" strokeWidth="1" />
  <polygon points="167,113 163,111 163,115" className="stroke-none" />
</g>`;
console.log(labelAEqualsB);

const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="2.5" className="fill-[#ca8a04] stroke-none" />`;
console.log(dot(a_start.x, a_start.y));
console.log(dot(a_end.x, a_end.y));
console.log(dot(b_start.x, b_start.y));
console.log(dot(b_end.x, b_end.y));

