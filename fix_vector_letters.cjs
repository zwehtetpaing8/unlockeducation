const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// The letters that are vectors in the diagrams: a, b, c, d
const vectorLetters = ['a', 'b', 'c', 'd', 'u', 'v'];

// Find all matches for `<text ...>x</text>` in Chap4_Fig* components where x is in vectorLetters
// We will replace >a</text> with >a&#x20D7;</text>

// Helper to replace within a range of lines
const lines = content.split('\n');
let insideChap4Fig = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export function Chap4_Fig')) {
        insideChap4Fig = true;
    } else if (insideChap4Fig && lines[i].startsWith('}')) {
        insideChap4Fig = false;
    }
    
    if (insideChap4Fig) {
        for (const v of vectorLetters) {
            const regex = new RegExp(`>\\s*${v}\\s*</text>`, 'g');
            lines[i] = lines[i].replace(regex, `>${v}&#x20D7;</text>`);
        }
    }
}

fs.writeFileSync('src/components/Latex.tsx', lines.join('\n'));
console.log("Fixed vector letters");
