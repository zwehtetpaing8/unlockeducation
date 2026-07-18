const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const chap4Figs = `
export function Chap4_Fig1() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
        <span className="text-sm font-mono text-slate-500">3D Coordinate System (Point P)</span>
      </div>
    </div>
  );
}

export function Chap4_Fig2() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
        <span className="text-sm font-mono text-slate-500">Points A, B, C in Space</span>
      </div>
    </div>
  );
}

export function Chap4_Fig3() {
  return null;
}

export function Chap4_Fig4() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-50 -50 200 200" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <line x1="50" y1="100" x2="-20" y2="135" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="130" y2="100" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="0" markerEnd="url(#arrow)" />
          <text x="-25" y="150" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">$x$</text>
          <text x="135" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">$y$</text>
          <text x="45" y="-5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">$z$</text>
          <text x="55" y="100" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">$O$</text>
          
          <line x1="50" y1="100" x2="10" y2="120" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="90" y2="100" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="60" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="25" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">$\\hat{\\mathbf{i}}$</text>
          <text x="75" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">$\\hat{\\mathbf{j}}$</text>
          <text x="55" y="80" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">$\\hat{\\mathbf{k}}$</text>
          
          <text x="-5" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">$(1, 0, 0)$</text>
          <text x="95" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">$(0, 1, 0)$</text>
          <text x="60" y="55" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">$(0, 0, 1)$</text>
        </svg>
      </div>
    </div>
  );
}
`;

const insertionPoint = 'export default function Latex({';
if (latex.includes(insertionPoint)) {
    latex = latex.replace(insertionPoint, chap4Figs + '\n' + insertionPoint);
    fs.writeFileSync('src/components/Latex.tsx', latex);
    console.log("Success");
} else {
    console.log("Failed to find insertion point");
}
