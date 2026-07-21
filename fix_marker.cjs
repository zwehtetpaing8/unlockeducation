const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace "arrow-vec" with "arrow-vec-chap4-angle" inside Chap4_AngleBetweenVectors
const funcStart = content.indexOf('export function Chap4_AngleBetweenVectors');
if (funcStart !== -1) {
    const nextFunc = content.indexOf('export function', funcStart + 10);
    const end = nextFunc !== -1 ? nextFunc : content.length;
    
    let sub = content.substring(funcStart, end);
    sub = sub.replace(/arrow-vec/g, 'arrow-vec-chap4-angle');
    
    content = content.substring(0, funcStart) + sub + content.substring(end);
    fs.writeFileSync('src/components/Latex.tsx', content);
}
