function getArrow(x1, y1, x2, y2, color, size = 10, name) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  
  // Adjust line end to not overlap
  const lineEndX = x2 - size * 0.8 * Math.cos(angle);
  const lineEndY = y2 - size * 0.8 * Math.sin(angle);
  
  const tipX = x2;
  const tipY = y2;
  
  const angle1 = angle + Math.PI * 0.85;
  const angle2 = angle - Math.PI * 0.85;
  
  const p1x = tipX + size * Math.cos(angle1);
  const p1y = tipY + size * Math.sin(angle1);
  
  const p2x = tipX + size * Math.cos(angle2);
  const p2y = tipY + size * Math.sin(angle2);
  
  let arrowClass = color === 'currentColor' ? 'fill-slate-900 dark:fill-slate-100' : 'fill-yellow-600 dark:fill-yellow-500';
  let strokeClass = color === 'currentColor' ? 'stroke-slate-900 dark:stroke-slate-100' : 'stroke-[#ca8a04]';
  let strokeColor = color === 'currentColor' ? '' : `stroke="${color}"`;
  
  return `          {/* ${name} */}
          <line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" ${strokeColor} className="${strokeClass}" strokeWidth="2" />
          <polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" className="${arrowClass} stroke-none" />`;
}

// Points
const O = { x: 50, y: 100 };
const A = { x: 150, y: 80 };
const B = { x: 90, y: 30 };
// -b = -(B-O) = -(40, -70) = (-40, 70)
// B' = A + (-b) = (150-40, 80+70) = (110, 150)
const B_prime = { x: 110, y: 150 };

console.log(getArrow(O.x, O.y, A.x, A.y, '#ca8a04', 12, 'Vector a'));
console.log(getArrow(O.x, O.y, B.x, B.y, '#ca8a04', 12, 'Vector b'));
console.log(getArrow(A.x, A.y, B.x, B.y, '#ca8a04', 12, 'Vector b - a'));
console.log(getArrow(A.x, A.y, B_prime.x, B_prime.y, 'currentColor', 12, 'Vector -b'));
console.log(getArrow(O.x, O.y, B_prime.x, B_prime.y, 'currentColor', 12, 'Vector a - b'));

