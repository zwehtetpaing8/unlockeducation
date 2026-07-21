function getArrow(x1, y1, x2, y2, color, size = 12) {
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
  
  return `<line x1="${x1}" y1="${y1}" x2="${lineEndX.toFixed(1)}" y2="${lineEndY.toFixed(1)}" stroke="${color}" strokeWidth="2" />\n<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" className="stroke-none" />`;
}

console.log('Fig6 Blue:\n' + getArrow(30, 80, 130, 40, '#3b82f6'));
console.log('Fig6 Red:\n' + getArrow(170, 60, 70, 100, '#ef4444'));

console.log('Fig7 Blue:\n' + getArrow(20, 120, 120, 120, '#3b82f6'));
console.log('Fig7 Green:\n' + getArrow(120, 120, 160, 40, '#22c55e'));
console.log('Fig7 Purple:\n' + getArrow(20, 120, 160, 40, '#a855f7'));

console.log('Fig8 Green:\n' + getArrow(60, 100, 100, 40, '#22c55e'));
console.log('Fig8 Blue:\n' + getArrow(60, 100, 160, 100, '#3b82f6'));
console.log('Fig8 Red:\n' + getArrow(160, 100, 120, 160, '#ef4444'));
console.log('Fig8 Purple:\n' + getArrow(60, 100, 120, 160, '#a855f7'));

console.log('Fig9 Blue (a):\n' + getArrow(30, 40, 90, 40, '#3b82f6'));
console.log('Fig9 Blue (2a):\n' + getArrow(30, 80, 150, 80, '#3b82f6'));
console.log('Fig9 Red:\n' + getArrow(200, 120, 110, 120, '#ef4444'));

