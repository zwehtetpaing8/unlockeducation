const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// For Chap4_Fig1
latex = latex.replace(
  /<text x="-20" y="150" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x<\/text>/g,
  '<text x="-15" y="145" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>'
);
latex = latex.replace(
  /<text x="145" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">y<\/text>/g,
  '<text x="145" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>'
);
latex = latex.replace(
  /<text x="45" y="5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">z<\/text>/g,
  '<text x="50" y="0" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>'
);

// For Chap4_Fig3
latex = latex.replace(
  /<text x="-25" y="150" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x<\/text>/g,
  '<text x="-25" y="140" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>'
);
latex = latex.replace(
  /<text x="135" y="105" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">y<\/text>/g,
  '<text x="135" y="105" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>'
);
latex = latex.replace(
  /<text x="45" y="-5" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">z<\/text>/g,
  '<text x="50" y="-10" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>'
);

// For Chap4_Fig4 & Fig5
// They use: <text x="-25" y="125" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>
latex = latex.replace(
  /<text x="-25" y="125" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x<\/tspan><\/text>/g,
  '<text x="-25" y="120" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">x</tspan></text>'
);
latex = latex.replace(
  /<text x="135" y="95" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y<\/tspan><\/text>/g,
  '<text x="135" y="95" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">y</tspan></text>'
);
latex = latex.replace(
  /<text x="30" y="-15" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z<\/tspan><\/text>/g,
  '<text x="30" y="-20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono"><tspan className="italic font-serif">z</tspan></text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
