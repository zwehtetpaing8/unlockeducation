const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const mapStart = content.indexOf('const DIAGRAM_MAP: Record<string, React.FC> = {');
if (mapStart !== -1) {
  content = content.substring(0, mapStart);
}

// Find all functions (function XXX or export function XXX)
const fnRegex = /(?:^|\n)(?:export\s+)?function\s+([A-Za-z0-9_]+)\s*\(/g;
let match;
const fns = [];
while ((match = fnRegex.exec(content)) !== null) {
  if (match[1] !== 'renderTextWithStyles' && match[1] !== 'renderMathText' && match[1] !== 'Latex') {
    fns.push(match[1]);
  }
}

const componentCode = `
const DIAGRAM_MAP: Record<string, React.FC> = {
  ${fns.map(fn => `${fn}`).join(',\n  ')}
};

export default function Latex({ text, className = '', block = false }: LatexProps) {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  // Match [DIAGRAM: DiagramName]
  const regex = /\\[DIAGRAM:\\s*([a-zA-Z0-9_]+)\\s*\\]/g;
  let m;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > currentIndex) {
      parts.push(
        <span key={\`text-\${currentIndex}\`}>
          {renderMathText(text.substring(currentIndex, m.index))}
        </span>
      );
    }
    const diagName = m[1];
    const DiagramComponent = DIAGRAM_MAP[diagName];
    if (DiagramComponent) {
      parts.push(<DiagramComponent key={\`diag-\${m.index}\`} />);
    } else {
      parts.push(
        <span key={\`diag-\${m.index}\`} className="text-red-500 text-xs border border-red-500 p-1">
          [Missing Diagram: {diagName}]
        </span>
      );
    }
    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(
      <span key={\`text-\${currentIndex}\`}>
        {renderMathText(text.substring(currentIndex))}
      </span>
    );
  }

  if (block) {
    return <div className={\`my-4 \${className}\`}>{parts}</div>;
  }
  return <span className={className}>{parts}</span>;
}
`;

fs.writeFileSync('src/components/Latex.tsx', content + componentCode, 'utf8');
