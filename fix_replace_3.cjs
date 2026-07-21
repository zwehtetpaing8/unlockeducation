const fs = require('fs');
let text = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

text = text.split('\n').map(line => {
    if (line.startsWith('$ ') && line.endsWith(' $')) {
        return '$$' + line.slice(1, -1) + '$$';
    }
    return line;
}).join('\n');

fs.writeFileSync('src/data/chapter4_content.ts', text);
