const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace(/### Example 8/g, '**Example 8**');
content = content.replace(/### Example 9/g, '**Example 9**');
content = content.replace(/### Example 10/g, '**Example 10**');
content = content.replace(/### Example 11/g, '**Example 11**');

fs.writeFileSync('src/data/chapter4_content.ts', content);
console.log("Fixed examples heading");
