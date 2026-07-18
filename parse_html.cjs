const fs = require('fs');
const content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const regex = /<div class="flex[^>]*>[\s\S]*?<\/div>\s*<\/div>/g;
const matches = [...content.matchAll(regex)];
console.log(matches.length);

for (let i = 0; i < matches.length; i++) {
   console.log("MATCH " + i);
   // console.log(matches[i][0]);
}

