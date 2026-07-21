const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter5_content.ts', 'utf8').split('\n');

let newLines = [];
for (let i = 0; i <= 1847; i++) { // 0 to 1847 is lines 1 to 1848
    newLines.push(lines[i]);
}

newLines.push("****(a)** 2 $E$'s. &nbsp;&nbsp;&nbsp; **(b)** 2 $S$'s.**".replace(/\*\*\*\*/, ''));

for (let i = 1849; i <= 1961; i++) { // 1849 is line 1850, 1961 is line 1962
    newLines.push(lines[i]);
}

fs.writeFileSync('src/data/chapter5_content.ts', newLines.join('\n'));
