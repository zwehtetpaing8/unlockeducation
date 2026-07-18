const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// In Chap4_Fig2 (b):
// <circle cx="-10" cy="50" ... /> -> <circle cx="-10" cy="70" ... />
// <text x="-25" y="50" ...>B</text> -> <text x="-25" y="70" ...>B</text>
// <line x1="30" y1="50" x2="-10" y2="50" ... /> -> <line x1="30" y1="50" x2="-10" y2="70" ... />
// <line x1="-10" y1="50" x2="-10" y2="110" ... /> -> <line x1="-10" y1="70" x2="-10" y2="110" ... />

latex = latex.replace(
  '<circle cx="-10" cy="50" r="2" className="fill-slate-800 dark:fill-slate-200" />',
  '<circle cx="-10" cy="70" r="2" className="fill-slate-800 dark:fill-slate-200" />'
);

latex = latex.replace(
  '<text x="-25" y="50" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">B</tspan></text>',
  '<text x="-25" y="70" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">B</tspan></text>'
);

latex = latex.replace(
  '<line x1="30" y1="50" x2="-10" y2="50" strokeDasharray="4,4" />',
  '<line x1="30" y1="50" x2="-10" y2="70" strokeDasharray="4,4" />'
);

latex = latex.replace(
  '<line x1="-10" y1="50" x2="-10" y2="110" strokeDasharray="4,4" />',
  '<line x1="-10" y1="70" x2="-10" y2="110" strokeDasharray="4,4" />'
);

latex = latex.replace(
  '<text x="20" y="55" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">2</text>',
  '<text x="15" y="65" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono">2</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
