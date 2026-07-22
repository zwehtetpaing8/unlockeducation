const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// replace var(--cyclic-arrow-url) with nothing
content = content.replace(/style={{ markerEnd: 'var\(--cyclic-arrow-url\)' }}/g, '');

// replace all url(#cyclic-arrow-v2) with nothing
content = content.replace(/markerEnd="url\(#cyclic-arrow-v2\)"/g, '');

fs.writeFileSync('src/components/Latex.tsx', content);
