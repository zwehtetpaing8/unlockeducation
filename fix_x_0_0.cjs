const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="15" y="145" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(x, 0, 0)</text>',
  '<text x="15" y="125" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(x, 0, 0)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
