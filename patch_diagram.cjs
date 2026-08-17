const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const switchCase = `        case 'Chap4_4_4_Ex21_Diag':
          renderedElements.push(<Chap4_4_4_Ex21_Diag key={"diag-" + i} />);
          break;
        case 'Chap4_4_4_Ex4_4_3b_Diag':
          renderedElements.push(<Chap4_4_4_Ex4_4_3b_Diag key={"diag-" + i} />);
          break;`;
content = content.replace(`        case 'Chap4_4_4_Ex21_Diag':\n          renderedElements.push(<Chap4_4_4_Ex21_Diag key={"diag-" + i} />);\n          break;`, switchCase);

const componentDef = `
export function Chap4_4_4_Ex4_4_3b_Diag() {
  return (
    <div className="flex flex-col items-center my-8">
      <div className="relative w-full max-w-[480px] aspect-[480/320] bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <svg viewBox="0 0 480 320" overflow="visible" className="w-full h-full fill-none" strokeWidth="1.5">
          {/* Plane */}
          <polygon points="120,220 420,220 360,140 60,140" className="fill-amber-500/5 stroke-amber-500/40 dark:fill-amber-500/10 dark:stroke-amber-400/30" strokeWidth="1.5" />
          <text x="320" y="135" className="fill-amber-700 dark:fill-amber-300 stroke-none text-xs uppercase tracking-wider font-semibold">plane</text>
          
          {/* Line below plane */}
          <line x1="240" y1="220" x2="240" y2="280" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 4" className="stroke-amber-600 dark:stroke-amber-400" />
          
          {/* Line above plane (normal vector) */}
          <line x1="240" y1="220" x2="240" y2="90" stroke="#d97706" strokeWidth="2.5" className="stroke-amber-600 dark:stroke-amber-400" />
          <polygon points="240.0,90.0 236.0,102.0 244.0,102.0" className="fill-amber-600 dark:fill-amber-400 stroke-none" />
          
          {/* Right angle marker */}
          <polyline points="240,205 255,205 255,220" stroke="#d97706" strokeWidth="1.5" className="stroke-amber-600/60 dark:stroke-amber-400/60 fill-none" />
          
          {/* Points */}
          <circle cx="240" cy="220" r="3.5" className="fill-slate-800 dark:fill-slate-100" />
          <circle cx="240" cy="90" r="3.5" className="fill-amber-600 dark:fill-amber-400" />
          
          {/* Labels */}
          <foreignObject x="150" y="225" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-end w-full h-full text-sm font-semibold text-slate-800 dark:text-slate-100"><Latex text="$A(2,3,1)$" /></div>
          </foreignObject>
          <foreignObject x="250" y="75" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-start w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text="$B(5,7,2)$" /></div>
          </foreignObject>
          <foreignObject x="150" y="140" width="80" height="30" overflow="visible">
             <div className="flex items-center justify-end w-full h-full text-sm font-semibold text-amber-600 dark:text-amber-400"><Latex text={"$\\\\overrightarrow{AB} = \\\\vec{n}$"} /></div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
`;

content = content + componentDef;
fs.writeFileSync('src/components/Latex.tsx', content);
console.log('Component added successfully');
