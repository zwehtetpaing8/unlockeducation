const fs = require('fs');
let content = fs.readFileSync('src/components/DraggableScroll.tsx', 'utf8');
content = content.replace(
    /interface DraggableScrollProps extends React.HTMLAttributes<HTMLDivElement> \{.*?\}/,
    'type DraggableScrollProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; };'
);
fs.writeFileSync('src/components/DraggableScroll.tsx', content);
