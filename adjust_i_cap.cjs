const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="25" y="110" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>',
  '<text x="25" y="100" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
