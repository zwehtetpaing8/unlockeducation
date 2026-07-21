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

function multiLabelWithArrow(x, y, text1, text2, operator, color, width=24) {
  let fillClass = color === 'black' ? 'fill-slate-900 dark:fill-slate-100' : 'fill-[#ca8a04]';
  let strokeClass = color === 'black' ? 'stroke-slate-900 dark:stroke-slate-100' : 'stroke-[#ca8a04]';
  
  return `<g className="${fillClass} ${strokeClass}">
  <text x="${x}" y="${y}" textAnchor="middle" className="stroke-none text-sm">
    <tspan className="font-serif italic">${text1}</tspan> ${operator} <tspan className="font-serif italic">${text2}</tspan>
  </text>
  <line x1="${x - width/2}" y1="${y - 12}" x2="${x - 4}" y2="${y - 12}" strokeWidth="1" />
  <polygon points="${x - 2},${y - 12} ${x - 6},${y - 14} ${x - 6},${y - 10}" className="stroke-none" />
  <line x1="${x + 6}" y1="${y - 12}" x2="${x + width/2}" y2="${y - 12}" strokeWidth="1" />
  <polygon points="${x + width/2 + 2},${y - 12} ${x + width/2 - 2},${y - 14} ${x + width/2 - 2},${y - 10}" className="stroke-none" />
</g>`;
}

const O = { x: 70, y: 90 };
const R = { x: 190, y: 70 }; // tip of a
const T = { x: 130, y: 20 }; // tip of b
const B = { x: 130, y: 140 }; // tip of a - b

const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="2.5" className="fill-slate-800 dark:fill-slate-200 stroke-none" />`;

console.log(arrowLine(O.x, O.y, T.x, T.y, 'yellow', 12));
console.log(labelWithArrow(95, 45, 'b', 'yellow', 10));

console.log(arrowLine(O.x, O.y, R.x, R.y, 'yellow', 12));
console.log(labelWithArrow(130, 95, 'a', 'yellow', 10));

console.log(arrowLine(R.x, R.y, T.x, T.y, 'yellow', 12));
console.log(multiLabelWithArrow(185, 35, 'b', 'a', '-', 'yellow', 24));

console.log(arrowLine(R.x, R.y, B.x, B.y, 'black', 12));
console.log(labelWithArrow(180, 115, '-b', 'black', 14));

console.log(arrowLine(O.x, O.y, B.x, B.y, 'black', 12));
console.log(multiLabelWithArrow(80, 135, 'a', 'b', '-', 'black', 24));

console.log(dot(O.x, O.y));
console.log(dot(T.x, T.y));
console.log(dot(R.x, R.y));
console.log(dot(B.x, B.y));

