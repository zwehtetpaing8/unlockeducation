const fs = require('fs');
let latex = fs.readFileSync('src/components/Latex.tsx', 'utf8');

const oldFig4 = `<text x="25" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>
          <text x="75" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"ĵ"}</text>
          <text x="55" y="80" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"k̂"}</text>
          
          <text x="-5" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>
          <text x="95" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>
          <text x="60" y="55" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>`;

const newFig4 = `<text x="25" y="110" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"î"}</text>
          <text x="70" y="95" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"ĵ"}</text>
          <text x="40" y="75" className="fill-slate-800 dark:fill-slate-200 stroke-none text-xs font-mono font-bold">{"k̂"}</text>
          
          <text x="-5" y="130" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>
          <text x="85" y="115" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 1, 0)</text>
          <text x="55" y="60" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(0, 0, 1)</text>`;

if (latex.includes(oldFig4)) {
  latex = latex.replace(oldFig4, newFig4);
  fs.writeFileSync('src/components/Latex.tsx', latex);
  console.log('Replaced Fig4 successfully');
} else {
  console.log('Could not find oldFig4');
}
