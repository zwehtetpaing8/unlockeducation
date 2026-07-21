const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

content = content.replace(
    '<text x="5" y="135" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>',
    '<text x="15" y="135" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Fixed 100 again");
