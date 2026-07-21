const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');
content = 'import React from "react";\n' + content;
fs.writeFileSync('src/components/ChapterDetails.tsx', content);
