const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// In Chap4_Fig3 and Chap4_Fig4, replace i, j, k with î, ĵ, k̂
content = content.replace(/>i<\/text>/g, '>î</text>');
content = content.replace(/>j<\/text>/g, '>ĵ</text>');
content = content.replace(/>k<\/text>/g, '>k̂</text>');

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Fixed ijk");
