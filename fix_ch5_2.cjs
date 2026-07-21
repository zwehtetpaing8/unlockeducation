const fs = require('fs');
let lines = fs.readFileSync('src/data/chapter5_content.ts', 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "(a)** 2 $E$'s. &nbsp;&nbsp;&nbsp; **(b)** 2 $S$'s.**") {
        lines[i] = "**(a)** 2 $E$'s. &nbsp;&nbsp;&nbsp; **(b)** 2 $S$'s.";
    }
}
fs.writeFileSync('src/data/chapter5_content.ts', lines.join('\n'));
