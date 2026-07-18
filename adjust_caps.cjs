const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<text x="25" y="100" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>\n          <text x="70" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"ĵ"}</text>\n          <text x="40" y="75" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"k̂"}</text>',
  '<text x="25" y="96" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>\n          <text x="70" y="90" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"ĵ"}</text>\n          <text x="36" y="75" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"k̂"}</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
