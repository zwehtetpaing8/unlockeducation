const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

const index = content.indexOf('Example 3');
if (index !== -1) {
    console.log(content.substring(index - 40, index + 20));
}
