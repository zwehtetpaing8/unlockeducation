const fs = require('fs');
let content = fs.readFileSync('src/data/chapters.ts', 'utf8');

const regex = /(\$\$(.*?)\$\$)|(\$(.*?)\$)/g;
// actually the parser in Latex.tsx doesn't use 's' flag, it matches line by line and groups later!
