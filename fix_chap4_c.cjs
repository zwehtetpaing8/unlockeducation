const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// The third SVG in Chap4_Fig2
// We need to change the circle for C to be at (100,30) instead of (80,40)
// and text C to be near it.

latex = latex.replace(
  '<circle cx="80" cy="40" r="2" className="fill-slate-800 dark:fill-slate-200" />',
  '<circle cx="100" cy="30" r="2" className="fill-slate-800 dark:fill-slate-200" />'
);

latex = latex.replace(
  '<text x="85" y="35" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">C</tspan></text>',
  '<text x="105" y="25" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">C</tspan></text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
