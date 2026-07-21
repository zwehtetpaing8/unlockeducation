const fs = require('fs');
let content = fs.readFileSync('src/components/Latex.tsx', 'utf8');

content = content.replace(
  /<div key=\{\`p-\$\{i\}\`\} className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-2">/g,
  '<div key={`p-${i}`} className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs md:text-sm my-2 overflow-x-auto scrollbar-none">'
);

fs.writeFileSync('src/components/Latex.tsx', content);
