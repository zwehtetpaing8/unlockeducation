const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const mapStart = content.indexOf('const DIAGRAM_MAP: Record<string, React.FC> = {');
const mapSecond = content.indexOf('const DIAGRAM_MAP: Record<string, React.FC> = {', mapStart + 1);

if (mapSecond !== -1) {
  content = content.substring(0, mapSecond);
}

fs.writeFileSync('src/components/Latex.tsx', content, 'utf8');
