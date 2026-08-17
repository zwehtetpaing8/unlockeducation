const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const i1 = content.indexOf('direction vectors of the $xy$-plane.');
if (i1 !== -1) {
    console.log('Context 1:\n' + content.substring(i1, i1 + 100));
}

const i2 = content.indexOf('sum of scalar multiples of those two vectors.');
if (i2 !== -1) {
    console.log('Context 2:\n' + content.substring(i2, i2 + 100));
}
