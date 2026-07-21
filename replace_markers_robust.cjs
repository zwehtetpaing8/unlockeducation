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

// 1. All axes (lines with markerStart and markerEnd)
content = content.replace(/<line x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="(\d+)"([^>]*)markerStart="url\([^)]+\)" markerEnd="url\([^)]+\)"([^>]*)>/g, (match, x1s, y1s, x2s, y2s, before, after) => {
    const x1 = parseFloat(x1s);
    const y1 = parseFloat(y1s);
    const x2 = parseFloat(x2s);
    const y2 = parseFloat(y2s);
    
    const strokeMatch = match.match(/stroke="([^"]+)"/);
    const color = strokeMatch ? strokeMatch[1] : "#64748b";
    
    let p1, p2;
    if (y1 === y2) {
        p1 = getArrowPolygon(x1, y1, 180, color);
        p2 = getArrowPolygon(x2, y2, 0, color);
    } else {
        p1 = getArrowPolygon(x1, y1, y1 > y2 ? 90 : -90, color);
        p2 = getArrowPolygon(x2, y2, y2 < y1 ? -90 : 90, color);
    }
    
    after = after.replace(/\/\s*$/, ''); // remove trailing slash if present
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${before}${after} />\n        ${p1}\n        ${p2}`;
});

// 2. All vectors (lines with markerEnd ONLY)
content = content.replace(/<line x1="(\d+(?:\.\d+)?)" y1="(\d+(?:\.\d+)?)" x2="(\d+(?:\.\d+)?)" y2="(\d+(?:\.\d+)?)"([^>]*)markerEnd="url\([^)]+\)"([^>]*)>/g, (match, x1s, y1s, x2s, y2s, before, after) => {
    const x1 = parseFloat(x1s);
    const y1 = parseFloat(y1s);
    const x2 = parseFloat(x2s);
    const y2 = parseFloat(y2s);
    
    const strokeMatch = match.match(/stroke="([^"]+)"/);
    let color = strokeMatch ? strokeMatch[1] : "#6366f1";
    if (color === "currentColor") color = "currentColor"; // Will fallback to #94a3b8 if needed, but wait! polygon fill="currentColor" works.
    
    // For vector, we want the line to end slightly BEFORE the tip so it doesn't poke out.
    // L = 8.
    const angleRad = Math.atan2(y2 - y1, x2 - x1);
    const angle = angleRad * 180 / Math.PI;
    const lineX2 = x2 - 2 * Math.cos(angleRad); // shift line back by 2 units so arrow tip is exactly x2, y2
    const lineY2 = y2 - 2 * Math.sin(angleRad);
    
    after = after.replace(/\/\s*$/, '');
    return `<line x1="${x1}" y1="${y1}" x2="${lineX2.toFixed(1)}" y2="${lineY2.toFixed(1)}"${before}${after} />\n        ${getArrowPolygon(x2, y2, angle, color)}`;
});

// 3. All arcs (paths with markerEnd)
content = content.replace(/<path d="M (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) A (\d+) (\d+) 0 0 ([01]) (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"([^>]*)markerEnd="url\([^)]+\)"([^>]*)>/g, (match, sx, sy, rx, ry, sweep, ex, ey, before, after) => {
    const startX = parseFloat(sx);
    const startY = parseFloat(sy);
    const endX = parseFloat(ex);
    const endY = parseFloat(ey);
    const radius = parseFloat(rx);
    
    const strokeMatch = match.match(/stroke="([^"]+)"/);
    const color = strokeMatch ? strokeMatch[1] : "#f59e0b";
    
    // Most arcs start on the positive x-axis (e.g. M 130 110, origin 110 110, rx 20).
    // Let's deduce origin.
    const cx = startX - radius;
    const cy = startY;
    
    const vx = endX - cx;
    const vy = endY - cy;
    
    let tangentAngleRad = Math.atan2(vy, vx);
    if (sweep === '1') {
        tangentAngleRad += Math.PI / 2; // +90 deg
    } else {
        tangentAngleRad -= Math.PI / 2; // -90 deg
    }
    
    const angle = tangentAngleRad * 180 / Math.PI;
    
    after = after.replace(/\/\s*$/, '');
    return `<path d="M ${sx} ${sy} A ${rx} ${ry} 0 0 ${sweep} ${ex} ${ey}"${before}${after} />\n        ${getArrowPolygon(endX, endY, angle, color)}`;
});

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Successfully replaced markers with absolute polygons.");
