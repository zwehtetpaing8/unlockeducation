const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace overflow-x-auto with overflow-x-auto py-1 to prevent vertical clipping of \vec
content = content.replace(/overflow-x-auto scrollbar-none/g, "overflow-x-auto scrollbar-none py-1");

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Fixed Latex overflow clipping");
