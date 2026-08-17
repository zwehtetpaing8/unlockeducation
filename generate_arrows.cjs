function getArrowPolygon(x1, y1, x2, y2, colorClass) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    
    // Arrowhead length and width
    const length = 12;
    const width = 8;
    
    const tipX = x2;
    const tipY = y2;
    
    const backX = tipX - length * Math.cos(angle);
    const backY = tipY - length * Math.sin(angle);
    
    const leftX = backX - (width/2) * Math.sin(angle);
    const leftY = backY + (width/2) * Math.cos(angle);
    
    const rightX = backX + (width/2) * Math.sin(angle);
    const rightY = backY - (width/2) * Math.cos(angle);
    
    return `<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" className="${colorClass} stroke-none" />`;
}

console.log("Ex18 MP (d2):", getArrowPolygon(130, 160, 188, 84, "fill-amber-600 dark:fill-amber-400"));
console.log("Ex18 MN (d1):", getArrowPolygon(130, 160, 295, 160, "fill-amber-600 dark:fill-amber-400"));
console.log("Ex18 OM (a):", getArrowPolygon(80, 240, 127, 165, "fill-slate-800 dark:fill-slate-100"));

console.log("Ex21 Line l start:", getArrowPolygon(400, 130, 200, 180, "fill-amber-600 dark:fill-amber-400"));
console.log("Ex21 Line l end:", getArrowPolygon(200, 180, 400, 130, "fill-amber-600 dark:fill-amber-400"));

console.log("Ex21 d1:", getArrowPolygon(260, 165, 330, 147.5, "fill-amber-600 dark:fill-amber-400"));
console.log("Ex21 d2 AB:", getArrowPolygon(150, 110, 255, 162, "fill-amber-600 dark:fill-amber-400"));
console.log("Ex21 a OA:", getArrowPolygon(130, 280, 148, 117, "fill-slate-800 dark:fill-slate-100"));
