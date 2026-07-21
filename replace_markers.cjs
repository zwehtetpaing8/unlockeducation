const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Function to calculate arrowhead polygon points
function getArrowPolygon(x, y, angle, color) {
    // Arrow size
    const L = 8;
    const W = 4;
    
    // Convert angle to radians
    const rad = angle * Math.PI / 180;
    
    // Tip is at (x,y). We need the two base points
    const p1x = x - L * Math.cos(rad) + W * Math.sin(rad);
    const p1y = y - L * Math.sin(rad) - W * Math.cos(rad);
    
    const p2x = x - L * Math.cos(rad) - W * Math.sin(rad);
    const p2y = y - L * Math.sin(rad) + W * Math.cos(rad);
    
    return `<polygon points="${x},${y} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" />`;
}

// 1. Replace X-axis arrows
content = content.replace(/<line (x1="10" y1="\d+" x2="\d+" y2="\d+") stroke="([^"]+)" strokeWidth="([^"]+)" markerStart="url\([^)]+\)" markerEnd="url\([^)]+\)" className="([^"]+)" \/>/g, (match, coords, stroke, strokeWidth, className) => {
    // Parse coords
    const x1 = 10;
    const y1 = parseInt(coords.match(/y1="(\d+)"/)[1]);
    const x2 = parseInt(coords.match(/x2="(\d+)"/)[1]);
    const y2 = y1;
    
    // For x-axis, left arrow is at (x1, y1) pointing left (180 deg)
    // right arrow is at (x2, y2) pointing right (0 deg)
    
    return `<line ${coords} stroke="${stroke}" strokeWidth="${strokeWidth}" className="${className}" />\n        ${getArrowPolygon(x1, y1, 180, stroke)}\n        ${getArrowPolygon(x2, y2, 0, stroke)}`;
});

// 2. Replace Y-axis arrows
content = content.replace(/<line (x1="\d+" y1="\d+" x2="\d+" y2="10") stroke="([^"]+)" strokeWidth="([^"]+)" markerStart="url\([^)]+\)" markerEnd="url\([^)]+\)" className="([^"]+)" \/>/g, (match, coords, stroke, strokeWidth, className) => {
    // Parse coords
    const x1 = parseInt(coords.match(/x1="(\d+)"/)[1]);
    const y1 = parseInt(coords.match(/y1="(\d+)"/)[1]);
    const x2 = x1;
    const y2 = 10;
    
    // For y-axis, bottom arrow is at (x1, y1) pointing down (90 deg)
    // top arrow is at (x2, y2) pointing up (270 deg or -90)
    
    return `<line ${coords} stroke="${stroke}" strokeWidth="${strokeWidth}" className="${className}" />\n        ${getArrowPolygon(x1, y1, 90, stroke)}\n        ${getArrowPolygon(x2, y2, -90, stroke)}`;
});

// 3. Replace Vector arrows
content = content.replace(/<line (x1="\d+" y1="\d+" x2="([^"]+)" y2="([^"]+)") stroke="([^"]+)" strokeWidth="([^"]+)" markerEnd="url\([^)]+\)" \/>/g, (match, coords, x2str, y2str, stroke, strokeWidth) => {
    const x1 = parseInt(coords.match(/x1="(\d+)"/)[1]);
    const y1 = parseInt(coords.match(/y1="(\d+)"/)[1]);
    const x2 = parseFloat(x2str);
    const y2 = parseFloat(y2str);
    
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    return `<line ${coords} stroke="${stroke}" strokeWidth="${strokeWidth}" />\n        ${getArrowPolygon(x2, y2, angle, stroke)}`;
});

// 4. Replace Angle arcs
content = content.replace(/<path d="M (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) A 20 20 0 0 [01] (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)" fill="none" stroke="([^"]+)" strokeWidth="([^"]+)" markerEnd="url\([^)]+\)" \/>/g, (match, sx, sy, ex, ey, stroke, strokeWidth) => {
    const startX = parseFloat(sx);
    const startY = parseFloat(sy);
    const endX = parseFloat(ex);
    const endY = parseFloat(ey);
    
    // Center is (startX - 20, startY) if it starts on the positive x-axis.
    // Wait, let's just find the origin by assuming it's roughly 20 units away from start.
    // Actually, in all these, the start point is exactly (cx + 20, cy).
    const cx = startX - 20;
    const cy = startY;
    
    // The vector from cx,cy to endX,endY
    const vx = endX - cx;
    const vy = endY - cy;
    
    // Tangent angle. If it's 0 0 0 (counter-clockwise, so negative y direction)
    // Wait, SVG y is down. A 20 20 0 0 0 means sweep-flag=0 (negative angle direction).
    // The tangent is rotated -90 degrees from the radius vector (vx, vy).
    // Let's check sweep-flag in the match.
    const isSweep1 = match.includes('A 20 20 0 0 1');
    let tangentAngleRad = Math.atan2(vy, vx);
    if (isSweep1) {
        tangentAngleRad += Math.PI / 2; // +90 deg
    } else {
        tangentAngleRad -= Math.PI / 2; // -90 deg
    }
    
    const angle = tangentAngleRad * 180 / Math.PI;
    
    // We want the arrow tip to be AT the end point.
    // Wait, the path itself reaches endX, endY.
    
    return `<path d="M ${sx} ${sy} A 20 20 0 0 ${isSweep1 ? '1' : '0'} ${ex} ${ey}" fill="none" stroke="${stroke}" strokeWidth="${strokeWidth}" />\n        ${getArrowPolygon(endX, endY, angle, stroke)}`;
});


fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Replaced all markers with explicit polygons!");
