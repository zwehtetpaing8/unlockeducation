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
  
  if (isDashed) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" className="${strokeClass} opacity-60" strokeWidth="1.5"${dash} />`;
  }
  
  return `<line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" className="${strokeClass}" strokeWidth="2"${dash} />
<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" className="${fillClass} stroke-none" />`;
}

function labelWithArrow(x, y, text, color, arrowWidth = 14) {
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

const A = { x: 50, y: 100 };
const B = { x: 130, y: 50 };
const D = { x: 170, y: 100 };
const C = { x: 250, y: 50 };

// Diagonals
console.log(`<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" className="stroke-[#ca8a04] opacity-50" strokeWidth="1" strokeDasharray="5,5" />`);
console.log(`<line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" className="stroke-[#ca8a04] opacity-50" strokeWidth="1" strokeDasharray="5,5" />`);

// Sides
console.log(arrowLine(A.x, A.y, B.x, B.y, 'yellow', 12));
console.log(labelWithArrow((A.x + B.x)/2 - 15, (A.y + B.y)/2 - 5, 'AB', 'yellow', 16));

console.log(arrowLine(B.x, B.y, C.x, C.y, 'yellow', 12));
console.log(labelWithArrow((B.x + C.x)/2, B.y - 10, 'BC', 'yellow', 16));

console.log(arrowLine(A.x, A.y, D.x, D.y, 'yellow', 12));
console.log(labelWithArrow((A.x + D.x)/2, A.y + 25, 'AD', 'yellow', 16));

console.log(arrowLine(D.x, D.y, C.x, C.y, 'black', 12));
console.log(labelWithArrow((D.x + C.x)/2 + 15, (D.y + C.y)/2 + 15, 'DC', 'black', 16));

const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="2.5" className="fill-[#ca8a04] stroke-none" />`;
console.log(dot(A.x, A.y));
console.log(dot(B.x, B.y));
console.log(dot(C.x, C.y));
console.log(dot(D.x, D.y));

// Labels A, B, C, D coordinates
console.log(`<text x="${A.x - 30}" y="${A.y + 18}" className="fill-[#ca8a04] text-[10px] stroke-none"><tspan className="font-serif italic text-[11px]">A</tspan><tspan>(-1, 1, 1)</tspan></text>`);
console.log(`<text x="${B.x - 30}" y="${B.y - 10}" className="fill-[#ca8a04] text-[10px] stroke-none"><tspan className="font-serif italic text-[11px]">B</tspan><tspan>(2, 0, -2)</tspan></text>`);
console.log(`<text x="${C.x + 10}" y="${C.y - 10}" className="fill-[#ca8a04] text-[10px] stroke-none"><tspan className="font-serif italic text-[11px]">C</tspan><tspan>(x, y, z)</tspan></text>`);
console.log(`<text x="${D.x}" y="${D.y + 18}" className="fill-[#ca8a04] text-[10px] stroke-none"><tspan className="font-serif italic text-[11px]">D</tspan><tspan>(3, 1, 4)</tspan></text>`);

