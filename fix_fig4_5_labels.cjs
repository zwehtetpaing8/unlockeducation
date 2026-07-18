const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace i, j, k labels in both figures
latex = latex.replace(
  /<text x="18" y="93" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono font-bold">î<\/text>/g,
  '<text x="12" y="98" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">î</text>'
);
latex = latex.replace(
  /<text x="45" y="85" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono font-bold">ĵ<\/text>/g,
  '<text x="45" y="83" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">ĵ</text>'
);
latex = latex.replace(
  /<text x="25" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono font-bold">k̂<\/text>/g,
  '<text x="22" y="75" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">k̂</text>'
);

// Replace OA and p
latex = latex.replace(
  /<text x="45" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono">OA<\/text>/g,
  '<text x="45" y="55" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">OA</text>'
);
latex = latex.replace(
  /<text x="45" y="60" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono font-bold">p<\/text>/g,
  '<text x="45" y="55" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono font-bold">p</text>'
);

// Replace 2, 3, 4 labels in Fig4
latex = latex.replace(
  /<text x="8" y="105" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono">2<\/text>/g,
  '<text x="5" y="108" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">2</text>'
);
latex = latex.replace(
  /<text x="95" y="85" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono">3<\/text>/g,
  '<text x="95" y="87" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">3</text>'
);
latex = latex.replace(
  /<text x="35" y="30" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-\[10px\] font-mono">4<\/text>/g,
  '<text x="35" y="33" textAnchor="start" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">4</text>'
);

fs.writeFileSync('src/components/Latex.tsx', latex);
