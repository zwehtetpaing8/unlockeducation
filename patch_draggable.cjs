const fs = require('fs');

function fixFile(filePath, divClass, isChapterDetails) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('DraggableScroll')) {
    const importStatement = `import DraggableScroll from "./DraggableScroll";\n`;
    content = content.replace(/(import .* from ['"].*['"];\n)(?!import)/, `$1${importStatement}`);
  }
  
  // replace <div className="p-3 ... w-full"> with <DraggableScroll ...>
  if (isChapterDetails) {
    content = content.replace(
      /<div className="p-3 bg-slate-50 dark:bg-slate-950\/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-\[50px\] w-full">\s*<Latex text=\{\`\$\$\{f\.latex\}\$\$\`\} \/>\s*<\/div>/g,
      '<DraggableScroll className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl min-h-[50px] w-full">\n                      <Latex text={`$$${f.latex}$$`} />\n                    </DraggableScroll>'
    );
  } else {
    content = content.replace(
      /<div className="p-4 bg-slate-50 dark:bg-slate-950\/60 border border-slate-100 dark:border-slate-800 rounded-xl overflow-x-auto min-h-\[56px\] w-full">\s*<Latex block=\{true\} text=\{formula\.latex\} \/>\s*<\/div>/g,
      '<DraggableScroll className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-xl min-h-[56px] w-full">\n                <Latex block={true} text={formula.latex} />\n              </DraggableScroll>'
    );
  }
  
  fs.writeFileSync(filePath, content);
}

fixFile('src/components/ChapterDetails.tsx', '', true);
fixFile('src/components/FormulaSheet.tsx', '', false);
