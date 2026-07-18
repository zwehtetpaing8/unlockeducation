const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// replace x
latex = latex.replace(
  /<text x="-18" y="124" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x<\/tspan><\/text>/g,
  '<text x="-15" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>'
);

// replace y
latex = latex.replace(
  /<text x="118" y="94" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y<\/tspan><\/text>/g,
  '<text x="115" y="95" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>'
);

// replace z
latex = latex.replace(
  /<text x="30" y="0" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z<\/tspan><\/text>/g,
  '<text x="30" y="5" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
