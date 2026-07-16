const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const targetBegin = '$\\\\begin{aligned}';
const newBegin = '$$\\\\begin{aligned}';

const targetEnd = '\\\\end{aligned}$';
const newEnd = '\\\\end{aligned}$$';

content = content.split(targetBegin).join(newBegin);
// Fix any ending ones that didn't have double $$
content = content.split(targetEnd).join(newEnd);

// Also remove the triple $$$ that I might have introduced
content = content.split('$$$\\\\begin').join('$$\\\\begin');
content = content.split('\\\\end{aligned}$$$').join('\\\\end{aligned}$$');

fs.writeFileSync('src/data/chapters.ts', content);
