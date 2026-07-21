const fs = require('fs');
let content = fs.readFileSync('src/components/ChapterDetails.tsx', 'utf8');

// Add min-w-0 and break-words to the container
content = content.replace(
  'className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm"',
  'className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm min-w-0 break-words overflow-x-hidden"'
);

// Do same for reading view
content = content.replace(
  'className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm"',
  'className="leading-relaxed prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-xs md:text-sm min-w-0 break-words overflow-x-hidden"'
);

fs.writeFileSync('src/components/ChapterDetails.tsx', content);
