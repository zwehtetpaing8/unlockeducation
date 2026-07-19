const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // In ChapterDetails.tsx
  content = content.replace(
    /className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800\/80 shadow-sm space-y-3 flex flex-col justify-between"/g,
    'className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3 flex flex-col justify-between overflow-hidden min-w-0"'
  );
  
  // In FormulaSheet.tsx
  content = content.replace(
    /className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between"/g,
    'className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between overflow-hidden min-w-0"'
  );
  fs.writeFileSync(filePath, content);
}

fixFile('src/components/ChapterDetails.tsx');
fixFile('src/components/FormulaSheet.tsx');
