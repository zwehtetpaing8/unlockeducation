const fs = require('fs');

function getArrow(x1, y1, x2, y2, color, size = 10) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  
  // Back up the end point slightly so the line doesn't poke through
  const tipX = x2;
  const tipY = y2;
  
  const angle1 = angle + Math.PI * 0.85;
  const angle2 = angle - Math.PI * 0.85;
  
  const p1x = tipX + size * Math.cos(angle1);
  const p1y = tipY + size * Math.sin(angle1);
  
  const p2x = tipX + size * Math.cos(angle2);
  const p2y = tipY + size * Math.sin(angle2);
  
  return `<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" className="stroke-none" />`;
}

console.log('Fig6 Blue:', getArrow(30, 80, 130, 40, '#3b82f6'));
console.log('Fig6 Red:', getArrow(170, 60, 70, 100, '#ef4444'));

console.log('Fig7 Blue:', getArrow(20, 120, 120, 120, '#3b82f6'));
console.log('Fig7 Green:', getArrow(120, 120, 160, 40, '#22c55e'));
console.log('Fig7 Purple:', getArrow(20, 120, 160, 40, '#a855f7'));

console.log('Fig8 Green:', getArrow(60, 100, 100, 40, '#22c55e'));
console.log('Fig8 Blue:', getArrow(60, 100, 160, 100, '#3b82f6'));
console.log('Fig8 Red:', getArrow(160, 100, 120, 160, '#ef4444'));
console.log('Fig8 Purple:', getArrow(60, 100, 120, 160, '#a855f7'));

console.log('Fig9 Blue (a):', getArrow(30, 40, 90, 40, '#3b82f6'));
console.log('Fig9 Blue (2a):', getArrow(30, 80, 150, 80, '#3b82f6'));
console.log('Fig9 Red:', getArrow(200, 120, 110, 120, '#ef4444'));

