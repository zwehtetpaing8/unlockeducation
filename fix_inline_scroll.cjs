const fs = require('fs');

let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');
content = content.replace(
  /className="katex-inline inline-block px-0.5 font-serif text-slate-800 dark:text-slate-200"/g,
  'className="katex-inline inline-block px-0.5 font-serif text-slate-800 dark:text-slate-200 max-w-full overflow-x-auto align-bottom scrollbar-none"'
);

fs.writeFileSync('src/components/Latex.tsx', content);
