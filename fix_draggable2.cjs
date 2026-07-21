const fs = require('fs');
let content = fs.readFileSync('src/components/DraggableScroll.tsx', 'utf8');
content = content.replace(
    /interface DraggableScrollProps extends React.HTMLAttributes<HTMLDivElement> \{\s*children: React.ReactNode;\s*\}/,
    'interface DraggableScrollProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode; className?: string; key?: string | number; }'
);
fs.writeFileSync('src/components/DraggableScroll.tsx', content);
