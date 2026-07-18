const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Chap4_Fig3
// Replace <text x="55" y="105" className="..."><tspan ...>O</tspan></text>
latex = latex.replace(
  /<text x="55" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O<\/tspan><\/text>/g,
  '<text x="55" y="115" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>'
);

// Chap4_Fig4 & Fig5
// Replace <text x="25" y="105" className="..."><tspan ...>O</tspan></text>
latex = latex.replace(
  /<text x="25" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O<\/tspan><\/text>/g,
  '<text x="35" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">O</tspan></text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
