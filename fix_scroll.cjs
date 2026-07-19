const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    /className="p-3 bg-slate-50 dark:bg-slate-950\/60 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-center overflow-x-auto min-h-\[50px\]"/g,
    'className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-[50px] w-full text-center flex flex-col items-center justify-center"'
  );
  
  content = content.replace(
    /className="p-4 bg-slate-50 dark:bg-slate-950\/60 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center text-center overflow-x-auto min-h-\[56px\]"/g,
    'className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-[56px] w-full text-center flex flex-col items-center justify-center"'
  );
  fs.writeFileSync(filePath, content);
}

fixFile('src/components/ChapterDetails.tsx');
fixFile('src/components/FormulaSheet.tsx');
