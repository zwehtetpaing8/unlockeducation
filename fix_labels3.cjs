const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="15" y="130" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(x, 0, 0)</text>',
  '<text x="15" y="145" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(x, 0, 0)</text>'
);

latex = latex.replace(
  '<text x="110" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, y, 0)</text>',
  '<text x="110" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, y, 0)</text>'
);

latex = latex.replace(
  '<text x="45" y="35" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, z)</text>',
  '<text x="45" y="25" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, z)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
