const fs = require('fs');
let content = fs.readFileSync('src/components/DraggableScroll.tsx', 'utf8');
content = content.replace(
    'export interface DraggableScrollProps {',
    'export interface DraggableScrollProps {\n  className?: string;'
);
fs.writeFileSync('src/components/DraggableScroll.tsx', content);
