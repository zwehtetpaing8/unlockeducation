const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function getArrowPolygon(x, y, angle, color) {
    const L = 8;
    const W = 4;
    const rad = angle * Math.PI / 180;
    const p1x = x - L * Math.cos(rad) + W * Math.sin(rad);
    const p1y = y - L * Math.sin(rad) - W * Math.cos(rad);
    const p2x = x - L * Math.cos(rad) - W * Math.sin(rad);
    const p2y = y - L * Math.sin(rad) + W * Math.cos(rad);
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" />`;
}

// Lines with markerEnd
content = content.replace(/<line x1="(-?\d+(?:\.\d+)?)" y1="(-?\d+(?:\.\d+)?)" x2="(-?\d+(?:\.\d+)?)" y2="(-?\d+(?:\.\d+)?)"([^>]*)markerEnd="url\([^)]+\)"([^>]*)>/g, (match, x1s, y1s, x2s, y2s, before, after) => {
    const x1 = parseFloat(x1s);
    const y1 = parseFloat(y1s);
    const x2 = parseFloat(x2s);
    const y2 = parseFloat(y2s);
    
    let color = "#6366f1"; // Default to indigo if not found
    const strokeMatch = match.match(/stroke="([^"]+)"/);
    if (strokeMatch) color = strokeMatch[1];
    else {
        // Look for className containing a stroke color? Just fallback to #94a3b8 for axes
        if (match.includes("slate") || match.includes("Chap4_Fig")) color = "#64748b"; // It's an axis
    }
    if (color === "currentColor") color = "currentColor";
    
    const angleRad = Math.atan2(y2 - y1, x2 - x1);
    const angle = angleRad * 180 / Math.PI;
    const lineX2 = x2 - 2 * Math.cos(angleRad);
    const lineY2 = y2 - 2 * Math.sin(angleRad);
    
    after = after.replace(/\/\s*$/, '');
    return `<line x1="${x1}" y1="${y1}" x2="${lineX2.toFixed(1)}" y2="${lineY2.toFixed(1)}"${before}${after} stroke="${color}" />\n        ${getArrowPolygon(x2, y2, angle, color)}`;
});

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Successfully replaced negative markers.");
