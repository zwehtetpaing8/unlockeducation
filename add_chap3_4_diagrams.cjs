const fs = require('fs');

const diagramsCode = `
// -----------------------------------------------------------------
// Chapter 3.4 Diagrams
// -----------------------------------------------------------------
export function Chap3_4_PlaneABC() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="300" height="200" viewBox="0 0 300 200">
        <polygon points="50,150 250,150 280,50 80,50" fill="none" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Points */}
        <circle cx="100" cy="120" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="80" y="115" fontSize="12" fill="#0f172a" className="dark:fill-white font-serif italic">A</text>
        <text x="60" y="135" fontSize="10" fill="#64748b"> (x₁, y₁, z₁) </text>

        <circle cx="180" cy="60" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="185" y="55" fontSize="12" fill="#0f172a" className="dark:fill-white font-serif italic">B</text>

        <circle cx="230" cy="120" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="235" y="125" fontSize="12" fill="#0f172a" className="dark:fill-white font-serif italic">C</text>

        {/* Vectors */}
        <line x1="100" y1="120" x2="175" y2="64" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="110" y="85" fontSize="11" fill="#0f172a" className="dark:fill-white">⟨l₁, m₁, n₁⟩</text>

        <line x1="100" y1="120" x2="225" y2="120" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.2" markerEnd="url(#arrow-p)" />
        <text x="145" y="135" fontSize="11" fill="#0f172a" className="dark:fill-white">⟨l₂, m₂, n₂⟩</text>

      </svg>
    </div>
  );
}

export function Chap3_4_Ex9() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="250" height="200" viewBox="0 0 250 200">
        <polygon points="60,160 220,160 240,80 80,80" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="140" y="130" fontSize="12" fill="#0f172a" className="dark:fill-white font-mono">3x - 2y - z = 3</text>
        
        {/* Line */}
        <line x1="100" y1="30" x2="100" y2="135" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="100" y2="160" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Point P */}
        <circle cx="100" cy="135" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="110" y="140" fontSize="12" fill="#0f172a" className="dark:fill-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="100" cy="40" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="110" y="45" fontSize="11" fill="#0f172a" className="dark:fill-white">(-1, 3, 2)</text>

        {/* Direction vector bracket */}
        <path d="M 90 60 L 85 60 L 85 110 L 90 110" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="40" y="90" fontSize="10" fill="#64748b" transform="rotate(-90 40 90)">⟨3, -2, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="250" height="200" viewBox="0 0 250 200">
        <polygon points="60,160 220,160 240,80 80,80" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="130" y="130" fontSize="12" fill="#0f172a" className="dark:fill-white font-mono">-2x + 3y - z = 4</text>
        
        {/* Line */}
        <line x1="100" y1="30" x2="100" y2="135" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="100" y2="160" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Point P */}
        <circle cx="100" cy="135" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="110" y="140" fontSize="12" fill="#0f172a" className="dark:fill-white font-serif italic">P</text>
        
        {/* Top point */}
        <circle cx="100" cy="40" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="110" y="45" fontSize="11" fill="#0f172a" className="dark:fill-white">(3, -2, -2)</text>

        {/* Direction vector bracket */}
        <path d="M 90 60 L 85 60 L 85 110 L 90 110" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="40" y="90" fontSize="10" fill="#64748b" transform="rotate(-90 40 90)">⟨-2, 3, -1⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol1() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="250" height="200" viewBox="0 0 250 200">
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="130" y="60" fontSize="11" fill="#0f172a" className="dark:fill-white">(-1, 3, 2)</text>
        <text x="80" y="60" fontSize="14" fill="#0f172a" className="dark:fill-white font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="#0f172a" className="dark:fill-white font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="110" y1="10" x2="110" y2="170" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1" />
        
        <path d="M 110 80 L 115 80 L 115 150 L 110 150" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="130" y="115" fontSize="10" fill="#64748b" transform="rotate(-90 130 115)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Ex10_Sol2() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="250" height="200" viewBox="0 0 250 200">
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="130" y="60" fontSize="11" fill="#0f172a" className="dark:fill-white">(-1, 3, 2)</text>
        
        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="#0f172a" className="dark:fill-white font-mono">3x - 2y - 3z = 2</text>
        
        {/* Line */}
        <line x1="110" y1="10" x2="110" y2="170" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1" />
        
        <path d="M 100 80 L 105 80 L 105 150 L 100 150" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="95" y="115" fontSize="10" fill="#64748b" transform="rotate(-90 95 115)">⟨3, -2, -3⟩</text>
      </svg>
    </div>
  );
}

export function Chap3_4_Q3_Sol() {
  return (
    <div className="my-6 flex justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <svg width="250" height="200" viewBox="0 0 250 200">
        {/* Top Plane */}
        <polygon points="50,80 190,80 210,30 70,30" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="120" cy="55" r="3" fill="#0f172a" className="dark:fill-white" />
        <text x="130" y="60" fontSize="11" fill="#0f172a" className="dark:fill-white">(2, 3, -1)</text>
        <text x="80" y="60" fontSize="14" fill="#0f172a" className="dark:fill-white font-serif italic">Π</text>
        
        {/* Bottom Plane */}
        <polygon points="50,150 190,150 210,100 70,100" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="90" y="130" fontSize="12" fill="#0f172a" className="dark:fill-white font-mono">-2x + y + 3z = 6</text>
        
        {/* Line */}
        <line x1="110" y1="10" x2="110" y2="170" stroke="#0f172a" className="dark:stroke-white" strokeWidth="1" />
        
        <path d="M 100 80 L 105 80 L 105 150 L 100 150" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="95" y="115" fontSize="10" fill="#64748b" transform="rotate(-90 95 115)">⟨-2, 1, 3⟩</text>
      </svg>
    </div>
  );
}
`;

let latexLines = fs.readFileSync('src/components/Latex.tsx', 'utf8').split('\n');

// Find insertion point for the components
const componentInsertionIndex = latexLines.findIndex(l => l.includes('export default function Latex'));
latexLines.splice(componentInsertionIndex - 1, 0, ...diagramsCode.split('\n'));

// Find insertion point for the switch cases
const switchIndex = latexLines.findIndex(l => l.includes('switch (diagName) {'));
const switchCases = `        case 'Chap3_4_PlaneABC':
          renderedElements.push(<Chap3_4_PlaneABC key={\`diag-\${i}\`} />);
          break;
        case 'Chap3_4_Ex9':
          renderedElements.push(<Chap3_4_Ex9 key={\`diag-\${i}\`} />);
          break;
        case 'Chap3_4_Q2':
          renderedElements.push(<Chap3_4_Q2 key={\`diag-\${i}\`} />);
          break;
        case 'Chap3_4_Ex10_Sol1':
          renderedElements.push(<Chap3_4_Ex10_Sol1 key={\`diag-\${i}\`} />);
          break;
        case 'Chap3_4_Ex10_Sol2':
          renderedElements.push(<Chap3_4_Ex10_Sol2 key={\`diag-\${i}\`} />);
          break;
        case 'Chap3_4_Q3_Sol':
          renderedElements.push(<Chap3_4_Q3_Sol key={\`diag-\${i}\`} />);
          break;`;
latexLines.splice(switchIndex + 1, 0, ...switchCases.split('\n'));

fs.writeFileSync('src/components/Latex.tsx', latexLines.join('\n'), 'utf8');
