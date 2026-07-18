const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

latex = latex.replace(/className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono" className="italic font-serif">x<\/text>/g, 'className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">x</text>');
latex = latex.replace(/className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono" className="italic font-serif">y<\/text>/g, 'className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">y</text>');
latex = latex.replace(/className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono" className="italic font-serif">z<\/text>/g, 'className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">z</text>');
latex = latex.replace(/className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono" className="italic font-serif">O<\/text>/g, 'className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-serif italic">O</text>');

// Also fix $\hat{\mathbf{i}}$ which didn't get replaced in Chap4_Fig4
latex = latex.replace(/\{"\\\$\\\\hat\{\\\\mathbf\{i\}\}\\\$"\}/g, '"î"');
latex = latex.replace(/\{"\\\$\\\\hat\{\\\\mathbf\{j\}\}\\\$"\}/g, '"ĵ"');
latex = latex.replace(/\{"\\\$\\\\hat\{\\\\mathbf\{k\}\}\\\$"\}/g, '"k̂"');

fs.writeFileSync('src/components/Latex.tsx', latex);
