const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

content = content.replace(
  'if (line.trim() === "---" && currentLines.length === 0) {',
  'if (line.trim() === "---") {'
);

fs.writeFileSync('src/components/ChapterDetails.tsx', content, 'utf8');
