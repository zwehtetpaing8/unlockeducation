const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

function getArrowPolygon(x, y, dx, dy, color) {
    const L = 8;
    const W = 4;
    const angleRad = Math.atan2(dy, dx);
    const p1x = x - L * Math.cos(angleRad) + W * Math.sin(angleRad);
    const p1y = y - L * Math.sin(angleRad) - W * Math.cos(angleRad);
    const p2x = x - L * Math.cos(angleRad) - W * Math.sin(angleRad);
    const p2y = y - L * Math.sin(angleRad) + W * Math.cos(angleRad);
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}" fill="${color}" />`;
}

// Chap4_Fig3 replacement
// Old unit vectors:
// i: 10, 120
// j: 90, 100
// k: 50, 60
// New unit vectors (longer):
// i: -10, 130
// j: 110, 100
// k: 50, 40

const newI = `          <line x1="50" y1="100" x2="-8.2" y2="129.1" stroke="currentColor" strokeWidth="2" />
        ${getArrowPolygon(-10, 130, -60, 30, "currentColor")}`;

const newJ = `          <line x1="50" y1="100" x2="108" y2="100" stroke="currentColor" strokeWidth="2" />
        ${getArrowPolygon(110, 100, 60, 0, "currentColor")}`;

const newK = `          <line x1="50" y1="100" x2="50" y2="42" stroke="currentColor" strokeWidth="2" />
        ${getArrowPolygon(50, 40, 0, -60, "currentColor")}`;

// Find and replace inside Chap4_Fig3
const oldLines = [
    '<line x1="50" y1="100" x2="10" y2="120" stroke="currentColor" strokeWidth="2" />',
    '<polygon points="10,120 18.9,120.0 15.4,112.8" fill="currentColor" />',
    '<line x1="50" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" />',
    '<polygon points="90,100 82.0,96.0 82.0,104.0" fill="currentColor" />',
    '<line x1="50" y1="100" x2="50" y2="60" stroke="currentColor" strokeWidth="2" />',
    '<polygon points="50,60 46.0,68.0 54.0,68.0" fill="currentColor" />'
];

let newContent = content;
newContent = newContent.replace(oldLines[0] + '\n        ' + oldLines[1], newI);
newContent = newContent.replace(oldLines[2] + '\n        ' + oldLines[3], newJ);
newContent = newContent.replace(oldLines[4] + '\n        ' + oldLines[5], newK);

// Move the text labels for the arrows to not overlap with the new ends
newContent = newContent.replace(
    '<text x="28" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">î</text>',
    '<text x="-8" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">î</text>'
);

newContent = newContent.replace(
    '<text x="70" y="112" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">ĵ</text>',
    '<text x="90" y="112" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">ĵ</text>'
);

newContent = newContent.replace(
    '<text x="42" y="80" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">k̂</text>',
    '<text x="42" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">k̂</text>'
);

// Move the coordinates labels
newContent = newContent.replace(
    '<text x="15" y="135" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>',
    '<text x="-5" y="145" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>'
);

newContent = newContent.replace(
    '<text x="90" y="88" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>',
    '<text x="110" y="88" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>'
);

newContent = newContent.replace(
    '<text x="55" y="60" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>',
    '<text x="55" y="40" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>'
);


fs.writeFileSync('src/components/Latex.tsx', newContent);
console.log("Fixed Chap4_Fig3 unit vectors length");
