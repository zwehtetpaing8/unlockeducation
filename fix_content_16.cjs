const fs = require('fs');
let content = fs.readFileSync('src/data/chapter4_content.ts', 'utf8');

content = content.replace('**Example 3**', '[DIAGRAM:Chap4_Fig9]\n\n**Example 3**');
content = content.replace('### Parallel Vectors', '[DIAGRAM:Chap4_Fig10]\n\n### Parallel Vectors');
content = content.replace('**Example 6**', '[DIAGRAM:Chap4_Fig13]\n\n**Example 6**');

fs.writeFileSync('src/data/chapter4_content.ts', content);
