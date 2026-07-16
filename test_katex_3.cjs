const fs = require('fs');
const lines = fs.readFileSync('src/data/chapters.ts', 'utf8').split('\n');
const line = lines[2358];
console.log(line);
for(let i=0; i<line.length; i++) console.log(line[i], line.charCodeAt(i));
