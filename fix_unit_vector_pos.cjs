const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

// Replace (1, 0, 0) coordinates
content = content.replace(
    '<text x="5" y="135" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>',
    '<text x="0" y="115" textAnchor="end" className="fill-slate-800 dark:fill-slate-200 stroke-none text-[10px] font-mono">(1, 0, 0)</text>'
);

fs.writeFileSync('src/components/Latex.tsx', content);
console.log("Fixed (1,0,0) pos");
