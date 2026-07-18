const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="-15" y="145" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x</text>',
  '<text x="-20" y="155" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
