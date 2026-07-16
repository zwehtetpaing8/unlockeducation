const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const targetBegin = String.raw`$\begin{aligned}`;
const newBegin = String.raw`$$\begin{aligned}`;

const targetEnd = String.raw`\end{aligned}$`;
const newEnd = String.raw`\end{aligned}$$`;

content = content.split(targetBegin).join(newBegin);
content = content.split(targetEnd).join(newEnd);

fs.writeFileSync('src/data/chapters.ts', content);
