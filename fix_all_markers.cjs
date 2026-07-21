const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const lines = content.split('\n');
let currentFunction = '';
let newLines = [];

for (let line of lines) {
    const funcMatch = line.match(/(?:export\s+)?function ([A-Za-z0-9_]+)\(/);
    if (funcMatch) {
        currentFunction = funcMatch[1];
    }
    
    if (currentFunction) {
        // Find things like id="arrow"
        line = line.replace(/id="(arrow[^"]*)"/g, (match, p1) => {
            if (p1.includes(currentFunction)) return match;
            return `id="${p1}-${currentFunction}"`;
        });
        
        // Find things like url(#arrow)
        line = line.replace(/url\(#(arrow[^)]*)\)/g, (match, p1) => {
            if (p1.includes(currentFunction)) return match;
            return `url(#${p1}-${currentFunction})`;
        });
    }
    
    newLines.push(line);
}

fs.writeFileSync('src/components/Latex.tsx', newLines.join('\n'));
console.log("Replaced markers!");
