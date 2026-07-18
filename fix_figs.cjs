const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace Chap4_Fig3 unit vectors
latex = latex.replace(
  /<text x="25" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">î<\/text>/g,
  '<text x="28" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">i</text>'
);
latex = latex.replace(
  /<text x="75" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">ĵ<\/text>/g,
  '<text x="70" y="112" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">j</text>'
);
latex = latex.replace(
  /<text x="42" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">k̂<\/text>/g,
  '<text x="42" y="80" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">k</text>'
);
latex = latex.replace(
  /<text x="0" y="130" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono">\(1, 0, 0\)<\/text>/g,
  '<text x="5" y="135" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>'
);

// Chap4_Fig4 changes
const fig4_old = `          <text x="12" y="98" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">î</text>
          <text x="45" y="83" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">ĵ</text>
          <text x="22" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">k̂</text>

          <text x="45" y="55" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">OA</text>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan>(2, 3, 4)</text>
          
          <text x="5" y="108" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>
          <text x="95" y="87" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">3</text>
          <text x="35" y="33" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">4</text>`;

const fig4_new = `          <text x="12" y="98" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">i</text>
          <text x="45" y="83" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">j</text>
          <text x="22" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">k</text>

          <g className="fill-slate-800 dark:fill-slate-200 text-[10px] font-mono">
            <text x="46" y="53" textAnchor="end">OA</text>
            <line x1="33" y1="44" x2="45" y2="44" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 42 42 L 45 44 L 42 46" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">A</tspan>(2, 3, 4)</text>
          
          <circle cx="10" cy="100" r="1.5" className="fill-slate-800 dark:fill-slate-200" />
          <circle cx="90" cy="90" r="1.5" className="fill-slate-800 dark:fill-slate-200" />
          <circle cx="30" cy="30" r="1.5" className="fill-slate-800 dark:fill-slate-200" />
          
          <text x="5" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>
          <text x="95" y="90" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">3</text>
          <text x="25" y="33" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">4</text>`;

latex = latex.replace(fig4_old, fig4_new);

// Chap4_Fig5 changes
const fig5_old = `          <text x="12" y="98" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">î</text>
          <text x="45" y="83" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">ĵ</text>
          <text x="22" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">k̂</text>

          <text x="45" y="55" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">p</text>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">P</tspan>(a, b, c)</text>`;

const fig5_new = `          <text x="12" y="98" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">i</text>
          <text x="45" y="83" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">j</text>
          <text x="22" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold italic">k</text>

          <g className="fill-slate-800 dark:fill-slate-200 text-[10px] font-mono">
            <text x="46" y="53" textAnchor="end">OP</text>
            <line x1="33" y1="44" x2="45" y2="44" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 42 42 L 45 44 L 42 46" stroke="currentColor" fill="none" strokeWidth="0.8" />
          </g>
          <circle cx="70" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />
          <text x="75" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono"><tspan className="italic font-serif">P</tspan>(a, b, c)</text>`;

latex = latex.replace(fig5_old, fig5_new);

fs.writeFileSync('src/components/Latex.tsx', latex);
