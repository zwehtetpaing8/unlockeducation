const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const capitalVectors = ['AB', 'BC', 'AC', 'OA', 'OB', 'OC', 'AD', 'DC'];

let insideChap4Fig = false;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export function Chap4_Fig')) {
        insideChap4Fig = true;
    } else if (insideChap4Fig && lines[i].startsWith('}')) {
        insideChap4Fig = false;
    }
    
    if (insideChap4Fig) {
        for (const v of capitalVectors) {
            const regex = new RegExp(`>\\s*${v}\\s*</text>`, 'g');
            // use right arrow \u2192 after text instead of combining since combining is hard on 2 chars.
            // Actually, we can use combining on both letters: A&#x20D7;B&#x20D7;
            const replaced = v.split('').map(c => c + '&#x20D7;').join('');
            lines[i] = lines[i].replace(regex, `>${replaced}</text>`);
        }
    }
}

fs.writeFileSync('src/components/Latex.tsx', lines.join('\n'));
console.log("Fixed capital vector arrows");
