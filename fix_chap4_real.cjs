const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const chap4Figs = `export function Chap4_Fig1() {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-64 h-64">
        <svg viewBox="-50 -50 200 200" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <line x1="50" y1="100" x2="-20" y2="130" strokeDasharray="4,4" />
          <line x1="-20" y1="130" x2="-40" y2="140" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="130" y2="100" markerEnd="url(#arrow)" />
          <line x1="50" y1="100" x2="50" y2="0" markerEnd="url(#arrow)" />
          <text x="-45" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$x$"}</text>
          <text x="135" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$y$"}</text>
          <text x="45" y="-5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$z$"}</text>
          <text x="40" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$O$"}</text>
          <circle cx="90" cy="30" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="95" y="30" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$P(x, y, z)$"}</text>
          <line x1="50" y1="30" x2="90" y2="30" strokeDasharray="4,4" />
          <line x1="90" y1="30" x2="90" y2="100" strokeDasharray="4,4" />
          <line x1="90" y1="100" x2="50" y2="100" strokeDasharray="4,4" />
          <line x1="50" y1="30" x2="10" y2="60" strokeDasharray="4,4" />
          <line x1="10" y1="60" x2="10" y2="130" strokeDasharray="4,4" />
          <line x1="10" y1="130" x2="50" y2="100" strokeDasharray="4,4" />
          <line x1="90" y1="30" x2="10" y2="60" strokeDasharray="4,4" />
          <line x1="90" y1="100" x2="10" y2="130" strokeDasharray="4,4" />
          <text x="5" y="55" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">{"$(0, 0, z)$"}</text>
          <text x="95" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">{"$(0, y, 0)$"}</text>
          <text x="15" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">{"$(x, 0, 0)$"}</text>
        </svg>
      </div>
    </div>
  );
}

export function Chap4_Fig2() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 my-6">
      <div className="relative w-48 h-48">
        <svg viewBox="-30 -30 150 150" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <line x1="30" y1="90" x2="-10" y2="110" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="110" y2="90" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="10" markerEnd="url(#arrow)" />
          <text x="-15" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$x$"}</text>
          <text x="115" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$y$"}</text>
          <text x="25" y="5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$z$"}</text>
          <text x="20" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$O$"}</text>
          <circle cx="80" cy="90" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="80" y="80" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$A$"}</text>
          <text x="50" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">3</text>
          <text x="40" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">(a)</text>
        </svg>
      </div>
      <div className="relative w-48 h-48">
        <svg viewBox="-30 -30 150 150" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <line x1="30" y1="90" x2="-10" y2="110" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="110" y2="90" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="10" markerEnd="url(#arrow)" />
          <text x="-15" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$x$"}</text>
          <text x="115" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$y$"}</text>
          <text x="25" y="5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$z$"}</text>
          <text x="20" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$O$"}</text>
          <circle cx="-10" cy="50" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="-25" y="50" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$B$"}</text>
          <line x1="30" y1="50" x2="-10" y2="50" strokeDasharray="4,4" />
          <line x1="-10" y1="50" x2="-10" y2="110" strokeDasharray="4,4" />
          <text x="20" y="55" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">2</text>
          <text x="0" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">4</text>
          <text x="40" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">(b)</text>
        </svg>
      </div>
      <div className="relative w-48 h-48">
        <svg viewBox="-30 -30 150 150" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">
          <line x1="30" y1="90" x2="-10" y2="110" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="50" y2="80" strokeDasharray="4,4" />
          <line x1="30" y1="90" x2="110" y2="90" markerEnd="url(#arrow)" />
          <line x1="30" y1="90" x2="30" y2="10" markerEnd="url(#arrow)" />
          <text x="-15" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$x$"}</text>
          <text x="115" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$y$"}</text>
          <text x="25" y="5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$z$"}</text>
          <text x="20" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$O$"}</text>
          <circle cx="80" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="85" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">{"$C$"}</text>
          <line x1="50" y1="80" x2="100" y2="80" strokeDasharray="4,4" />
          <line x1="100" y1="80" x2="80" y2="90" strokeDasharray="4,4" />
          <line x1="50" y1="80" x2="50" y2="30" strokeDasharray="4,4" />
          <line x1="50" y1="30" x2="100" y2="30" strokeDasharray="4,4" />
          <line x1="100" y1="30" x2="100" y2="80" strokeDasharray="4,4" />
          <line x1="100" y1="30" x2="80" y2="40" strokeDasharray="4,4" />
          <line x1="80" y1="40" x2="80" y2="90" strokeDasharray="4,4" />
          <line x1="30" y1="40" x2="80" y2="40" strokeDasharray="4,4" />
          <text x="35" y="80" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">-1</text>
          <text x="80" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>
          <text x="20" y="45" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>
          <text x="40" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">(c)</text>
        </svg>
      </div>
    </div>
  );
}`;

const m1 = 'export function Chap4_Fig1() {';
const end = 'export function Chap4_Fig3() {';
const idx1 = latex.indexOf(m1);
const idx2 = latex.indexOf(end);

latex = latex.substring(0, idx1) + chap4Figs + '\n\n' + latex.substring(idx2);

fs.writeFileSync('src/components/Latex.tsx', latex);
