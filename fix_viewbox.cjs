const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(
  '<svg viewBox="-30 -10 180 180" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="1">',
  '<svg viewBox="-40 -20 200 180" className="w-full h-full stroke-slate-800 dark:stroke-slate-200 fill-none overflow-visible" strokeWidth="1">'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
