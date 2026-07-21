const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

content = content.replace(
    '<text x="-35" y="155" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[11px] font-mono">(1, 0, 0)</text>',
    '<text x="-15" y="155" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[11px] font-mono">(1, 0, 0)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Fixed 100");
