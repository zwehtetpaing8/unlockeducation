const fs = require('fs');
const content = fs.readFileSync('src/data/pastQuestions.ts', 'utf8');
const ids = [];
const regex = /id:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  ids.push(match[1]);
}
console.log('Total IDs:', ids.length);
console.log('Unique IDs:', new Set(ids).size);
const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log('Duplicates:', duplicates);
