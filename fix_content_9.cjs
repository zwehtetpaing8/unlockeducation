const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const i8 = content.indexOf('(-\\vec{b})');
if (i8 !== -1) console.log('8', content.substring(i8 - 20, i8 + 30));

const i10 = content.indexOf('a_3 = b_3');
if (i10 !== -1) console.log('10', content.substring(i10 - 20, i10 + 30));

const i13 = content.indexOf('Example 6');
if (i13 !== -1) console.log('13', content.substring(i13 - 30, i13 + 30));

const i14 = content.indexOf('opposite direction to $\\vec{a}$');
if (i14 !== -1) console.log('14', content.substring(i14 - 30, i14 + 40));

