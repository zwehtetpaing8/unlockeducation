const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="25" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>',
  '<text x="12" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
